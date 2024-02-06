'use server';

import { Job, JobWithPayload } from '@/types';
import { revalidatePath } from 'next/cache';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import deepmerge from 'deepmerge';

const richInclude = {
  interviews: true,
};

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

type JobFindManyArgs = Parameters<typeof prisma.job.findMany>[0];

export async function findJobs(input: JobFindManyArgs = {}) {
  const { session } = await getSession();

  if (!session) {
    throw new Error('Unauthorized');
  }

  const args = deepmerge<JobFindManyArgs>(
    {
      orderBy: [{ createdAt: 'desc' }],
    },
    input
  );

  const response = await prisma.job.findMany({
    ...args,
    include: richInclude,
  });

  return response;
}

// TODO: Implement rate limit on this because this is public
export async function getJobBySlug(
  slug: string
): Promise<JobWithPayload | null> {
  const response = await prisma.job.findUnique({
    where: { slug },
    include: richInclude,
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
