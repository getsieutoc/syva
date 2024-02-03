'use server';

import { revalidatePath } from 'next/cache';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { User, Prisma, Role } from '@/types';
import deepmerge from 'deepmerge';

export async function createUser(data: Partial<User>) {
  const { session } = await getSession();

  if (!session) {
    throw new Error('Unauthorized');
  }

  const response = await prisma.user.create({ data });

  revalidatePath('/candidates');

  return response;
}

export async function getCandidates(args: Prisma.UserFindManyArgs = {}) {
  const { session } = await getSession();

  if (!session) {
    throw new Error('Unauthorized');
  }

  const finalArgs: Prisma.UserFindManyArgs = deepmerge(
    {
      where: { role: Role.CANDIDATE },
      orderBy: [{ createdAt: 'desc' }],
    },
    args
  );

  const response = await prisma.user.findMany(finalArgs);

  return response;
}
