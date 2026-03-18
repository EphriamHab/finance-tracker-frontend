export interface User {
  id: string;
  username: string;
  password: string;
  createdAt: string;
}

export interface TransactionResponse {
  id: string;
  amount: number;
  category: string;
  type: "income" | "expense";
  date: string;
  userId: string;
  description?: string;
  createdAt: string;
}

export interface TransactionsResponse {
  data: TransactionResponse[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
export interface TransactionRequest {
  amount: number;
  category: string;
  type: "income" | "expense";
  date: string;
  description?: string;
}


export interface SummaryResponse {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  byCategory: { category: string; type: string; _sum: { amount: number } }[];
}


export interface ByCategory {
  category: string;
  type: string;
  _sum: {
    amount: number;
  };
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
}