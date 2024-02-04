import {
  Button,
  Command,
  FormControl,
  Popover,
  PopoverTrigger,
  PopoverContent,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@/components/ui';
import { Check, ChevronsUpDown } from '@/components/icons';
import { CandidateWithPayload } from '@/types';
import { useDisclosure, useState } from '@/hooks';
import { cn } from '@/lib/utils';

export type SelectCandidateProps = {
  selected: string;
  onSelect: (candidateId: string) => void;
};

const foundCandidates = [
  { id: 'test', name: 'Test' },
  { id: '11121', name: 'number' },
];

export const SelectCandidateFormItem = ({
  selected,
  onSelect,
}: SelectCandidateProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [search, setSearch] = useState('');

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      onOpen();
    } else {
      onClose();
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              'w-[400px] justify-between',
              selected && 'text-muted-foreground'
            )}
          >
            {selected
              ? foundCandidates.find((candidate) => candidate.id === selected)
                  ?.name
              : 'Search candidate by name'}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0">
        <Command>
          <CommandInput
            placeholder="Type to search..."
            onValueChange={setSearch}
            value={search}
          />
          <CommandEmpty>No candidate found.</CommandEmpty>
          <CommandGroup>
            {foundCandidates.map((candidate) => (
              <CommandItem
                value={candidate.name ?? ''}
                key={candidate.id}
                onSelect={() => {
                  onSelect(candidate.id);
                  handleOpenChange(false);
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    candidate.id === selected ? 'opacity-100' : 'opacity-0'
                  )}
                />
                {candidate.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
