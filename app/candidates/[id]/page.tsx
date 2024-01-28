import { InterviewDetails } from './components';
import candidates from '../candidates';

type SingleCandidatePageProps = {
  params: {
    id: string;
  };
};

export default function SingleCandidatePage({
  params,
}: SingleCandidatePageProps) {
  const foundCandidate = candidates.find((c) => c.id === params.id);

  if (!foundCandidate) {
    return null;
  }

  return (
    <div className="h-full flex-auto">
      <InterviewDetails candidate={foundCandidate} />
    </div>
  );
}
