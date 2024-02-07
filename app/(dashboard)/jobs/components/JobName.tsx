import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

type JobNameProps = {
  value: string;
  className?: string;
};

export const JobName = forwardRef<HTMLDivElement, JobNameProps>(
  ({ value, className, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'max-w-[300px] overflow-hidden truncate capitalize',
          className
        )}
        {...rest}
      >
        {value}
      </div>
    );
  }
);
