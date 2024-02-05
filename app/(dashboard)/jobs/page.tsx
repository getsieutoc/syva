import { findJobs } from '@/services/jobs';
import { AddNewJobButton, JobTable } from './components';

export default async function JobsPage() {
  const jobs = await findJobs();

  return (
    <div className="flex w-full flex-col px-6">
      <div className="flex justify-between py-4">
        <h1 className=" text-3xl font-bold text-slate-500">Jobs</h1>
        <AddNewJobButton />
      </div>

      <JobTable data={jobs} />
    </div>
  );
}
