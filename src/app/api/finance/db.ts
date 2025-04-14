import { db } from "@/db";
import { categoriesTable, transactionsTable } from "@/db/schema";
import { generateId } from "@/lib/utils";
import { and, eq, gte, lte } from "drizzle-orm";
import { NoUser, TimeRange } from "../types";
import {
  AddCategoryInput,
  AddTransactionInput,
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

export const dbUpdateTransaction = async (
  user_id: string,
  transactionId: string,
  data: Partial<NoUser<AddTransactionInput>>,
) => {
  await db
    .update(transactionsTable)
    .set({ ...data, updated_at: new Date() })
    .where(
      and(
        eq(transactionsTable.id, transactionId),
        eq(transactionsTable.user_id, user_id),
      ),
    );
  return data;
};

export const dbDeleteTransaction = async (
  user_id: string,
  transactionId: string,
) => {
  await db
    .delete(transactionsTable)
    .where(
      and(
        eq(transactionsTable.id, transactionId),
        eq(transactionsTable.user_id, user_id),
      ),
    );
  return true;
};

export const dbListTransactions = async ({
  user_id,
  page,
  pageSize,
  range,
  filter,
  sort,
}: {
  user_id: string;
  page: number;
  pageSize: number;
  range?: TimeRange;
  filter?: TransactionsFilter;
  sort?: TransactionsSorting;
}) => {
  return db.query.transactionsTable.findMany({
    columns: {
      updated_at: false,
      user_id: false,
    },
    where: and(
      eq(transactionsTable.user_id, user_id),
      range
        ? and(
            gte(transactionsTable.created_at, new Date(range.startDate)),
            lte(transactionsTable.created_at, new Date(range.endDate)),
          )
        : undefined,
      filter?.type ? eq(transactionsTable.type, filter.type) : undefined,
    ),

    orderBy: (table, { asc, desc }) =>
      [
        sort?.amount
          ? sort.amount === "asc"
            ? asc(table.amount)
            : desc(table.amount)
          : undefined,
        sort?.created_at
          ? sort.created_at === "asc"
            ? asc(table.created_at)
            : desc(table.created_at)
          : undefined,
      ].filter((elmt) => typeof elmt !== "undefined"),

    limit: pageSize,
    offset: page * pageSize,
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

export const dbGetTransactionPresets = async (
  userId: string,
  sort?: TransactionsSorting,
) => {
  return db.query.transactionsTable.findMany({
    columns: {
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

export const dbCreateCategory = async (data: AddCategoryInput) => {
  const result = await db
    .insert(categoriesTable)
    .values({ ...data, id: generateId("cat") })
    .returning({ id: categoriesTable.id });
  return result[0];
};

export const dbGetCategories = async (user_id: string) => {
  return db.query.categoriesTable.findMany({
    limit: 25,
    columns: {
      user_id: false,
    },
    where: eq(categoriesTable.user_id, user_id),
  });
};

export const dbUpdateCategory = async (
  user_id: string,
  categoryId: string,
  data: Partial<NoUser<AddCategoryInput>>,
) => {
  await db
    .update(categoriesTable)
    .set({ ...data, updated_at: new Date() })
    .where(
      and(
        eq(categoriesTable.id, categoryId),
        eq(categoriesTable.user_id, user_id),
      ),
    );
  return data;
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

export const dbDeleteCategory = async (user_id: string, categoryId: string) => {
  await db
    .delete(categoriesTable)
    .where(
      and(
        eq(categoriesTable.id, categoryId),
        eq(categoriesTable.user_id, user_id),
      ),
    );
  return true;
};
