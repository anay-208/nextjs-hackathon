

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Suspense, type ComponentProps } from "react";
import { SidebarItemList } from "./journal-sidebar.cached";
import { SidebarNewEntryButton } from "./journal-sidebar.client";
import { route } from "@/app/routes";



export function Sidebar() {
  return (
    <div>
      <div className="mb-4 flex flex-col gap-px pt-2">
        <Link href={route.journal}>
          <SidebarItemBase className="clickable">
            <ArrowLeft className="size-4" />
            Back
          </SidebarItemBase>
        </Link>
        <SidebarNewEntryButton />
      </div>

      <div>
        <Suspense>
          <SidebarItemList />
        </Suspense>
      </div>
    </div>
  );
}





export function SidebarItemBase(props: ComponentProps<"div"> & {
  'data-active'?: boolean
}) {
  return (<div {...props} className={cn(
    "h-8",
    "group",
    "-mx-1",
    "relative",
    'group flex flex-row items-center justify-start gap-2 rounded-sm p-1.5 px-3',
    'text-sm font-semibold text-main-2/75 text-nowrap text-ellipsis',
    props['data-active'] ? "bg-main-3/18 text-fg" : "hover:bg-hover",
    props.className
  )} />)
}