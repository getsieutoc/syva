import { newURLWithSearchParams } from '@/lib/utils';
import { redirect } from 'next/navigation';
import { Separator } from '@/components/ui';
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
    redirect(newURLWithSearchParams('/interviews', searchParams));
  }

  return (
    <div className="mx-auto flex h-[60%] max-w-sm flex-col items-center justify-evenly">
      <div className="flex w-full flex-col items-center gap-2">
        <Logo size="xl" />

        <h1 className="text-3xl font-bold">Login</h1>

        <Separator />
      </div>

      {hasGithubProvider && <LoginByGitHub org={process.env.GITHUB_ORG} />}

      <div className="flex w-full flex-col items-center gap-2">
        <Separator />
        <p className="text-center text-xs">
          By continue using service, you agree to our Terms
        </p>
      </div>
    </div>
  );
}
