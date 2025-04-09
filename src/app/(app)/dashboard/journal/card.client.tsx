import { SelectJournalType } from "@/app/api/journal/types";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

export function JournalCard({ data }: { data: SelectJournalType }) {
  return (
    <Link
      href={`/dashboard/journal/${data.id}`}
      className="border-accent-foreground relative flex h-[200px] w-full flex-col items-start justify-start gap-2 overflow-hidden rounded-md border-2 p-2 px-2"
    >
      <div className="h-[60px] w-full">
        <h2 className="line-clamp-2 text-xl font-semibold">{data.title}</h2>
      </div>
      <p className="mt-auto line-clamp-5 text-base leading-snug">
        {data.summary}
      </p>
    </Link>
  );
}

export function JournalLoadingCard() {
  return (
    <div className="border-accent-foreground relative flex h-[200px] w-full flex-col items-start justify-start gap-2 overflow-hidden rounded-md border-2 p-2 px-2">
      <div className="h-[60px] w-full">
        <Skeleton className="h-6 w-full" />
      </div>
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-4 w-full" />
      ))}
    </div>
  );
}

export function JournalCreateCard({ inactive }: { inactive?: boolean }) {
  return (
    <button
      onClick={async () => {}}
      disabled={inactive}
      className="border-accent-foreground bg-accent relative flex h-[200px] w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-md border-2 p-2 px-2 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <PlusCircle className="text-muted-foreground size-6" />
      <p className="text-xl font-bold">Create New</p>
    </button>
  );
}
