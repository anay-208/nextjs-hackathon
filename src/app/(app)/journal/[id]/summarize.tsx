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

    try {
      const response = await fetch(`/api/journal/${await id}/summarize`, {
        method: "GET",
      });

      if (!response.ok) {
        alert("Failed to fetch summary")
        throw new Error("Failed to fetch summary");
      }

      const result = await response.text(); // Directly get the full text response
      setAiResponse(result); // Set the AI response
    } catch (error) {
      console.error("Error fetching summary:", error);
      setAiResponse("An error occurred while fetching the summary.");
    } finally {
      setSummarizing(false);
    }
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
        "text-white flex items-center gap-2",
        summarizing
          ? "bg-gradient-to-r from-purple-500 via-purple-700 to-purple-500 animate-gradient-x"
          : "bg-purple-600 hover:bg-purple-700"
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