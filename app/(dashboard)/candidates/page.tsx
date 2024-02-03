import { getCandidates } from '@/services/users';
import { AddNewCandidateButton, CandidateList } from './components';

export default async function CandidatesPage() {
  const candidates = await getCandidates();
  console.log('### candidates: ', { candidates });

  return (
    <div className="flex w-full flex-col">
      <div className="flex justify-between px-6 py-4">
        <h1 className=" text-4xl font-bold text-slate-400 ">Candidates</h1>
        <AddNewCandidateButton />
      </div>

      <CandidateList data={candidates} />
    </div>
  );
}
