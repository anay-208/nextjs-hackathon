import { getJournalCount } from "@/actions/journal/actions";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { JournalDashboardSize } from "./constants";
import { Button } from "@/components/ui/button";

export async function Pagination(props: { currentPage: number }) {
  const currentPage = props.currentPage;
  const countRes = await getJournalCount();
  const count = countRes.data ?? 0;
  const totalPages = Math.ceil(count / JournalDashboardSize);

  const hasPrevPage = currentPage > 0;
  const hasNextPage = currentPage < totalPages - 1;

  return (
    <div className="flex flex-row items-center gap-2">
      <Button asChild disabled={!hasPrevPage} variant="ghost" size="icon">
        <Link
          href={`/journal?pageNumber=${currentPage - 1}`}
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
          href={`/journal?pageNumber=${currentPage + 1}`}
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

