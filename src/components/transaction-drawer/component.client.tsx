"use client";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTransactionDrawer } from "./context";
import {
  createTransaction,
  getCategories,
  getTransactionPresets,
  listTransactions,
  updateTransaction,
} from "@/app/api/finance/actions";
import { useEffect, useState, useTransition } from "react";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "cmdk";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useCategoryDialog } from "../category/context";
import {
  CategoryData,
  TransactionItemWithOptionalDate,
  TransactionPresetsData,
  TransactionsData,
} from "@/app/api/finance/types";

export default function GlobalDrawerClient({
  categories,
  transactions,
  presets,
}: {
  categories: CategoryData;
  transactions: TransactionsData;
  presets: TransactionPresetsData;
}) {
  const { isOpen, data, closeTransactionDrawer } = useTransactionDrawer();
  const { originalTransaction } = data;
  const { openDialog } = useCategoryDialog();
  const [transaction, setTransaction] =
    useState<TransactionItemWithOptionalDate>({
      id: "",
      label: "",
      amount: 0,
      type: "expense",
      notes: "",
      category_id: "",
      is_preset: false,
      category: { label: "", budget: 0 },
    });
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  useEffect(() => {
    if (originalTransaction) {
      setTransaction(originalTransaction);
    }
  }, [originalTransaction]);
  return (
    <Drawer open={isOpen} onOpenChange={closeTransactionDrawer}>
      <DrawerContent className="flex h-[70svh] w-full flex-col items-center justify-center">
        <DrawerHeader>
          <DrawerTitle className="text-3xl font-bold">
            Create a new transaction
          </DrawerTitle>
        </DrawerHeader>
        <div className="flex h-full w-full flex-row items-center justify-start gap-4 px-3">
          <div className="flex h-full w-full flex-col items-start justify-start gap-4">
            <div className="flex h-fit w-fit flex-col items-start justify-start">
              <p>Label:</p>
              <input
                className="h-fit w-full border-2 border-red-500 focus:outline-none"
                type="text"
                name="label"
                placeholder="Transaction Label"
                value={transaction?.label}
                onChange={(e) => {
                  setTransaction({ ...transaction, label: e.target.value });
                }}
                required
                maxLength={100}
                autoFocus
              />
            </div>
            <div className="flex h-fit w-fit flex-col items-start justify-start">
              <p>Note:</p>
              <textarea
                className="h-fit w-full border-2 border-red-500 focus:outline-none"
                name="note"
                placeholder="Transaction Note"
                value={transaction?.notes ?? ""}
                onChange={(e) => {
                  setTransaction({ ...transaction, notes: e.target.value });
                }}
              />
            </div>
            <div className="flex h-fit w-fit flex-col items-start justify-start">
              <p>Amount:</p>
              <input
                className="h-fit w-full border-2 border-red-500 focus:outline-none"
                type="number"
                name="amount"
                placeholder="Transaction Amount"
                value={transaction?.amount}
                onChange={(e) => {
                  setTransaction({
                    ...transaction,
                    amount: Number(e.target.value),
                  });
                }}
                required
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger>
                {transaction?.category?.label ?? "Uncategorized"}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Available Categories</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onSelect={() => {
                    openDialog();
                  }}
                >
                  Create new
                </DropdownMenuItem>
                {categories.map((t) => (
                  <DropdownMenuItem
                    key={t.id}
                    onSelect={() => {
                      setTransaction({ ...transaction, category: t });
                    }}
                  >
                    {t.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger>
                {transaction.type === "income" ? "Income" : "Expense"}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>
                  Available Transaction Types
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onSelect={() => {
                    setTransaction({ ...transaction, type: "income" });
                  }}
                >
                  Income
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() => {
                    setTransaction({ ...transaction, type: "expense" });
                  }}
                >
                  Expense
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex h-full w-full flex-col items-center justify-start gap-10">
            <Command className="flex h-[20svh] w-full flex-col rounded-md border p-2 shadow-sm">
              <form className="flex h-9 w-full flex-row items-center justify-start gap-2 rounded-md border px-2">
                <CommandInput className="w-full" placeholder="Search preset" />
              </form>
              <CommandList className="overflow-y-auto">
                <CommandEmpty>No preset found.</CommandEmpty>
                {presets.map((p) => (
                  <CommandItem
                    key={p.id}
                    value={p.label}
                    onSelect={async (currentValue) => {
                      const presetData = presets.find(
                        (t) => t.label === currentValue,
                      )!;
                      setTransaction({
                        id: "",
                        label: presetData.label,
                        amount: presetData.amount,
                        type: presetData.type,
                        notes: presetData.notes,
                        category: presetData.category,
                        category_id: presetData.category_id,
                        created_at: presetData.created_at,
                        is_preset: true,
                      });
                    }}
                    className="hover:bg-muted flex cursor-pointer items-center justify-between rounded px-2 py-1"
                  >
                    {p.label}
                  </CommandItem>
                ))}
              </CommandList>
            </Command>
            <Command className="flex h-[20svh] w-full flex-col rounded-md border p-2 shadow-sm">
              <form className="flex h-9 w-full flex-row items-center justify-start gap-2 rounded-md border px-2">
                <CommandInput
                  className="w-full"
                  placeholder="Search recent transactions"
                />
              </form>
              <CommandList className="overflow-y-auto">
                <CommandEmpty>No transactions found.</CommandEmpty>
                {transactions.map((t) => (
                  <CommandItem
                    key={t.id}
                    value={t.label}
                    onSelect={async (currentValue) => {
                      const transactionData = transactions.find(
                        (t) => t.label === currentValue,
                      )!;
                      setTransaction(transactionData);
                    }}
                    className="hover:bg-muted flex cursor-pointer items-center justify-between rounded px-2 py-1"
                  >
                    {t.label}
                  </CommandItem>
                ))}
              </CommandList>
            </Command>
          </div>
        </div>
        <DrawerFooter className="flex h-fit w-full flex-row items-center justify-center gap-4">
          <Button
            disabled={isPending}
            onClick={() => {
              if (!transaction.amount) {
                toast.error("Please enter an amount");
                return;
              }
              if (!transaction.label) {
                toast.error("Please enter a label");
                return;
              }
              if (!transaction.type) {
                toast.error("Please select a transaction type");
                return;
              }
              if (transaction.id) {
                startTransition(async () => {
                  toast.promise(
                    updateTransaction(transaction.id, {
                      label: transaction.label,
                      amount: transaction.amount,
                      type: transaction.type,
                      notes: transaction.notes ?? "",
                      category_id: transaction.category_id ?? "",
                    }),
                    {
                      loading: "Updating transaction...",
                      success: "Transaction updated!",
                      error: "Failed to update transaction",
                    },
                  );
                  router.refresh();
                  closeTransactionDrawer();
                });
              } else {
                startTransition(async () => {
                  toast.promise(
                    createTransaction({
                      label: transaction.label!,
                      amount: transaction.amount!,
                      type: transaction.type!,
                      notes: transaction.notes ?? "",
                      category_id: transaction.category_id ?? "",
                    }),
                    {
                      loading: "Saving transaction...",
                      success: "Transaction saved!",
                      error: "Failed to save transaction",
                    },
                  );
                  router.refresh();
                  closeTransactionDrawer();
                });
              }
            }}
          >
            Submit
          </Button>
          <DrawerClose asChild>
            <Button disabled={isPending} variant="outline">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
