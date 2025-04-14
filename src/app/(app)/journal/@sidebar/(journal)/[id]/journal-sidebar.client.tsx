"use client"

import { useParams, useRouter } from "next/navigation"
import { SidebarItemBase } from "./journal-sidebar"
import Link from "next/link"
import { Ellipsis, Plus } from "lucide-react"
import { startTransition, useTransition } from "react"
import { cn } from "@/lib/utils"
import { createJournal, deleteJournal, updateJournal } from "@/app/api/journal/actions"
import { toast } from "sonner"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function SidebarJournalItemListClient(
  props: {
    id: string,
    title: string | null,
    label: string,
    is_pinned: boolean,
  }
) {

  const currentJournalID = useParams().id
  const isActive = currentJournalID === props.id
  const router = useRouter()

  return (
    <SidebarItemBase key={props.id} data-active={isActive}>
      <Link href={`/journal/${ props.id }`} className="absolute opacity-0 inset-0 z-10" prefetch={true}></Link>
      <div className="grow min-w-0 overflow-hidden text-ellipsis relative">
        {props.title || <span className="text-muted">Untitled Entry</span>}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="opacity-0 group-hover:opacity-100 p-0.5 -mr-2 rounded-sm hover:bg-hover z-20 clickable">
            <Ellipsis className="size-4" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="z-20 w-56" align="start">
          <DropdownMenuItem
            onClick={() => {
              startTransition(async () => {
                await updateJournal(props.id, { is_pinned: !props.is_pinned }).then(() => { })
              })
            }}
          >
            Pin
            <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              toast.promise(
                (async () => {
                  const idRes = await deleteJournal(props.id);
                  if (props.id === currentJournalID) {
                    toast.dismiss();
                    router.push("/journal");
                  }
                  if (!idRes || !idRes.data)
                    throw new Error("Failed to delete journal");
                })(),
                {
                  loading: "Deleting journal...",
                  error: "Failed to delete journal",
                },
              );
            }}
            variant="destructive"
          >
            Delete
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarItemBase>
  )
}



//  New Entry Button

export function SidebarNewEntryButton() {
  const [pending, startTransition] = useTransition()
  return (
    <SidebarItemBase
      onClick={() => {
        startTransition(async () => {
          const res = await createJournal({})
          if (res.data) toast.success("New entry created")
          if (res.error) toast.error("Failed to create new entry")
        })
      }}
      className={cn(
        "hover:bg-primary hover:text-white/90 clickable transition-all",
        pending && "opacity-50 pointer-events-none italic",
      )}>
      <Plus className="size-4" />
      {pending ? "Creating..." : "New Entry"}
    </SidebarItemBase>
  )
} 