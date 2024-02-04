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
  Input,
  Textarea,
  Switch,
} from '@/components/ui';
import { Employment, SubmitHandler, Prisma } from '@/types';
import { useDisclosure, useForm } from '@/hooks';
import { createJob } from '@/services/jobs';

const defaultValues: Prisma.JobCreateArgs['data'] = {
  aasdf: 123,
  name2: '',
  description: '',
  employment: Employment.FULLTIME,
  address: '',
  isRemote: true,
  salary: 0,
  responsibilities: '',
  skills: '',
  qualifications: '',
  educationRequirements: '',
  experienceRequirements: '',
};

type ManualInputs = typeof defaultValues;

export const AddNewJobButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const form = useForm<ManualInputs>({ defaultValues });

  console.log('### form Values: ', form.getValues());

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      onOpen();
    } else {
      onClose();
    }
  };

  const isDisabled = form.formState.isSubmitting || !form.formState.isDirty;

  const onSubmit: SubmitHandler<ManualInputs> = async (input) => {
    if (isDisabled) return;

    const result = await createJob({
      data: input,
    });

    if (result) {
      handleOpenChange(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button onClick={onOpen}>Add New Job</Button>
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
          <DialogTitle>Create New Job</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Job name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Job description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Job address" {...field} />
                    </FormControl>
                    <FormDescription>
                      Can be empty if the job is remote
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isRemote"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Remote Job</FormLabel>
                      <FormDescription>
                        Job that can be done from anywhere
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        onCheckedChange={field.onChange}
                        checked={field.value}
                        aria-readonly
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="employment"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Remote Job</FormLabel>
                      <FormDescription>
                        Job that can be done from anywhere
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        onCheckedChange={field.onChange}
                        checked={field.value}
                        aria-readonly
                      />
                    </FormControl>
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
