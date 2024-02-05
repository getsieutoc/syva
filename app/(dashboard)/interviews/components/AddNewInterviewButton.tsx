'use client';

import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from '@/components/ui';
import { SubmitHandler, Stage, Interview } from '@/types';
import { createInterview } from '@/services/interviews';
import { useDisclosure, useForm } from '@/hooks';
import { SelectCandidateFormItem } from './SelectCandidateFormItem';

const defaultValues = {
  jobId: '',
  candidateId: '',
  stage: Stage.SCREENING,
} satisfies Partial<Interview>;

export type NewInterviewInputs = typeof defaultValues;

export const AddNewInterviewButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const form = useForm<NewInterviewInputs>({ defaultValues });

  console.log('### form Values: ', form.getValues());

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      onOpen();
    } else {
      onClose();
    }
  };

  const isDisabled = form.formState.isSubmitting || !form.formState.isDirty;

  const onSubmit: SubmitHandler<NewInterviewInputs> = async (input) => {
    if (isDisabled) return;

    const result = await createInterview({ data: input });

    if (result) {
      handleOpenChange(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button onClick={onOpen}>Add New Interview</Button>
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
          <DialogTitle>Create New Interview</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="candidateId"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Candidate</FormLabel>
                    <SelectCandidateFormItem
                      selected={field.value}
                      onSelect={(id) => form.setValue('candidateId', id)}
                    />
                    <FormDescription>
                      This is the language that will be used in the dashboard.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                isLoading={form.formState.isSubmitting}
                disabled={isDisabled}
                className="max-w-fit"
                type="submit"
              >
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};