export type {
  KeyboardEventHandler,
  ChangeEventHandler,
  ChangeEvent,
  ReactNode,
  ElementRef,
  ComponentProps,
} from 'react';
export type {
  Column,
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  SortDirection,
  CellContext,
  RowData,
} from '@tanstack/react-table';
export type { Message, UseChatHelpers } from 'ai/react';
export type { Metadata } from 'next';
export * from '@prisma/client';

export * from './common';

export type Candidate = {
  id: string;
  name: string;
  avatar: string;
  jobTitle: string;
  jobDescription: string;
  dateAplly: string;
};
