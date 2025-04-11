"use client";
import { useState, useEffect, useCallback, useTransition } from "react";
import TiptapEditor from "./tiptap-editor.client";
import { Label } from "@/components/ui/label";
import { JSONContent } from "@tiptap/core";
import { SelectJournalType } from "@/app/api/journal/types";
import { updateJournal } from "@/app/api/journal/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const createDefaultContent = (): JSONContent => {
  return {
    type: "doc",
    content: [
      {
        type: "paragraph",
        content: [{ type: "text", text: "Once upon a time..." }],
      },
    ],
  };
};

export default function JournalTipTapPage({
  initialData,
}: {
  initialData: SelectJournalType;
}) {
  const [editorContent, setEditorContent] = useState<JSONContent | null>(null);
  const [title, setTitle] = useState(initialData?.title || "");
  const [isPending, startTransition] = useTransition();
  const [lastLocalSaved, setLastLocalSaved] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    let content: JSONContent;

    if (!initialData) {
      content = createDefaultContent();
    } else {
      const storedContent = initialData.title
        ? localStorage.getItem(initialData.title)
        : null;
      if (storedContent) {
        try {
          content = JSON.parse(storedContent);

          toast.success("Loaded unsaved changes from local storage", {
            action: {
              label: "Undo",
              onClick: () => {
                localStorage.removeItem(initialData.title!);
                window.location.reload();
              },
            },
          });
        } catch (e) {
          console.error("Failed to parse stored content:", e);
          content = createDefaultContent();
        }
      } else if (initialData.content) {
        try {
          content = JSON.parse(initialData.content);
        } catch (e) {
          console.error("Failed to parse initial content:", e);
          content = createDefaultContent();
        }
      } else {
        content = createDefaultContent();
      }
    }

    setEditorContent(content);
  }, [initialData]);

  const handleEditorUpdate = useCallback((content: JSONContent) => {
    setEditorContent(content);
  }, []);

  const handlePublish = useCallback(() => {
    if (!editorContent) return;

    startTransition(() => {
      toast.promise(
        (async () => {
          await updateJournal(initialData.id, {
            content: JSON.stringify(editorContent),
          });
          localStorage.removeItem(title);
          setLastLocalSaved(null);
          router.refresh();
        })(),
        {
          loading: "Saving journal...",
          success: "Journal saved!",
          error: "Failed to save journal",
        },
      );
    });
  }, [editorContent, title, initialData.id]);

  useEffect(() => {
    const saveInterval = setInterval(() => {
      if (title && editorContent) {
        console.log(initialData.content);
        if (JSON.stringify(editorContent) === initialData.content) {
          return;
        }
        localStorage.setItem(title, JSON.stringify(editorContent));
        setLastLocalSaved(new Date().toISOString());
      }
    }, 10000);
    return () => clearInterval(saveInterval);
  }, [editorContent, title]);

  return (
    <div className="h-full max-w-xl mx-auto pt-10 pb-7 flex flex-col relative">
      <Label htmlFor="title" className="sr-only">Title</Label>
      <input
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter blog post title"
        className={cn(
          "w-full bg-transparent text-3xl font-bold border-b outline-none border-transparent focus:border-border-strong py-2"
        )}
      />
      <div className="tiptap-editor pt-5 grow flex flex-col">
        {editorContent !== null && (
          <TiptapEditor
            onUpdate={handleEditorUpdate}
            editorContent={editorContent}
            setEditorContent={setEditorContent}
            handlePublish={handlePublish}
            isPublishing={isPending}
            lastLocalSaved={lastLocalSaved}
          />
        )}
      </div>
    </div>
  );
}
