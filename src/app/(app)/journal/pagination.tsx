import { getJournalCount } from "@/app/api/journal/actions";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Total from "./total.client";
import { JournalDashboardSize } from "./constants";
import { Button } from "@/components/ui/button";

export async function Pagination(props: { currentPage: Promise<number> }) {

  const currentPage = await props.currentPage;
  const countRes = await getJournalCount();
  let count = countRes.data ?? 0;
  const totalPages = Math.ceil(count / JournalDashboardSize);

  const hasPrevPage = currentPage > 0;
  const hasNextPage = currentPage < totalPages - 1;

  return (
    <div className="flex flex-row items-center gap-2">
      <Total totalRecords={count} />
      
      <Button asChild disabled={!hasPrevPage} variant="ghost" size="icon">
        <Link
          href={`/journal?pageNumber=${ currentPage - 1 }`}
          scroll={false}
          aria-label="Previous page"
        >
          <ChevronLeft
            className="text-accent-foreground size-5"
            strokeWidth={2}
          />
        </Link>
      </Button>

      <p className="w-8 flex items-center justify-center">{currentPage + 1}</p>

      <Button asChild disabled={!hasNextPage} variant="ghost" size="icon">
        <Link
          href={`/journal?pageNumber=${ currentPage + 1 }`}
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







// export function PaginationLoading() {
//   return (
//     <div className="flex flex-row items-center justify-center gap-4">
//       <div className="border-muted-foreground cursor-not-allowed border-2 p-1 opacity-50">
//         <ChevronLeft
//           className="text-accent-foreground size-5"
//           strokeWidth={2}
//         />
//       </div>
//       <p>{1}</p>
//       <div className="border-muted-foreground cursor-not-allowed border-2 p-1 opacity-50">
//         <ChevronRight
//           className="text-accent-foreground size-5"
//           strokeWidth={2}
//         />
//       </div>
//     </div>
//   );
// }
