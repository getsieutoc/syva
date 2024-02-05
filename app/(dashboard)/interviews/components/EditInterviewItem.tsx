import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenuItem,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';
import { InterviewWithPayload, Stage, SubmitHandler } from '@/types';
import { updateInterview } from '@/services/interviews';
import { useDisclosure, useForm } from '@/hooks';
import { Pencil } from '@/components/icons';

type ManualInputs = Partial<InterviewWithPayload>;

export const EditInterviewItem = ({
  interview,
  onFinish,
}: {
  interview: InterviewWithPayload;
  onFinish?: (id: string) => void;
}) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const form = useForm<Partial<InterviewWithPayload>>({
    defaultValues: interview,
  });

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      onOpen();
    } else {
      onClose();
    }
  };

  const onSubmit: SubmitHandler<ManualInputs> = async (input) => {
    const result = await updateInterview(interview.id, { stage: input.stage });

    if (result) {
      onFinish?.(interview.id);
    }

    handleOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
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

      <DialogContent
        onPointerDownOutside={(e) => {
          if (form.formState.isSubmitting || !form.formState.isDirty) {
            e.preventDefault();
            return;
          }
        }}
      >
        <DialogHeader>
          <DialogTitle>Edit Interview</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
              <FormItem className="flex flex-col">
                <FormLabel>Candidate</FormLabel>
                <Button
                  className="w-full justify-between text-muted-foreground"
                  variant="outline"
                  disabled
                >
                  {interview.candidate.name}
                </Button>
              </FormItem>

              <FormItem className="flex flex-col">
                <FormLabel>Job</FormLabel>
                <Button
                  className="w-full justify-between text-muted-foreground"
                  variant="outline"
                  disabled
                >
                  {interview.job.name} ({interview.job.employment})
                </Button>
              </FormItem>

              <FormField
                control={form.control}
                name="stage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stage</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value ?? ''}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a stage" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.keys(Stage).map((key) => (
                          <SelectItem key={key} value={key}>
                            {key}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                className="max-w-fit"
                type="submit"
              >
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
