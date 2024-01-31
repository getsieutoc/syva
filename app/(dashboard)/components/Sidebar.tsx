'use client';

import {
  useSelectedLayoutSegments,
  useParams,
  useAuth,
  useMemo,
} from '@/hooks';
import { Logo, NextLink } from '@/components/client';
import { Button } from '@/components/ui';
import { Role } from '@/types';

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
        href: '/cadidates',
        isActive: segments[0] === 'projects',
        visible: {
          [Role.ADMIN]: true,
          [Role.MEMBER]: true,
          [Role.CANDIDATE]: false,
        },
      },
      {
        name: 'Users',
        href: '/users',
        isActive: segments[0] === 'users',
        visible: {
          [Role.ADMIN]: true,
          [Role.MEMBER]: false,
          [Role.CANDIDATE]: false,
        },
      },
    ];
  }, [segments, id]);

  return (
    <div className="flex h-full flex-col justify-between gap-6 p-6">
      <div className="flex flex-col gap-6">
        <Logo size="xs" />

        {session && (
          <div className="flex gap-1">
            {tabs
              .filter(({ visible }) => visible[session.user.role as Role])
              .map(({ name, href, isActive }) => (
                <Button
                  asChild
                  key={name}
                  variant={isActive ? 'outline' : 'ghost'}
                  className="w-full"
                >
                  <NextLink href={href}>{name}</NextLink>
                </Button>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};
