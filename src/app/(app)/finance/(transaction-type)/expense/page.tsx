import { listTransactions } from "@/actions/finance/actions";
import { FinancePageSize } from "../shared/constants";
import { Pagination } from "../shared/pagination";
import { TransactionPageList } from "../shared/list";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";
import { SearchFinanceForm, SearchFinanceInput } from "../shared/search.client";
import { route } from "@/app/routes";

export default function Page(props: {
  searchParams: Promise<{
    pageNumber: string;
    search?: string;
  }>;
}) {
  const getSp = props.searchParams.then((params) => params);

  const getPageNumber = getSp.then((searchParams) => {
    const page = searchParams.pageNumber
      ? parseInt(searchParams.pageNumber)
      : 0;

    return { page };
  });

  const getTransactionPage = getSp.then((searchParams) => {
    const page = searchParams.pageNumber
      ? parseInt(searchParams.pageNumber)
      : 0;

    return listTransactions({
      page,
      pageSize: FinancePageSize,
      filter: {
        type: "expense",
        query: searchParams.search ?? undefined,
      },
    });
  });

  return (
    <SearchFinanceForm route={route.financeExpense}>
      <div className="flex min-h-0 min-w-0 flex-1 flex-col rounded-lg bg-white px-5">
        <div className="sticky -top-4 z-10 -mx-9 -mt-4 flex items-center bg-white px-5 pt-1">
          <div className="flex items-center gap-1">
            <Link href={"/finance"}>
              <Button className="text-fg/90 h-8 px-2" size="sm" variant="ghost">
                Finance
              </Button>
            </Link>
            <div className="text-muted/50">/</div>

            <Link href={"/expense"}>
              <Button className="text-fg/90 h-8 px-2" size="sm" variant="ghost">
                Expense
              </Button>
            </Link>
          </div>
        </div>
        <div className="relative mx-auto flex min-h-0 w-full max-w-3xl grow flex-col gap-4 pt-10 pb-7">
          <div className="flex flex-col items-center gap-2 md:flex-row md:items-start">
            <Pagination currentPageData={getPageNumber} type="expense" />
            <SearchFinanceInput />
          </div>
          <Suspense fallback={<div className="p-4">Loading...</div>}>
            <TransactionPageList
              type="expense"
              transactionList={getTransactionPage}
            />
          </Suspense>
        </div>
      </div>
    </SearchFinanceForm>
  );
}
