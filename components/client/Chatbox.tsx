import { Button, Input } from '@/components/ui';
import { useEffect, useRef } from '@/hooks';
import { UseChatHelpers } from '@/types';
import { cn } from '@/lib/utils';

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
    <div className="flex h-full w-full flex-col gap-4 px-0 py-4 text-sm">
      <div
        ref={messagesRef}
        className="flex h-full flex-auto flex-col gap-2 overflow-auto px-4"
      >
        {messages.map((m) => (
          <div
            className={cn(
              'flex w-full flex-row',
              m.role !== 'user' ? 'justify-end' : 'justify-start'
            )}
            key={m.id}
          >
            <p
              className={cn(
                'max-w-[80%] flex-none text-wrap rounded-lg px-4 py-3',
                m.role !== 'user'
                  ? 'bg-blue-100 dark:bg-blue-800'
                  : 'bg-slate-100 dark:bg-slate-800'
              )}
            >
              {m.content}
            </p>
          </div>
        ))}
      </div>

      <form
        className="relative flex grow-0 items-center justify-center px-4"
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
          className="absolute bottom-1 right-5 self-end"
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
