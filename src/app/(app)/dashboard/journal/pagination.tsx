import { getJournalCount } from "@/app/api/journal/actions";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { JournalDashboardSize } from "./constants";

export async function Pagination({ currentPage }: { currentPage: number }) {
  const countRes = await getJournalCount();
  let count = countRes.data ?? 0;
  const totalPages = Math.ceil(count / JournalDashboardSize);
  return (
    <div className="flex flex-row items-center justify-center gap-4">
      <Link
        href={
          currentPage - 1 < 0
            ? ""
            : `/dashboard/journal?pageNumber=${currentPage - 1}`
        }
        scroll={false}
        aria-label="Previous page"
        className={cn("border-muted-foreground border-2 p-1", {
          "cursor-not-allowed opacity-50": currentPage - 1 < 0,
        })}
      >
        <ChevronLeft
          className="text-accent-foreground size-5"
          strokeWidth={2}
        />
      </Link>
      <p>{currentPage + 1}</p>
      <Link
        href={
          currentPage === totalPages
            ? ""
            : `/dashboard/journal?pageNumber=${currentPage + 1}`
        }
        scroll={false}
        className={cn("border-muted-foreground border-2 p-1", {
          "cursor-not-allowed opacity-50": currentPage === totalPages,
        })}
        aria-label="Next page"
      >
        <ChevronRight
          className="text-accent-foreground size-5"
          strokeWidth={2}
        />
      </Link>
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
