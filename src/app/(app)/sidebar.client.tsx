"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import type { ComponentProps, ReactNode, SVGProps } from "react"

export function SidebarItems() {

  const path = usePathname()
  const isActive = (href: string) => path.startsWith(href)


  return (
    <div className="flex flex-col px-3 self-stretch items-center pt-4 pb-4 gap-1 shrink-0">
      <div className="p-1">
        <AppIcon className="size-8" />
      </div>
      <hr className="my-2 border border-black/10 self-stretch" />
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
            icon={<item.icon className="size-6" />}
            label={item.label}
            active={isActive(item.href)}
          />
        )
      })}
      <div className="grow" />
      <SidebarButton
        href={'#'}
        icon={<MaterialSymbolsLightSettings className="size-6" />}
        label={"Settings"}
      />
    </div>
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
        "size-10 flex items-center justify-center rounded-md text-[#89899788] clickable transition-transform",
        props.active ? "bg-[#49496018] text-[#494960]" : "hover:bg-[#49496011]"
      )}
    >
      {props.icon}
    </Link>
  )
}

export function MaterialSymbolsLightHomeRounded(props: SVGProps<SVGSVGElement>) {
  return (<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>{/* Icon from Material Symbols Light by Google - https://github.com/google/material-design-icons/blob/master/LICENSE */}<path fill="currentColor" d="M5 19v-8.692q0-.384.172-.727t.474-.565l5.385-4.078q.423-.323.966-.323t.972.323l5.385 4.077q.303.222.474.566q.172.343.172.727V19q0 .402-.299.701T18 20h-3.384q-.344 0-.576-.232q-.232-.233-.232-.576v-4.769q0-.343-.232-.575q-.233-.233-.576-.233h-2q-.343 0-.575.233q-.233.232-.233.575v4.77q0 .343-.232.575T9.385 20H6q-.402 0-.701-.299T5 19"></path></svg>)
}
export function MaterialSymbolsBook2(props: SVGProps<SVGSVGElement>) {
  return (<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>{/* Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE */}<path fill="currentColor" d="M7.5 22q-1.45 0-2.475-1.025T4 18.5v-13q0-1.45 1.025-2.475T7.5 2H20v15q-.625 0-1.062.438T18.5 18.5t.438 1.063T20 20v2zm.5-7h2V4H8zm-.5 5h9.325q-.15-.35-.237-.712T16.5 18.5q0-.4.075-.775t.25-.725H7.5q-.65 0-1.075.438T6 18.5q0 .65.425 1.075T7.5 20"></path></svg>)
}
export function MaterialSymbolsLightSettings(props: SVGProps<SVGSVGElement>) {
  return (<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>{/* Icon from Material Symbols Light by Google - https://github.com/google/material-design-icons/blob/master/LICENSE */}<path fill="currentColor" d="m10.135 21l-.362-2.892q-.479-.145-1.035-.454q-.557-.31-.947-.664l-2.668 1.135l-1.865-3.25l2.306-1.739q-.045-.27-.073-.558q-.03-.288-.03-.559q0-.252.03-.53q.028-.278.073-.626L3.258 9.126l1.865-3.212L7.771 7.03q.448-.373.97-.673q.52-.3 1.013-.464L10.134 3h3.732l.361 2.912q.575.202 1.016.463t.909.654l2.725-1.115l1.865 3.211l-2.382 1.796q.082.31.092.569t.01.51q0 .233-.02.491q-.019.259-.088.626l2.344 1.758l-1.865 3.25l-2.681-1.154q-.467.393-.94.673t-.985.445L13.866 21zm1.838-6.5q1.046 0 1.773-.727T14.473 12t-.727-1.773t-1.773-.727q-1.052 0-1.776.727T9.473 12t.724 1.773t1.776.727"></path></svg>)
}
export function AppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="102" height="102" viewBox="0 0 102 102" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M45.952 43.6C46.848 36.688 48.928 31.376 52.192 27.664C55.52 23.888 59.872 22 65.248 22C70.624 22 73.312 23.856 73.312 27.568C73.312 30.064 72.704 32.368 71.488 34.48C70.336 36.528 68.768 38.256 66.784 39.664C62.88 42.288 58.304 44.176 53.056 45.328C51.776 56.336 49.888 64.208 47.392 68.944C53.28 70.928 57.248 72.208 59.296 72.784C61.344 73.296 63.488 73.552 65.728 73.552C68.032 73.552 69.6 72.624 70.432 70.768C71.264 68.912 71.872 67.984 72.256 67.984C73.024 67.984 73.408 68.464 73.408 69.424C73.408 72.432 72.288 74.992 70.048 77.104C67.808 79.216 65.376 80.272 62.752 80.272C60.064 80.272 57.632 79.824 55.456 78.928C53.28 78.032 51.904 77.456 51.328 77.2C50.752 76.944 49.568 76.4 47.776 75.568C46.048 74.736 44.832 74.16 44.128 73.84C41.696 76.4 38.432 77.68 34.336 77.68C32.672 77.68 31.2 77.072 29.92 75.856C28.64 74.64 28 73.2 28 71.536C28 67.888 30.08 66.064 34.24 66.064C36.032 66.064 38.528 66.48 41.728 67.312C42.944 63.472 44.224 56.496 45.568 46.384C44.864 46.448 43.904 46.48 42.688 46.48C41.536 46.48 40.96 46.288 40.96 45.904C40.96 44.688 42.624 43.92 45.952 43.6ZM53.344 42.544C57.44 41.648 60.8 40.144 63.424 38.032C66.112 35.856 67.456 33.04 67.456 29.584C67.456 26.128 66.272 24.4 63.904 24.4C58.72 24.4 55.2 30.448 53.344 42.544ZM39.52 71.824C35.808 70.224 33.504 69.424 32.608 69.424C31.776 69.424 31.36 69.872 31.36 70.768C31.36 71.664 31.744 72.432 32.512 73.072C33.344 73.712 34.4 74.032 35.68 74.032C36.96 74.032 38.24 73.296 39.52 71.824Z" fill="currentColor" />
    </svg>
  )
}
