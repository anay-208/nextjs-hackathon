import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  cn(
    "shrink-0",
    "inline-flex items-center justify-center gap-2",
    "whitespace-nowrap",
    "rounded-md",
    "text-sm font-medium",
    "transition-all",
    "outline-none",

    "disabled:pointer-events-none",
    "disabled:opacity-0",

    "[&_svg]:pointer-events-none",
    "[&_svg:not([class*='size-'])]:size-4",
    "[&_svg]:shrink-0",

    "focus-visible:border-ring",
    "focus-visible:ring-ring/50",
    "focus-visible:ring-[3px]",

    "aria-invalid:ring-destructive/20",
    "dark:aria-invalid:ring-destructive/40",
    "aria-invalid:border-destructive",
  ),
  {
    variants: {
      variant: {
        default:
          cn(
            "bg-main-4 text-bg shadow-sm hover:bg-main-4/90",
          ),
        destructive:
          cn(
            "bg-destructive text-white shadow-sm hover:bg-destructive/90",
            "focus-visible:ring-destructive/20",
            "dark:focus-visible:ring-destructive/40",
            "dark:bg-destructive/60",
          ),
        outline:
          cn(
            "border",
            "bg-background shadow-sm hover:bg-accent",
            "hover:text-accent-foreground",
            "dark:bg-input/30 dark:border-input dark:hover:bg-input/50"
          ),
        secondary:
          "bg-main-4/15 text-main-4 shadow-sm hover:bg-main-4/10",
        ghost:
          "bg-main-4/0 text-secondary-foreground hover:bg-main-4/5",
          // "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button">
  & VariantProps<typeof buttonVariants>
  & {
    asChild?: boolean
  }
) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn('clickable', buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
