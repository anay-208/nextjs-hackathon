"use client";
import { useState, useEffect, useCallback } from "react";
import TiptapEditor from "./tiptap-editor.client";
import { Label } from "@/components/ui/label";
import { JSONContent } from "@tiptap/core";
import { Button } from "@/components/ui/button";
import { SelectJournalType } from "@/db/schema";

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

export default function Tiptap({
  initialData,
}: {
  initialData?: SelectJournalType;
}) {
  const [editorContent, setEditorContent] = useState<JSONContent | null>(null);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [title, setTitle] = useState(initialData?.title || "");

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
    console.log("Published HTML:", JSON.stringify(editorContent));
    console.log("Title:", title);
    localStorage.removeItem(title);
    setLastSaved(new Date());
    alert("Saved!");
  }, [editorContent, title]);

  useEffect(() => {
    const saveInterval = setInterval(() => {
      if (title && editorContent) {
        localStorage.setItem(title, JSON.stringify(editorContent));
        setLastSaved(new Date());
      }
    }, 30000);
    return () => clearInterval(saveInterval);
  }, [editorContent, title]);

  return (
    <div className="h-full w-full">
      <div className="mx-auto h-full w-full pt-10 pb-7">
        <Label htmlFor="title" className="sr-only">
          Title
        </Label>
        <input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter blog post title"
          className="w-full border-none bg-transparent text-3xl font-bold"
        />
        <div className="tiptap-editor h-full pt-5">
          {editorContent !== null && (
            <TiptapEditor
              onUpdate={handleEditorUpdate}
              editorContent={editorContent}
              setEditorContent={setEditorContent}
            />
          )}
        </div>
      </div>
    </div>
  );
}
