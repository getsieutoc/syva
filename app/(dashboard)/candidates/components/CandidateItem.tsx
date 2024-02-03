'use client';

import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui';
import { Candidate } from '@/types';

type CandidateItemProps = {
  candidate: Candidate;
};
export const CandidateItem = ({ candidate }: CandidateItemProps) => {
  const router = useRouter();

  return (
    <Card className="hover:bg-gray-100 dark:hover:bg-gray-900">
      <CardHeader>
        <CardTitle>{candidate.name}</CardTitle>
        <CardDescription>{candidate.jobDescription}</CardDescription>
      </CardHeader>
      <CardContent>{candidate.jobTitle}</CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        Apply at {candidate.dateAplly}
      </CardFooter>
    </Card>
  );
};
