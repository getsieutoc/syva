import { getInterviews } from '@/services/interviews';
import { AddNewInterviewButton, InterviewTable } from './components';

export default async function InterviewsPage() {
  const interviews = await getInterviews();

  return (
    <div className="flex w-full flex-col px-6">
      <div className="flex justify-between py-4">
        <h1 className=" text-3xl font-bold text-slate-500">Interviews</h1>
        <AddNewInterviewButton />
      </div>

      <InterviewTable data={interviews} />
    </div>
  );
}
