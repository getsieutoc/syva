import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui';
import { MoreHorizontal, ClipboardCopy } from '@/components/icons';
import { useDisclosure } from '@/hooks';
import { InterviewWithPayload } from '@/types';

import { EditInterviewItem } from './EditInterviewItem';
import { DeleteInterviewItem } from './DeleteInterviewItem';
import { ViewInterviewItem } from './ViewInterviewItem';

type ActionMenuProps = {
  interview: InterviewWithPayload;
};

export const ActionMenu = ({ interview }: ActionMenuProps) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

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

        <EditInterviewItem interview={interview} onFinish={onClose} />

        <DeleteInterviewItem interview={interview} onFinish={onClose} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
