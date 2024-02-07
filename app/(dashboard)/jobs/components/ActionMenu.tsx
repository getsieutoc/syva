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
import { JobWithPayload } from '@/types';

import { EditJobItem } from './EditJobItem';
import { DeleteJobItem } from './DeleteJobItem';

type ActionMenuProps = {
  job: JobWithPayload;
};

export const ActionMenu = ({ job }: ActionMenuProps) => {
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
        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(job.id)}>
          <ClipboardCopy className="h-4 w-4" />
          Copy job ID
        </DropdownMenuItem>

        <EditJobItem job={job} onFinish={onClose} />

        <DeleteJobItem job={job} onFinish={onClose} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
