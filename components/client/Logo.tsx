import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  AvatarProps,
} from '@/components/ui';
import Link from 'next/link';

type LogoTypes = {
  src?: string;
  size?: AvatarProps['size'];
  alt?: string;
  className?: string;
};
export const Logo = ({
  src = '/images/logo.png',
  size = 'md',
  alt = 'syvahire logo',
  className = '',
}: LogoTypes) => {
  return (
    <Link href="/">
      <Avatar size={size} className={className}>
        <AvatarImage alt={alt} src={src} />
        <AvatarFallback>SyvaHire</AvatarFallback>
      </Avatar>
    </Link>
  );
};
