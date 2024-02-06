'use client';

import {
  useSelectedLayoutSegments,
  useParams,
  useAuth,
  useMemo,
} from '@/hooks';
import { Logo, NextLink } from '@/components/client';
import { cn } from '@/lib/utils';
import { Role } from '@/types';

import { Profile } from './Profile';

export const Sidebar = () => {
  const segments = useSelectedLayoutSegments();

  const { id } = useParams<{ id: string }>();

  const { session } = useAuth();
  console.log('### session: ', { session });

  const tabs = useMemo(() => {
    if (segments[0] === 'candidates' && id) {
      return [
        {
          name: 'Back to All Candidates',
          href: '/candidates',
          isActive: false,
          visible: {
            [Role.ADMIN]: true,
            [Role.MEMBER]: true,
            [Role.CANDIDATE]: false,
          },
        },
        {
          name: 'General',
          href: `/candidates/${id}`,
          isActive: segments.length === 2 && !!segments[1],
          visible: {
            [Role.ADMIN]: true,
            [Role.MEMBER]: true,
            [Role.CANDIDATE]: false,
          },
        },
        {
          name: 'Analytics',
          href: `/candidates/${id}/analytics`,
          isActive: segments[2] === 'analytics',
          visible: {
            [Role.ADMIN]: true,
            [Role.MEMBER]: true,
            [Role.CANDIDATE]: false,
          },
        },
      ];
    }

    return [
      {
        name: 'Interviews',
        href: '/interviews',
        isActive: segments[0] === 'interviews',
        visible: {
          [Role.ADMIN]: true,
          [Role.MEMBER]: true,
          [Role.CANDIDATE]: false,
        },
      },
      {
        name: 'Candidates',
        href: '/candidates',
        isActive: segments[0] === 'candidates',
        visible: {
          [Role.ADMIN]: true,
          [Role.MEMBER]: true,
          [Role.CANDIDATE]: false,
        },
      },
      {
        name: 'Jobs',
        href: '/jobs',
        isActive: segments[0] === 'jobs',
        visible: {
          [Role.ADMIN]: true,
          [Role.MEMBER]: true,
          [Role.CANDIDATE]: false,
        },
      },
    ];
  }, [segments, id]);

  return (
    <div className="flex h-full min-w-[240px] flex-col justify-between border-r py-6 text-sm">
      <div className="flex h-full w-full grow flex-col gap-6">
        <Logo size="xs" className="ml-6" />

        <div className="flex flex-col gap-1">
          {session &&
            tabs.map(({ name, href, isActive }) => (
              <NextLink
                key={name}
                href={href}
                className={cn(
                  'w-full border-l-2 py-3 pl-6',
                  isActive ? 'font-bold' : 'font-normal',
                  isActive
                    ? 'border-slate-500 bg-slate-200 dark:bg-slate-800/80'
                    : 'border-inherit'
                )}
              >
                {name}
              </NextLink>
            ))}
        </div>
      </div>

      {session?.user && <Profile user={session?.user} />}
    </div>
  );
};
