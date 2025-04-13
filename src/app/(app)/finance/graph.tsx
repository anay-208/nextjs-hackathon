import { getTransactionsByTimeRange } from "@/app/api/finance/actions";
import { getTimeRange, Time } from "./time";
import { AmountGraph } from "./graph.client";

export default async function Graph({ timeFrame }: { timeFrame: Time }) {
  let expenses: NonNullable<
    Awaited<ReturnType<typeof getTransactionsByTimeRange>>["data"]
  > = [];
  let incomes: NonNullable<
    Awaited<ReturnType<typeof getTransactionsByTimeRange>>["data"]
  > = [];
  const timeRange = getTimeRange(timeFrame);
  const expensesRaw = await getTransactionsByTimeRange(timeRange, {
    type: "expense",
  });
  if (expensesRaw && expensesRaw.data) {
    expenses = expensesRaw.data;
  }
  const rawIncomes = await getTransactionsByTimeRange(timeRange, {
    type: "income",
  });
  if (rawIncomes && rawIncomes.data) {
    incomes = rawIncomes.data;
  }

  const allTransactions = [...expenses, ...incomes];
  return (
    <div className="flex h-fit w-full flex-row items-center justify-center gap-4">
      <AmountGraph data={allTransactions} timeRange={timeRange} />
    </div>
  );
}
