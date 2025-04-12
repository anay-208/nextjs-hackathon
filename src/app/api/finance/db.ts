import { db } from "@/db";
import { categories, transactions } from "@/db/schema";
import { generateId } from "@/lib/utils";
import { and, eq, gte, lte } from "drizzle-orm";
import { TimeRange } from "../types";
import {
  AddCategoryInput,
  AddTransactionInput,
  SetBudgetInput,
  SimilarTransactionsFilter,
  TransactionsFilter,
  TransactionsSorting,
} from "./types";

export const dbCreateTransaction = async (data: AddTransactionInput) => {
  const result = await db
    .insert(transactions)
    .values({ ...data, id: generateId("txn") })
    .returning({ id: transactions.id });
  return result[0];
};

export const dbGetTransactionsByTimeRange = async (
  user_id: string,
  range: TimeRange,
  filter?: TransactionsFilter,
  sort?: TransactionsSorting,
) => {
  return db.query.transactions.findMany({
    columns: {
      category_id: false,
      updated_at: false,
      user_id: false,
    },
    where: and(
      eq(transactions.user_id, user_id),
      gte(transactions.created_at, new Date(range.startDate)),
      lte(transactions.created_at, new Date(range.endDate)),
      filter?.type ? eq(transactions.type, filter.type) : undefined,
    ),

    orderBy: (table, { asc, desc }) =>
      [
        sort?.created_at
          ? sort.created_at === "asc"
            ? asc(table.created_at)
            : desc(table.created_at)
          : undefined,
      ].filter((elmt) => typeof elmt !== "undefined"),

    limit: filter?.limit,
    with: {
      category: {
        columns: {
          label: true,
          budget: true,
        },
      },
    },
  });
};

export const dbCreateCategory = async (data: AddCategoryInput) => {
  const result = await db
    .insert(categories)
    .values({ ...data, id: generateId("cat") })
    .returning({ id: categories.id });
  return result[0];
};

export const dbGetCategories = async (user_id: string) => {
  return db.query.categories.findMany({
    columns: {
      user_id: false,
    },
    where: eq(categories.user_id, user_id),
  });
};

export const dbGetRecentSimilarTransactions = async (
  filter: SimilarTransactionsFilter,
  user_id: string,
) => {
  const { amount, days } = filter;
  const threshold = 0.1 * amount; // 10% threshold for similarity
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  return db.query.transactions.findMany({
    columns: {
      category_id: false,
      notes: false,
      user_id: false,
    },
    where: and(
      eq(transactions.user_id, user_id),
      gte(transactions.created_at, startDate),
      lte(transactions.amount, amount + threshold),
      gte(transactions.amount, amount - threshold),
    ),
    with: {
      category: {
        columns: {
          label: true,
          budget: true,
        },
      },
    },
  });
};

export const dbSetBudget = async (input: SetBudgetInput, userId: string) => {
  const { categoryId, budget } = input;
  const result = await db
    .update(categories)
    .set({ budget, updated_at: new Date() })
    .where(and(eq(categories.id, categoryId), eq(categories.user_id, userId)))
    .returning({ id: categories.id, budget: categories.budget });
  return result[0];
};

export const dbGetCategory = async (categoryId: string, userId: string) => {
  return db.query.categories.findFirst({
    columns: {
      id: false,
      user_id: false,
    },
    where: and(eq(categories.id, categoryId), eq(categories.user_id, userId)),
  });
};
