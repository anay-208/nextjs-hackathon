import {
  getCategories,
  getTransactionPresets,
  getTransactionsByTimeRange,
} from "@/app/api/finance/actions";
import GlobalDrawerClient from "./component.client";
import { getTimeRange } from "@/app/(app)/finance/time";

export async function GlobalTransactionDrawer() {
  let categories: NonNullable<
    Awaited<ReturnType<typeof getCategories>>["data"]
  > = [];
  let transactions: NonNullable<
    Awaited<ReturnType<typeof getTransactionsByTimeRange>>["data"]
  > = [];
  let presets: NonNullable<
    Awaited<ReturnType<typeof getTransactionPresets>>["data"]
  > = [];
  const rawCategories = await getCategories();
  if (rawCategories && rawCategories.data) {
    categories = rawCategories.data;
  }
  const timeRange = getTimeRange("this-week");
  const rawTransactions = await getTransactionsByTimeRange(
    timeRange,
    {
      limit: 10,
    },
    {
      created_at: "desc",
    },
  );
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
