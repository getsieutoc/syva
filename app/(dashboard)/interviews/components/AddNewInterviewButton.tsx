'use client';

import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';
import { createInterview } from '@/services/interviews';
import { Employment, SubmitHandler, Stage } from '@/types';
import { useDisclosure, useForm } from '@/hooks';

const defaultValues = {
  jobId: '',
  candidateId: '',
  stage: Stage.SCREENING,
};

type Inputs = typeof defaultValues;

export const AddNewInterviewButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const form = useForm<Inputs>({ defaultValues });

  console.log('### form Values: ', form.getValues());

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      onOpen();
    } else {
      onClose();
    }
  };

  const isDisabled = form.formState.isSubmitting || !form.formState.isDirty;

  const onSubmit: SubmitHandler<Inputs> = async (input) => {
    if (isDisabled) return;

    const result = await createInterview(input);

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
                    <FormLabel>Language</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              'w-[200px] justify-between',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value
                              ? languages.find(
                                  (language) => language.value === field.value
                                )?.label
                              : 'Select language'}
                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search framework..."
                            className="h-9"
                          />
                          <CommandEmpty>No framework found.</CommandEmpty>
                          <CommandGroup>
                            {languages.map((language) => (
                              <CommandItem
                                value={language.label}
                                key={language.value}
                                onSelect={() => {
                                  form.setValue('language', language.value);
                                }}
                              >
                                {language.label}
                                <CheckIcon
                                  className={cn(
                                    'ml-auto h-4 w-4',
                                    language.value === field.value
                                      ? 'opacity-100'
                                      : 'opacity-0'
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
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
