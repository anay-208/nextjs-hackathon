import Link from "next/link";
import { getAllData } from "./data";
import { Pin, PlusCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { SelectJournalType } from "@/app/api/journal/types";
import { listJournals } from "@/app/api/journal/actions";
import JournalPinned from "./pin.client";

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
export async function Sidebar({ activeID }: { activeID: string }) {
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

  return (
    <div className="h-full w-full">
      <div className="flex h-fit w-full flex-row items-start justify-start gap-2">
        <PlusCircle className="text-muted-foreground size-6" /> New Entry
      </div>
      {Object.entries(grouped).map(([label, entries]) => (
        <div key={label}>
          <h2 className="text-muted-foreground mb-1 text-sm font-semibold">
            {label}
          </h2>
          <ul className="flex flex-col items-start justify-start space-y-1">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="hover:bg-muted group flex h-fit w-full flex-row items-center justify-start gap-2 rounded-sm p-1"
              >
                <Link
                  href={`/dashboard/journal/${entry.id}`}
                  className={`text-sm ${
                    String(entry.id) === activeID
                      ? "text-primary font-bold"
                      : ""
                  } line-clamp-2 w-full`}
                >
                  {entry.title}
                </Link>
                <JournalPinned
                  isPinned={entry.is_pinned}
                  journalID={entry.id}
                />
              </div>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export function SidebarSkeleton() {
  return (
    <div className="h-full w-full space-y-4">
      <div className="flex h-fit w-full flex-row items-start justify-start gap-2">
        <PlusCircle className="text-muted-foreground size-6" />
        <Skeleton className="h-4 w-24" />
      </div>

      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="space-y-1">
          <Skeleton className="h-4 w-20" />

          <ul className="flex flex-col items-start justify-start space-y-1">
            {Array.from({ length: 3 }).map((_, j) => (
              <div
                key={j}
                className="flex h-fit w-full flex-row items-center justify-start gap-2 rounded-sm p-1"
              >
                <Skeleton className="h-4 w-full flex-1" />
                <Skeleton className="size-4 shrink-0" />
              </div>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
