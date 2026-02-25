export interface User {
  id: string;
  username: string;
  password: string;
  createdAt: string;
}

export interface Transaction {
  id: string;
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
  byCategory: { category: string; _sum: { amount: number } }[];
}
