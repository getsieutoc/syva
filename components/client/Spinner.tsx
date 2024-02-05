import { Loader2, LucideIcon } from '@/components/icons';
import { ComponentProps } from '@/types';
import { cn } from '@/lib/utils';

export type SpinnerProps = ComponentProps<LucideIcon>;

export const Spinner = ({ className, ...rest }: SpinnerProps) => {
  return (
    <Loader2 className={cn('h-4 w-4 animate-spin', className)} {...rest} />
  );
};
