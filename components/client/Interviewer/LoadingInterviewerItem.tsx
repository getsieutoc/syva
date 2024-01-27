import { Skeleton } from '@/components/ui';
import { useChat } from '@/hooks';

import { Chatbox } from '../Chatbox';

export const LoadingCandidateItem = () => {
  const bindChat = useChat();

  return (
    <div className="grid h-full grid-cols-2 gap-6">
      <Chatbox {...bindChat} />

      <Skeleton className="h-[300px] flex-initial" />
    </div>
  );
};
