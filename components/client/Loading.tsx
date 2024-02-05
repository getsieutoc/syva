import {
  Button,
  Input,
  Skeleton,
  Table,
  Tbody as TableBody,
  Td as TableCell,
  Th as TableHead,
  Thead as TableHeader,
  Tr as TableRow,
} from '@/components/ui';
import { cn } from '@/lib/utils';

import { Spinner } from './Spinner';

export const PageLoading = () => {
  return (
    <div className="flex h-dvh w-full items-center justify-center">
      <Spinner className="h-12 w-12" />
    </div>
  );
};

const getWidth = (i: number) => {
  if (i === 0) return 'w-[40px]';

  if (i % 2 === 0) return 'w-[240px]';

  return 'w-[320px]';
};

export type TableLoadingProps = {
  rows?: number;
  columns?: number;
};
export const TableLoading = ({ rows = 10, columns = 5 }: TableLoadingProps) => {
  return (
    <div className="w-full">
      <div className="flex items-center gap-4 py-4">
        <Input disabled className="max-w-sm" size="sm" />

        <Button disabled variant="outline" className="ml-auto" size="xs">
          <Skeleton className="h-4 w-[90px]" />
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {Array.from({ length: columns }).map((_, i) => (
                <TableHead key={i}>
                  <Skeleton className={cn('h-4', getWidth(i))} />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: rows }).map((_, i) => (
              <TableRow key={i}>
                {Array.from({ length: columns }).map((_, j) => (
                  <TableCell key={j}>
                    <Skeleton className={cn('h-4', getWidth(j))} />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          <Skeleton className="h-4 w-[180px]" />
        </div>
        <div className="space-x-2">
          <Button variant="outline" size="sm" disabled>
            <Skeleton className="h-4 w-[80px]" />
          </Button>
          <Button variant="outline" size="sm" disabled>
            <Skeleton className="h-4 w-[60px]" />
          </Button>
        </div>
      </div>
    </div>
  );
};
