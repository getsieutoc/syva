import { Button, Input } from '@/components/ui';
import { useEffect, useRef } from '@/hooks';
import { UseChatHelpers } from '@/types';
import { cn } from '@/lib/utils';
import { Message } from 'ai';

const getDirection = (role: Message['role']) =>
  role !== 'user' ? 'reverse' : '';

export type ChatboxProps = UseChatHelpers;

export const Chatbox = ({
  input,
  isLoading,
  messages,
  handleSubmit,
  handleInputChange,
}: ChatboxProps) => {
  const messagesRef = useRef<HTMLDivElement>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleScroll = () => {
    if (messagesRef.current) {
      const { offsetHeight, scrollHeight, scrollTop } = messagesRef.current;
      if (scrollHeight <= scrollTop + offsetHeight + 100) {
        messagesRef.current.scrollTo({
          behavior: 'smooth',
          top: scrollHeight,
          left: 0,
        });
      }
    }
  };

  useEffect(() => {
    handleScroll();
  }, [messages]);

  return (
    <div className="flex h-full w-full flex-col bg-red-200 p-4 text-xs">
      <div className="flex shrink flex-col gap-1">
        {messages.map((m) => (
          <div
            className={`flex flex-row-${getDirection(m.role)} w-full`}
            key={m.id}
          >
            <p
              className={cn(
                'flex-none rounded-lg px-4 py-2',
                `bg-${m.role !== 'user' ? 'blue' : 'slate'}-100`
              )}
            >
              {m.content}
            </p>
          </div>
        ))}
      </div>

      <form
        className="relative flex w-full grow-0 flex-col gap-2"
        onSubmit={handleSubmit}
      >
        <Input
          onChange={handleInputChange}
          placeholder="Type here..."
          ref={inputRef}
          value={input}
          autoFocus
        />

        <Button
          className="absolute bottom-1 right-1 self-end"
          aria-label="Send message"
          isLoading={isLoading}
          ref={buttonRef}
          type="submit"
          size="xs"
        >
          Send
        </Button>
      </form>
    </div>
  );
};
