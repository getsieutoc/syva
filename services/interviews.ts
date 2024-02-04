'use server';

import { revalidatePath } from 'next/cache';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Interview } from '@/types';

export async function createInterview(
  input: Parameters<typeof prisma.interview.create>[0]
) {
  const { session } = await getSession();

  if (!session) {
    throw new Error('Unauthorized');
  }

  const response = await prisma.interview.create(input);

  revalidatePath('/interviews');

  return response;
}

export async function getInterviews(
  input: Parameters<typeof prisma.interview.findMany>[0] = {}
) {
  const { session } = await getSession();

  if (!session) {
    throw new Error('Unauthorized');
  }

  const response = await prisma.interview.findMany({
    orderBy: [{ createdAt: 'desc' }],
    ...input,
  });

  return response;
}

export async function updateInterview(id: string, input: Partial<Interview>) {
  const { session } = await getSession();

  if (!session) {
    throw new Error('Unauthorized');
  }

  const response = await prisma.interview.update({
    where: { id },
    data: input,
  });

  revalidatePath('/interviews');

  return response;
}

export async function deleteInterview(id: string) {
  const { session } = await getSession();

  if (!session) {
    throw new Error('Unauthorized');
  }

  const response = await prisma.interview.delete({ where: { id } });

  revalidatePath('/interviews');

  return response;
}
