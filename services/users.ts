'use server';

import { revalidatePath } from 'next/cache';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Prisma, Role, User } from '@/types';
import deepmerge from 'deepmerge';

export async function createUser(args: Prisma.UserCreateArgs) {
  const { session } = await getSession();

  if (!session) {
    throw new Error('Unauthorized');
  }

  const response = await prisma.user.create(args);

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
