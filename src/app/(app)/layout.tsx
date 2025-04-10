import { Suspense, type ReactNode } from "react"
import { SidebarItems } from "./sidebar.client"

export default function AppLayout(props: {
  children: ReactNode
}) {
  return (
    <div className="bg-[#f0f0f5] h-screen flex *:min-w-0 tracking-tight text-foreground overflow-clip">

      {/* Main Sidebar */}
      <SidebarItems />

      {/* Content */}
      <div className="grow p-2 pl-0 flex flex-col min-h-0">
        <div className="grow rounded-lg bg-white p-(--p) min-h-0 overflow-auto"
          style={{
            "--p": "1rem",
          }}
        >
          <Suspense>
            {props.children}
          </Suspense>
        </div>
      </div>

    </div>
  )
}




