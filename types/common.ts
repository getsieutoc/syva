import { Prisma, User } from '@prisma/client';

export type UnknownData = Record<string, unknown>;

export enum HttpMethod {
  CONNECT = 'CONNECT',
  DELETE = 'DELETE',
  GET = 'GET',
  HEAD = 'HEAD',
  OPTIONS = 'OPTIONS',
  PATCH = 'PATCH',
  POST = 'POST',
  PUT = 'PUT',
  TRACE = 'TRACE',
}

export type GitHubOrganization = {
  login: string;
  id: number;
};

export type Candidate = User;

export type InterviewWithPayload = Prisma.InterviewGetPayload<{
  include: {
    candidate: true;
    job: true;
    links: true;
  };
}>;

export type CandidateWithPayload = Prisma.UserGetPayload<{
  include: {
    appliedInterviews: true;
    boardInterviews: true;
  };
}>;

export type JobWithPayload = Prisma.JobGetPayload<{
  include: {
    interviews: true;
  };
}>;
