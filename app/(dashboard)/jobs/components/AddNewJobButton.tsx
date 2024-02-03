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
  Form,
  Input,
  Label,
  Textarea,
  Switch,
} from '@/components/ui';
import { Employment, SubmitHandler } from '@/types';
import { ChevronLeft } from '@/components/icons';
import { useDisclosure, useForm } from '@/hooks';
import { createJob } from '@/services/jobs';

type ManualInputs = {
  name: string;
  description: string;
  employment: Employment;
  address: string;
  isRemote: boolean;
  salary?: string;
  responsibilities?: string;
  skills?: string;
  qualifications?: string;
  educationRequirements?: string;
  experienceRequirements?: string;
};

export const AddNewJobButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const form = useForm<ManualInputs>({
    defaultValues: {
      name: '',
      description: '',
      address: '',
      isRemote: true,
    },
  });
  console.log('### isRemote: ', form.getValues());

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
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Name"
                  {...form.register('name', { required: true })}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  rows={3}
                  id="description"
                  placeholder="Start writing..."
                  {...form.register('description', { required: true })}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  rows={3}
                  placeholder="Start writing..."
                  {...form.register('address')}
                />
              </div>
              <div className="flex flex-col gap-2">
                <FormField
                  control={form.control}
                  name="isRemote"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Is Remote Job?
                        </FormLabel>
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
            </div>

            <DialogFooter className="mt-6 w-full justify-between">
              <Button
                onClick={() => handleOpenChange(false)}
                className="max-w-fit"
                variant="ghost"
              >
                <ChevronLeft />
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
