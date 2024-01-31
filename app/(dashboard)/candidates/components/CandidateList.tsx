'use client';

import { Candidate } from '@/types';

import { CandidateItem } from './CandidateItem';

export type CandidateListProps = {
  data: Candidate[];
};

export const CandidateList = ({ data }: CandidateListProps) => {
  return (
    <div>
      <h1 className="font-mono text-6xl font-bold text-orange-400 drop-shadow-lg">
        Candidates
      </h1>
      {data.map((item, idx) => (
        <div key={idx + item.id} className="py-3">
          <CandidateItem candidate={item} />
        </div>
      ))}
    </div>
  );
};
