import { listTransactions } from "@/app/api/finance/actions";
import { FinancePageSize } from "./constants";
import { Pagination } from "./pagination";
import { TransactionCard } from "./card.client";
import { isValidPageType } from "./type";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { GetTransactionListResponse } from "@/app/api/finance/types";
export default async function Page(props: {
  params: Promise<{
    type: string;
  }>;
  searchParams: Promise<{
    pageNumber: string;
  }>;
}) {
  await headers();
  const getP = props.params.then((params) => params);
  const getSp = props.searchParams.then((params) => params);

  const getPageNumber = Promise.all([getP, getSp]).then(
    ([params, searchParams]) => {
      const type = params.type;
      const page = searchParams.pageNumber
        ? parseInt(searchParams.pageNumber)
        : 0;

      if (!isValidPageType(type)) {
        notFound();
      }

      return { page, type };
    },
  );

  const getTransactionPage = Promise.all([getP, getSp]).then(
    ([params, searchParams]) => {
      const type = params.type;

      if (!isValidPageType(type)) {
        notFound();
      }

      const page = searchParams.pageNumber
        ? parseInt(searchParams.pageNumber)
        : 0;

      return listTransactions({
        page,
        pageSize: FinancePageSize,
        filter: {
          type,
        },
      });
    },
  );

  return (
    <div className="flex min-h-[100svh] w-full flex-col items-center justify-start gap-10">
      Expenses Page
      <Pagination currentPageData={getPageNumber} />
      <TransactionPageList transactionList={getTransactionPage} />
    </div>
  );
}
async function TransactionPageList(props: {
  transactionList: Promise<GetTransactionListResponse>;
}) {
  const transactionList = await props.transactionList;
  const data = transactionList.data ?? [];
  return (
    <div className="grid h-full w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {data.map((d) => (
        <TransactionCard key={d.id} data={d} />
      ))}
    </div>
  );
}
