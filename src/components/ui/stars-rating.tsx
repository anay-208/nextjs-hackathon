import { cn } from "@/lib/utils"
import type { SVGProps } from "react"

export function StarRating(props: {
  value?: number
  onClick?: (rating: number) => void | Promise<void>
}) {
  // generate 5 stars
  return (
    <div className="flex flex-row-reverse self-start">
      {Array.from({ length: 5 }, (_, i) => (
        <div
          key={i}
          onClick={() => {
            props.onClick?.(5 - i)
          }}
          data-active={(5 - i) === props.value ? "" : undefined}
          className={cn(
            "cursor-pointer",
            "flex px-0.5 text-muted/25 ",
            "peer",
            "hover:text-yellow-500/80 peer-hover:text-yellow-500/80",
            "data-active:text-yellow-500/80 peer-data-active:text-yellow-500/80",
            "hover:scale-150 hover:rotate-6 transition-all",
          )}>
          <MaterialSymbolsKidStarSharp className="size-4.5" />
        </div>
      ))}
    </div>
  )
}



export function MaterialSymbolsKidStarSharp(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>{/* Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE */}<path fill="currentColor" d="M7.625 6.4L12 .725L16.375 6.4l6.85 2.3l-4.325 6.125l.175 6.825L12 19.675L4.925 21.65L5.1 14.8L.8 8.7z"></path></svg>
  )
}