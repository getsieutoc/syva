import { LoadingInterviewerItem } from '..';

type InterviewerUserTypes = {
  id: string;
};
export const InterviewUserByID = ({ id }: InterviewerUserTypes) => {
  return (
    <div>
      <LoadingInterviewerItem />
    </div>
  );
};
