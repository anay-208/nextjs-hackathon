import * as React from "react";
import { cn } from "@/lib/utils";
import { InputClassName } from "./input";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(InputClassName, "min-h-16", className)}
      {...props}
    />
  );
}

export { Textarea };
