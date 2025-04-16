import { JournalCard, JournalCreateCard } from "./card.client";
import "./[id]/tiptap.css";
import { JournalDashboardSize } from "./constants";
import { Pagination } from "./pagination";
import { listJournals } from "@/actions/journal/actions";
import { Suspense } from "react";
import { AppContent, PageLocation, PageTitle } from "../content-layouts";
import { SearchJournalForm, SearchJournalInput } from "./search.client";


export default function Page(props: {
  searchParams: Promise<{
    pageNumber: string;
    search: string;
  }>; }) {
  return (
    <AppContent>
      <PageLocation>Journal</PageLocation>
      <PageTitle>My Journal</PageTitle>
      <Suspense>
        <JournalPageList searchParams={props.searchParams} />
      </Suspense>
    </AppContent>
  );
}

async function JournalPageList(props: {
  searchParams: Promise<{
    pageNumber: string;
    search: string;
  }>;
}) {
  const { pageNumber, search } = await props.searchParams;

  const journalList = await listJournals({
    page: pageNumber ? parseInt(pageNumber) : 0,
    pageSize: JournalDashboardSize,
    filter: {
      query: search ?? undefined,
    }
  });

  if (!journalList.data) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-sm text-muted-foreground">No journals found</p>
      </div>
    );
  }

  return (
    <SearchJournalForm>
      <div className="pt-12 flex flex-col gap-4">
        <div className="flex gap-2">
          <Pagination currentPage={parseInt(pageNumber)} />
          <SearchJournalInput />
        </div>
        <div className="grid h-full w-full flex-1 grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <JournalCreateCard />
          {journalList.data.map((d) => <JournalCard key={d.id} data={d} />)}
        </div>
      </div>
    </SearchJournalForm>
  );
}
