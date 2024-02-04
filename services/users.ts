'use server';

import { revalidatePath } from 'next/cache';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Role, User } from '@/types';

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

export async function getCandidates(
  input: Parameters<typeof prisma.user.findMany>[0] = {}
) {
  const { session } = await getSession();

  if (!session) {
    throw new Error('Unauthorized');
  }

  const response = await prisma.user.findMany({
    where: {
      role: Role.CANDIDATE,
    },
    orderBy: [{ createdAt: 'desc' }],
    include: { appliedInterviews: true },
    ...input,
  });

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
