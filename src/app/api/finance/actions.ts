"use server";

import { TimeRange } from "../types";
import { handle, withAuth } from "../utils";
import {
  dbCreateCategory,
  dbCreateTransaction,
  dbGetCategories,
  dbGetCategory,
  dbGetRecentSimilarTransactions,
  dbGetTransactionsByTimeRange,
  dbSetBudget,
} from "./db";
import {
  AddCategoryInput,
  AddTransactionInput,
  SetBudgetInput,
  TransactionsFilter,
} from "./types";

export const createTransaction = async (
  data: Omit<AddTransactionInput, "user_id">,
) =>
  handle(
    () =>
      withAuth((user) =>
        dbCreateTransaction({ ...data, user_id: user.user.id }),
      ),
    "createTransaction",
  );

export const createCategory = async (data: Omit<AddCategoryInput, "user_id">) =>
  handle(
    () =>
      withAuth((user) => dbCreateCategory({ ...data, user_id: user.user.id })),
    "createCategory",
  );

export const setBudget = async (data: SetBudgetInput) => {
  return handle(
    () => withAuth((user) => dbSetBudget(data, user.user.id)),
    "setBudget",
  );
};

export const getTransactionsByTimeRange = async (
  range: TimeRange,
  filter: TransactionsFilter,
) =>
  handle(
    () =>
      withAuth((user) =>
        dbGetTransactionsByTimeRange(user.user.id, range, filter),
      ),
    "getTransactionsByTimeRange",
  );

export const getCategories = async () =>
  handle(
    () => withAuth((user) => dbGetCategories(user.user.id)),
    "getCategories",
  );

export const getRecentSimilarTransactions = async (filter: {
  amount: number;
  days?: number;
}) =>
  handle(
    () =>
      withAuth((user) => {
        const { amount, days = 30 } = filter;
        return dbGetRecentSimilarTransactions({ amount, days }, user.user.id);
      }),
    "getRecentSimilarTransactions",
  );

export const getCategory = async (categoryId: string) =>
  handle(
    () => withAuth((user) => dbGetCategory(categoryId, user.user.id)),
    "getCategory",
  );
