'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui';
import { useDisclosure, useRouter, useSearchParams } from '@/hooks';
import { newURLWithSearchParams, formatTime } from '@/lib/utils';
import { CandidateWithPayload } from '@/types';

type ViewCandidateItemProps = {
  candidate: CandidateWithPayload;
};
export const ViewCandidateItem = ({ candidate }: ViewCandidateItemProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { isOpen, onClose, onOpen } = useDisclosure();

  const handleOpenChange = (isOpen: boolean) => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (isOpen) {
      onOpen();
      newSearchParams.set('id', candidate.id);
    } else {
      onClose();
      newSearchParams.delete('id');
    }
    router.push(newURLWithSearchParams('/candidates', newSearchParams));
  };

  return (
    <Dialog onOpenChange={handleOpenChange} open={isOpen}>
      <DialogTrigger asChild>
        <p
          className="w-fit max-w-[300px] overflow-hidden truncate hover:cursor-pointer hover:underline"
          onClick={(e) => {
            e.preventDefault();
            handleOpenChange(true);
          }}
        >
          {candidate.name}
        </p>
      </DialogTrigger>
      <DialogContent className="DialogContent">
        <DialogHeader>
          <DialogTitle>Candidate Quick Look</DialogTitle>
        </DialogHeader>

        <Card>
          <CardHeader>
            <CardTitle>{candidate.name}</CardTitle>
            <CardDescription>{candidate.email}</CardDescription>
          </CardHeader>
          <CardContent>lorem ipsum</CardContent>
          <CardFooter className="text-sm text-muted-foreground">
            Joined at {formatTime(candidate.createdAt)}
          </CardFooter>
        </Card>

        <DialogFooter className="mt-6 w-full justify-between">
          <Button
            onClick={() => handleOpenChange(false)}
            className="max-w-fit"
            variant="ghost"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
