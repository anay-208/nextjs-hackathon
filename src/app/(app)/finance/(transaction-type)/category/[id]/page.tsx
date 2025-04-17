import {
  getCategory,
  getTransactionsCount,
  listTransactions,
} from "@/actions/finance/actions";
import { route } from "@/app/routes";
import { Suspense } from "react";
import { FinancePageSize } from "../../shared/constants";
import { TransactionPageList } from "../../shared/list";
import { SearchFinanceInput } from "../../shared/search.client";
import { CategoryHeader } from "./category";
import { CategoryPagination } from "./pagination";
import { SearchCategoryForm } from "./search";

export default function Page(props: {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    pageNumber: string;
    search?: string;
  }>;
}) {
  const getSp = props.searchParams.then((params) => params);
  const getP = props.params.then((params) => params);

  const getPageNumber = getSp.then((searchParams) => {
    const page = searchParams.pageNumber
      ? parseInt(searchParams.pageNumber)
      : 0;

    return { page };
  });

  const getTransactionPage = Promise.all([getSp, props.params]).then(
    ([searchParams, params]) => {
      const page = searchParams.pageNumber
        ? parseInt(searchParams.pageNumber)
        : 0;

      return listTransactions({
        page,
        pageSize: FinancePageSize,
        filter: {
          type: "expense",
          query: searchParams.search ?? undefined,
          category_id: params.id,
        },
      });
    },
  );

  const getCountRes = Promise.all([getP]).then(([params]) => {
    return getTransactionsCount({
      type: "expense",
      category_id: params.id,
    });
  });

  const getCategoryData = getP.then((params) => {
    return getCategory(params.id);
  });

  return (
    <SearchCategoryForm categoryData={getCategoryData}>
      <div className="flex min-h-0 min-w-0 flex-1 flex-col rounded-lg bg-white px-5">
        <div className="sticky -top-4 z-10 -mx-9 -mt-4 flex items-center bg-white px-5 pt-1">
          <Suspense fallback={<div className="p-4">Loading...</div>}>
            <CategoryHeader data={getCategoryData} />
          </Suspense>
        </div>
        <div className="relative mx-auto flex min-h-0 w-full max-w-3xl grow flex-col gap-4 pt-10 pb-7">
          <div className="flex flex-col items-center gap-2 md:flex-row md:items-start">
            <CategoryPagination
              currentPageData={getPageNumber}
              categoryData={getCategoryData}
              countRes={getCountRes}
            />
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
    </SearchCategoryForm>
  );
}
