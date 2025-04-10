"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useEditor, EditorContent, JSONContent } from "@tiptap/react";
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
  ImageIcon,
  NotepadTextIcon as Paragraph,
  MinusSquare,
  TableIcon,
  RowsIcon,
  ColumnsIcon,
  Trash2,
  LinkIcon,
  Undo,
  Redo,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ImageDialog } from "./image-dialog.client";
import { ConfirmDialog } from "./confirm-dialog.client";
import { NodeSelection } from "@tiptap/pm/state";

interface Props {
  onUpdate: (content: JSONContent) => void;
  editorContent: JSONContent;
  setEditorContent: React.Dispatch<React.SetStateAction<JSONContent>>;
  handlePublish: () => void;
  isPublishing: boolean;
  lastLocalSaved: string | null;
}

const TiptapEditor = ({
  onUpdate,
  editorContent,
  setEditorContent,
  handlePublish,
  isPublishing,
  lastLocalSaved,
}: Props) => {
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [imageToDelete, setImageToDelete] = useState<string | null>(null);

  const editor = useEditor({
    editable: !isPublishing,
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
          class: "tiptap-table",
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
    ],
    content: editorContent,
    onUpdate: ({ editor }) => {
      const content = editor.getJSON();
      setEditorContent(content);
      onUpdate(content);
    },
    editorProps: {
      attributes: {
        class: "prose dark:prose-invert max-w-none focus:outline-none",
      },
      handleKeyDown: (view, event) => {
        const { state } = view;
        const { selection } = state;

        console.log("Key:", event.key);
        console.log("Selection type:", selection.constructor.name);
        console.log("Selection:", selection);

        if (
          selection instanceof NodeSelection &&
          selection.node.type.name === "image"
        ) {
          console.log("NodeSelection delete triggered");
          event.preventDefault();
          console.log("Image to delete:", selection.node.attrs.src);
          setImageToDelete(selection.node.attrs.src);
          setIsConfirmDialogOpen(true);
          return true;
        }

        if (
          selection.empty &&
          (event.key === "Backspace" || event.key === "Delete")
        ) {
          const $pos = state.doc.resolve(selection.anchor);
          console.log("Caret position:", selection.anchor);
          console.log("Node before:", $pos.nodeBefore);
          console.log("Node after:", $pos.nodeAfter);

          const imageNode =
            event.key === "Backspace" ? $pos.nodeBefore : $pos.nodeAfter;

          if (imageNode && imageNode.type.name === "image") {
            console.log("Caret-based delete triggered");
            event.preventDefault();
            console.log("Image to delete:", imageNode.attrs.src);
            setImageToDelete(imageNode.attrs.src);
            setIsConfirmDialogOpen(true);
            return true;
          }
        }

        console.log("No image delete triggered");
        return false;
      },
    },
  });

  const handleImageInsert = useCallback(
    (file: File, alt: string) => {
      if (!editor) return;

      const objectUrl = URL.createObjectURL(file);

      editor.chain().focus().setImage({ src: objectUrl, alt }).run();

      const uploadImage = async (file: File): Promise<string> => {
        await new Promise((res) => setTimeout(res, 1000));
        return "https://images2.alphacoders.com/113/1130463.png";
      };

      uploadImage(file).then((uploadedUrl) => {
        editor.chain().focus().setImage({ src: uploadedUrl, alt }).run();

        URL.revokeObjectURL(objectUrl);
      });
    },
    [editor],
  );

  const handleImageDelete = useCallback(() => {
    if (!editor) return;

    // Get the current selection
    const { state } = editor;
    const { selection } = state;
    const node = state.doc.nodeAt(selection.from);

    if (node?.type.name === "image") {
      const imageUrl = node.attrs.src;
      console.log("Deleting image with URL:", imageUrl);

      // TODO: Delete from bucket using this URL
      // await deleteFromBucket(imageUrl);
    }

    editor.chain().focus().deleteSelection().run();
    setImageToDelete(null);
    setIsConfirmDialogOpen(false);
  }, [editor, imageToDelete]);

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

  function LocalSaveStatus({
    lastLocalSaved,
  }: {
    lastLocalSaved: string | null;
  }) {
    const [secondsAgo, setSecondsAgo] = useState<number | null>(null);

    useEffect(() => {
      if (!lastLocalSaved) return;

      const update = () => {
        const saved = new Date(lastLocalSaved).getTime();
        const now = Date.now();
        setSecondsAgo(Math.floor((now - saved) / 1000));
      };

      update(); // initial update
      const interval = setInterval(update, 1000);

      return () => clearInterval(interval);
    }, [lastLocalSaved]);

    return (
      <Button
        variant="outline"
        className="pointer-events-none select-none"
        asChild
        title="Changes saved locally"
      >
        <div>
          {secondsAgo !== null ? <p>{secondsAgo}s ago</p> : <p>-</p>}
          <span className="sr-only">Changes saved locally</span>
        </div>
      </Button>
    );
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
  }) => (
    <Button
      variant="ghost"
      size="icon"
      onMouseDown={(e) => {
        e.preventDefault();
        onMouseDown();
      }}
      className={`${isActive() ? "bg-primary text-primary-foreground" : ""} hover:bg-primary transition-colors`}
      title={tooltip}
    >
      <Icon className="size-4" />
      <span className="sr-only">{tooltip}</span>
    </Button>
  );

  return (
    <div className="relative h-full overflow-hidden">
      <EditorContent
        editor={editor}
        className="h-full w-full max-w-none pb-16 focus:outline-none"
      />
      <div className="border-accent-foreground absolute right-0 bottom-2 left-0 flex w-full flex-wrap items-center gap-1 rounded-lg border-2 p-2">
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
          onMouseDown={() => setIsImageDialogOpen(true)}
          icon={ImageIcon}
          isActive={() => false}
          tooltip="Insert Image"
        />
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
        <LocalSaveStatus lastLocalSaved={lastLocalSaved} />

        <ToolbarButton
          onMouseDown={handlePublish}
          icon={CheckCircle}
          isActive={() => isPublishing}
          tooltip="Save"
        />
      </div>
      <ImageDialog
        isOpen={isImageDialogOpen}
        onClose={() => setIsImageDialogOpen(false)}
        onInsert={handleImageInsert}
      />
      <ConfirmDialog
        isOpen={isConfirmDialogOpen}
        onClose={() => {
          setImageToDelete(null);
          setIsConfirmDialogOpen(false);
        }}
        onConfirm={handleImageDelete}
        title="Delete Image"
        message="Are you sure you want to delete this image? This action cannot be undone."
      />
    </div>
  );
};

export default TiptapEditor;
