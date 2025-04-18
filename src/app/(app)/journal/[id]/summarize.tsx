"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { MageStarsCFill } from "./stars";

interface Props {
  id: Promise<string>;
}

export default function Summarize({ id }: Props) {
  const [summarizing, setSummarizing] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const onSummaryClick = async () => {
    setSummarizing(true);
    setOpen(true);
    setAiResponse("");

    try {
      const response = await fetch(`/api/journal/${await id}/summarize`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch summary");
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No reader from response body");

      const decoder = new TextDecoder("utf-8");
      let done = false;
      let result = "";

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          result += chunk;
          setAiResponse(result);
        }
      }
    } catch (error) {
      console.error("Summary error:", error);
      setAiResponse(
        "An error occurred while fetching the summary. Are you sure you've added proper text?",
      );
    } finally {
      setSummarizing(false);
    }
  };

  return (
    <>
      <Button
        title="Your data might be used by Google to train their AI. Please don't input any personal information as this is a part of a hackathon."
        disabled={summarizing}
        onClick={onSummaryClick}
        className={cn(
          "flex items-center gap-2 text-white",
          summarizing
            ? "animate-gradient-x bg-gradient-to-r from-purple-500 via-purple-700 to-purple-500"
            : "bg-purple-600 hover:bg-purple-700",
        )}
      >
        <Sparkles className="h-4 w-4" />
        <span
          className={cn(
            "hidden sm:inline",
            summarizing &&
              "animate-shine relative inline-block bg-gradient-to-r from-yellow-400 via-white to-yellow-400 bg-clip-text text-transparent",
          )}
        >
          {summarizing ? "Summarizing" : "Summarize with Ai*"}
        </span>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader className="flex flex-row items-center gap-2">
            <MageStarsCFill className="text-accent-foreground size-5" />
            <DialogTitle>Summary</DialogTitle>
          </DialogHeader>
          <div className="max-h-[70vh] overflow-y-auto text-sm whitespace-pre-wrap text-black sm:text-base">
            {aiResponse || (
              <span className="text-muted-foreground animate-pulse">
                Summarizing...
              </span>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
