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
import { useDebouncedCallback, useDisclosure, useState, useSWR } from '@/hooks';
import { cn, queryStringify } from '@/lib/utils';
import { Spinner } from '@/components/client';

export type SelectCandidateProps = {
  isDisabled?: boolean;
  selected?: string | null;
  onSelect: (candidateId: string) => void;
};

export const SelectCandidateFormItem = ({
  isDisabled,
  selected,
  onSelect,
}: SelectCandidateProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [search, setSearch] = useState('');

  const debounced = useDebouncedCallback((v: string) => setSearch(v), 300);

  const queryString = queryStringify({
    model: 'candidate',
    search,
  });

  const { data: foundCandidates, isLoading } = useSWR<CandidateWithPayload[]>(
    !isDisabled ? `/api/search?${queryString}` : null,
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
            disabled={isDisabled}
            variant="outline"
            role="combobox"
            className={cn(
              'w-full justify-between',
              selected && 'text-muted-foreground'
            )}
          >
            {selected && foundCandidates && foundCandidates.length > 0
              ? foundCandidates?.find((candidate) => candidate.id === selected)
                  ?.name
              : 'Search by name'}

            {isLoading || debounced.isPending() ? (
              <Spinner className="ml-2 shrink-0" />
            ) : (
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            )}
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="start">
        <Command shouldFilter={false}>
          <CommandInput
            disabled={isDisabled}
            onValueChange={(v) => debounced(v)}
            placeholder="Type to search..."
          />
          <CommandEmpty>No candidate found.</CommandEmpty>
          <CommandGroup>
            {foundCandidates?.map((candidate) => (
              <CommandItem
                key={candidate.id}
                value={candidate.id}
                onSelect={(v) => {
                  onSelect(v);
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
