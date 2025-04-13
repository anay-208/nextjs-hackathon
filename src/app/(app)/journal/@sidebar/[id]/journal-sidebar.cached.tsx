"use cache"

import { listJournals } from "@/app/api/journal/actions";
import { SidebarJournalItemListClient } from "./journal-sidebar.client";
import type { SelectJournalType } from "@/app/api/journal/types";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";
import { Pin } from "lucide-react";

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

  const pinnedData = allData.filter(e => e.is_pinned);

  return <>
    <div className="transition-[grid-template-rows] grid grid-rows-[0fr] [&:has(*>*)]:grid-rows-[1fr] overflow-y-clip overflow-x-visible">
      <div className="min-h-0">
        {// FIlter pinned
          pinnedData && pinnedData.length > 0 && (
            <JournalSidebarListGroup>
              <JournalSidebarListGroupHeader>
                📌 Pinned
              </JournalSidebarListGroupHeader>
              {pinnedData.map((entry) => {
                return <SidebarJournalItemListClient
                  key={entry.id}
                  id={entry.id}
                  title={entry.title}
                  label="Pinned"
                  is_pinned={entry.is_pinned}
                />
              })}
            </JournalSidebarListGroup>
          )
        }
      </div>
    </div>
    {
      Object.entries(grouped).map(([label, entries]) => (
        <JournalSidebarListGroup key={label}>
          <JournalSidebarListGroupHeader>
            {label}
          </JournalSidebarListGroupHeader>
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
        </JournalSidebarListGroup >
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

function JournalSidebarListGroup(props: ComponentProps<"div">) {
  return (
    <div {...props} className={cn("flex flex-col items-stretch justify-start gap-0.5 pb-4", props.className)} />
  )
}
function JournalSidebarListGroupHeader(props: ComponentProps<"h2">) {
  return (
    <h2 {...props} className={cn("text-muted/75 mb-0 text-xs font-bold ml-1 uppercase", props.className)} />
  )
}