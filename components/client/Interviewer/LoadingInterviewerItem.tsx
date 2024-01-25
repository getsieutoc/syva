import { Skeleton } from '@/components/ui';

export const LoadingInterviewerItem = () => {
  return (
    <div>
      <div className="grid grid-cols-2 place-content-center gap-1">
        <div className="p-4">
          <div>
            <Skeleton className="h-7 flex-initial" />
          </div>

          <div className="my-3 mt-10">
            {Array(7)
              .fill(0)
              .map((__, index) => (
                <Skeleton key={index} className="my-3 h-4 flex-initial" />
              ))}
            <Skeleton className="my-3 h-4 w-[90%] flex-initial" />
            <div className="flex">
              <Skeleton className="mt-5 h-10 w-[90%] flex-initial" />
              <div className="w-1" />
              <Skeleton className="mt-5 h-10 w-[10%] flex-none" />
            </div>
          </div>
        </div>
        <div className="p-9">
          <Skeleton className="h-[300px] flex-initial" />
        </div>
      </div>
    </div>
  );
};
