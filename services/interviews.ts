'use server';

import { Interview, InterviewWithPayload, Link } from '@/types';
import { revalidatePath } from 'next/cache';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import deepmerge from 'deepmerge';

const richInclude = {
  candidate: true,
  job: true,
  links: true,
};

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

type InterviewFindManyArgs = Parameters<typeof prisma.interview.findMany>[0];

export async function getInterviews(input: InterviewFindManyArgs = {}) {
  const { session } = await getSession();

  if (!session) {
    throw new Error('Unauthorized');
  }

  const args = deepmerge<InterviewFindManyArgs>(
    {
      orderBy: [{ createdAt: 'desc' }],
    },
    input
  );

  const response = await prisma.interview.findMany({
    ...args,
    include: richInclude,
  });

  return response;
}

export async function getSingleInterview(
  id: string
): Promise<InterviewWithPayload | null> {
  const { session } = await getSession();

  if (!session) {
    throw new Error('Unauthorized');
  }

  const response = await prisma.interview.findUnique({
    where: { id },
    include: richInclude,
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

export async function addLinkToInterview({
  url,
  interviewId,
}: Pick<Link, 'interviewId' | 'url'>) {
  const { session } = await getSession();

  if (!session) {
    throw new Error('Unauthorized');
  }

  const response = await prisma.interview.update({
    where: { id: interviewId },
    data: {
      links: {
        connectOrCreate: {
          where: { url },
          create: { url },
        },
      },
    },
  });

  revalidatePath(`/interviews/${interviewId}`);

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
