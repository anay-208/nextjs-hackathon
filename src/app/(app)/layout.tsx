import { Suspense, type ReactNode } from "react"
import { SidebarItems } from "./sidebar.client"

export default function AppLayout(props: {
  children: ReactNode
}) {
  return (
    <div className="bg-infer-bg h-screen flex *:min-w-0 tracking-tight text-foreground overflow-clip"
      style={{
        "--bg": "color-mix(in oklab, var(--color-main-4) 5%, transparent)",
      }}
    >

      {/* Main Sidebar */}
      <SidebarItems />

      {/* Content */}
      <div className="grow p-2 pl-0 flex flex-col min-h-0">
        <div className="grow rounded-lg bg-bg p-(--p) min-h-0 overflow-auto"
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




