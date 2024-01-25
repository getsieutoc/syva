import { InterviewerList, Navbar } from '@/components/client';

export default function Home() {
  return (
    <main className="px-10">
      <Navbar />
      <div className="my-10" />
      <InterviewerList />
    </main>
  );
}
