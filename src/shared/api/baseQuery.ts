import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseQuery = fetchBaseQuery({
  baseUrl: '/api',
  prepareHeaders: (headers) => {
    // mock auth token
    headers.set('authorization', 'Bearer mock-tocken');
    return headers;
  }
})