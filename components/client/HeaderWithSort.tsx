import {
  ArrowDownUp,
  ArrowDownNarrowWide,
  ArrowUpWideNarrow,
} from '@/components/icons';
import { Button } from '@/components/ui';
import { SortDirection } from '@/types';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export type SortIconProps = {
  isSorted: boolean | SortDirection;
};

export const SortIcon = ({ isSorted }: SortIconProps) => {
  if (typeof isSorted === 'boolean') {
    return <ArrowDownUp className="h-3 w-3" />;
  }

  return isSorted === 'asc' ? (
    <ArrowUpWideNarrow className="h-3 w-3" />
  ) : (
    <ArrowDownNarrowWide className="h-3 w-3" />
  );
};

export type HeaderWithSortProps = {
  title: string;
  isSorted: boolean | SortDirection;
  onToggleSort: (isAsc: boolean) => void;
  className?: string;
};

export const HeaderWithSort = forwardRef<HTMLDivElement, HeaderWithSortProps>(
  ({ title, isSorted, onToggleSort, className, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex items-center justify-start gap-1', className)}
        {...rest}
      >
        <span>{title}</span>
        <Button
          onClick={() => onToggleSort(isSorted === 'asc')}
          variant="ghost"
          size="icon"
        >
          <SortIcon isSorted={isSorted} />
        </Button>
      </div>
    );
  }
);
