import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui';
import { ReactNode } from '@/types';
import { Sidebar } from './components';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="max-h-dvh max-w-full"
    >
      <ResizablePanel defaultSize={20} className="min-w-20 max-w-sm">
        <Sidebar />
      </ResizablePanel>

      <ResizableHandle />

      <ResizablePanel defaultSize={80}>{children}</ResizablePanel>
    </ResizablePanelGroup>
  );
}
