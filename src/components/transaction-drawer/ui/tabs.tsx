import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Search } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { cn } from "@/lib/utils";
import {
  TransactionItemWithOptionalDate,
  TransactionPresetsData,
  TransactionsData,
} from "@/actions/finance/types";

export function TransactionTabs({
  setTransaction,
  presets,
  recent,
}: {
  setTransaction: Dispatch<SetStateAction<TransactionItemWithOptionalDate>>;
  presets: TransactionPresetsData;
  recent: TransactionsData;
}) {
  return (
    <Tabs defaultValue="presets" className="w-full">
      <TabsList className="mb-4 grid w-full grid-cols-2">
        <TabsTrigger value="presets">Presets</TabsTrigger>
        <TabsTrigger value="recent">Recent Transactions</TabsTrigger>
      </TabsList>

      <TabsContent value="presets" className="space-y-4">
        <PresetsTab presets={presets} setTransaction={setTransaction} />
      </TabsContent>

      <TabsContent value="recent" className="space-y-4">
        <RecentTransactionsTab
          recent={recent}
          setTransaction={setTransaction}
        />
      </TabsContent>
    </Tabs>
  );
}

function PresetsTab({
  setTransaction,
  presets,
}: {
  setTransaction: Dispatch<SetStateAction<TransactionItemWithOptionalDate>>;
  presets: TransactionPresetsData;
}) {
  const [searchValue, setSearchValue] = useState("");

  return (
    <Command className="flex h-[300px] w-full flex-col rounded-md">
      <div className="relative">
        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[var(--color-main-2)]" />
        <CommandInput
          value={searchValue}
          onValueChange={(e) => setSearchValue(e)}
          className={cn("pl-9")}
          placeholder="Search preset"
          autoComplete="none"
        />
      </div>

      <CommandList className="flex h-full w-full flex-col overflow-y-auto">
        <div className="border-border text-main-2 flex flex-row flex-nowrap border-b py-2 text-left text-sm md:grid md:grid-cols-5">
          <div className="w-[60%] md:col-span-2 md:w-auto">Label</div>
          <div className="w-[40%] md:w-auto">Amount</div>
          <div className="hidden md:block">Category</div>
          <div className="hidden md:block">Created At</div>
        </div>

        {presets.length === 0 ? (
          <CommandEmpty className="text-main-2 py-4 text-center">
            No presets found.
          </CommandEmpty>
        ) : (
          presets
            .filter((p) =>
              p.label.toLowerCase().includes(searchValue.toLowerCase()),
            )
            .slice(0, 6)
            .map((p) => (
              <CommandItem
                key={p.id}
                value={p.label}
                onSelect={() => setTransaction({ ...p, is_preset: true })}
                className="hover:bg-hover border-border flex flex-row flex-nowrap items-center gap-0 border-t px-0 py-2 text-sm transition-colors md:grid md:grid-cols-5"
              >
                <div className="text-main-1 w-[60%] truncate px-0 md:col-span-2 md:w-auto">
                  {p.label}
                </div>
                <div className="text-main-1 w-[40%] truncate px-0 md:w-auto">
                  <span
                    className={cn("font-bold", {
                      "text-red-500": p.type === "expense",
                      "text-green-500": p.type === "income",
                    })}
                  >
                    {p.type === "expense" ? "-" : "+"}
                  </span>{" "}
                  {p.amount}
                </div>
                <div className="text-main-2 hidden truncate px-0 md:block">
                  {p.category?.label ?? "Uncategorized"}
                </div>
                <div className="text-main-2 hidden truncate px-0 md:block">
                  {p.created_at.toDateString()}
                </div>
              </CommandItem>
            ))
        )}
      </CommandList>
    </Command>
  );
}

function RecentTransactionsTab({
  setTransaction,
  recent,
}: {
  setTransaction: Dispatch<SetStateAction<TransactionItemWithOptionalDate>>;
  recent: TransactionsData;
}) {
  const [searchValue, setSearchValue] = useState("");

  return (
    <Command className="flex h-[300px] w-full flex-col rounded-md">
      <div className="relative">
        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[var(--color-main-2)]" />
        <CommandInput
          value={searchValue}
          onValueChange={(e) => setSearchValue(e)}
          className={cn("pl-9")}
          placeholder="Search recent transactions"
          autoComplete="none"
        />
      </div>

      <CommandList className="flex h-full w-full flex-col overflow-y-auto">
        <div className="border-border text-main-2 flex flex-row flex-nowrap border-b py-2 text-left text-sm md:grid md:grid-cols-5">
          <div className="w-[60%] md:col-span-2 md:w-auto">Label</div>
          <div className="w-[40%] md:w-auto">Amount</div>
          <div className="hidden md:block">Category</div>
          <div className="hidden md:block">Created At</div>
        </div>

        {recent.length === 0 ? (
          <CommandEmpty className="text-main-2 py-4 text-center">
            No recent transactions found.
          </CommandEmpty>
        ) : (
          recent
            .filter((p) =>
              p.label.toLowerCase().includes(searchValue.toLowerCase()),
            )
            .slice(0, 6)
            .map((p) => (
              <CommandItem
                key={p.id}
                value={p.label}
                onSelect={() => setTransaction(p)}
                className="hover:bg-hover border-border flex flex-row flex-nowrap items-center gap-0 border-t px-0 py-2 text-sm transition-colors md:grid md:grid-cols-5"
              >
                <div className="text-main-1 w-[60%] truncate md:col-span-2 md:w-auto">
                  {p.label}
                </div>
                <div className="text-main-1 w-[40%] truncate md:w-auto">
                  <span
                    className={cn("font-bold", {
                      "text-red-500": p.type === "expense",
                      "text-green-500": p.type === "income",
                    })}
                  >
                    {p.type === "expense" ? "-" : "+"}
                  </span>{" "}
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
