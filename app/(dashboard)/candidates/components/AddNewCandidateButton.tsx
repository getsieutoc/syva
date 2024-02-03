import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  Input,
  Label,
} from '@/components/ui';
import { FormInput, ScrollText, ChevronLeft } from '@/components/icons';
import { ComponentProps, Role, SubmitHandler, UseFormRegister } from '@/types';
import { useDisclosure, useForm, useState } from '@/hooks';
import { createUser } from '@/services/users';

const newOptions = [
  {
    icon: (p: ComponentProps<typeof FormInput>) => <FormInput {...p} />,
    label: 'Manually Input',
    value: 'manual',
  },
  {
    icon: (p: ComponentProps<typeof ScrollText>) => <ScrollText {...p} />,
    label: 'Upload Resume',
    value: 'resume',
  },
];

type NewCandidateOptionProps = (typeof newOptions)[0] & {
  onClick: () => void;
};

const NewCandidateOption = ({
  icon: Icon,
  label,
  value,
  onClick,
}: NewCandidateOptionProps) => {
  return (
    <div
      onClick={onClick}
      data-id={value}
      className="max-w-sm rounded-md border p-6 hover:cursor-pointer hover:border-primary"
    >
      <Icon className="h-10 w-10" />
      {label}
    </div>
  );
};

type ManualInputs = {
  name: string;
  email: string;
  jobIds: string[];
};

const ManualMethod = ({
  register,
}: {
  register: UseFormRegister<ManualInputs>;
}) => {
  return (
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
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          placeholder="email@example.com"
          {...register('email', { required: true })}
        />
      </div>
    </div>
  );
};

// const UploadResumeMethod = () => {
//   return <div>this is upload form</div>;
// };

export const AddNewCandidateButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = useForm<ManualInputs>({
    defaultValues: {
      name: '',
      email: '',
    },
  });

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen === false) {
      setSelectedMethod(null);
      onClose();
    } else {
      onOpen();
    }
  };

  const isDisabled = isSubmitting || !isDirty;

  const onSubmit: SubmitHandler<ManualInputs> = async (inputs) => {
    if (isDisabled) return;

    const result = await createUser({
      data: {
        ...inputs,
        role: Role.CANDIDATE,
      },
    });

    if (result) {
      handleOpenChange(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button onClick={onOpen}>Add New Candidate</Button>
      </DialogTrigger>

      <DialogContent
        onPointerDownOutside={(e) => {
          if (isSubmitting || isDirty || selectedMethod !== null) {
            e.preventDefault();
            return;
          }
        }}
      >
        <DialogHeader>
          <DialogTitle>Create New Candidate</DialogTitle>
        </DialogHeader>

        {selectedMethod === null ? (
          <div className="grid grid-cols-2 gap-4">
            {newOptions.map(({ icon, label, value }) => (
              <NewCandidateOption
                key={value}
                icon={icon}
                value={value}
                label={label}
                onClick={() => setSelectedMethod(value)}
              />
            ))}
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            {selectedMethod === 'manual' && (
              <ManualMethod register={register} />
            )}

            <DialogFooter className="mt-6 w-full justify-between">
              <Button
                onClick={() => setSelectedMethod(null)}
                className="max-w-fit"
                variant="ghost"
              >
                <ChevronLeft />
                Back
              </Button>

              <Button
                isLoading={isSubmitting}
                disabled={isDisabled}
                className="max-w-fit"
                type="submit"
              >
                Create
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
