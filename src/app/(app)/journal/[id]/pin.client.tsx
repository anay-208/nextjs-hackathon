"use client";

import { updateJournal } from "@/actions/journal/actions";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Pin } from "lucide-react";
import { useOptimistic, useTransition } from "react";
import { toast } from "sonner";


export function JournalPinnedTopBar(props: {
  isPinned: boolean,
  onClick: (state: boolean) => void | Promise<void>,
}) {
  const [optstate, addoptimistic] = useOptimistic(props.isPinned, (prev: boolean, value: boolean) => {
    return value
  })
  const [isPending, startTransition] = useTransition();

  return (
    <Button className="top-bar-pin-button h-8" size="sm" variant="ghost"
      onClick={() => {
        startTransition(async () => {
          addoptimistic(!optstate)
          await props.onClick(!optstate)
        })
      }}
    >
      <Pin className={cn(
        "h-4 w-4 -rotate-45 transition-all",
        optstate && "rotate-0 fill-current",
      )} />
    </Button>
  )
}


export default function JournalPinned({
  isPinned,
  journalID,
}: {
  isPinned: boolean;
  journalID: string;
}) {
  const [isPending, startTransition] = useTransition();

  const handleTogglePin = () => {
    startTransition(() => {
      toast.promise(
        updateJournal(journalID, { is_pinned: !isPinned }).then(() => { }
        ),
        {
          loading: isPinned ? "Unpinning..." : "Pinning...",
          success: isPinned ? "Unpinned" : "Pinned",
          error: "Failed to update pin",
        },
      );
    });
  };

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleTogglePin()
        console.log("Hello??")
      }}
      disabled={isPending}
      className="size-4 shrink-0 disabled:opacity-50 shrink-0 relative z-10 clickable"
    >
      {(isPinned || isPending) ? (
        <Pin className="text-fg size-4 transition-all" />
      ) : (
        <Pin className="group-hover:text-muted size-4 text-transparent -rotate-45 transition-all" />
      )}
    </button>
  );
}
