import { categoriesTable, transactionsTable } from "@/db/schema";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import {
  APIResponse,
  ExtractData,
  ExtractDataItem,
  NoIdAndTimestamp,
} from "../types";
import {
  getCategories,
  getTransactionPresets,
  listTransactions,
} from "./actions";

export type AddTransactionInput = NoIdAndTimestamp<
  InferInsertModel<typeof transactionsTable>
>;
export type FrontendAddTransactionInput = Omit<
  AddTransactionInput,
  "user_id"
> & {
  user_id?: string;
  id?: string;
  created_at?: Date;
};

export type AddCategoryInput = NoIdAndTimestamp<
  InferInsertModel<typeof categoriesTable>
>;

export type Transaction = InferSelectModel<typeof transactionsTable>;
export type Category = InferSelectModel<typeof categoriesTable>;

export type TransactionsFilter = {
  type?: "income" | "expense";
  category_id?: string;
  query?: string;
};

export type TransactionsSorting = {
  created_at?: "asc" | "desc";
  amount?: "asc" | "desc";
};

export type TransactionsData = ExtractData<typeof listTransactions>;
export type TransactionItem = ExtractDataItem<typeof listTransactions>;
export type TransactionItemWithOptionalDate = Omit<
  TransactionItem,
  "created_at"
> & {
  created_at?: Date;
};

export type CategoryData = ExtractData<typeof getCategories>;
export type CategoryItem = ExtractDataItem<typeof getCategories>;
export type CategoryItemWithOptionalDates = Omit<
  CategoryItem,
  "created_at" | "updated_at"
> & {
  created_at?: Date;
  updated_at?: Date;
};

export type TransactionPresetsData = ExtractData<typeof getTransactionPresets>;
export type TransactionPresetItem = ExtractDataItem<
  typeof getTransactionPresets
>;
export type GetTransactionListResponse = APIResponse<
  ExtractData<typeof listTransactions>
>;
