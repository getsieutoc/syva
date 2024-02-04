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
import { Job } from '@/types';

type ViewJobItemProps = {
  job: Job;
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
      <DialogTrigger asChild>
        <DropdownMenuItem
          className="DropdownMenuItem"
          onSelect={(e) => {
            e.preventDefault();
            onOpen();
          }}
        >
          <Eye className="h-4 w-4" /> View Job
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="DialogContent">
        <DialogHeader>
          <DialogTitle>Job Details</DialogTitle>
        </DialogHeader>

        <Card>
          <CardHeader>
            <CardTitle>{job.name}</CardTitle>
            <CardDescription>{job.email}</CardDescription>
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
