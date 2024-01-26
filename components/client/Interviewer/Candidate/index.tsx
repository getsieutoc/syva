import { LoadingInterviewerItem } from '..';

type InterviewerUserTypes = {
  id: string;
};
export const CandidateUserByID = ({ id }: InterviewerUserTypes) => {
  return (
    <div>
      <LoadingInterviewerItem />
    </div>
  );
};
