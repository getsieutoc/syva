'use client';

import { Candidate, ColumnDef } from '@/types';

import { DataTable, SortIcon } from '@/components/client';

import {
  Button,
  Checkbox,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui';
import { MoreHorizontal } from '@/components/icons';
import { formatRelative } from '@/lib/utils';

export const columns: ColumnDef<Candidate>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      const isSorted = column.getIsSorted();

      return (
        <Button
          onClick={() => column.toggleSorting(isSorted === 'asc')}
          variant="ghost"
          size="sm"
        >
          Name <SortIcon isSorted={isSorted} />
        </Button>
      );
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      const isSorted = column.getIsSorted();

      return (
        <Button
          onClick={() => column.toggleSorting(isSorted === 'asc')}
          variant="ghost"
          size="sm"
        >
          Email <SortIcon isSorted={isSorted} />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue('email')}</div>,
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      const isSorted = column.getIsSorted();

      return (
        <div className="justify-end">
          <Button
            onClick={() => column.toggleSorting(isSorted === 'asc')}
            variant="ghost"
            size="sm"
          >
            Joined At <SortIcon isSorted={isSorted} />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const formatted = formatRelative(row.getValue('createdAt'));

      return <div className="text-right">{formatted}</div>;
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export type CandidateListProps = {
  data?: Candidate[];
};

export const CandidateList = ({ data }: CandidateListProps) => {
  return (
    <div className="mx-auto w-[80%] min-w-max max-w-4xl">
      <DataTable data={data} columns={columns} filterKey="email" />
    </div>
  );
};
