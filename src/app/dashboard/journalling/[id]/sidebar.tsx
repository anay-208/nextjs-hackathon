import Link from "next/link";
import { getAllData } from "./data";
import { SelectJournalType } from "@/db/schema";
import { Pin, PlusCircle } from "lucide-react";

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

export async function Sidebar({ activeID }: { activeID: string }) {
  const allData = await getAllData();

  const grouped: Record<string, SelectJournalType[]> = {};

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
                  href={`/dashboard/journalling/${entry.id}`}
                  className={`text-sm ${
                    String(entry.id) === activeID
                      ? "text-primary font-bold"
                      : ""
                  } line-clamp-2 w-full`}
                >
                  {entry.title}
                </Link>
                <button className="size-4 shrink-0">
                  {entry.is_pinned ? (
                    <Pin className="text-foreground size-4" />
                  ) : (
                    <Pin className="group-hover:text-muted-foreground size-4 text-transparent" />
                  )}
                </button>
              </div>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
