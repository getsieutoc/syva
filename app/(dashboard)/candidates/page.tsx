import { findCandidates } from '@/services/users';
import { AddNewCandidateButton, CandidateTable } from './components';

export default async function CandidatesPage() {
  const candidates = await findCandidates();

  return (
    <div className="flex w-full flex-col px-6">
      <div className="flex justify-between py-4">
        <h1 className=" text-3xl font-bold text-slate-500">Candidates</h1>
        <AddNewCandidateButton />
      </div>

      <CandidateTable data={candidates} />
    </div>
  );
}
