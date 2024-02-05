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
  Textarea,
} from '@/components/ui';
import { useDisclosure, useForm } from '@/hooks';
import { updateJob } from '@/services/jobs';
import { Job, SubmitHandler } from '@/types';
import { Pencil } from '@/components/icons';

type ManualInputs = Partial<Job>;

export const EditJobItem = ({
  job,
  onFinish,
}: {
  job: Job;
  onFinish?: (id: string) => void;
}) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ManualInputs>({
    defaultValues: job,
  });

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      onOpen();
    } else {
      onClose();
    }
  };

  const onSubmit: SubmitHandler<ManualInputs> = async (input) => {
    if (isSubmitting) return;

    const result = await updateJob(job.id, {
      name: input.name,
      description: input.description,
    });

    if (result) {
      onFinish?.(job.id);
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
          <Pencil className="h-4 w-4" /> Edit job
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="DialogContent">
        <DialogHeader>
          <DialogTitle>Edit Job: {job.name}</DialogTitle>
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
              <Textarea
                id="description"
                placeholder="Start writing..."
                {...register('description', { required: true })}
              />
            </div>
          </div>

          <DialogFooter className="mt-6 w-full justify-between">
            <Button
              onClick={(e) => {
                e.preventDefault();
                handleOpenChange(false);
              }}
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
