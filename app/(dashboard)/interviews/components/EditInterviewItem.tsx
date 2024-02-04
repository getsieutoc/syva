import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenuItem,
  Input,
  Label,
} from '@/components/ui';
import { useDisclosure, useForm } from '@/hooks';
import { updateInterview } from '@/services/interviews';
import { Interview, SubmitHandler } from '@/types';
import { Pencil } from '@/components/icons';

type ManualInputs = Partial<Interview>;

export const EditInterviewItem = ({
  interview,
  onFinish,
}: {
  interview: Interview;
  onFinish?: (id: string) => void;
}) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ManualInputs>({
    defaultValues: interview,
  });

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      onOpen();
    } else {
      onClose();
    }
  };

  const onSubmit: SubmitHandler<ManualInputs> = async (data) => {
    if (isSubmitting) return;

    const result = await updateInterview(interview.id, data);

    if (result) {
      onFinish?.(interview.id);
    }

    handleOpenChange(false);
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
          <Pencil className="h-4 w-4" /> Edit interview
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="DialogContent">
        <DialogHeader>
          <DialogTitle>Edit Interview: {interview.name}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Name"
                {...register('name', { required: true })}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="Start writing..."
                {...register('description', { required: true })}
              />
            </div>
          </div>

          <DialogFooter className="mt-6 w-full justify-between">
            <Button
              onClick={() => handleOpenChange(false)}
              className="max-w-fit"
              variant="ghost"
            >
              Cancel
            </Button>

            <Button
              isLoading={isSubmitting}
              disabled={isSubmitting}
              className="max-w-fit"
              type="submit"
            >
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
