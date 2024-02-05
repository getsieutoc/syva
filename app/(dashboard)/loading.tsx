import { TableLoading } from '@/components/client';
import { Skeleton } from '@/components/ui';

export default async function DashboardLoading() {
  return (
    <div className="flex w-full flex-col px-6">
      <div className="flex justify-between py-4">
        <Skeleton className="h-10 w-[160px]" />

        <Skeleton className="h-10 w-[120px]" />
      </div>

      <TableLoading />
    </div>
  );
}
