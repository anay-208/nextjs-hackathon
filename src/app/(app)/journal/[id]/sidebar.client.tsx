"use client"

import { useParams } from "next/navigation"
import { SidebarItemBase } from "./sidebar"
import Link from "next/link"
import JournalPinned from "./pin.client"

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
      <Link href={`/journal/${ props.id }`} className="absolute opacity-0 inset-0 z-10">
        {props.title}
      </Link>
      <div className="grow min-w-0 overflow-hidden text-ellipsis relative">
        {props.title}
      </div>
      <JournalPinned
        isPinned={props.is_pinned}
        journalID={props.id}
      />
    </SidebarItemBase>
  )
}