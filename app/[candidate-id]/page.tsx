import { CandidateUserByID } from '@/components/client';

type CandidateUserTypes = {
  params: {
    'candidate-id': string;
  };
};
export default function CandidateUser(props: CandidateUserTypes) {
  const { params } = props;

  return <CandidateUserByID id={params['candidate-id']} />;
}
