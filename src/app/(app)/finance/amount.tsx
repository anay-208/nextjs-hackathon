import { getTransactionsByTimeRange } from "@/app/api/finance/actions";
import { getTimeRange, Time } from "./time";
import AmountClient from "./amount.client";

export default async function Amount({ amountTime }: { amountTime: Time }) {
  let totalExpenses = 0;
  let totalIncome = 0;

  const timeRange = getTimeRange(amountTime);
  const expenses = await getTransactionsByTimeRange(timeRange, {
    type: "expense",
  });
  const incomes = await getTransactionsByTimeRange(timeRange, {
    type: "income",
  });
  if (expenses && expenses.data) {
    totalExpenses = expenses.data.reduce((acc, cur) => acc + cur.amount, 0);
  }
  if (incomes && incomes.data) {
    totalIncome = incomes.data.reduce((acc, cur) => acc + cur.amount, 0);
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
      <AmountClient time={amountTime} />
    </div>
  );
}
