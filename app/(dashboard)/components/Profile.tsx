import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui';
import {
  LogOut,
  Cloud,
  CreditCard,
  ChevronDown,
  Keyboard,
  LifeBuoy,
  Plus,
  Settings,
  User,
  Users,
} from '@/components/icons';
import { signOut } from 'next-auth/react';
import { Session } from 'next-auth';

export type ProfileProps = {
  user: Session['user'];
};

export const Profile = ({ user }: ProfileProps) => {
  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="mx-6">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex max-w-fit items-center gap-1 hover:cursor-pointer">
            <Avatar size="xs">
              <AvatarImage
                alt={user.name ?? 'user profile'}
                src={user.image ?? ''}
              />
              <AvatarFallback>{user.name}</AvatarFallback>
            </Avatar>
            <ChevronDown className="h-5 w-5" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="top" align="start" className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem disabled>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem disabled>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Billing</span>
            </DropdownMenuItem>
            <DropdownMenuItem disabled>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem disabled>
              <Keyboard className="mr-2 h-4 w-4" />
              <span>Keyboard shortcuts</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem disabled>
              <Users className="mr-2 h-4 w-4" />
              <span>Team</span>
            </DropdownMenuItem>
            <DropdownMenuItem disabled>
              <Plus className="mr-2 h-4 w-4" />
              <span>New Team</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem disabled>
            <LifeBuoy className="mr-2 h-4 w-4" />
            <span>Support</span>
          </DropdownMenuItem>
          <DropdownMenuItem disabled>
            <Cloud className="mr-2 h-4 w-4" />
            <span>API</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
