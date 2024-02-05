import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui';
import { MoreHorizontal, ClipboardCopy, Sparkles } from '@/components/icons';
import { useDisclosure, useRouter } from '@/hooks';
import { InterviewWithPayload } from '@/types';
import { Ping } from '@/components/client';

import { EditInterviewItem } from './EditInterviewItem';
import { DeleteInterviewItem } from './DeleteInterviewItem';
import { ViewInterviewItem } from './ViewInterviewItem';

type ActionMenuProps = {
  interview: InterviewWithPayload;
};

export const ActionMenu = ({ interview }: ActionMenuProps) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const router = useRouter();

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      onOpen();
    } else {
      onClose();
    }
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(interview.id)}
        >
          <ClipboardCopy className="h-4 w-4" />
          Copy interview ID
        </DropdownMenuItem>

        <ViewInterviewItem interview={interview} />

        <DropdownMenuItem
          onClick={() => router.push(`/interviews/${interview.id}`)}
        >
          <Sparkles className="h-4 w-4" />
          Deep Analyze
          <Ping />
        </DropdownMenuItem>

        <EditInterviewItem interview={interview} onFinish={onClose} />

        <DeleteInterviewItem interview={interview} onFinish={onClose} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
