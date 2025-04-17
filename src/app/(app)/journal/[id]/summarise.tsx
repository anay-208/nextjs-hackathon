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
    setSummarizing(false)
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


function SummarizeButton({ onClick, summarizing }: { onClick: () => void; summarizing: boolean }) {
  return (
    <Button
      disabled={summarizing}
      className={cn(
        "bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2"
      )}
      onClick={onClick}
    >
      <Sparkles className="h-4 w-4" />
      <span
        className={cn(
          "hidden sm:inline",
          summarizing &&
            "relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-white to-yellow-400 animate-shine"
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
        "fixed z-10 top-5 left-1/2 transform -translate-x-1/2 p-4 rounded-lg bg-gradient-to-r from-purple-500/20 via-transparent to-purple-500/20 text-white shadow-lg w-11/12 max-w-2xl border border-purple-500/50 backdrop-blur-md",
        "animate-fade-in"
      )}
      style={{
        backdropFilter: "blur(25px)",
      }}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-medium text-black sm:text-3xl">Summary</h2>
        <button
          onClick={onClose}
          className="text-black hover:text-gray-700 transition"
        >
          <X className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
      </div>
      <p className="whitespace-pre-wrap text-base mt-4 text-black sm:text-lg">
        {content ?? (
          <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-white to-yellow-400 animate-shine">
            Summarizing...
          </span>
        )}
      </p>
    </div>
  );
}