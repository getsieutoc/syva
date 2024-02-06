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
import { useDebouncedCallback, useDisclosure, useState, useSWR } from '@/hooks';
import { Check, ChevronsUpDown } from '@/components/icons';
import { cn, queryStringify } from '@/lib/utils';
import { Spinner } from '@/components/client';
import { JobWithPayload } from '@/types';

export type SelectJobProps = {
  selected?: string | null;
  onSelect: (jobId: string) => void;
};

export const SelectJobFormItem = ({ selected, onSelect }: SelectJobProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [search, setSearch] = useState('');

  const debounced = useDebouncedCallback((v: string) => setSearch(v), 300);

  const queryString = queryStringify({
    model: 'job',
    search,
  });

  console.log('### queryString: ', { queryString });

  const { data: foundJobs, isLoading } = useSWR<JobWithPayload[]>(
    `/api/search?${queryString}`,
    { keepPreviousData: true }
  );

  console.log('### foundJobs: ', { foundJobs });

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
              'w-full justify-between',
              selected && 'text-muted-foreground'
            )}
          >
            {selected && foundJobs && foundJobs.length > 0
              ? foundJobs.find((job) => job.id === selected)?.name
              : 'Search by name, description and address'}

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
            onValueChange={(v) => debounced(v)}
            placeholder="Type to search..."
          />
          <CommandEmpty>No job found.</CommandEmpty>
          <CommandGroup>
            {foundJobs?.map((job) => (
              <CommandItem
                key={job.id}
                value={job.id}
                onSelect={() => {
                  onSelect(job.id);
                  handleOpenChange(false);
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    job.id === selected ? 'opacity-100' : 'opacity-0'
                  )}
                />
                {job.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
