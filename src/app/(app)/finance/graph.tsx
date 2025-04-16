import { getTimeRange, Time } from "./time";
import { AmountGraph } from "./graph.client";
import { TransactionsData } from "@/actions/finance/types";
import { listTransactions } from "@/actions/finance/actions";

export async function Graph(props: { timeFrame: Promise<Time> }) {
  const timeFrame = await props.timeFrame;
  let expenses: TransactionsData = [];
  let incomes: TransactionsData = [];
  const timeRange = getTimeRange(timeFrame);
  const expensesRaw = await listTransactions({
    timeRange: timeRange,
    filter: {
      type: "expense",
    },
  });
  if (expensesRaw && expensesRaw.data) {
    expenses = expensesRaw.data;
  }
  const rawIncomes = await listTransactions({
    timeRange: timeRange,
    filter: {
      type: "income",
    },
  });
  if (rawIncomes && rawIncomes.data) {
    incomes = rawIncomes.data;
  }

  const allTransactions = [...expenses, ...incomes];
  return (
    <div className="relative flex h-fit w-full flex-row items-center justify-center gap-4">
      <AmountGraph data={allTransactions} timeRange={timeRange} />
    </div>
  );
}
