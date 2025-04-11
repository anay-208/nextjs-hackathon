"use client"

import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";

export function JournalSidebarClient(props: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const { id } = params;

  return (
    <div className={cn(
      "grid grid-cols-[0fr] transition-[grid-template-columns] duration-200 ease-in-out",
      "overflow-hidden",
      id && "grid-cols-[1fr]"
    )}
      style={{
        "--sidebar-width": "13rem",
      }}
    >
      <div className="min-w-0">
        {props.children}
      </div>
    </div>
  );
}