import { getAllData } from "./[id]/data";
import { JournalCard, JournalCreateCard } from "./card";
import "./[id]/tiptap.css";
import { JournalDashboardSize } from "./constants";
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    pageNumber: string;
  }>;
}) {
  let page = 1;
  const { pageNumber } = await searchParams;
  if (pageNumber) {
    page = parseInt(pageNumber);
  }
  const data = await getAllData();
  const paginated = data.slice(
    (page - 1) * JournalDashboardSize,
    page * JournalDashboardSize,
  );
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-start gap-5 py-10">
      <h1 className="text-4xl font-bold">My Journal</h1>
      <div className="grid h-full w-full flex-1 grid-cols-1 gap-5 px-4 md:grid-cols-2 lg:grid-cols-3">
        <JournalCreateCard />

        {paginated.map((journal) => (
          <JournalCard key={journal.id} data={journal} />
        ))}
      </div>
    </div>
  );
}
