import { Suspense, type ReactNode } from "react"
import { MainSidebar } from "./sidebar"
import { cn } from "@/lib/utils"

export default function AppLayout(props: {
  children: ReactNode
}) {
  return (
    <div
      id="app-layout"
      className={cn(
        "bg-infer-bg h-screen flex *:min-w-0 tracking-tight text-foreground overflow-clip",
        "data-[setting-open]:pointer-events-none",
        // "data-[setting-open]:brightness-80",
        // "data-[setting-open]:brightness-80",
        "group"
      )}
      style={{
        "--bg": "color-mix(in oklab, var(--color-main-4) 5%, transparent)",
      }}
    >
      <div
        id="app-layout-content"
        className={cn(
          "flex *:min-w-0 grow group-data-[setting-open]:scale-90 transition-[scale]"
        )}
      >
        {/* Main Sidebar */}
        <Suspense>
          <MainSidebar />
        </Suspense>

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
    </div>
  )
}




