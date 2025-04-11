"use cache"

import { listJournals } from "@/app/api/journal/actions";
import { SidebarJournalItemListClient } from "./sidebar.client";
import type { SelectJournalType } from "@/app/api/journal/types";

export async function SidebarItemList() {

  //TODO: Get all pinned articles and render them first https://github.com/anay-208/nextjs-hackathon/issues/47
  const dataRes = await listJournals({
    page: 0,
    pageSize: 15,
  });

  if (!dataRes.data) return null;
  const allData = dataRes.data;

  const grouped: Record<string, JournalWithoutContent[]> = {};

  for (const entry of allData) {
    const label = getGroupLabel(new Date(entry.created_at));
    if (!grouped[label]) grouped[label] = [];
    grouped[label].push(entry);
  }

  return <>
    {
      Object.entries(grouped).map(([label, entries]) => (
        <div key={label} className="">
          <h2 className="text-muted/75 mb-1 text-sm font-medium ml-2">
            {label}
          </h2>
          <ul className="flex flex-col items-stretch justify-start gap-0.5">
            {entries.map((entry) => {
              return <SidebarJournalItemListClient
                key={entry.id}
                id={entry.id}
                title={entry.title}
                label={label}
                is_pinned={entry.is_pinned}
              />
            })}
          </ul>
        </div >
      ))
    }
  </>
}

function getGroupLabel(date: Date) {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays <= 7) return "Last Week";
  if (diffDays <= 30) return "Last Month";
  if (diffDays <= 365) return "Last Year";
  return "Older";
}

type JournalWithoutContent = Omit<SelectJournalType, "content">;