import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  LoginRequest,
  RegisterRequest,
  SummaryResponse,
  TransactionRequest,
  TransactionResponse,
  TransactionsResponse,
} from "../types";

export const api = createApi({
  reducerPath: "api",
  tagTypes: ["Transactions", "Summary"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<{ token: string }, LoginRequest>({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation<
      { message: string; userId?: string },
      RegisterRequest
    >({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
    }),
    getTransactions: builder.query<
      TransactionsResponse,
      { page?: number; limit?: number; startDate?: string; endDate?: string }
    >({
      query: ({ page = 1, limit = 5, startDate, endDate }) => ({
        url: "/transactions",
        params: {
          page,
          limit,
          startDate,
          endDate,
        },
      }),
      providesTags: ["Transactions"],
    }),

    getSummary: builder.query<SummaryResponse, void>({
      query: () => "/summary",
      providesTags: ["Summary"],
    }),

    createTransaction: builder.mutation<TransactionResponse, TransactionRequest>({
      query: (data) => ({
        url: "/transactions",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Transactions", "Summary"],
    }),
    getTransaction: builder.query<TransactionResponse, string>({
      query: (id) => `/transactions/${id}`,
    }),
    updateTransaction: builder.mutation<TransactionResponse, { id: string } & TransactionRequest>({
      query: ({ id, ...data }) => ({
        url: `/transactions/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Transactions", "Summary"],
    }),
    deleteTransaction: builder.mutation<{ message: string }, string>({
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
  useGetTransactionQuery,
  useGetSummaryQuery,
  useCreateTransactionMutation,
  useUpdateTransactionMutation,
  useDeleteTransactionMutation,
  useGetCurrentUserQuery,
} = api;
