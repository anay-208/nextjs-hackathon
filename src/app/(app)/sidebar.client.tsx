"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePathname } from "next/navigation";
import type { ComponentProps, ReactNode } from "react";
import { SidebarButtonBase } from "./sidebar";

export function SidebarButton(
  props: ComponentProps<"div"> & {
    icon: ReactNode;
    label: string;
    href: string;
    tooltip: string;
  },
) {
  const path = usePathname();
  const isActive = (href: string) => path.startsWith(href);

  return (
    <>
      <TooltipProvider>
        <Tooltip delayDuration={300}>
          <TooltipTrigger asChild>
            <SidebarButtonBase
              icon={props.icon}
              label={props.label}
              href={props.href}
              data-active={isActive(props.href)}
            />
          </TooltipTrigger>
          <TooltipContent side="right" className={"text-white"}>
            <p>{props.tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
}
