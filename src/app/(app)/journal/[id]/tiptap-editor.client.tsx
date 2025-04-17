"use client";

import { useCallback } from "react";
import { useEditor, EditorContent, JSONContent } from "@tiptap/react";
import Placeholder from "@tiptap/extension-placeholder"
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import Link from "@tiptap/extension-link";
import type { Level } from "@tiptap/extension-heading";
import {
  Bold,
  Italic,
  UnderlineIcon,
  Strikethrough,
  Code,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Heading1,
  NotepadTextIcon as Paragraph,
  MinusSquare,
  TableIcon,
  RowsIcon,
  ColumnsIcon,
  Trash2,
  LinkIcon,
  Undo,
  Redo,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface Props {
  onUpdate: (content: JSONContent) => void;
  editorContent: JSONContent;
  setEditorContent: React.Dispatch<React.SetStateAction<JSONContent>>;
  isPending: boolean;
}

const TiptapEditor = ({
  onUpdate,
  editorContent,
  setEditorContent,
  isPending,
}: Props) => {
  
  const editor = useEditor({
    editable: true,
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3, 4],
        },
      }),
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Image.configure({
        HTMLAttributes: {
          class: "max-w-full h-auto",
        },
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          // class: "tiptap-table",
        },
      }),
      TableRow,
      TableHeader,
      TableCell,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-500 underline",
        },
      }),
      Placeholder.configure({
        placeholder: 'Type something...',
        // showOnlyWhenEditable: true,
      }),
    ],
    content: editorContent,
    onUpdate: ({ editor }) => {
      const content = editor.getJSON();
      setEditorContent(content);
      onUpdate(content);
    },
    editorProps: {
      attributes: {
        class: "prose dark:prose-invert max-w-none focus:outline-none prose-p:text-main-1 prose-h2:text-main-1 prose-h3:text-main-1 prose-h4:text-main-1 prose-b:text-main-1 ",
      },
    },
  });

  const insertTable = useCallback(() => {
    editor
      ?.chain()
      .focus()
      .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
      .run();
  }, [editor]);

  const addColumnBefore = useCallback(() => {
    editor?.chain().focus().addColumnBefore().run();
  }, [editor]);

  const addColumnAfter = useCallback(() => {
    editor?.chain().focus().addColumnAfter().run();
  }, [editor]);

  const deleteColumn = useCallback(() => {
    editor?.chain().focus().deleteColumn().run();
  }, [editor]);

  const addRowBefore = useCallback(() => {
    editor?.chain().focus().addRowBefore().run();
  }, [editor]);

  const addRowAfter = useCallback(() => {
    editor?.chain().focus().addRowAfter().run();
  }, [editor]);

  const deleteRow = useCallback(() => {
    editor?.chain().focus().deleteRow().run();
  }, [editor]);

  const deleteTable = useCallback(() => {
    editor?.chain().focus().deleteTable().run();
  }, [editor]);

  const toggleLink = useCallback(() => {
    if (editor?.isActive("link")) {
      editor.chain().focus().unsetLink().run();
    } else {
      const url = prompt("Enter the URL:");
      if (url) {
        editor?.chain().focus().setLink({ href: url }).run();
      }
    }
  }, [editor]);

  const mergeCells = useCallback(() => {
    editor?.chain().focus().mergeCells().run();
  }, [editor]);

  const splitCell = useCallback(() => {
    editor?.chain().focus().splitCell().run();
  }, [editor]);

  const fixTables = useCallback(() => {
    editor?.chain().focus().fixTables().run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  const ToolbarButton = ({
    onMouseDown,
    icon: Icon,
    isActive,
    tooltip,
  }: {
    onMouseDown: () => void;
    icon: React.ElementType;
    isActive: () => boolean;
    tooltip: string;
  }) => {
    const active = isActive();
    return (
      <Button
        variant="ghost"
        size="icon"
        onMouseDown={(e) => {
          e.preventDefault();
          onMouseDown();
        }}
        className={cn(
          "transition-colors",
          active ? "bg-item-active text-primary-foreground" : "hover:bg-hover",
        )}
        title={tooltip}
      >
        <Icon className="size-4" />
        <span className="sr-only">{tooltip}</span>
      </Button>
    )
  };

  return (
    <>
      <div className="tiptap-editor pt-5 grow flex flex-col pb-8">
        <EditorContent
          editor={editor}
          className="grow max-w-none focus:outline-none flex flex-col *:grow"
        />
      </div>


      {/* Toolbar */}
      <div className="border border-border-strong shadow-md bg-popover flex w-full flex-wrap items-center gap-1 rounded-lg p-2 sticky bottom-8">
        <ToolbarButton
          onMouseDown={() => editor.chain().focus().toggleBold().run()}
          icon={Bold}
          isActive={() => editor.isActive("bold")}
          tooltip="Bold"
        />
        <ToolbarButton
          onMouseDown={() => editor.chain().focus().toggleItalic().run()}
          icon={Italic}
          isActive={() => editor.isActive("italic")}
          tooltip="Italic"
        />
        <ToolbarButton
          onMouseDown={() => editor.chain().focus().toggleUnderline().run()}
          icon={UnderlineIcon}
          isActive={() => editor.isActive("underline")}
          tooltip="Underline"
        />
        <ToolbarButton
          onMouseDown={() => editor.chain().focus().toggleStrike().run()}
          icon={Strikethrough}
          isActive={() => editor.isActive("strike")}
          tooltip="Strikethrough"
        />
        <ToolbarButton
          onMouseDown={() => editor.chain().focus().toggleCode().run()}
          icon={Code}
          isActive={() => editor.isActive("code")}
          tooltip="Code"
        />
        <div className="bg-border mx-1 h-6 w-px" aria-hidden="true" />
        <ToolbarButton
          onMouseDown={() => editor.chain().focus().setTextAlign("left").run()}
          icon={AlignLeft}
          isActive={() => editor.isActive({ textAlign: "left" })}
          tooltip="Align Left"
        />
        <ToolbarButton
          onMouseDown={() =>
            editor.chain().focus().setTextAlign("center").run()
          }
          icon={AlignCenter}
          isActive={() => editor.isActive({ textAlign: "center" })}
          tooltip="Align Center"
        />
        <ToolbarButton
          onMouseDown={() => editor.chain().focus().setTextAlign("right").run()}
          icon={AlignRight}
          isActive={() => editor.isActive({ textAlign: "right" })}
          tooltip="Align Right"
        />
        <ToolbarButton
          onMouseDown={() =>
            editor.chain().focus().setTextAlign("justify").run()
          }
          icon={AlignJustify}
          isActive={() => editor.isActive({ textAlign: "justify" })}
          tooltip="Align Justify"
        />
        <div className="bg-border mx-1 h-6 w-px" aria-hidden="true" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={editor.isActive("heading") ? "bg-muted" : ""}
            >
              <Heading1 className="size-4" />
              <span className="sr-only">Heading</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onSelect={() => editor.chain().focus().setParagraph().run()}
            >
              <Paragraph className="mr-2 size-4" />
              Paragraph
            </DropdownMenuItem>
            {[2, 3, 4].map((level) => (
              <DropdownMenuItem
                key={level}
                onSelect={() =>
                  editor
                    .chain()
                    .focus()
                    .toggleHeading({ level: level as Level })
                    .run()
                }
              >
                <Heading1 className="mr-2 size-4" />
                Heading {level}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="bg-border mx-1 h-6 w-px" aria-hidden="true" />
        
        <ToolbarButton
          onMouseDown={() => editor.chain().focus().setHorizontalRule().run()}
          icon={MinusSquare}
          isActive={() => false}
          tooltip="Insert Horizontal Line"
        />
        <ToolbarButton
          onMouseDown={toggleLink}
          icon={LinkIcon}
          isActive={() => editor.isActive("link")}
          tooltip={editor.isActive("link") ? "Remove Link" : "Add Link"}
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={editor.isActive("table") ? "bg-muted" : ""}
            >
              <TableIcon className="size-4" />
              <span className="sr-only">Table</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={insertTable}>
              <TableIcon className="mr-2 size-4" />
              Insert Table
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={addColumnBefore}>
              <ColumnsIcon className="mr-2 size-4" />
              Add Column Before
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={addColumnAfter}>
              <ColumnsIcon className="mr-2 size-4" />
              Add Column After
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={deleteColumn}>
              <ColumnsIcon className="mr-2 size-4" />
              Delete Column
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={addRowBefore}>
              <RowsIcon className="mr-2 size-4" />
              Add Row Before
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={addRowAfter}>
              <RowsIcon className="mr-2 size-4" />
              Add Row After
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={deleteRow}>
              <RowsIcon className="mr-2 size-4" />
              Delete Row
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={deleteTable}>
              <Trash2 className="mr-2 size-4" />
              Delete Table
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={mergeCells}>
              <ColumnsIcon className="mr-2 size-4" />
              Merge Cells
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={splitCell}>
              <ColumnsIcon className="mr-2 size-4" />
              Split Cell
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={fixTables}>
              <ColumnsIcon className="mr-2 size-4" />
              Fix Tables
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="bg-border mx-1 h-6 w-px" aria-hidden="true" />
        <ToolbarButton
          onMouseDown={() => editor.chain().focus().undo().run()}
          icon={Undo}
          isActive={() => false}
          tooltip="Undo"
        />
        <ToolbarButton
          onMouseDown={() => editor.chain().focus().redo().run()}
          icon={Redo}
          isActive={() => false}
          tooltip="Redo"
        />
        <div className="bg-border mx-1 h-6 w-px" aria-hidden="true" />
        {isPending && <div className="flex gap-2 animate-pulse">
          Saving...
        </div>}
      </div>
      
    </>
  );
};

export default TiptapEditor;
