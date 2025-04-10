"use client";
import { createJournal } from "@/app/api/journal/actions";
import { SelectJournalType } from "@/app/api/journal/types";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from "unique-names-generator";

type JournalWithoutContent = Omit<SelectJournalType, "content">;
export function JournalCard({ data }: { data: JournalWithoutContent }) {
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
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <button
      onClick={() => {
        startTransition(() => {
          toast.promise(
            (async () => {
              const generatedTitle = uniqueNamesGenerator({
                dictionaries: [adjectives, colors, animals],
                separator: "-",
                style: "lowerCase",
              });
              const idRes = await createJournal({ title: generatedTitle });
              if (!idRes || !idRes.data)
                throw new Error("Failed to create journal");
              router.refresh();
              return idRes.data.id;
            })(),
            {
              loading: "Creating journal...",
              success: (id) => ({
                message: "Journal created!",
                action: {
                  label: "View Journal",
                  onClick: () => {
                    router.push(`/dashboard/journal/${id}`);
                  },
                },
              }),
              error: "Failed to create journal",
            },
          );
        });
      }}
      disabled={inactive || isPending}
      className="border-accent-foreground bg-accent relative flex h-[200px] w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-md border-2 p-2 px-2 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <PlusCircle className="text-muted-foreground size-6" />
      <p className="text-xl font-bold">Create New</p>
    </button>
  );
}
