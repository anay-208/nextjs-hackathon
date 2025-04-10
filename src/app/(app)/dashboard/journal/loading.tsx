import { JournalCreateCard, JournalLoadingCard } from "./card.client";
import { JournalDashboardSize } from "./constants";
import { Pagination, PaginationLoading } from "./pagination";
export default function Loading() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-start gap-5 py-10">
      <h1 className="text-4xl font-bold">My Journal</h1>
      <PaginationLoading />
      <div className="grid h-full w-full flex-1 grid-cols-1 gap-5 px-4 md:grid-cols-2 lg:grid-cols-3">
        <JournalCreateCard inactive />
        {Array.from({ length: JournalDashboardSize }).map((_, i) => (
          <JournalLoadingCard key={i} />
        ))}
      </div>
    </div>
  );
}
