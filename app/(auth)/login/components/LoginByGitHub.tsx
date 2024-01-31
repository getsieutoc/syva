'use client';

import { useState, useEffect, useSearchParams } from '@/hooks';
import { Button, toast } from '@/components/ui';
import { signIn } from 'next-auth/react';

export type LoginByGitHubProps = {
  org?: string;
};

export const LoginByGitHub = ({ org }: LoginByGitHubProps) => {
  const [isLoading, setLoading] = useState(false);

  // Get error message added by next/auth in URL.
  const searchParams = useSearchParams();
  const error = searchParams?.get('error');

  const callbackUrl = searchParams.get('callbackUrl') ?? '/projects';

  useEffect(() => {
    const errorMessage = Array.isArray(error) ? error.pop() : error;
    errorMessage && toast.error(errorMessage);
  }, [error]);

  const handleLogin = async () => {
    const params = new URLSearchParams(searchParams);

    params.delete('callbackUrl');

    params.append('signedIn', 'true');

    setLoading(true);

    await signIn('github', {
      redirect: true,
      callbackUrl: `${callbackUrl}?${params}`,
    });

    setLoading(false);
  };

  return (
    <div className="flex w-full justify-center gap-1 text-center">
      <Button isLoading={isLoading} onClick={handleLogin} size="lg">
        Login with GitHub
      </Button>

      {org && (
        <p className="text-sm">Only for members of @{org} at this time.</p>
      )}
    </div>
  );
};
