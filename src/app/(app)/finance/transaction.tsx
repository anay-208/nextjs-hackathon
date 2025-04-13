import { Suspense } from "react";
import { getTimeRange } from "./time";
import { getTransactionsByTimeRange } from "@/app/api/finance/actions";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TransactionList() {
  return (
    <div className="flex h-fit w-full flex-col items-start justify-start gap-10">
      <Suspense fallback={<div>Loading...</div>}>
        <IncomeList />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <ExpenseList />
      </Suspense>
    </div>
  );
}

async function IncomeList() {
  const timeRange = getTimeRange("today");
  const rawIncomes = await getTransactionsByTimeRange(timeRange, {
    limit: 4,
    type: "income",
  });
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
async function ExpenseList() {
  const timeRange = getTimeRange("today");
  const rawExpenses = await getTransactionsByTimeRange(timeRange, {
    limit: 4,
    type: "expense",
  });
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

function ListItem({
  transaction,
}: {
  transaction: NonNullable<
    Awaited<ReturnType<typeof getTransactionsByTimeRange>>["data"]
  >[number];
}) {
  return (
    <div className="flex h-fit w-full flex-row items-center justify-start gap-2">
      <div className="flex h-full w-[30%] flex-col items-start justify-start gap-1">
        <p>Label:</p>
        {transaction.label}
      </div>
      <div className="flex h-full w-[20%] flex-col items-start justify-start gap-1">
        <p>Amount:</p>
        {transaction.amount}
      </div>
      <div className="flex h-full w-[30%] flex-col items-start justify-start gap-1">
        <p>Category:</p>
        {transaction.category?.label ?? "Uncategorized"}
      </div>
      <div className="flex h-full w-[20%] flex-col items-start justify-start gap-1">
        <p>Created At:</p>
        {transaction.created_at.toLocaleDateString()}
      </div>
    </div>
  );
}
