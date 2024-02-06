'use client';

import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/components/ui';
import { addLinkToInterview } from '@/services/interviews';
import { useDisclosure, useForm } from '@/hooks';
import { SubmitHandler, Link } from '@/types';

const defaultValues = {
  url: '',
} satisfies Partial<Link>;

export type NewLinkInputs = typeof defaultValues;

export type AddNewLinkDialogProps = {
  interviewId: string;
};

export const AddNewLinkDialog = ({ interviewId }: AddNewLinkDialogProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const form = useForm<NewLinkInputs>({ defaultValues });

  const handleOpenChange = (isOpen: boolean) => {
    form.reset();

    if (isOpen) {
      onOpen();
    } else {
      onClose();
    }
  };

  const isSubmitting = form.formState.isSubmitting;

  const onSubmit: SubmitHandler<NewLinkInputs> = async (input) => {
    if (isSubmitting) return;

    const result = await addLinkToInterview({
      url: input.url,
      interviewId,
    });

    if (result) {
      handleOpenChange(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          onClick={onOpen}
          className="min-w-[200px] flex-none grow-0 self-end"
        >
          Add New Link
        </Button>
      </DialogTrigger>

      <DialogContent
        onPointerDownOutside={(e) => {
          if (form.formState.isSubmitting || !form.formState.isDirty) {
            e.preventDefault();
            return;
          }
        }}
      >
        <DialogHeader>
          <DialogTitle>Add Audio Link to this interview</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Audio URL</FormLabel>
                    <FormControl>
                      <Input placeholder="Audio URL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                isLoading={form.formState.isSubmitting}
                disabled={isSubmitting}
                className="max-w-fit"
                type="submit"
              >
                Add Link
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
