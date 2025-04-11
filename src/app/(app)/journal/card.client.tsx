"use client";
import { createJournal } from "@/app/api/journal/actions";
import { SelectJournalType } from "@/app/api/journal/types";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Plus, PlusCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition, type ComponentProps } from "react";
import { toast } from "sonner";
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from "unique-names-generator";

type JournalWithoutContent = Omit<SelectJournalType, "content">;


function JournalCardBase(props: ComponentProps<"div">) {
  return (<div {...props} className={cn(
    'border border-border shadow-md relative h-[200px] w-full flex flex-col items-start justify-start gap-2 overflow-hidden rounded-md p-4',
    'hover:shadow-lg',
    'hover:border-border-strong',
    'clickable',
    'transition-all',
    props.className)} />)
}



export function JournalCard({ data }: { data: JournalWithoutContent }) {
  return (
    <Link
      href={`/journal/${ data.id }`}
    >
      <JournalCardBase className="animate-card-insert">
        <div className="w-full">
          <h2 className="line-clamp-2 text-lg font-semibold">{data.title}</h2>
          <p className="text-muted">{data.created_at.toDateString()}</p>
        </div>
        <p className="line-clamp-5 text-base leading-snug text-muted">
          {data.summary}
        </p>
      </JournalCardBase>
    </Link>
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
                    router.push(`/dashboard/journal/${ id }`);
                  },
                },
              }),
              error: "Failed to create journal",
            },
          );
        });
      }}
      disabled={inactive || isPending}
      // className="border-accent-foreground bg-accent relative flex h-[200px] w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-md border-2 p-2 px-2 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <JournalCardBase className="shadow-none gap-1 justify-center items-center border-dashed">
        <Plus className="text-main-4/40 size-6" />
        <p className="text-lg font-semibold">Create New</p>
      </JournalCardBase>
    </button>
  );
}
