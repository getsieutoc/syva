import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  AvatarProps,
} from '@/components/ui';

type LogoTypes = {
  src?: string;
  size?: AvatarProps['size'];
  alt?: string;
  className?: string;
};
export const Logo = ({
  src = '/images/logo.png',
  size = 'md',
  alt = 'logo',
  className = '',
}: LogoTypes) => {
  return (
    <Avatar size={size} className={className}>
      <AvatarImage alt={alt} src={src} />
      <AvatarFallback>Logo</AvatarFallback>
    </Avatar>
  );
};
