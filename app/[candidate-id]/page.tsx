import { CandidateUserByID, Navbar } from '@/components/client';

type CandidateUserTypes = {
  params: {
    'candidate-id': string;
  };
};
export default function InterviewUser(props: CandidateUserTypes) {
  const { params } = props;
  return (
    <main className="px-10">
      <Navbar />
      <div className="my-10" />
      <CandidateUserByID id={params['candidate-id']} />
    </main>
  );
}
