'use server';

import { revalidatePath } from 'next/cache';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Job } from '@/types';

export async function createJob(
  input: Parameters<typeof prisma.job.create>[0]
) {
  const { session } = await getSession();

  if (!session) {
    throw new Error('Unauthorized');
  }

  const response = await prisma.job.create(input);

  revalidatePath('/jobs');

  return response;
}

export async function getJobs(
  input: Parameters<typeof prisma.job.findMany>[0] = {}
) {
  const { session } = await getSession();

  if (!session) {
    throw new Error('Unauthorized');
  }

  const response = await prisma.job.findMany({
    where: {},
    orderBy: [{ createdAt: 'desc' }],
    ...input,
  });

  return response;
}

export async function updateJob(id: string, data: Partial<Job>) {
  const { session } = await getSession();

  if (!session) {
    throw new Error('Unauthorized');
  }

  const response = await prisma.job.update({ where: { id }, data });

  revalidatePath('/jobs');

  return response;
}

export async function deleteJob(id: string) {
  const { session } = await getSession();

  if (!session) {
    throw new Error('Unauthorized');
  }

  const response = await prisma.job.delete({ where: { id } });

  revalidatePath('/jobs');

  return response;
}
