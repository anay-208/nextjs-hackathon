"use client";

import { createTransaction } from "@/actions/finance/actions";
import { TransactionPresetsData } from "@/actions/finance/types";
import { InputClassName } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "cmdk";
import { Play } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { parseInput } from "./parse";
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
    <Command className="flex h-[20svh] w-full flex-col rounded-md p-2">
      <form className="relative flex w-full items-center">
        <CommandInput
          value={searchValue}
          onValueChange={(e) => setSearchValue(e)}
          className={InputClassName}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              e.stopPropagation();
              handleSubmit();
            }
          }}
          placeholder="Search preset or type the name and amount to create a new transaction"
          autoComplete="none"
        />
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleSubmit();
          }}
          className={cn(
            "clickable",
            "hover:bg-hover text-muted hover:text-fg absolute right-1 cursor-pointer rounded-full p-1.5 transition-all duration-200 ease-in-out",
          )}
        >
          <Play size={16} />
        </button>
      </form>

      <CommandList className="flex h-full w-full flex-col overflow-y-auto">
        <div className="border-border text-main-2 flex flex-row flex-nowrap gap-2 border-b px-3 py-2 text-left text-sm md:grid md:grid-cols-4">
          <div className="w-[60%]">Label</div>
          <div className="w-[40%]">Amount</div>
          <div className="hidden md:block">Category</div>
          <div className="hidden md:block">Created At</div>
          <div className="text-right"></div>
        </div>

        <CommandEmpty className="text-main-2 py-4 text-center">
          No preset found.
        </CommandEmpty>
        {presets.length === 0 ? (
          <CommandEmpty className="text-main-2 py-4 text-center">
            No preset created.
          </CommandEmpty>
        ) : (
          presets.map((p) => (
            <CommandItem
              key={p.id}
              value={p.label}
              onSelect={async (currentValue) => {
                setValue(currentValue === value ? "" : currentValue);
                const presetData = presets.find(
                  (t) => t.label === currentValue,
                )!;

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
              className="hover:bg-hover border-border flex flex-row flex-nowrap items-center gap-2 border-t px-3 py-2 text-sm transition-colors md:grid md:grid-cols-4"
            >
              <div className="text-main-1 w-[60%] truncate md:w-auto">
                {p.label}
              </div>
              <div className="text-main-1 w-[40%] truncate md:w-auto">
                {p.amount}
              </div>
              <div className="text-main-2 hidden truncate md:block">
                {p.category?.label ?? "Uncategorized"}
              </div>
              <div className="text-main-2 hidden truncate md:block">
                {p.created_at.toDateString()}
              </div>
            </CommandItem>
          ))
        )}
      </CommandList>
    </Command>
  );
}
