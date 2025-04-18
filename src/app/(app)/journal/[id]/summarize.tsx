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
        throw new Error("Failed to fetch summary");
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("Failed to get reader from response body");
      }

      const decoder = new TextDecoder("utf-8");
      let done = false;
      let result = "";

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;

        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          result += chunk; // Append the chunk to the result
          setAiResponse(result); // Update the response progressively
        }
      }
    } catch (error) {
      console.error("Error fetching summary:", error);
      setAiResponse(
        "An error occurred while fetching the summary. Are you sure you've added proper text?",
      );
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
function SummarizeButton({
  onClick,
  summarizing,
}: {
  onClick: () => void;
  summarizing: boolean;
}) {
  return (
    <>
      <Button
        title="Your data might be used by Google to train their AI. Please don't input any personal information as this is a part of a hackathon."
        disabled={summarizing}
        className={cn(
          "flex items-center gap-2 text-white",
          summarizing
            ? "animate-gradient-x bg-gradient-to-r from-purple-500 via-purple-700 to-purple-500"
            : "bg-purple-600 hover:bg-purple-700",
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
          {summarizing ? "Summarizing" : "Summarize with Ai*"}
        </span>
      </Button>
    </>
  );
}

function AiResponseUI({
  content,
  onClose,
}: {
  content: string;
  onClose: () => void;
}) {
  const [isClosing, setIsClosing] = useState(false); // State to handle closing animation

  const handleClose = () => {
    setIsClosing(true); // Trigger the closing animation
    setTimeout(() => {
      onClose(); // Call the onClose function after the animation ends
    }, 600); // Match the duration of the animation
  };

  return (
    <div
      className={cn(
        "fixed top-5 left-1/2 z-20 w-11/12 max-w-2xl -translate-x-1/2 transform rounded-lg border border-purple-500/50 bg-gradient-to-r from-purple-500/20 via-transparent to-purple-500/20 p-4 text-white shadow-lg backdrop-blur-md",
        isClosing ? "animate-fancy-disappear" : "animate-fancy-appear", // Use appear or disappear animation
      )}
      style={{
        backdropFilter: "blur(25px)",
      }}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-medium text-black sm:text-3xl">Summary</h2>
        <button
          onClick={handleClose}
          className="text-black transition hover:text-gray-700"
        >
          <X className="clickable h-5 w-5 sm:h-6 sm:w-6" />
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

