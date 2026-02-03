import type { FetchBaseQueryError } from "@reduxjs/toolkit/query"

export const errorMessage = (error: unknown): string => {
  const e = error as FetchBaseQueryError;
  if (typeof e?.status === 'number') {
    if (e.status === 404) return 'Resource not found.';
    if (e.status >= 500) return 'Server error. Please try again.';
    return 'Request failed.';
  };
  if (e?.status === 'FETCH_ERROR') return 'Network error. Is the API running?';
  return 'Request failed.';
}