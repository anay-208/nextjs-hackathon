"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import type { ComponentProps, ReactNode, SVGProps } from "react"

export function SidebarItems() {

  const path = usePathname()
  const isActive = (href: string) => path.startsWith(href)
  

  return (
    <>
      {[
        {
          icon: MaterialSymbolsLightHomeRounded,
          label: "Dashboard",
          href: "/dashboard",
          active: true,
        },
        {
          icon: MaterialSymbolsBook2,
          label: "Journals",
          href: "/dashboard/journal",
          active: false,
        },
      ].map((item) => {
        return (
          <SidebarButton
            key={item.label}
            href={item.href}
            icon={
              <item.icon className="size-6" />
            }
            label={item.label}
            active={isActive(item.href)}
          />
        )
      })}
      <div className="grow" />
      <SidebarButton
        href={'#'}
        icon={
          <MaterialSymbolsLightSettings className="size-6" />
        }
        label={"Settings"}
      />
    </>
  )
}

export function MaterialSymbolsLightHomeRounded(props: SVGProps<SVGSVGElement>) {
  return (<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>{/* Icon from Material Symbols Light by Google - https://github.com/google/material-design-icons/blob/master/LICENSE */}<path fill="currentColor" d="M5 19v-8.692q0-.384.172-.727t.474-.565l5.385-4.078q.423-.323.966-.323t.972.323l5.385 4.077q.303.222.474.566q.172.343.172.727V19q0 .402-.299.701T18 20h-3.384q-.344 0-.576-.232q-.232-.233-.232-.576v-4.769q0-.343-.232-.575q-.233-.233-.576-.233h-2q-.343 0-.575.233q-.233.232-.233.575v4.77q0 .343-.232.575T9.385 20H6q-.402 0-.701-.299T5 19"></path></svg>)
}
export function MaterialSymbolsBook2(props: SVGProps<SVGSVGElement>) {
  return (<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>{/* Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE */}<path fill="currentColor" d="M7.5 22q-1.45 0-2.475-1.025T4 18.5v-13q0-1.45 1.025-2.475T7.5 2H20v15q-.625 0-1.062.438T18.5 18.5t.438 1.063T20 20v2zm.5-7h2V4H8zm-.5 5h9.325q-.15-.35-.237-.712T16.5 18.5q0-.4.075-.775t.25-.725H7.5q-.65 0-1.075.438T6 18.5q0 .65.425 1.075T7.5 20"></path></svg>)
}
export function MaterialSymbolsLightSettings(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>{/* Icon from Material Symbols Light by Google - https://github.com/google/material-design-icons/blob/master/LICENSE */}<path fill="currentColor" d="m10.135 21l-.362-2.892q-.479-.145-1.035-.454q-.557-.31-.947-.664l-2.668 1.135l-1.865-3.25l2.306-1.739q-.045-.27-.073-.558q-.03-.288-.03-.559q0-.252.03-.53q.028-.278.073-.626L3.258 9.126l1.865-3.212L7.771 7.03q.448-.373.97-.673q.52-.3 1.013-.464L10.134 3h3.732l.361 2.912q.575.202 1.016.463t.909.654l2.725-1.115l1.865 3.211l-2.382 1.796q.082.31.092.569t.01.51q0 .233-.02.491q-.019.259-.088.626l2.344 1.758l-1.865 3.25l-2.681-1.154q-.467.393-.94.673t-.985.445L13.866 21zm1.838-6.5q1.046 0 1.773-.727T14.473 12t-.727-1.773t-1.773-.727q-1.052 0-1.776.727T9.473 12t.724 1.773t1.776.727"></path></svg>
  )
}

function SidebarButton(props: ComponentProps<"div"> & {
  icon: ReactNode
  label: string
  href: string
  active?: boolean
}) {
  return (
    <Link
      href={props.href}
      className={cn(
        "size-10 flex items-center justify-center rounded-xl text-[#898997] clickable transition-transform",
        props.active ? "bg-[#49496018] text-[#494960]" : "hover:bg-[#49496011]"
      )}
    >
      {props.icon}
    </Link>
  )
}