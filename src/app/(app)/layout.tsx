import { Suspense, type ReactNode } from "react";
import { MainSidebar } from "./sidebar";
import { cn } from "@/lib/utils";
import Providers from "../providers";

export default function AppLayout(props: { children: ReactNode }) {
  return (
    <Providers>
      <div
        id="app-layout"
        className={cn(
          "text-foreground flex h-screen overflow-clip bg-(--bg) tracking-tight *:min-w-0",
          "data-[setting-open]:pointer-events-none",
          "group/root",
        )}
        style={{
          "--bg": "color-mix(in oklab, var(--color-main-4) 5%, transparent)",
        }}
      >
        <div
          id="app-layout-content"
          className={cn(
            "flex grow transition-[scale] *:min-w-0 group-data-[setting-open]/root:scale-90",
          )}
        >
          {/* Main Sidebar */}
          <Suspense>
            <MainSidebar />
          </Suspense>

          {/* Content */}
          <div className="flex min-h-0 grow flex-col p-2 pl-0">
            <div
              className="bg-bg flex min-h-0 grow flex-col overflow-auto rounded-lg p-(--p)"
              style={{
                "--p": "1rem",
              }}
            >
              <Suspense>{props.children}</Suspense>
            </div>
          </div>
        </div>
      </div>
    </Providers>
  );
}
