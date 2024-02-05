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
  CommandLoading,
} from '@/components/ui';
import { Check, ChevronsUpDown } from '@/components/icons';
import { CandidateWithPayload } from '@/types';
import { useDebounce, useDisclosure, useState, useSWR } from '@/hooks';
import { cn, queryStringify } from '@/lib/utils';

export type SelectCandidateProps = {
  selected: string;
  onSelect: (candidateId: string) => void;
};

export const SelectCandidateFormItem = ({
  selected,
  onSelect,
}: SelectCandidateProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [search, setSearch] = useState('');

  const [debouncedSearch] = useDebounce(search, 300);

  const queryString = queryStringify({
    model: 'candidate',
    search: debouncedSearch,
  });

  const { data: foundCandidates, isLoading } = useSWR<CandidateWithPayload[]>(
    `/api/search?${queryString}`,
    { keepPreviousData: true }
  );

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
              ? foundCandidates?.find((candidate) => candidate.id === selected)
                  ?.name
              : 'Search candidate by name'}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Type to search..."
            onValueChange={setSearch}
            value={search}
          />
          <CommandEmpty>No candidate found.</CommandEmpty>
          <CommandGroup>
            {isLoading && <CommandLoading>Fetching…</CommandLoading>}
            {foundCandidates?.map((candidate) => (
              <CommandItem
                key={candidate.id}
                value={candidate.id}
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
