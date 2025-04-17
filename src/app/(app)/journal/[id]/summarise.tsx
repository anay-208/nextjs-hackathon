"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Sparkles, X } from "lucide-react";

interface Props {
  id: Promise<string>;
}

export default function Summarize({ id }: Props) {
  const [summarizing, setSummarizing] = useState<boolean>(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [hide, setHide] = useState<boolean>(true); // Controls visibility of the UI

  const onSummaryClick = async () => {
    setSummarizing(true);
    setAiResponse("");
    setHide(false);
    const response = await fetch(`/api/journal/${await id}/summarize`, {
      method: "GET",
    });

    if (!response.body) {
      throw new Error("No response body, aborting summarize");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let done = false;
    let result = "";
    while (!done) {
      const { value, done: readerDone } = await reader.read();
      done = readerDone;
      if (value) {
        const chunk = decoder.decode(value, { stream: true });
        result += chunk;
        setAiResponse(result); // Update the response progressively
      }
    }
    setSummarizing(false);
  };

  return (
    <>
      <SummarizeButton onClick={onSummaryClick} summarizing={summarizing} />
      {!hide && aiResponse && (
        <AiResponseUI content={aiResponse} onClose={() => setHide(true)} />
      )}
    </>
  );
}

function SummarizeButton({
  onClick,
  summarizing,
}: {
  onClick: () => void;
  summarizing: boolean;
}) {
  return (
    <Button
      disabled={summarizing}
      className={cn(
        "flex items-center gap-2 bg-purple-600 text-white hover:bg-purple-700",
      )}
      onClick={onClick}
    >
      <Sparkles className="h-4 w-4" />
      <span
        className={cn(
          "hidden sm:inline",
          summarizing &&
            "animate-shine relative inline-block bg-gradient-to-r from-yellow-400 via-white to-yellow-400 bg-clip-text text-transparent",
        )}
      >
        {summarizing ? "Summarizing" : "Summarize"}
      </span>
    </Button>
  );
}

function AiResponseUI({
  content,
  onClose,
}: {
  content: string;
  onClose: () => void;
}) {
  return (
    <div
      className={cn(
        "fixed top-5 left-1/2 z-30 w-11/12 max-w-2xl -translate-x-1/2 transform rounded-lg border border-purple-500/50 bg-gradient-to-r from-purple-500/20 via-transparent to-purple-500/20 p-4 text-white shadow-lg backdrop-blur-md",
        "animate-fade-in",
      )}
      style={{
        backdropFilter: "blur(25px)",
      }}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-medium text-black sm:text-3xl">Summary</h2>
        <button
          onClick={onClose}
          className="text-black transition hover:text-gray-700"
        >
          <X className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
      </div>
      <p className="mt-4 text-base whitespace-pre-wrap text-black sm:text-lg">
        {content ?? (
          <span className="animate-shine relative inline-block bg-gradient-to-r from-yellow-400 via-white to-yellow-400 bg-clip-text text-transparent">
            Summarizing...
          </span>
        )}
      </p>
    </div>
  );
}

