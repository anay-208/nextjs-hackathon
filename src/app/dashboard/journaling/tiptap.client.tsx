"use client";
import { useState, useEffect, useCallback } from "react";
import TiptapEditor from "./tiptap-editor.client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronDown, Save } from "lucide-react";

export default function Tiptap() {
  const [editorContent, setEditorContent] = useState(
    "<p>Hello, start typing here...</p>",
  );
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<"draft" | "live">("draft");

  const handleEditorUpdate = useCallback((content: string) => {
    setEditorContent(content);
  }, []);

  const handlePublish = useCallback(() => {
    console.log("Published HTML:", editorContent);
    console.log("Title:", title);
    console.log("Status:", status);
    alert(
      `Content ${status === "live" ? "published" : "saved as draft"} successfully!`,
    );
    setLastSaved(new Date());
  }, [editorContent, title, status]);

  useEffect(() => {
    const saveInterval = setInterval(() => {
      // Simulate saving to a server
      console.log("Autosaving...", editorContent);
      setLastSaved(new Date());
    }, 30000); // Autosave every 30 seconds

    return () => clearInterval(saveInterval);
  }, [editorContent]);

  return (
    <div className="flex min-h-screen flex-col">
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="text-sm text-gray-500">
              {lastSaved && (
                <p>
                  Autosaved{" "}
                  {Math.floor(
                    (new Date().getTime() - lastSaved.getTime()) / 1000,
                  )}{" "}
                  seconds ago
                </p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    {status === "live" ? "Published" : "Draft"}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onSelect={() => setStatus("draft")}>
                    Draft
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setStatus("live")}>
                    Publish
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button size="sm" onClick={handlePublish}>
                <Save className="mr-2 h-4 w-4" />
                {status === "live" ? "Publish" : "Save Draft"}
              </Button>
            </div>
          </div>
        </div>
      </nav>
      <main className="container mx-auto flex-grow px-4 py-8">
        <h1 className="mb-6 text-center text-3xl font-bold">Edit Blog</h1>
        <div className="mb-4">
          <Label htmlFor="title" className="sr-only">
            Title
          </Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter blog post title"
            className="w-full"
          />
        </div>
        <div className="tiptap-editor mx-auto max-w-4xl">
          <TiptapEditor
            onUpdate={handleEditorUpdate}
            editorContent={editorContent}
            setEditorContent={setEditorContent}
          />
        </div>
      </main>
    </div>
  );
}
