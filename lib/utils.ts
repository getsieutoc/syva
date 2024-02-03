import {
  format,
  formatISO,
  formatRelative as formatRelativeFn,
} from 'date-fns';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function newURLWithSearchParams(baseUrl: string, searchParams: unknown) {
  const queryStr = new URLSearchParams(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    searchParams as unknown as any
  ).toString();

  const searchParamsStr = queryStr.length > 0 ? `?${queryStr}` : '';

  return `${baseUrl}${searchParamsStr}`;
}

export { format, formatISO };

export function isTimezoneAwareTimestamp(timestamp: string) {
  return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3,6}(Z$|[+-]\d{2}:\d{2}$)/.test(
    timestamp
  );
}

export function formatTime(
  timestamp?: string | number | Date | null,
  formatType = 'dd.MM.yyyy HH:mm'
) {
  if (!timestamp) {
    return '';
  }

  if (timestamp instanceof Date) {
    return format(timestamp, formatType);
  }

  return format(new Date(timestamp), formatType);
}

export function formatRelative(timestamp?: string | number | Date | null) {
  if (!timestamp) {
    return '';
  }

  if (timestamp instanceof Date) {
    return formatRelativeFn(timestamp, new Date());
  }

  return formatRelativeFn(new Date(timestamp), new Date());
}
