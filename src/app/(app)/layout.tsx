import type { ReactNode } from "react"
import { SidebarItems } from "./sidebar.client"

export default function AppLayout(props: {
  children: ReactNode
}) {
  return (
    <div className="bg-[#f0f0f5] h-screen flex *:min-w-0 **:border-red-500 tracking-tight text-foreground">

      {/* Main Sidebar */}
      <div className="flex flex-col px-3 self-stretch items-center pt-8 pb-4 gap-1">
        <SidebarItems />
      </div>

      {/* Content */}
      <div className="grow p-2 pl-0 flex flex-col">
        <div className="grow rounded-lg bg-white p-(--p)"
          style={{
            "--p": "1rem",
          }}
        >
          {props.children}
        </div>
      </div>

    </div>
  )
}




