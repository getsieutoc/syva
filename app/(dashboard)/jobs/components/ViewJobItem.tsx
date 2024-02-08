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
import { JobWithPayload } from '@/types';

type ViewJobItemProps = {
  job: JobWithPayload;
};
export const ViewJobItem = ({ job }: ViewJobItemProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { isOpen, onClose, onOpen } = useDisclosure();

  const handleOpenChange = (isOpen: boolean) => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (isOpen) {
      onOpen();
      newSearchParams.set('id', job.id);
    } else {
      onClose();
      newSearchParams.delete('id');
    }
    router.push(newURLWithSearchParams('/jobs', newSearchParams));
  };

  return (
    <Dialog onOpenChange={handleOpenChange} open={isOpen}>
      <DialogTrigger>
        <p
          className="w-fit max-w-[300px] overflow-hidden truncate hover:cursor-pointer hover:underline"
          onClick={(e) => {
            e.preventDefault();
            handleOpenChange(true);
          }}
        >
          {job.name}
        </p>
      </DialogTrigger>
      <DialogContent className="DialogContent">
        <DialogHeader>
          <DialogTitle>Job Quick Look</DialogTitle>
        </DialogHeader>

        <Card>
          <CardHeader>
            <CardTitle>{job.name}</CardTitle>
            <CardDescription>{job.description}</CardDescription>
          </CardHeader>
          <CardContent>{job.experienceRequirements}</CardContent>
          <CardFooter className="text-sm text-muted-foreground">
            Posted at {formatTime(job.createdAt)}
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
