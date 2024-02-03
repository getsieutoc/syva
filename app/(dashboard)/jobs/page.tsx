import { getJobs } from '@/services/jobs';
import { AddNewJobButton, JobTable } from './components';

export default async function JobsPage() {
  const jobs = await getJobs();

  return (
    <div className="flex w-full flex-col">
      <div className="flex justify-between px-6 py-4">
        <h1 className=" text-4xl font-bold text-slate-400 dark:text-slate-600">
          Jobs
        </h1>
        <AddNewJobButton />
      </div>

      <JobTable data={jobs} />
    </div>
  );
}
