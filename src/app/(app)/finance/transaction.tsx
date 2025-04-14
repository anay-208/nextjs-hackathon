import { Suspense } from "react";
import { getTimeRange, Time } from "./time";
import { getTransactionsByTimeRange } from "@/app/api/finance/actions";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ListItem } from "./transcation.client";

export default function TransactionList({ timeFrame }: { timeFrame: Time }) {
  return (
    <div className="flex h-fit w-full flex-col items-start justify-start gap-10">
      <Suspense fallback={<div>Loading...</div>}>
        <IncomeList timeFrame={timeFrame} />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <ExpenseList timeFrame={timeFrame} />
      </Suspense>
    </div>
  );
}

async function IncomeList({ timeFrame }: { timeFrame: Time }) {
  const timeRange = getTimeRange(timeFrame);
  const rawIncomes = await getTransactionsByTimeRange(
    timeRange,
    {
      limit: 4,
      type: "income",
    },
    {
      created_at: "desc",
    },
  );
  const incomes = rawIncomes.data ?? [];

  return (
    <div className="flex h-fit w-full flex-col items-start justify-start gap-2 bg-slate-200 p-2">
      <p className="text-lg font-bold">Income</p>
      {incomes.length === 0 && <p>No incomes found</p>}
      {incomes.length > 0 && (
        <div className="flex h-fit w-full flex-col items-start justify-start gap-2">
          {incomes.map((i) => (
            <ListItem key={i.id} transaction={i} />
          ))}
        </div>
      )}
      <Button asChild variant="outline">
        <Link href="/finance/incomes"> View More </Link>
      </Button>
    </div>
  );
}
async function ExpenseList({ timeFrame }: { timeFrame: Time }) {
  const timeRange = getTimeRange(timeFrame);
  const rawExpenses = await getTransactionsByTimeRange(
    timeRange,
    {
      limit: 4,
      type: "expense",
    },
    {
      created_at: "desc",
    },
  );
  const expenses = rawExpenses.data ?? [];

  return (
    <div className="flex h-fit w-full flex-col items-start justify-start gap-2 bg-slate-200 p-2">
      <p className="text-lg font-bold">Expense</p>
      {expenses.length === 0 && <p>No expenses found</p>}
      {expenses.length > 0 && (
        <div className="flex h-fit w-full flex-col items-start justify-start gap-2">
          {expenses.map((i) => (
            <ListItem key={i.id} transaction={i} />
          ))}
        </div>
      )}
      <Button asChild variant="outline">
        <Link href="/finance/expenses"> View More </Link>
      </Button>
    </div>
  );
}
