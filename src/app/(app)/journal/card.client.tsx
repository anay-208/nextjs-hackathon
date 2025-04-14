"use client";

import { createJournal, deleteJournal, type GetListJournalResponse } from "@/actions/journal/actions";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { EllipsisVertical, Pin, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition, type ComponentProps } from "react";
import { toast } from "sonner";
import { MoodSummary } from "./mood-summary";

function JournalCardBase(
  props: ComponentProps<"div"> & {
    "data-padding"?: string;
  },
) {
  return (
    <div
      {...props}
      style={{
        ...props.style,
        "--p": props["data-padding"] ?? "1rem",
      }}
      className={cn(
        "border-border relative flex h-[200px] w-full flex-col items-start justify-start gap-2 overflow-hidden rounded-md border p-(--p) shadow-md",
        "hover:shadow-lg",
        "hover:border-border-strong",
        "clickable",
        "transition-all",
        props.className,
      )}
    />
  );
}

export function JournalCard({ data }: { data: NonNullable<GetListJournalResponse['data']>[number] }) {

  const mood = data.mood ?? undefined
  const energy = data.energy ?? undefined
  const productivity = data.productivity ?? undefined

  return (
    <JournalCardBase
      className="animate-card-insert relative items-stretch gap-0"
      data-padding="0.75rem"
    >
      <Link href={`/journal/${ data.id }`} className="absolute inset-0" />
      <div className="border-border -m-(--p) mb-0 flex gap-1 border-b p-(--p) py-2.5">
        <div className="grow">
          <h2 className="text-fg font-semibold flex items-baseline gap-1">
            {data.is_pinned && (
              <Pin className="text-fg size-3 -rotate-45 fill-current shrink-0" />
            )}
            <div className="line-clamp-2 min-w-0 wrap-anywhere">
              {data.title}
            </div>
          </h2>
          <p className="text-muted font-medium text-sm">{data.created_at.toDateString()}</p>
          <div className="flex gap-1 pt-1 text-lg">
            <MoodSummary
              mood={mood}
              energy={energy}
              productivity={productivity}
            />
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative z-10 size-8"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
            >
              <EllipsisVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="z-20 w-56" align="start">
            <DropdownMenuItem
              onClick={() => {
                toast.promise(
                  (async () => {
                    const idRes = await deleteJournal(data.id);
                    if (!idRes || !idRes.data)
                      throw new Error("Failed to delete journal");
                  })(),
                  {
                    loading: "Deleting journal...",
                    success: () => ({
                      message: "Journal deleted!",
                    }),
                    error: "Failed to delete journal",
                  },
                );
              }}
              variant="destructive"
            >
              Delete
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <p className="text-muted bg-main-4/2 -m-(--p) mt-0 line-clamp-5 grow p-(--p) text-base leading-snug">
        {data.summary || <span className="text-muted/50">Empty Journal</span>}
      </p>
    </JournalCardBase>
  );
}

export function JournalCreateCard({ inactive }: { inactive?: boolean }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const sp = useSearchParams()
  // Get search query params and return null if search is not ""
  const search = sp.get("search");
  if (search && search !== "") return null;

  return (
    <button
      onClick={() => {
        startTransition(() => {
          toast.promise(
            (async () => {
              const idRes = await createJournal({});
              if (!idRes || !idRes.data)
                throw new Error("Failed to create journal");
              return idRes.data.id;
            })(),
            {
              loading: "Creating journal...",
              success: (id) => ({
                message: "Journal created!",
                action: {
                  label: "View Journal",
                  onClick: () => {
                    router.push(`/journal/${ id }`);
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
      <JournalCardBase className="items-center justify-center gap-1 border-dashed shadow-none">
        <Plus className="text-main-4/40 size-6" />
        <p className="text-lg font-semibold">Create New</p>
      </JournalCardBase>
    </button>
  );
}

