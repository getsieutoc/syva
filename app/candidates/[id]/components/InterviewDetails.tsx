'use client';

import { Chatbox } from '@/components/client';
import { Avatar, AvatarImage, Skeleton } from '@/components/ui';
import { Candidate } from '@/types';
import { useChat } from '@/hooks';

export type SingleCandidatePageProps = {
  candidate?: Candidate;
};

export const InterviewDetails = ({ candidate }: SingleCandidatePageProps) => {
  console.log('### candidate: ', { candidate });

  const bindChat = useChat();

  return (
    <div className="h-full">
      <Avatar size="md">
        <AvatarImage alt={candidate?.name} src={candidate?.avatar} />
      </Avatar>
      <h2 className="text-lg font-bold">{candidate?.name}</h2>

      <Chatbox {...bindChat} />
    </div>
  );
};
