import {
  getCategories,
  getTransactionPresets,
  listTransactions,
} from "@/app/api/finance/actions";
import GlobalDrawerClient from "./component.client";
import { getTimeRange } from "@/app/(app)/finance/time";
import {
  CategoryData,
  TransactionPresetsData,
  TransactionsData,
} from "@/app/api/finance/types";

export async function GlobalTransactionDrawer() {
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
