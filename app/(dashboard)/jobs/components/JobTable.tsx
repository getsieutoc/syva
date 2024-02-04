'use client';

import { Button, Checkbox } from '@/components/ui';
import { DataTable, SortIcon } from '@/components/client';
import { Job, ColumnDef } from '@/types';
import { formatRelative } from '@/lib/utils';
import { ActionMenu } from './ActionMenu';

export const columns: ColumnDef<Job>[] = [
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
        size="sm"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        size="sm"
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
        <div className="flex items-center justify-start gap-1">
          <span>Name</span>
          <Button
            onClick={() => column.toggleSorting(isSorted === 'asc')}
            variant="ghost"
            size="icon"
          >
            <SortIcon isSorted={isSorted} />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'description',
    header: () => <span>Description</span>,
    cell: ({ row }) => <div>{row.getValue('description')}</div>,
  },
  {
    accessorKey: 'employment',
    header: ({ column }) => {
      const isSorted = column.getIsSorted();

      return (
        <div className="flex items-center justify-start gap-1">
          <span>Employment</span>
          <Button
            onClick={() => column.toggleSorting(isSorted === 'asc')}
            variant="ghost"
            size="icon"
          >
            <SortIcon isSorted={isSorted} />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="font-bold">{row.getValue('employment')}</div>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      const isSorted = column.getIsSorted();

      return (
        <div className="flex items-center justify-end gap-1">
          <span>Created At</span>
          <Button
            onClick={() => column.toggleSorting(isSorted === 'asc')}
            variant="ghost"
            size="icon"
          >
            <SortIcon isSorted={isSorted} />
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
    cell: ({ row }) => <ActionMenu job={row.original} />,
  },
];

export type JobListProps = {
  data?: Job[];
};

export const JobTable = ({ data }: JobListProps) => {
  return (
    <div className="mx-auto w-[80%] min-w-max max-w-4xl">
      <DataTable data={data} columns={columns} filterKey="name" />
    </div>
  );
};
