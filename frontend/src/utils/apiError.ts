import { isAxiosError } from 'axios';

export function getErrorCode(err: unknown): string | undefined {
  if (isAxiosError(err)) {
    return (err.response?.data as { code?: string } | undefined)?.code;
  }
  return undefined;
}
