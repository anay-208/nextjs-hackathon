"use client";

import * as React from "react";
import { Check } from "lucide-react";
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandEmpty,
} from "cmdk";
import { getTransactionPresets } from "@/app/api/finance/actions";
import { cn } from "@/lib/utils";

export function PresetsClient({
  presets,
}: {
  presets: NonNullable<
    Awaited<ReturnType<typeof getTransactionPresets>>["data"]
  >;
}) {
  const [value, setValue] = React.useState("");

  return (
    <Command className="flex h-[30svh] w-full flex-col rounded-md border p-2 shadow-sm">
      <CommandInput
        placeholder="Search preset..."
        className="mb-2 h-9 rounded-md border px-2"
      />
      <CommandList className="overflow-y-auto">
        <CommandEmpty>No preset found.</CommandEmpty>
        {presets.map((p) => (
          <CommandItem
            key={p.id}
            value={p.label}
            onSelect={(currentValue) => {
              setValue(currentValue === value ? "" : currentValue);
            }}
            className="hover:bg-muted flex cursor-pointer items-center justify-between rounded px-2 py-1"
          >
            {p.label}
            <Check
              className={cn(
                "text-muted-foreground ml-2 h-4 w-4 transition-opacity",
                value === p.label ? "opacity-100" : "opacity-0",
              )}
            />
          </CommandItem>
        ))}
      </CommandList>
    </Command>
  );
}
