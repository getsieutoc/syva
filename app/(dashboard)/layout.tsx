import { ReactNode } from '@/types';
import { Sidebar } from './components';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-dvh w-full">
      <Sidebar />

      <div className="flex overflow-auto">{children}</div>
    </div>
  );
}
