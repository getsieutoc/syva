import { getServerSession, NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GitHubProvider from 'next-auth/providers/github';
import { prisma } from '@/lib/prisma';
import { GitHubOrganization, Role } from '@/types';

import { fetcher } from './fetcher';

if (!process.env.NEXTAUTH_SECRET) {
  throw new Error('NEXTAUTH_SECRET variable is not defined');
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  adapter: PrismaAdapter(prisma),

  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,

      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name ?? profile.login,
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
    signIn: async ({ profile, account }) => {
      if (
        account &&
        account.provider === 'github' &&
        profile &&
        profile.organizations_url
      ) {
        const orgs = await fetcher<GitHubOrganization[]>(
          profile.organizations_url
        );

        if (process.env.GITHUB_ORG) {
          // Allow only people inside the organization
          return orgs.some((org) => org.login === process.env.GITHUB_ORG);
        }

        return true;
      }

      return false;
    },

    jwt: async ({ token, user }) => {
      if (user) {
        token.user = user;
      }

      return token;
    },

    session: async ({ session, token }) => {
      session.user = {
        ...session.user,
        id: token.sub as string, // we can be sure sub is inside token
      };

      return session;
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
