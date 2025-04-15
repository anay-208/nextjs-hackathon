import {
  getCategories,
  getTransactionPresets,
  listTransactions,
} from "@/actions/finance/actions";
import GlobalDrawerClient from "./component.client";
import { getTimeRange } from "@/app/(app)/finance/time";
import {
  CategoryData,
  TransactionPresetsData,
  TransactionsData,
} from "@/actions/finance/types";
import { headers } from "next/headers";
import { serverAuth } from "@/auth/actions";

export async function GlobalTransactionDrawer() {
  const session = await serverAuth.protectedPage()
  if (!session) {
    return null;
  }
  await headers();
  let categories: CategoryData = [];
  let transactions: TransactionsData = [];
  let presets: TransactionPresetsData = [];
  const rawCategories = await getCategories();
  if (rawCategories && rawCategories.data) {
    categories = rawCategories.data;
  }
  const timeRange = getTimeRange("this-week");
  const rawTransactions = await listTransactions({
    timeRange: timeRange,
    pageSize: 10,
    sort: {
      created_at: "desc",
    },
  });
  if (rawTransactions && rawTransactions.data) {
    transactions = rawTransactions.data;
  }

  const rawPresets = await getTransactionPresets();
  if (rawPresets && rawPresets.data) {
    presets = rawPresets.data;
  }

  return (
    <GlobalDrawerClient
      presets={presets}
      transactions={transactions}
      categories={categories}
    />
  );
}
