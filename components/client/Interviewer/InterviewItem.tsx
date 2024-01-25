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
import { InterviewerType } from '.';

type InterviewItemTypes = {
  item: InterviewerType;
};
export const InterviewItem = (props: InterviewItemTypes) => {
  const { item } = props;
  const router = useRouter();

  return (
    <Card
      onClick={() => router.push(item.id)}
      className="cursor-pointer hover:bg-gray-100"
    >
      <CardHeader>
        <CardTitle>
          <div className="flex">
            <Avatar size="md">
              <AvatarImage alt={item.name} src={item.avatar} />
            </Avatar>
            <div className="p-3">
              {item.name}
              <CardDescription>{item.age} year old</CardDescription>
              <CardDescription>{item.jobDescription}</CardDescription>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>{item.jobTitle}</CardContent>
      <CardFooter>
        <div className="text-sm text-muted-foreground">
          Apply at {item.dateAplly}
        </div>
      </CardFooter>
    </Card>
  );
};
