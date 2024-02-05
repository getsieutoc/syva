import { getSingleInterview } from '@/services/interviews';
import { InterviewDetails } from './components';

export default async function SingleInterviewPage({
  params,
}: {
  params: { id: string };
}) {
  const currentInterview = await getSingleInterview(params.id);
  console.log('### currentInterview: ', { currentInterview });

  return <InterviewDetails interview={currentInterview} />;
}
