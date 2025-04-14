import type { ReactNode } from "react";
import { Sidebar } from "./[id]/journal-sidebar";

export default async function JournalSidebarLayout(props: {
  children: ReactNode
}) {
  return <div className="hidden w-(--sidebar-width) shrink-0 rounded-lg p-3 sm:block">
    <Sidebar />
    {props.children}
  </div>
}