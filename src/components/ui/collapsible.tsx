import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

export function CollapsibleColumn({
  children, className, open,
  ...props
}: ComponentProps<"div"> & {
  open?: boolean,
}) {
  return (
    <div {...props} className={cn(
      "collapisible-column",
      "transition-all overflow-clip grid grid-cols-[0fr]", open && "grid-cols-[1fr]", className)}>
      <div className="min-w-0">
        {children}
      </div>
    </div>
  )
}

export function CollapsibleRow({
  children, className, open,
  ...props
}: ComponentProps<"div"> & {
  open?: boolean,
}) {
  return (
    <div {...props} className={cn(
      "transition-[grid-template-rows] overflow-hidden grid grid-rows-[0fr]", open && "grid-rows-[1fr]", className)}>
      <div className="min-h-0">
        {children}
      </div>
    </div>
  )
}