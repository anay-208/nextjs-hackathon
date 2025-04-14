"use server";

import { NoUser, TimeRange } from "../types";
import { handle, withAuth } from "../utils";
import {
  dbCreateCategory,
  dbCreateTransaction,
  dbDeleteTransaction,
  dbGetCategories,
  dbGetCategory,
  dbGetTransactionPresets,
  dbGetTransactionsByTimeRange,
  dbSetBudget,
  dbUpdateTransaction,
} from "./db";
import {
  AddCategoryInput,
  AddTransactionInput,
  SetBudgetInput,
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

export const createCategory = async (data: Omit<AddCategoryInput, "user_id">) =>
  handle(
    () =>
      withAuth(({ user }) => dbCreateCategory({ ...data, user_id: user.id })),
    "createCategory",
  );

export const setBudget = async (data: SetBudgetInput) => {
  return handle(
    () => withAuth(({ user }) => dbSetBudget(data, user.id)),
    "setBudget",
  );
};

export const getTransactionsByTimeRange = async (
  range: TimeRange,
  filter?: TransactionsFilter,
  sort?: TransactionsSorting,
) =>
  handle(
    () =>
      withAuth(({ user }) =>
        dbGetTransactionsByTimeRange(user.id, range, filter, sort),
      ),
    "getTransactionsByTimeRange",
  );

export const getCategories = async () =>
  handle(
    () => withAuth(({ user }) => dbGetCategories(user.id)),
    "getCategories",
  );

export const getCategory = async (categoryId: string) =>
  handle(
    () => withAuth(({ user }) => dbGetCategory(categoryId, user.id)),
    "getCategory",
  );

export const getTransactionPresets = async (sort?: TransactionsSorting) =>
  handle(
    () => withAuth(({ user }) => dbGetTransactionPresets(user.id, sort)),
    "getTransactionPresets",
  );
