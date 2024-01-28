export type {
  KeyboardEventHandler,
  ChangeEventHandler,
  ChangeEvent,
  ReactNode,
  ElementRef,
} from 'react';
export type { Message, UseChatHelpers } from 'ai/react';
export type { Metadata } from 'next';

export * from './common';

export type Candidate = {
  id: string;
  name: string;
  age: string;
  avatar: string;
  jobTitle: string;
  jobDescription: string;
  dateAplly: string;
};
