import { JournalCard, JournalCreateCard } from "./card.client";
import "./[id]/tiptap.css";
import { JournalDashboardSize } from "./constants";
import { Pagination } from "./pagination";
import { listJournals, type GetListJournalResponse } from "@/app/api/journal/actions";
import { Suspense } from "react";
import { AppContent, PageLocation, PageTitle } from "../content-layouts";

export default function Page(props: {
  searchParams: Promise<{
    pageNumber: string ;
  }>;
}) {

  const getPageNumber = props.searchParams.then(params => {
    let page = 0;
    if (params.pageNumber) {
      page = parseInt(params.pageNumber);
    }
    return page; 
  })

  const getJournalPage = getPageNumber.then(page => {
    return listJournals({
      page: page,
      pageSize: JournalDashboardSize,
    });
  })

  return (
    <AppContent>
      <PageLocation>Journal</PageLocation>
      <PageTitle>My Journal</PageTitle>
      <Suspense>
        <div className="pt-12 flex flex-col gap-4">
          <Pagination currentPage={getPageNumber} />
          <div className="grid h-full w-full flex-1 grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <JournalPageList journalList={getJournalPage} />
          </div>
        </div>
      </Suspense>
    </AppContent>
  );
}

async function JournalPageList(props: {
  journalList: Promise<GetListJournalResponse>;
}) {
  const journalList = await props.journalList;
  const data = journalList.data ?? [];
  return (
    <>
      <JournalCreateCard />
      {data.map((d) => <JournalCard key={d.id} data={d} />)}
    </>
  );
}
