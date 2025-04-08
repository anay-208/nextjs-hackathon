import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  return (
    <div className="flex flex-row items-center justify-center gap-4">
      <Link
        href={
          currentPage - 1 === 0
            ? ""
            : `/dashboard/journal?pageNumber=${currentPage - 1}`
        }
        scroll={false}
        aria-label="Previous page"
        className={cn("border-muted-foreground border-2 p-1", {
          "cursor-not-allowed opacity-50": currentPage === 1,
        })}
      >
        <ChevronLeft
          className="text-accent-foreground size-5"
          strokeWidth={2}
        />
      </Link>
      <p>{currentPage}</p>
      <Link
        href={`/dashboard/journal?pageNumber=${currentPage + 1}`}
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
