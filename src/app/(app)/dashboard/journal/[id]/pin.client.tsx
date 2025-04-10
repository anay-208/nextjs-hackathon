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
        updateJournal(journalID, { is_pinned: !isPinned }).then(() =>
          router.refresh(),
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
      onClick={handleTogglePin}
      disabled={isPending}
      className="size-4 shrink-0 disabled:opacity-50"
    >
      {isPinned ? (
        <Pin className="text-foreground size-4" />
      ) : (
        <Pin className="group-hover:text-muted-foreground size-4 text-transparent" />
      )}
    </button>
  );
}
