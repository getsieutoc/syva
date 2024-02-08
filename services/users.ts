'use server';

import { revalidatePath } from 'next/cache';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Role, User } from '@/types';
import deepmerge from 'deepmerge';

const richInclude = {
  appliedInterviews: true,
  boardInterviews: true,
};

export async function createUser(
  input: Parameters<typeof prisma.user.create>[0] = {}
) {
  const { session } = await getSession();

  if (!session) {
    throw new Error('Unauthorized');
  }

  const response = await prisma.user.create(input);

  revalidatePath('/candidates');

  return response;
}

type UserFindManyArgs = Parameters<typeof prisma.user.findMany>[0];

export async function findCandidates(input: UserFindManyArgs = {}) {
  const { session } = await getSession();

  if (!session) {
    throw new Error('Unauthorized');
  }

  const args = deepmerge<UserFindManyArgs>(
    {
      where: { role: Role.CANDIDATE },
      orderBy: [{ createdAt: 'desc' }],
    },
    input
  );

  const response = await prisma.user.findMany({
    ...args,
    include: richInclude,
  });

  return response;
}

type FindOne = { id: string; email?: never } | { email: string; id?: never };

export async function findOneCandidate({ id, email }: FindOne) {
  const { session } = await getSession();

  if (!session) {
    throw new Error('Unauthorized');
  }

  if (id) {
    return await prisma.user.findUnique({
      where: { id },
      include: richInclude,
    });
  }

  if (email) {
    return await prisma.user.findUnique({
      where: { email },
      include: richInclude,
    });
  }

  throw new Error('Need either id or email');
}

export async function updateUser(id: string, data: Partial<User>) {
  const { session } = await getSession();

  if (!session) {
    throw new Error('Unauthorized');
  }

  const response = await prisma.user.update({ where: { id }, data });

  revalidatePath('/candidates');

  return response;
}

export async function deleteUser(id: string) {
  const { session } = await getSession();

  if (!session) {
    throw new Error('Unauthorized');
  }

  const response = await prisma.user.delete({ where: { id } });

  revalidatePath('/candidates');

  return response;
}
