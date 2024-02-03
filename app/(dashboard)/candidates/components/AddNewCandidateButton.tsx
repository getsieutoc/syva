import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui';
import { FormInput, ScrollText } from '@/components/icons';
import { ComponentProps } from '@/types';
import { useState } from '@/hooks';

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

const ManualMethod = () => {
  return <div>this is manual</div>;
};

const UploadResumeMethod = () => {
  return <div>this is upload form</div>;
};

export const AddNewCandidateButton = () => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen === false) {
      setSelectedMethod(null);
    }
  };

  return (
    <Dialog onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>Add New Candidate</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Candidate Record</DialogTitle>
        </DialogHeader>

        {selectedMethod === null && (
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
        )}
      </DialogContent>
    </Dialog>
  );
};
