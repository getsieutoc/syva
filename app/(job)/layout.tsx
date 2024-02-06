import type { Metadata } from 'next';
import type { ReactNode } from 'react';

// TODO: Make dynamic title by fetching the job data
export const metadata: Metadata = {
  title: 'Job View | Syvä',
};

export default function JobViewLayout({ children }: { children: ReactNode }) {
  return <div className="h-dvh w-full pb-10 pt-5">{children}</div>;
}
