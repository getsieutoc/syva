import { Skeleton } from '@/components/ui';
import { ReactNode } from '@/types';
import { Suspense } from 'react';

import { Sidebar } from './components';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-dvh w-full">
      <Suspense fallback={<Skeleton className="h-10 w-full" />}>
        <Sidebar />
      </Suspense>

      <div className="flex h-full w-full overflow-auto">{children}</div>
    </div>
  );
}
