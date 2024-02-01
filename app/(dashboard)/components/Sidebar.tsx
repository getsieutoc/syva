'use client';

import {
  useSelectedLayoutSegments,
  useParams,
  useAuth,
  useMemo,
} from '@/hooks';
import { Logo, NextLink } from '@/components/client';
import { Role } from '@/types';
import { cn } from '@/lib/utils';

export const Sidebar = () => {
  const segments = useSelectedLayoutSegments();

  const { id } = useParams<{ id: string }>();

  const { session } = useAuth();

  const tabs = useMemo(() => {
    if (segments[0] === 'projects' && id) {
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
    <div className="flex h-full flex-col justify-between gap-6 text-sm">
      <div className="flex w-full flex-col gap-6 pt-6">
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
                    ? 'border-sky-500 bg-sky-100 dark:bg-sky-900/90'
                    : 'border-inherit'
                )}
              >
                {name}
              </NextLink>
            ))}
        </div>
      </div>
    </div>
  );
};
