import { getTimeRange, Time } from "./time";
import { listTransactions } from "@/app/api/finance/actions";

export default async function Amount({ timeFrame }: { timeFrame: Time }) {
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
    <div className="flex h-fit w-full flex-row items-center justify-center gap-4">
      <div className="flex h-fit w-fit flex-col items-start justify-start gap-2">
        <p className="text-lg">Total Expenses</p>
        <p className="text-lg">${totalExpenses}</p>
      </div>
      <div className="flex h-fit w-fit flex-col items-start justify-start gap-2">
        <p className="text-lg">Total Income</p>
        <p className="text-lg">${totalIncome}</p>
      </div>
    </div>
  );
}
