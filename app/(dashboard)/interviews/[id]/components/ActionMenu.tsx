import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui';
import { MoreHorizontal, ClipboardCopy, Wand2 } from '@/components/icons';
import { useDisclosure, useLoading } from '@/hooks';
import { fetcher } from '@/lib/fetcher';
import { HttpMethod, Link } from '@/types';
import { Spinner } from '@/components/client';

// import { EditInterviewItem } from './EditInterviewItem';
// import { DeleteInterviewItem } from './DeleteInterviewItem';
// import { ViewInterviewItem } from './ViewInterviewItem';

type ActionMenuProps = {
  data: Link;
};

export const ActionMenu = ({ data: link }: ActionMenuProps) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const { isLoading, startLoading, stopLoading } = useLoading();

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      onOpen();
    } else {
      onClose();
    }
  };

  const handleAnalyzeAudio = async () => {
    startLoading();

    const res = await fetcher<object>('/api/analyze', {
      method: HttpMethod.POST,
      body: JSON.stringify({ linkId: link.id }),
    });

    if (res) {
      stopLoading();
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
          onClick={() => navigator.clipboard.writeText(link.url)}
        >
          <ClipboardCopy className="h-4 w-4" />
          Copy URL
        </DropdownMenuItem>

        <DropdownMenuItem disabled={isLoading} onClick={handleAnalyzeAudio}>
          {isLoading ? <Spinner /> : <Wand2 className="h-4 w-4" />}
          Analyze audio
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
