'use client';

import {
  DataTable,
  HeaderWithSort,
  QuickLookCandidate,
  QuickLookJob,
} from '@/components/client';
import { InterviewWithPayload, ColumnDef } from '@/types';
import { Checkbox } from '@/components/ui';
import { formatTime } from '@/lib/utils';

import { ActionMenu } from './ActionMenu';

export const columns: ColumnDef<InterviewWithPayload>[] = [
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
    id: 'candidate',
    accessorFn: ({ candidate }) => `${candidate.name}`,
    header: ({ column }) => (
      <HeaderWithSort
        title="Candidate"
        isSorted={column.getIsSorted()}
        onToggleSort={(isAsc) => column.toggleSorting(isAsc)}
      />
    ),
    cell: ({ row }) => (
      <QuickLookCandidate candidate={row.original.candidate} />
    ),
  },
  {
    id: 'job',
    accessorFn: ({ job }) => `${job.name}`,
    header: ({ column }) => (
      <HeaderWithSort
        title="Job"
        isSorted={column.getIsSorted()}
        onToggleSort={(isAsc) => column.toggleSorting(isAsc)}
      />
    ),
    cell: ({ row }) => <QuickLookJob job={row.original.job} />,
  },
  {
    accessorKey: 'stage',
    header: ({ column }) => (
      <HeaderWithSort
        title="Stage"
        isSorted={column.getIsSorted()}
        onToggleSort={(isAsc) => column.toggleSorting(isAsc)}
      />
    ),
    cell: ({ row }) => (
      <div className="text-xs font-bold">{row.getValue('stage')}</div>
    ),
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
    cell: ({ row }) => <ActionMenu data={row.original} />,
  },
];

export type InterviewListProps = {
  data?: InterviewWithPayload[];
};

export const InterviewTable = ({ data }: InterviewListProps) => {
  return (
    <div className="w-full min-w-max max-w-full">
      <DataTable data={data} columns={columns} filterKey="candidate" />
    </div>
  );
};
