'use client';

import { useRouter } from 'next/navigation';
import {
  Avatar,
  AvatarImage,
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
    <Card
      className="cursor-pointer hover:bg-gray-100"
      onClick={() => router.push(`/candidates/${candidate.id}`)}
    >
      <CardHeader>
        <CardTitle>
          <div className="flex">
            <Avatar size="md">
              <AvatarImage alt={candidate.name} src={candidate.avatar} />
            </Avatar>
            <div className="p-3">
              {candidate.name}
              <CardDescription>{candidate.age} year old</CardDescription>
              <CardDescription>{candidate.jobDescription}</CardDescription>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>{candidate.jobTitle}</CardContent>
      <CardFooter>
        <div className="text-sm text-muted-foreground">
          Apply at {candidate.dateAplly}
        </div>
      </CardFooter>
    </Card>
  );
};
