import { fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";

export const rawBaseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5174',
  prepareHeaders: (headers) => {
    // mock auth tocken
    headers.set('authorization', 'Bearer mock-tocken');
    return headers;
  }
});

export const baseQuery = retry(rawBaseQuery, {
  maxRetries: 2,
});