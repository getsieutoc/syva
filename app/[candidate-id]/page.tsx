import { Chatbox } from '@/components/client';
import { Skeleton } from '@/components/ui';
import { useChat } from '@/hooks';

export default function SingleCandidatePage() {
  const bindChat = useChat();

  return (
    <div className="grid h-full grid-cols-2 gap-6">
      <Chatbox {...bindChat} />

      <Skeleton className="h-[300px] flex-initial" />
    </div>
  );
}
