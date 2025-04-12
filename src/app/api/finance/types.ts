import { categories, transactions } from "@/db/schema";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { NoIdAndTimestamp } from "../types";

export type AddTransactionInput = NoIdAndTimestamp<
  InferInsertModel<typeof transactions>
>;
export type AddCategoryInput = NoIdAndTimestamp<
  InferInsertModel<typeof categories>
>;

export type Transaction = InferSelectModel<typeof transactions>;
export type Category = InferSelectModel<typeof categories>;

export type SimilarTransactionsFilter = {
  amount: number;
  days: number;
};

export type TransactionsFilter = {
  type?: "income" | "expense";
  limit?: number;
};

export type TransactionsSorting = {
  created_at?: "asc" | "desc";
};

export type SetBudgetInput = {
  categoryId: string;
  budget: number;
};
