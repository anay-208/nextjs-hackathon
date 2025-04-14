import { categoriesTable, transactionsTable } from "@/db/schema";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { NoIdAndTimestamp } from "../types";

export type AddTransactionInput = NoIdAndTimestamp<
  InferInsertModel<typeof transactionsTable>
>;
export type AddCategoryInput = NoIdAndTimestamp<
  InferInsertModel<typeof categoriesTable>
>;

export type Transaction = InferSelectModel<typeof transactionsTable>;
export type Category = InferSelectModel<typeof categoriesTable>;

export type SimilarTransactionsFilter = {
  amount: number;
  days: number;
  categoryId?: string;
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
