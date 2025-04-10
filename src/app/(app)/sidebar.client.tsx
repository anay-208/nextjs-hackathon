"use client"

import { usePathname } from "next/navigation"
import type { ComponentProps, ReactNode } from "react"
import { SidebarButtonBase } from "./sidebar"

export function SidebarButton(props: ComponentProps<"div"> & {
  icon: ReactNode
  label: string
  href: string
}) {
  const path = usePathname()
  const isActive = (href: string) => path.startsWith(href)

  return (
    <SidebarButtonBase
      icon={props.icon}
      label={props.label}
      href={props.href}
      data-active={isActive(props.href)}
    />
  )
}