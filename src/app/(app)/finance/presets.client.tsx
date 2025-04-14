"use client";

import { Check, Play } from "lucide-react";
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandEmpty,
} from "cmdk";
import { createTransaction } from "@/app/api/finance/actions";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { parseInput } from "./parse";
import { useRouter } from "next/navigation";
import { TransactionPresetsData } from "@/app/api/finance/types";
import { useState } from "react";

export function PresetsClient({
  presets,
}: {
  presets: TransactionPresetsData;
}) {
  const [value, setValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();
  const handleSubmit = async () => {
    if (searchValue.length === 0) {
      toast.error("Please enter a value to create a transaction");
      return;
    }

    const result = parseInput(searchValue);
    if (!result) {
      toast.error("Please enter a valid label and amount");
      return;
    }

    const { label, amount, type } = result;
    toast.promise(
      (async () => {
        const idRes = await createTransaction({ label, amount, type });
        if (!idRes || !idRes.data)
          throw new Error("Failed to create transaction");
        router.refresh();
      })(),
      {
        loading: "Creating transaction...",
        success: () => ({ message: "Transaction created!" }),
        error: "Failed to create transaction",
      },
    );
  };

  return (
    <Command className="flex h-[30svh] w-full flex-col rounded-md border p-2 shadow-sm">
      <form className="flex h-9 w-full flex-row items-center justify-start gap-2 rounded-md border px-2">
        <CommandInput
          onValueChange={(e) => setSearchValue(e)}
          value={searchValue}
          className="w-full"
          placeholder="Search preset or type the name and amount to create a new transaction"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              e.stopPropagation();
              handleSubmit();
            }
          }}
        />
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleSubmit();
          }}
        >
          <Play className="h-5 w-5" />
        </button>
      </form>
      <CommandList className="overflow-y-auto">
        <CommandEmpty>No preset found.</CommandEmpty>
        {presets.map((p) => (
          <CommandItem
            key={p.id}
            value={p.label}
            onSelect={async (currentValue) => {
              setValue(currentValue === value ? "" : currentValue);
              const presetData = presets.find((t) => t.label === currentValue)!;

              toast.promise(
                (async () => {
                  const idRes = await createTransaction(presetData);
                  if (!idRes || !idRes.data)
                    throw new Error("Failed to create transaction");
                  router.refresh();
                })(),
                {
                  loading: "Creating transaction...",
                  success: () => ({ message: "Transaction created!" }),
                  error: "Failed to create transaction",
                },
              );
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
