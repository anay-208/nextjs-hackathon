"use server";

import { NoUser, TimeRange } from "../types";
import { handle, withAuth } from "../utils";
import {
  dbCreateCategory,
  dbCreateTransaction,
  dbDeleteCategory,
  dbDeleteTransaction,
  dbGetCategories,
  dbGetCategory,
  dbGetTransactionPresets,
  dbGetTransactionsCount,
  dbListTransactions,
  dbUpdateCategory,
  dbUpdateCurrency,
  dbUpdateTransaction,
} from "./db";
import {
  AddCategoryInput,
  AddTransactionInput,
  TransactionsFilter,
  TransactionsSorting,
} from "./types";

export const createTransaction = async (
  data: Omit<AddTransactionInput, "user_id">,
) =>
  handle(
    () =>
      withAuth(({ user }) =>
        dbCreateTransaction({ ...data, user_id: user.id }),
      ),
    "createTransaction",
  );

export const updateTransaction = async (
  transactionId: string,
  data: Partial<NoUser<AddTransactionInput>>,
) => {
  return handle(
    () =>
      withAuth(({ user }) => dbUpdateTransaction(user.id, transactionId, data)),
    "updateTransaction",
  );
};

export const deleteTransaction = async (transactionId: string) => {
  return handle(
    () => withAuth(({ user }) => dbDeleteTransaction(user.id, transactionId)),
    "deleteTransaction",
  );
};

export const listTransactions = async (data: {
  page?: number;
  pageSize?: number;
  timeRange?: TimeRange;
  filter?: TransactionsFilter;
  sort?: TransactionsSorting;
}) =>
  handle(
    () =>
      withAuth(({ user }) =>
        dbListTransactions({
          ...data,
          user_id: user.id,
          page: data.page || 0,
          pageSize: data.pageSize || 10,
          sort: data.sort || { created_at: "desc" },
        }),
      ),
    "listTransactions",
  );

export const getTransactionPresets = async (sort?: TransactionsSorting) =>
  handle(
    () =>
      withAuth(({ user }) =>
        dbGetTransactionPresets(user.id, sort || { created_at: "desc" }),
      ),
    "getTransactionPresets",
  );

export const updateCurrency = async (currency: string) => {
  return handle(
    () => withAuth(({ user }) => dbUpdateCurrency(user.id, currency)),
    "updateCurrency",
  );
};
export const getTransactionsCount = async (filter: TransactionsFilter) => {
  return handle(
    () => withAuth(({ user }) => dbGetTransactionsCount(user.id, filter)),
    "getTransactionsCount",
  );
};

export const createCategory = async (data: Omit<AddCategoryInput, "user_id">) =>
  handle(
    () =>
      withAuth(({ user }) => dbCreateCategory({ ...data, user_id: user.id })),
    "createCategory",
  );

export const updateCategory = async (
  categoryId: string,
  data: Partial<AddCategoryInput>,
) => {
  return handle(
    () => withAuth(({ user }) => dbUpdateCategory(user.id, categoryId, data)),
    "updateCategory",
  );
};

export const getCategories = async (options?: {
  sort?: Pick<TransactionsSorting, "created_at">;
}) =>
  handle(
    () =>
      withAuth(({ user }) =>
        dbGetCategories(user.id, {
          ...options,
          sort: options?.sort || { created_at: "desc" },
        }),
      ),
    "getCategories",
  );

export const getCategory = async (categoryId: string) =>
  handle(
    () =>
      withAuth(async ({ user }) => {
        const categoryData = await dbGetCategory(user.id, categoryId);
        return {
          ...categoryData,
          id: categoryId,
        };
      }),
    "getCategory",
  );

export const deleteCategory = async (categoryId: string) => {
  return handle(
    () => withAuth(({ user }) => dbDeleteCategory(user.id, categoryId)),
    "deleteCategory",
  );
};
