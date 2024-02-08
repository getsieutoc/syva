'use client';

import { DataTable, HeaderWithSort } from '@/components/client';
import { CandidateWithPayload, ColumnDef } from '@/types';
import { Checkbox } from '@/components/ui';
import { formatTime } from '@/lib/utils';

import { ActionMenu } from './ActionMenu';
import { ViewCandidateItem } from './ViewCandidateItem';

export const columns: ColumnDef<CandidateWithPayload>[] = [
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
    cell: ({ row }) => <ViewCandidateItem candidate={row.original} />,
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <HeaderWithSort
        title="Email"
        isSorted={column.getIsSorted()}
        onToggleSort={(isAsc) => column.toggleSorting(isAsc)}
      />
    ),
    cell: ({ row }) => <div className="lowercase">{row.getValue('email')}</div>,
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <HeaderWithSort
        className="justify-end"
        title="Created At"
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
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => <ActionMenu candidate={row.original} />,
  },
];

export type CandidateListProps = {
  data?: CandidateWithPayload[];
};

export const CandidateTable = ({ data }: CandidateListProps) => {
  return (
    <div className="w-full min-w-max max-w-full">
      <DataTable data={data} columns={columns} filterKey="name" />
    </div>
  );
};
