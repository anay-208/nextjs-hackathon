import { notFound } from "next/navigation";
import JournalTipTapPage from "./tiptap.client";
import "./tiptap.css";
import { Suspense } from "react";
import { Sidebar, SidebarSkeleton } from "./sidebar";
import { getJournal } from "@/app/api/journal/actions";

export default async function Page(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const journalRes = await getJournal(id);
  if (!journalRes) notFound();

  const journalData = journalRes.data;
  if (!journalData) notFound();

  return (
    <div className="flex grow h-full flex-row items-stretch justify-between -m-(--p) bg-main-4/13">
      <div className="hidden w-52 shrink-0 rounded-lg p-3 sm:block">
        <Suspense fallback={<SidebarSkeleton />}>
          <Sidebar activeID={id} />
        </Suspense>
      </div>
      <div className="min-w-0 flex-1 bg-white px-5 rounded-lg overflow-auto">
        <Suspense fallback={<div className="p-4">Loading...</div>}>
          <JournalTipTapPage initialData={journalData} />
        </Suspense>
      </div>
    </div>
  );
}
