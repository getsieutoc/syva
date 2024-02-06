import { getJobBySlug } from '@/services/jobs';
import { Skeleton } from '@/components/ui';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export type DynamicJobPageProps = {
  params: {
    slug: string;
  };
};

// NOTE: This page will be public, be CAREFUL when query
export default async function DynamicJobPage({ params }: DynamicJobPageProps) {
  const job = await getJobBySlug(params.slug);

  if (!job) {
    notFound();
  }

  return (
    <div className="w-full gap-6">
      <Suspense fallback={<Skeleton className="h-[40px] w-[100px]" />}>
        {/* // TODO: Make single job view here */}
        <p className="text-2xl font-bold">{job.name}</p>
        <p className="text-sm">Description: {job.description}</p>
        <p className="text-sm">
          Address: {job.isRemote ? 'REMOTE' : job.address}
        </p>
      </Suspense>
    </div>
  );
}
