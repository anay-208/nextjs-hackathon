"use client";
import { useState, useEffect, useCallback, useTransition, useRef, Fragment, useOptimistic } from "react";
import TiptapEditor from "./tiptap-editor.client";
import { Label } from "@/components/ui/label";
import { JSONContent } from "@tiptap/core";
import { SelectJournalType } from "@/app/api/journal/types";
import { updateJournal, updateJournalTags } from "@/app/api/journal/actions";
import { cn } from "@/lib/utils";
import { StarRating } from "@/components/ui/stars-rating";

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
      <div className="flex flex-col min-h-20 grid grid-cols-[6rem_1fr] py-4 gap-y-2 items-center place-items-start">
        {
          ['mood', 'energy', 'productivity'].map((key, i) => {
            return (
              <JournalRating
                key={key}
                label={key}
                initialValue={parseInt(initialData.tags?.find(t => t.startsWith(`__internal_${ key }-`))?.split(`__internal_${ key }-`)[1] ?? '0')}
                onClick={async (r) => {
                  startTransition(async () => {
                    const newTags = [...initialData.tags]
                    const index = newTags.findIndex(t => t.startsWith(`__internal_${ key }-`))
                    if (index !== -1) {
                      newTags[index] = `__internal_${ key }-${ r }`;
                    } else {
                      newTags.push(`__internal_${ key }-${ r }`);
                    }
                    await updateJournalTags(initialData.id, newTags)
                  })
                }}
              />
            )
          })
        }
      </div>
      <hr className="border-border-strong" />
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



function JournalRating(props: {
  label: string,
  initialValue: number,
  onClick: (r: number) => Promise<void>
}) {
  const [pending, startTransition] = useTransition()
  const [state, addOptimistic] = useOptimistic(props.initialValue, (r: number, newR: number) => {
    return (newR)
  })

  return (
    <Fragment>
      <div className="tag-name text-muted font-medium text-sm">{props.label}</div>
      <StarRating
        value={state}
        onClick={(r) => {
          startTransition(async () => {
            addOptimistic(r)
            await props.onClick(r)
          })
        }} />
    </Fragment>
  )

}