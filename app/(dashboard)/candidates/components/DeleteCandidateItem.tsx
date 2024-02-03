import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenuItem,
} from '@/components/ui';
import { useDisclosure, useLoading } from '@/hooks';
import { deleteUser } from '@/services/users';
import { Trash2 } from '@/components/icons';
import { User } from '@/types';

export const DeleteCandidateItem = ({
  candidate,
  onFinish,
}: {
  candidate: User;
  onFinish?: (id: string) => void;
}) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { isLoading, startLoading, stopLoading } = useLoading();

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen === false) {
      onClose();
    } else {
      onOpen();
    }
  };

  const onDelete = async (id: string) => {
    startLoading();

    const result = await deleteUser(id);

    if (result) {
      stopLoading();
      onFinish?.(candidate.id);
    }

    onClose();
  };

  return (
    <Dialog onOpenChange={handleOpenChange} open={isOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          className="DropdownMenuItem"
          onSelect={(e) => {
            e.preventDefault();
            onOpen();
          }}
        >
          <Trash2 className="h-4 w-4" /> Delete candidate
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="DialogContent">
        <DialogHeader className="text-red-500">
          <DialogTitle>Delete Candidate: {candidate.name}</DialogTitle>
        </DialogHeader>

        <div className="text-red-500">
          <h2>Are you sure?</h2>
          <p>This action can not undo!</p>
        </div>

        <DialogFooter className="mt-6 w-full justify-between">
          <Button onClick={onClose} className="max-w-fit" variant="ghost">
            Cancel
          </Button>

          <Button
            isLoading={isLoading}
            disabled={isLoading}
            className="max-w-fit bg-red-500"
            onClick={() => onDelete(candidate.id)}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
