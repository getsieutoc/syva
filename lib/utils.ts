import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function newURLWithSearchParams(baseUrl: string, searchParams: unknown) {
  const queryStr = new URLSearchParams(
    searchParams as unknown as any
  ).toString();

  const searchParamsStr = queryStr.length > 0 ? `?${queryStr}` : '';

  return `${baseUrl}${searchParamsStr}`;
}
