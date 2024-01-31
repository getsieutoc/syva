import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Login | Syvä',
};

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <div className="h-full w-full pb-10 pt-5">{children}</div>;
}
