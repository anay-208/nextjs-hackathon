import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FinancePageSize } from "../../shared/constants";
import { getCategory, getTransactionsCount } from "@/actions/finance/actions";
export async function CategoryPagination(props: {
  currentPageData: Promise<{ page: number }>;
  countRes: Promise<
    NonNullable<Awaited<ReturnType<typeof getTransactionsCount>>>
  >;
  categoryData: Promise<NonNullable<Awaited<ReturnType<typeof getCategory>>>>;
}) {
  const { page: currentPage } = await props.currentPageData;
  const { data } = await props.countRes;
  const count = data ?? 0;

  const totalPages = Math.ceil(count / FinancePageSize);

  const hasPrevPage = currentPage > 0;
  const hasNextPage = currentPage < totalPages - 1;

  const { data: categoryData } = await props.categoryData;
  const id = categoryData?.id;

  return (
    <div className="flex flex-row items-center gap-2">
      <Button asChild disabled={!hasPrevPage} variant="ghost" size="icon">
        <Link
          href={`/finance/category/${id}?pageNumber=${currentPage - 1}`}
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
          href={`/finance/category/${id}?pageNumber=${currentPage + 1}`}
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
