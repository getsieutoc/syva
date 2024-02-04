'use server';

import { revalidatePath } from 'next/cache';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Job, Prisma } from '@/types';
import deepmerge from 'deepmerge';

export async function createJob(args: Prisma.JobCreateArgs) {
  const { session } = await getSession();

  if (!session) {
    throw new Error('Unauthorized');
  }

  const response = await prisma.job.create(args);

  revalidatePath('/jobs');

  return response;
}

export async function getJobs(args: Prisma.JobFindManyArgs = {}) {
  const { session } = await getSession();

  if (!session) {
    throw new Error('Unauthorized');
  }

  const finalArgs: Prisma.JobFindManyArgs = deepmerge(
    {
      where: {},
      orderBy: [{ createdAt: 'desc' }],
    },
    args
  );

  const response = await prisma.job.findMany(finalArgs);

  return response;
}

export async function updateJob(id: string, data: Partial<Job>) {
  const { session } = await getSession();

  if (!session) {
    throw new Error('Unauthorized');
  }

  const response = await prisma.job.update({ where: { id }, data });

  revalidatePath('/candidates');

  return response;
}

export async function deleteJob(id: string) {
  const { session } = await getSession();

  if (!session) {
    throw new Error('Unauthorized');
  }

  const response = await prisma.job.delete({ where: { id } });

  revalidatePath('/candidates');

  return response;
}
