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
import { User } from '@/types';

import { EditCandidateItem } from './EditCandidateItem';
import { DeleteCandidateItem } from './DeleteCandidateItem';

type ActionMenuProps = {
  candidate: User;
};

export const ActionMenu = ({ candidate }: ActionMenuProps) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen === false) {
      onClose();
    } else {
      onOpen();
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
          onClick={() => navigator.clipboard.writeText(candidate.id)}
        >
          <ClipboardCopy className="h-4 w-4" />
          Copy candidate ID
        </DropdownMenuItem>

        <EditCandidateItem candidate={candidate} onFinish={onClose} />

        <DeleteCandidateItem candidate={candidate} onFinish={onClose} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
