import { getAllData } from "./[id]/data";
import { JournalCard, JournalCreateCard } from "./card.client";
import "./[id]/tiptap.css";
import { JournalDashboardSize } from "./constants";
import { Pagination, PaginationLoading } from "./pagination";
import { getJournalCount, listJournals } from "@/app/api/journal/actions";
import { Suspense } from "react";
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    pageNumber: string;
  }>;
}) {
  let page = 0;
  const { pageNumber } = await searchParams;
  if (pageNumber) {
    page = parseInt(pageNumber);
  }
  const dataRes = await listJournals({
    page: page,
    pageSize: JournalDashboardSize,
  });
  const data = dataRes.data ?? [];
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-start gap-5 py-10">
      <h1 className="text-4xl font-bold">My Journal</h1>
      <Suspense fallback={<PaginationLoading />}>
        <Pagination currentPage={page} />
      </Suspense>
      <div className="grid h-full w-full flex-1 grid-cols-1 gap-5 px-4 md:grid-cols-2 lg:grid-cols-3">
        <JournalCreateCard />

        {data.map((d) => (
          <JournalCard key={d.id} data={d} />
        ))}
      </div>
    </div>
  );
}
