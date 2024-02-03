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
    return <ArrowDownUp className="h-4 w-4" />;
  }

  return isSorted === 'asc' ? (
    <ArrowUpWideNarrow className="h-4 w-4" />
  ) : (
    <ArrowDownNarrowWide className="h-4 w-4" />
  );
};
