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
  Input,
} from '@/components/ui';
import { useDisclosure, useForm } from '@/hooks';
import { updateUser } from '@/services/users';
import { User, SubmitHandler } from '@/types';
import { Pencil } from '@/components/icons';

type ManualInputs = Partial<User>;

export const EditCandidateItem = ({
  candidate,
  onFinish,
}: {
  candidate: User;
  onFinish?: (id: string) => void;
}) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const defaultValues = {
    name: candidate.name,
    email: candidate.email,
  };

  const form = useForm<ManualInputs>({ defaultValues });

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      onOpen();
    } else {
      onClose();
    }
  };

  const onSubmit: SubmitHandler<ManualInputs> = async (data) => {
    console.log('### onSubmit');

    const result = await updateUser(candidate.id, data);

    if (result) {
      onFinish?.(candidate.id);
    }

    handleOpenChange(false);
  };

  // useKeyPressEvent('Enter', (e) => {
  //   if (isOpen && formRef && formRef.current) {
  //     e.preventDefault();
  //     console.log('### isOpen: ', { isOpen });
  //     form.handleSubmit(onSubmit)
  //   }
  // });

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
          <Pencil className="h-4 w-4" /> Edit candidate
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="DialogContent">
        <DialogHeader>
          <DialogTitle>Edit Candidate</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Candidate Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Name"
                        {...field}
                        value={field.value ?? ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Candidate Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Email"
                        {...field}
                        value={field.value ?? ''}
                      />
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
                disabled={form.formState.isSubmitting}
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
