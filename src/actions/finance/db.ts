import { db } from "@/db";
import {
  categoriesTable,
  transactionsTable,
  user as userTable,
} from "@/db/schema";
import { generateId } from "@/lib/utils";
import { and, count, eq, gte, ilike, lte } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
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
  revalidateTag("transactions");
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
  revalidateTag("transactions");
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
  revalidateTag("transactions");
  return true;
};

export const dbListTransactions = async ({
  user_id,
  page,
  pageSize,
  timeRange,
  filter,
  sort,
}: {
  user_id: string;
  page: number;
  pageSize: number;
  timeRange?: TimeRange;
  filter?: TransactionsFilter;
  sort?: TransactionsSorting;
}) => {
  "use cache";
  cacheTag("transactions");
  return db.query.transactionsTable.findMany({
    columns: {
      updated_at: false,
      user_id: false,
    },
    where: and(
      eq(transactionsTable.user_id, user_id),
      timeRange
        ? and(
            gte(transactionsTable.created_at, new Date(timeRange.startDate)),
            lte(transactionsTable.created_at, new Date(timeRange.endDate)),
          )
        : undefined,
      filter?.type ? eq(transactionsTable.type, filter.type) : undefined,
      filter?.category_id
        ? eq(transactionsTable.category_id, filter.category_id)
        : undefined,
      filter?.query
        ? ilike(transactionsTable.label, `%${filter.query}%`)
        : undefined,
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
  "use cache";
  cacheTag("transactions");
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

export const dbUpdateCurrency = async (user_id: string, currency: string) => {
  await db.update(userTable).set({ currency }).where(eq(userTable.id, user_id));
  return currency;
};
export const dbGetTransactionsCount = async (
  userId: string,
  filter: TransactionsFilter,
) => {
  "use cache";
  cacheTag("transactions");
  const result = await db
    .select({ count: count() })
    .from(transactionsTable)
    .where(
      and(
        eq(transactionsTable.user_id, userId),
        filter?.type ? eq(transactionsTable.type, filter.type) : undefined,
        filter?.category_id
          ? eq(transactionsTable.category_id, filter.category_id)
          : undefined,
        filter?.query
          ? ilike(transactionsTable.label, `%${filter.query}%`)
          : undefined,
      ),
    );

  return result[0]?.count ?? 0;
};

export const dbCreateCategory = async (data: AddCategoryInput) => {
  const result = await db
    .insert(categoriesTable)
    .values({ ...data, id: generateId("cat") })
    .returning({ id: categoriesTable.id });
  revalidateTag("categories");
  return result[0];
};

export const dbGetCategories = async (
  user_id: string,
  data: {
    sort?: Pick<TransactionsSorting, "created_at">;
  },
) => {
  "use cache";
  cacheTag("categories");
  return db.query.categoriesTable.findMany({
    limit: 25,
    columns: {
      user_id: false,
    },

    orderBy: (table, { asc, desc }) =>
      [
        data.sort?.created_at
          ? data.sort.created_at === "asc"
            ? asc(table.created_at)
            : desc(table.created_at)
          : undefined,
      ].filter((elmt) => typeof elmt !== "undefined"),

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
  revalidateTag("categories");
  return data;
};

export const dbGetCategory = async (userId: string, categoryId: string) => {
  "use cache";
  cacheTag("categories");
  return db.query.categoriesTable.findFirst({
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
  revalidateTag("categories");
  return true;
};
