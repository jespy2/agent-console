import { fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";

export const rawBaseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5174',
  prepareHeaders: (headers) => {
    // mock auth token
    headers.set('authorization', 'Bearer mock-token');
    return headers;
  }
});

export const baseQuery = retry(rawBaseQuery, {
  maxRetries: 2,
});