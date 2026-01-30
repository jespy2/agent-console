import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5174',
  prepareHeaders: (headers) => {
    // mock auth token
    headers.set('authorization', 'Bearer mock-tocken');
    return headers;
  }
})