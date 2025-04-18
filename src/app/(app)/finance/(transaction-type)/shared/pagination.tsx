import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FinancePageSize } from "./constants";
import { getTransactionsCount } from "@/actions/finance/actions";
export async function Pagination(props: {
  currentPageData: Promise<{ page: number }>;
  countRes: Promise<
    NonNullable<Awaited<ReturnType<typeof getTransactionsCount>>>
  >;
  type: "income" | "expense";
}) {
  const { page: currentPage } = await props.currentPageData;
  const { type } = props;
  const { data } = await props.countRes;
  const count = data ?? 0;

  const totalPages = Math.ceil(count / FinancePageSize);

  const hasPrevPage = currentPage > 0;
  const hasNextPage = currentPage < totalPages - 1;

  return (
    <div className="flex flex-row items-center gap-2">
      <Button asChild disabled={!hasPrevPage} variant="ghost" size="icon">
        <Link
          href={`/finance/${type}?pageNumber=${currentPage - 1}`}
          scroll={false}
          prefetch={true}
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
          prefetch={true}
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
