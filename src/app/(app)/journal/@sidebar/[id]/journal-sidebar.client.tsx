"use client"

import { useParams } from "next/navigation"
import { SidebarItemBase } from "./journal-sidebar"
import Link from "next/link"
import JournalPinned from "../../[id]/pin.client"
import { Plus } from "lucide-react"
import { useTransition } from "react"
import { cn } from "@/lib/utils"
import { createJournal } from "@/app/api/journal/actions"
import { toast } from "sonner"

export function SidebarJournalItemListClient(
  props: {
    id: string,
    title: string | null,
    label: string,
    is_pinned: boolean,
  }
) {

  const isActive = useParams().id === props.id

  return (
    <SidebarItemBase key={props.id} data-active={isActive}>
      <Link href={`/journal/${ props.id }`} className="absolute opacity-0 inset-0 z-10"></Link>
      <div className="grow min-w-0 overflow-hidden text-ellipsis relative">
        {props.title || <span className="text-muted">Untitled Entry</span>}
      </div>
      <JournalPinned
        isPinned={props.is_pinned}
        journalID={props.id}
      />
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