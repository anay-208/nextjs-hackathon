import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FinancePageSize } from "./constants";
import { getTransactionsCount } from "@/app/api/finance/actions";
import { PageType } from "./type";
export async function Pagination(props: {
  currentPageData: Promise<{ page: number; type: PageType }>;
}) {
  const { page: currentPage, type } = await props.currentPageData;
  const countRes = await getTransactionsCount({
    type: type,
  });
  const count = countRes.data ?? 0;
  const totalPages = Math.ceil(count / FinancePageSize);

  const hasPrevPage = currentPage > 0;
  const hasNextPage = currentPage < totalPages - 1;

  return (
    <div className="flex flex-row items-center gap-2">
      <Button asChild disabled={!hasPrevPage} variant="ghost" size="icon">
        <Link
          href={`/finance/${type}?pageNumber=${currentPage - 1}`}
          scroll={false}
          aria-label="Previous page"
        >
          <ChevronLeft
            className="text-accent-foreground size-5"
            strokeWidth={2}
          />
        </Link>
      </Button>

      <p className="flex w-8 items-center justify-center">{currentPage + 1}</p>

      <Button asChild disabled={!hasNextPage} variant="ghost" size="icon">
        <Link
          href={`/finance/${type}?pageNumber=${currentPage + 1}`}
          scroll={false}
          aria-label="Next page"
        >
          <ChevronRight
            className="text-accent-foreground size-5"
            strokeWidth={2}
          />
        </Link>
      </Button>
    </div>
  );
}
