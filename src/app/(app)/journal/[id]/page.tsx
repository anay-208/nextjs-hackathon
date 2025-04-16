import { notFound } from "next/navigation";
import JournalTipTapPage from "./tiptap.client";
import "./tiptap.css";
import { Suspense } from "react";
import { getJournal, updateJournal } from "@/actions/journal/actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { JournalPinnedTopBar } from "./pin.client";

import Summarise from "./summarise";

export default async function Page(props: {
  params: Promise<{ id: string }>;
}) {


  const onSummaryClick = async () => {
    const id = await props.params.then(p => p.id);
    const response = await fetch(`/api/journal/${id}/summarise`, {
      method: "GET",
    });

    if (!response.body) {
      throw new Error("No response body");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let done = false;

    while (!done) {
      const { value, done: readerDone } = await reader.read();
      done = readerDone;
      if (value) {
        const chunk = decoder.decode(value, { stream: true });
        console.log(chunk); // Process the streamed chunk (e.g., append to UI)
      }
    }
  }

  return (
    <div className="min-w-0 flex-1 bg-white px-5 rounded-lg flex flex-col min-h-0">
      <div className="flex -mx-9 -mt-4 items-center px-5 pt-1 sticky -top-4 bg-white z-10">
        <div className="flex items-center gap-1">
          <Link href={'/journal'}>
            <Button className="h-8 text-fg/90 px-2" size="sm" variant="ghost">
              Journal
            </Button>
          </Link>
          <div className="text-muted/50">/</div>
          <Suspense>
            <JournalTitle id={props.params.then(p => p.id)} />
          </Suspense>
        </div>
        <div className="grow">

        </div>
        <div className="flex items-center gap-0 h-10">
          <Summarise />
          <div className="transition-[grid-template-columns] grid grid-cols-[0fr] [&:has(.top-bar-pin-button)]:grid-cols-[1fr] overflow-hidden">
            <div className="min-w-0">
              <Suspense>
                <JournalPinned id={props.params.then(p => p.id)} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-xl mx-auto w-full pt-10 pb-7 grow flex flex-col relative min-h-0">
        <Suspense fallback={<div className="p-4">Loading...</div>}>
          <JournalTipTapPageServer id={props.params.then(p => p.id)} />
        </Suspense>
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

async function JournalTitle(props: { id: Promise<string> }) {
  const id = await props.id;
  const journalRes = await getJournal(id);
  if (!journalRes) notFound();

  const journalData = journalRes.data;
  if (!journalData) notFound();

  return <div className="px-2 text-muted">{journalData.title}</div>;
}

async function JournalPinned(props: {
  id: Promise<string>;
}) {
  const id = await props.id;
  const journalRes = await getJournal(id);
  if (!journalRes) notFound();

  const journalData = journalRes.data;
  if (!journalData) notFound();

  return (
    <JournalPinnedTopBar
      isPinned={journalData.is_pinned}
      onClick={async (is_pinned) => {
        "use server"
        await updateJournal(id, { is_pinned });
      }}
    />
  )
}



