import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  tagTypes: ["Transactions", "Summary"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://finance-tracker-backend-36nj.onrender.com/api",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
    }),
    getTransactions: builder.query({
      query: ({ page = 1, startDate, endDate }) => ({
        url: "/transactions",
        params: {
          page,
          limit: 5,
          startDate,
          endDate,
        },
      }),
      providesTags: ["Transactions"],
    }),

    getSummary: builder.query({
      query: () => "/summary",
      providesTags: ["Summary"],
    }),

    createTransaction: builder.mutation({
      query: (data) => ({
        url: "/transactions",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Transactions", "Summary"],
    }),
    updateTransaction: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/transactions/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Transactions", "Summary"],
    }),
    deleteTransaction: builder.mutation({
      query: (id) => ({
        url: `/transactions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Transactions", "Summary"],
    }),
    getCurrentUser: builder.query({
      query: () => "/users/me",
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetTransactionsQuery,
  useGetSummaryQuery,
  useCreateTransactionMutation,
  useUpdateTransactionMutation,
  useDeleteTransactionMutation,
  useGetCurrentUserQuery,
} = api;
