import { AddNewButton, CandidateList } from './components';

import candidates from './candidates';

export default function CandidatesPage() {
  return (
    <div className="flex w-full flex-col">
      <div className="flex justify-between px-6 py-4">
        <h1 className=" text-4xl font-bold text-slate-400 ">Candidates</h1>
        <AddNewButton />
      </div>

      <CandidateList data={candidates} />
    </div>
  );
}
