import { db } from "@/db";
import { categoriesTable, transactionsTable } from "@/db/schema";
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
    .insert(transactionsTable)
    .values({ ...data, id: generateId("txn") })
    .returning({ id: transactionsTable.id });
  return result[0];
};

export const dbGetTransactionsByTimeRange = async (
  user_id: string,
  range: TimeRange,
  filter?: TransactionsFilter,
  sort?: TransactionsSorting,
) => {
  return db.query.transactionsTable.findMany({
    columns: {
      category_id: false,
      updated_at: false,
      user_id: false,
    },
    where: and(
      eq(transactionsTable.user_id, user_id),
      gte(transactionsTable.created_at, new Date(range.startDate)),
      lte(transactionsTable.created_at, new Date(range.endDate)),
      filter?.type ? eq(transactionsTable.type, filter.type) : undefined,
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
    .insert(categoriesTable)
    .values({ ...data, id: generateId("cat") })
    .returning({ id: categoriesTable.id });
  return result[0];
};

export const dbGetCategories = async (user_id: string) => {
  return db.query.categoriesTable.findMany({
    columns: {
      user_id: false,
    },
    where: eq(categoriesTable.user_id, user_id),
  });
};

export const dbGetRecentSimilarTransactions = async (
  filter: SimilarTransactionsFilter,
  user_id: string,
) => {
  const { amount, days, categoryId } = filter;
  const threshold = 0.1 * amount; // 10% threshold for similarity
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  return db.query.transactionsTable.findMany({
    columns: {
      category_id: false,
      notes: false,
      user_id: false,
    },
    where: and(
      eq(transactionsTable.user_id, user_id),
      gte(transactionsTable.created_at, startDate),
      lte(transactionsTable.amount, amount + threshold),
      gte(transactionsTable.amount, amount - threshold),
      categoryId ? eq(transactionsTable.category_id, categoryId) : undefined,
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
    .update(categoriesTable)
    .set({ budget, updated_at: new Date() })
    .where(
      and(
        eq(categoriesTable.id, categoryId),
        eq(categoriesTable.user_id, userId),
      ),
    )
    .returning({ id: categoriesTable.id, budget: categoriesTable.budget });
  return result[0];
};

export const dbGetCategory = async (categoryId: string, userId: string) => {
  return db.query.categoriesTable.findFirst({
    columns: {
      id: false,
      user_id: false,
    },
    where: and(
      eq(categoriesTable.id, categoryId),
      eq(categoriesTable.user_id, userId),
    ),
  });
};

export const dbGetTransactionPresets = async (
  userId: string,
  sort?: TransactionsSorting,
) => {
  return db.query.transactionsTable.findMany({
    columns: {
      category_id: false,
      user_id: false,
      updated_at: false,
      is_preset: false,
    },
    where: and(
      eq(transactionsTable.user_id, userId),
      eq(transactionsTable.is_preset, true),
    ),

    orderBy: (table, { asc, desc }) =>
      [
        sort?.created_at
          ? sort.created_at === "asc"
            ? asc(table.created_at)
            : desc(table.created_at)
          : undefined,
      ].filter((elmt) => typeof elmt !== "undefined"),

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
