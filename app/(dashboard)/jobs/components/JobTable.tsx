'use client';

import { DataTable, HeaderWithSort, QuickLookJob } from '@/components/client';
import { Checkbox } from '@/components/ui';
import { JobWithPayload, ColumnDef } from '@/types';
import { formatTime } from '@/lib/utils';

import { ActionMenu } from './ActionMenu';

export const columns: ColumnDef<JobWithPayload>[] = [
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
    header: ({ column }) => (
      <HeaderWithSort
        title="Name"
        isSorted={column.getIsSorted()}
        onToggleSort={(isAsc) => column.toggleSorting(isAsc)}
      />
    ),
    cell: ({ row }) => <QuickLookJob job={row.original} />,
  },
  {
    accessorKey: 'description',
    header: () => <span>Description</span>,
    cell: ({ row }) => (
      <div className="max-w-[400px] overflow-hidden truncate">
        {row.getValue('description')}
      </div>
    ),
  },
  {
    accessorKey: 'employment',
    header: ({ column }) => (
      <HeaderWithSort
        title="Employment"
        isSorted={column.getIsSorted()}
        onToggleSort={(isAsc) => column.toggleSorting(isAsc)}
      />
    ),
    cell: ({ row }) => (
      <div className="text-xs font-bold">{row.getValue('employment')}</div>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <HeaderWithSort
        title="Created At"
        className="justify-end"
        isSorted={column.getIsSorted()}
        onToggleSort={(isAsc) => column.toggleSorting(isAsc)}
      />
    ),
    cell: ({ row }) => {
      const formatted = formatTime(row.getValue('createdAt'));
      return <div className="text-right">{formatted}</div>;
    },
  },
  {
    accessorKey: 'expiredAt',
    header: ({ column }) => (
      <HeaderWithSort
        title="Expired At"
        className="justify-end"
        isSorted={column.getIsSorted()}
        onToggleSort={(isAsc) => column.toggleSorting(isAsc)}
      />
    ),
    cell: ({ row }) => {
      const formatted = formatTime(row.getValue('expiredAt'));
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
  data?: JobWithPayload[];
};

export const JobTable = ({ data }: JobListProps) => {
  return (
    <div className="w-full min-w-fit max-w-full">
      <DataTable data={data} columns={columns} filterKey="name" />
    </div>
  );
};
