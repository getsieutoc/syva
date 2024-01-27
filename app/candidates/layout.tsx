import { Navbar } from '@/components/client';
import { ReactNode } from '@/types';

export default function SingleViewLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex h-dvh flex-col gap-6 px-6">
      <Navbar />

      <div className="h-full shrink pb-6">{children}</div>
    </div>
  );
}
