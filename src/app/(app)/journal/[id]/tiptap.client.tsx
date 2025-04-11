"use client";
import { useState, useEffect, useCallback, useTransition, useRef } from "react";
import TiptapEditor from "./tiptap-editor.client";
import { Label } from "@/components/ui/label";
import { JSONContent } from "@tiptap/core";
import { SelectJournalType } from "@/app/api/journal/types";
import { updateJournal } from "@/app/api/journal/actions";
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

  useEffect(() => {
    let content: JSONContent;

    if (!initialData) {
      content = createDefaultContent();
    } else {
      if (initialData.content) {
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
    startTransition(async () => {
      await updateJournal(initialData.id, {
        title: title,
        content: JSON.stringify(editorContent),
      });
    });
  }, [editorContent, title, initialData.id]);

  const leadingFirstThrottleRef = useRef<NodeJS.Timeout>(null);
  const latestTitleRef = useRef<string>(title);
  const latestEditorContentRef = useRef<JSONContent | null>(editorContent);
  const mountedRef = useRef(false);

  useEffect(() => {
    latestTitleRef.current = title;
    latestEditorContentRef.current = editorContent;
  }, [title, editorContent]);

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }
    // Debounce save wait for 1 seconds
    try {
      if (title === initialData.title && JSON.stringify(editorContent) === initialData.content) return
    } catch {
      return
    }
    if (leadingFirstThrottleRef.current) return

    leadingFirstThrottleRef.current = setTimeout(() => {
      startTransition(async () => {
        await updateJournal(initialData.id, {
          title: latestTitleRef.current,
          content: JSON.stringify(latestEditorContentRef.current),
        });
        leadingFirstThrottleRef.current = null
      });
    }, 800);
  }, [editorContent, title, initialData])

  return (
    <>
      <Label htmlFor="title" className="sr-only">Title</Label>
      <input
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Untitled Journal Entry"
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
          />
        )}
      </div>
    </>
  );
}
