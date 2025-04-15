import * as React from "react";
import { cn } from "@/lib/utils";

// export the base input class
export const InputClassName = cn(
  "flex",
  "h-9 w-full min-w-0",
  "border border-input rounded-md shadow-xs transition-[color,box-shadow] outline-none",
  "bg-transparent",
  "px-3 py-1",
  "text-base",
  "md:text-sm",

  "disabled:pointer-events-none",
  "disabled:cursor-not-allowed",
  "disabled:opacity-50",

  "focus-visible:border-ring",
  "focus-visible:ring-input/50",
  "focus-visible:ring-[3px]",

  "aria-invalid:ring-destroy/20",
  "dark:aria-invalid:ring-destroy/40",
  "aria-invalid:border-destroy",

  "file:text-fg",
  "file:inline-flex",
  "file:h-7",
  "file:border-0",
  "file:bg-transparent",
  "file:text-sm",
  "file:font-medium",

  "placeholder:text-placeholder",

  "selection:bg-primary",
  "selection:text-fg",
);

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(InputClassName, className)}
      {...props}
    />
  );
}

export { Input };
