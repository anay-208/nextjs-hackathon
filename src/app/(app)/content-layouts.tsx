import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

export function AppContent(props: ComponentProps<"div">) {
  return (
    <div {...props} className={cn(
      "pt-12 px-4 flex flex-col container-app-content pb-20",
      props.className,
    )} />
  )
}

export function PageLocation(props: ComponentProps<"div">) {
  return <div
    {...props}
    className={cn(
      "py-2 flex leading-none font-semibold text-muted",
      props.className
    )} />
}

export function PageTitle(props: ComponentProps<"div">) {
  return (
    <div {...props} className={cn(
      "text-5xl font-bold tracking-tight",
      props.className,
    )} />
  )
}