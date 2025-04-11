"use client";

import { updateJournal } from "@/app/api/journal/actions";
import { Pin } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

export default function JournalPinned({
  isPinned,
  journalID,
}: {
  isPinned: boolean;
  journalID: string;
}) {
  const router = useRouter();
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
