import { JournalCard, JournalCreateCard } from "./card.client";
import "./[id]/tiptap.css";
import { JournalDashboardSize } from "./constants";
import { Pagination } from "./pagination";
import { listJournals, type GetListJournalResponse } from "@/app/api/journal/actions";
import { Suspense } from "react";
import { AppContent, PageLocation, PageTitle } from "../content-layouts";
import { SearchJournalForm, SearchJournalInput } from "./search.client";


export default function Page(props: {
  searchParams: Promise<{
    pageNumber: string;
    search: string;
  }>;
}) {

  const getSp = props.searchParams.then(params => params)

  const getPageNumber = getSp.then(params => {
    let page = 0;
    if (params.pageNumber) {
      page = parseInt(params.pageNumber);
    }
    return page; 
  })

  const getJournalPage = getSp.then(async params => {
    return listJournals({
      page: params.pageNumber ? parseInt(params.pageNumber) : 0,
      pageSize: JournalDashboardSize,
      filter: {
        query: params.search ?? undefined,
      }
    });
  })

  return (
    <AppContent>
      <PageLocation>Journal</PageLocation>
      <PageTitle>My Journal</PageTitle>
      <Suspense>
        <SearchJournalForm>
          <div className="pt-12 flex flex-col gap-4">
            <div className="flex gap-2">
              <Pagination currentPage={getPageNumber} />
              <SearchJournalInput />
            </div>
            <div className="grid h-full w-full flex-1 grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <JournalPageList journalList={getJournalPage} />
            </div>
          </div>
        </SearchJournalForm>
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
