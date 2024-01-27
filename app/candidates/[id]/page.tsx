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

  return (
    <div className="h-full shrink">
      <InterviewDetails candidate={foundCandidate} />
    </div>
  );
}
