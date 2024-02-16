import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  tagTypes: ["products"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shoe-omega.vercel.app/",
  }),
  endpoints: () => ({}),
});
