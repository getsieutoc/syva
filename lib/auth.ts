import { getServerSession, NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GitHubProvider from 'next-auth/providers/github';
import { AdapterUser } from 'next-auth/adapters';
import { prisma } from '@/lib/prisma';
import { GitHubOrganization, Role } from '@/types';

import { fetcher } from './fetcher';

if (!process.env.NEXTAUTH_SECRET) {
  throw new Error('NEXTAUTH_SECRET variable is not defined');
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  adapter: {
    ...PrismaAdapter(prisma),
    createUser: async (input) => {
      if (!input.email) throw new Error('Email is required when sign up');

      const numOfUsers = await prisma.user.count();

      return (await prisma.user.create({
        data: {
          ...input,
          role: numOfUsers === 0 ? Role.ADMIN : Role.MEMBER,
        },
      })) as AdapterUser;
    },
  },

  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,

      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name ?? profile.login,
          username: profile.login,
          email: profile.email,
          image: profile.avatar_url,
        };
      },
    }),
  ],

  pages: {
    signIn: `/login`,
    verifyRequest: `/login`,
    error: '/login', // Error code passed in query string as ?error=
  },

  session: { strategy: 'jwt' },

  callbacks: {
    signIn: async ({ profile, account, email }) => {
      if (profile && account && account.provider === 'github') {
        console.log('### account: ', { account });
        console.log('### profile: ', { profile });
        // const orgs = await fetcher<GitHubOrganization[]>((profile as any).organizations_url);

        // if (process.env.GITHUB_ORG) {
        //   // Allow only people inside the organization
        //   return orgs.some((org) => org.login === process.env.GITHUB_ORG);
        // }

        return true;
      }

      return false;
    },

    jwt: async ({ token, user, account }) => {
      if (user) {
        token.user = user;
      }

      return token;
    },
  },
};

export async function getSession() {
  const session = await getServerSession(authOptions);

  const isAdmin = session?.user?.role === Role.ADMIN;

  return {
    session,
    isAdmin,
  };
}
