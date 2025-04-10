import { getJournalCount } from "@/app/api/journal/actions";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { JournalDashboardSize } from "./constants";
import Total from "./total.client";

export async function Pagination({ currentPage }: { currentPage: number }) {
  const countRes = await getJournalCount();
  const count = countRes.data ?? 0;
  const totalPages = Math.ceil(count / JournalDashboardSize);

  return (
    <div className="flex flex-row items-center justify-center gap-4">
      <Total totalRecords={count} />

      {currentPage <= 0 ? (
        <div className="border-muted-foreground cursor-not-allowed border-2 p-1 opacity-50">
          <ChevronLeft
            className="text-accent-foreground size-5"
            strokeWidth={2}
          />
        </div>
      ) : (
        <Link
          href={`/dashboard/journal?pageNumber=${currentPage - 1}`}
          scroll={false}
          aria-label="Previous page"
          className="border-muted-foreground border-2 p-1"
        >
          <ChevronLeft
            className="text-accent-foreground size-5"
            strokeWidth={2}
          />
        </Link>
      )}

      <p>{currentPage + 1}</p>

      {currentPage >= totalPages - 1 ? (
        <div className="border-muted-foreground cursor-not-allowed border-2 p-1 opacity-50">
          <ChevronRight
            className="text-accent-foreground size-5"
            strokeWidth={2}
          />
        </div>
      ) : (
        <Link
          href={`/dashboard/journal?pageNumber=${currentPage + 1}`}
          scroll={false}
          aria-label="Next page"
          className="border-muted-foreground border-2 p-1"
        >
          <ChevronRight
            className="text-accent-foreground size-5"
            strokeWidth={2}
          />
        </Link>
      )}
    </div>
  );
}

export function PaginationLoading() {
  return (
    <div className="flex flex-row items-center justify-center gap-4">
      <div className="border-muted-foreground cursor-not-allowed border-2 p-1 opacity-50">
        <ChevronLeft
          className="text-accent-foreground size-5"
          strokeWidth={2}
        />
      </div>
      <p>{1}</p>
      <div className="border-muted-foreground cursor-not-allowed border-2 p-1 opacity-50">
        <ChevronRight
          className="text-accent-foreground size-5"
          strokeWidth={2}
        />
      </div>
    </div>
  );
}
