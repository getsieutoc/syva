import { LoadingCandidateItem } from '..';

type CandidateUserByIDTypes = {
  id: string;
};
export const CandidateUserByID = ({ id }: CandidateUserByIDTypes) => {
  return <LoadingCandidateItem />;
};
