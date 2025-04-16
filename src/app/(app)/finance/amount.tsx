import { getTimeRange, Time } from "./time";
import { listTransactions } from "@/actions/finance/actions";

export async function Amount(props: { timeFrame: Promise<Time> }) {
  const timeFrame = await props.timeFrame;
  let totalExpenses = 0;
  let totalIncome = 0;

  const timeRange = getTimeRange(timeFrame);
  const expenses = await listTransactions({
    timeRange: timeRange,
    filter: { type: "expense" },
  });
  const incomes = await listTransactions({
    timeRange: timeRange,
    filter: { type: "income" },
  });
  if (expenses && expenses.data) {
    totalExpenses = Math.ceil(
      expenses.data.reduce((acc, cur) => acc + cur.amount, 0),
    );
  }
  if (incomes && incomes.data) {
    totalIncome = Math.ceil(
      incomes.data.reduce((acc, cur) => acc + cur.amount, 0),
    );
  }

  return (
    <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className="border-border rounded-lg border bg-white p-4 shadow-sm">
        <div className="text-main-2 mb-1 text-sm">Total Expenses</div>
        <div className="text-main-0 text-xl font-medium">
          ${totalExpenses.toFixed(2)}
        </div>
      </div>
      <div className="border-border rounded-lg border bg-white p-4 shadow-sm">
        <div className="text-main-2 mb-1 text-sm">Total Income</div>
        <div className="text-main-0 text-xl font-medium">
          ${totalIncome.toFixed(2)}
        </div>
      </div>
    </div>
  );
}
