import { getInterviews } from '@/services/interviews';
import { AddNewInterviewButton, InterviewTable } from './components';

export default async function InterviewsPage() {
  const interviews = await getInterviews();

  return (
    <div className="flex w-full flex-col">
      <div className="flex justify-between px-6 py-4">
        <h1 className=" text-4xl font-bold text-slate-400 dark:text-slate-600">
          Interviews
        </h1>
        <AddNewInterviewButton />
      </div>

      <InterviewTable data={interviews} />
    </div>
  );
}
