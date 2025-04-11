"use client";
import { createJournal } from "@/app/api/journal/actions";
import { SelectJournalType } from "@/app/api/journal/types";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
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


function JournalCardBase(props: ComponentProps<"div"> & {
  "data-padding"?: string
}) {
  return (<div {...props}
    style={{
      ...props.style,
      "--p": props['data-padding'] ?? "1rem",
    }}
    className={cn(
      'border border-border shadow-md relative h-[200px] w-full flex flex-col items-start justify-start gap-2 overflow-hidden rounded-md p-(--p)',
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
      <JournalCardBase className="animate-card-insert gap-0 items-stretch" data-padding="0.75rem">
        <div className="border-b border-border p-(--p) -m-(--p) mb-0">
          <h2 className="line-clamp-2 font-semibold text-fg">{data.title}</h2>
          <p className="text-muted">{data.created_at.toDateString()}</p>
        </div>
        <p className="line-clamp-5 text-base leading-snug text-muted p-(--p) -m-(--p) mt-0 bg-main-4/2 grow">
          {data.summary || <span className="text-muted/50">Empty Journal</span>}
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
    >
      <JournalCardBase className="shadow-none gap-1 justify-center items-center border-dashed">
        <Plus className="text-main-4/40 size-6" />
        <p className="text-lg font-semibold">Create New</p>
      </JournalCardBase>
    </button>
  );
}
