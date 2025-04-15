import { Suspense } from "react";
import { getTimeRange, Time } from "./time";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ListItem } from "./transcation.client";
import { listTransactions } from "@/actions/finance/actions";
import { route } from "@/app/routes";

export async function TransactionList(props: { timeFrame: Promise<Time> }) {
  const timeFrame = await props.timeFrame;
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
  const rawIncomes = await listTransactions({
    timeRange: timeRange,
    filter: {
      type: "income",
    },
    sort: {
      created_at: "desc",
    },
    pageSize: 4,
  });
  const incomes = rawIncomes.data ?? [];

  return (
    <div className="flex h-fit w-full flex-col items-start justify-start gap-2 p-2">
      <p className="text-lg font-bold">Income</p>
      {incomes.length === 0 && <p>No incomes found</p>}
      {incomes.length > 0 && (
        <div className="flex h-fit w-full flex-col items-start justify-start gap-2">
          <div className="text-main-2 flex w-full flex-row flex-nowrap py-2 text-left text-sm md:grid md:grid-cols-6">
            <div className="col-span-2 w-[50%] md:w-auto">Label</div>
            <div className="w-[30%] md:w-auto">Amount</div>
            <div className="hidden md:block">Category</div>
            <div className="hidden md:block">Created At</div>
            <div className="text-right"></div>
          </div>
          {incomes.map((i) => (
            <ListItem key={i.id} transaction={i} />
          ))}
        </div>
      )}
      <Button asChild>
        <Link href={route.financeIncome}> View More </Link>
      </Button>
    </div>
  );
}
async function ExpenseList({ timeFrame }: { timeFrame: Time }) {
  const timeRange = getTimeRange(timeFrame);
  const rawExpenses = await listTransactions({
    timeRange: timeRange,
    filter: {
      type: "expense",
    },
    sort: {
      created_at: "desc",
    },
    pageSize: 4,
  });
  const expenses = rawExpenses.data ?? [];

  return (
    <div className="flex h-fit w-full flex-col items-start justify-start gap-2 p-2">
      <p className="text-lg font-bold">Expense</p>
      {expenses.length === 0 && <p>No expenses found</p>}
      {expenses.length > 0 && (
        <div className="flex h-fit w-full flex-col items-start justify-start gap-2">
          <div className="text-main-2 flex w-full flex-row flex-nowrap py-2 text-left text-sm md:grid md:grid-cols-6">
            <div className="col-span-2 w-[50%] md:w-auto">Label</div>
            <div className="w-[30%] md:w-auto">Amount</div>
            <div className="hidden md:block">Category</div>
            <div className="hidden md:block">Created At</div>
            <div className="text-right"></div>
          </div>
          {expenses.map((i) => (
            <ListItem key={i.id} transaction={i} />
          ))}
        </div>
      )}
      <Button asChild>
        <Link href={route.financeExpense}> View More </Link>
      </Button>
    </div>
  );
}
