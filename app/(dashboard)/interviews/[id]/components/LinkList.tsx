import { DataTable, HeaderWithSort } from '@/components/client';
import { Checkbox } from '@/components/ui';
import { ColumnDef, Link } from '@/types';
import { ActionMenu } from './ActionMenu';

export const columns: ColumnDef<Link>[] = [
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
    id: 'url',
    accessorFn: ({ url }) => `${url}`,
    header: ({ column }) => (
      <HeaderWithSort
        title="URL"
        isSorted={column.getIsSorted()}
        onToggleSort={(isAsc) => column.toggleSorting(isAsc)}
      />
    ),
    cell: ({ row }) => <div>{row.original.url}</div>,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <HeaderWithSort
        title="Stage"
        isSorted={column.getIsSorted()}
        onToggleSort={(isAsc) => column.toggleSorting(isAsc)}
      />
    ),
    cell: ({ row }) => (
      <div className="text-xs font-bold">{row.getValue('status')}</div>
    ),
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => <ActionMenu data={row.original} />,
  },
];

export type LinkListProps = {
  links: Link[];
};

export const LinkList = ({ links }: LinkListProps) => {
  return (
    <div className="w-full min-w-max max-w-full">
      <DataTable data={links} columns={columns} filterKey="url" />
    </div>
  );
};
