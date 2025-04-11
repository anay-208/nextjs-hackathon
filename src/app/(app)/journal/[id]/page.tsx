import { notFound } from "next/navigation";
import JournalTipTapPage from "./tiptap.client";
import "./tiptap.css";
import { Suspense } from "react";
import { Sidebar } from "./sidebar";
import { getJournal } from "@/app/api/journal/actions";

export default async function Page(props: {
  params: Promise<{ id: string }>;
}) {
  return (
    <div className="flex grow h-full flex-row items-stretch justify-between -m-(--p) bg-main-4/13 pl-2">
      <div className="hidden w-52 shrink-0 rounded-lg p-3 sm:block">
        <Sidebar/>
      </div>
      <div className="min-w-0 flex-1 bg-white px-5 rounded-lg">
        <div className="h-full max-w-xl mx-auto pt-10 pb-7 flex flex-col relative">
          <Suspense fallback={<div className="p-4">Loading...</div>}>
            <JournalTipTapPageServer id={props.params.then(p => p.id)} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

async function JournalTipTapPageServer(props: { id: Promise<string> }) {
  const id = await props.id;
  const journalRes = await getJournal(id);
  if (!journalRes) notFound();

  const journalData = journalRes.data;
  if (!journalData) notFound();

  return <JournalTipTapPage initialData={journalData} />;
}
