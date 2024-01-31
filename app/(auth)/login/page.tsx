import { newURLWithSearchParams } from '@/lib/utils';
import { redirect } from 'next/navigation';
import { Logo } from '@/components/client';
import { getSession } from '@/lib/auth';

import { LoginByGitHub } from './components';

const hasGithubProvider =
  !!process.env.GITHUB_ID && !!process.env.GITHUB_SECRET;

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Record<string, unknown>;
}) {
  const { session } = await getSession();

  if (session) {
    redirect(newURLWithSearchParams('/candidates', searchParams));
  }

  return (
    <div className="mx-auto flex h-[70%] max-w-md flex-col items-center justify-evenly">
      <div className="flex w-full flex-col items-center border-b-gray-200">
        <Logo />

        <h1 className="text-lg">Login</h1>
      </div>

      {hasGithubProvider && <LoginByGitHub org={process.env.GITHUB_ORG} />}

      <div className="flex w-full flex-col items-center gap-4">
        <p className="text-center text-xs">
          By continue using service, you agree to our Terms
        </p>
      </div>
    </div>
  );
}
