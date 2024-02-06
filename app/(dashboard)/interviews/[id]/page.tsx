import { getSingleInterview } from '@/services/interviews';
import { notFound } from 'next/navigation';

import { InterviewDetails } from './components';

export default async function SingleInterviewPage({
  params,
}: {
  params: { id: string };
}) {
  const currentInterview = await getSingleInterview(params.id);

  if (!currentInterview) {
    notFound();
  }

  return <InterviewDetails interview={currentInterview} />;
}
