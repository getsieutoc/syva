import {
  ArrowDownUp,
  ArrowDownNarrowWide,
  ArrowUpWideNarrow,
} from '@/components/icons';
import { SortDirection } from '@/types';

export type SortIconProps = {
  isSorted: boolean | SortDirection;
};

export const SortIcon = ({ isSorted }: SortIconProps) => {
  if (typeof isSorted === 'boolean') {
    return <ArrowDownUp className="ml-2 h-4 w-4" />;
  }

  return isSorted === 'asc' ? (
    <ArrowUpWideNarrow className="ml-2 h-4 w-4" />
  ) : (
    <ArrowDownNarrowWide className="ml-2 h-4 w-4" />
  );
};
