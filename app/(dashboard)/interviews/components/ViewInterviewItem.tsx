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
  DropdownMenuItem,
} from '@/components/ui';
import { Eye } from '@/components/icons';
import { useDisclosure, useRouter, useSearchParams } from '@/hooks';
import { newURLWithSearchParams, formatTime } from '@/lib/utils';
import { InterviewWithPayload } from '@/types';

type ViewInterviewItemProps = {
  interview: InterviewWithPayload;
};

export const ViewInterviewItem = ({ interview }: ViewInterviewItemProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { isOpen, onClose, onOpen } = useDisclosure();

  const handleOpenChange = (isOpen: boolean) => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (isOpen) {
      onOpen();
      newSearchParams.set('id', interview.id);
    } else {
      onClose();
      newSearchParams.delete('id');
    }
    router.push(newURLWithSearchParams('/interviews', newSearchParams));
  };

  return (
    <Dialog onOpenChange={handleOpenChange} open={isOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          className="DropdownMenuItem"
          onSelect={(e) => {
            e.preventDefault();
            onOpen();
          }}
        >
          <Eye className="h-4 w-4" /> Quick View
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="DialogContent">
        <DialogHeader>
          <DialogTitle>Quick View Interview</DialogTitle>
        </DialogHeader>

        <Card>
          <CardHeader>
            <CardTitle>{interview.candidate.name}</CardTitle>
            <CardDescription>
              {interview.job.name} / {interview.job.employment}
            </CardDescription>
          </CardHeader>
          <CardContent>{interview.job.description}</CardContent>
          <CardFooter className="text-sm text-muted-foreground">
            Posted at {formatTime(interview.createdAt)}
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
