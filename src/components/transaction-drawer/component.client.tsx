"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";

import { useTransactionDrawer } from "./context";
import {
  createTransaction,
  updateTransaction,
} from "@/actions/finance/actions";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  CategoryData,
  TransactionItemWithOptionalDate,
  TransactionPresetsData,
  TransactionsData,
} from "@/actions/finance/types";
import { Label } from "./ui/label";
import { Amount } from "./ui/amount";
import { Category } from "./ui/category";
import { Note } from "./ui/note";
import { TransactionType } from "./ui/type";
import { TransactionDate } from "./ui/date";

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
    <Sheet open={isOpen} onOpenChange={closeTransactionDrawer}>
      <SheetContent
        side="bottom"
        className="flex w-full flex-col items-start justify-center overflow-y-auto"
      >
        <SheetHeader>
          <SheetTitle className="text-main-0 text-xl">
            Create a new transaction
          </SheetTitle>
          <SheetDescription className="text-main-2">
            Enter the details of your transaction below
          </SheetDescription>
        </SheetHeader>
        <div className="w-full space-y-4 px-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <Label
              className="col-span-2"
              transaction={transaction}
              setTransaction={setTransaction}
            />
            <Amount transaction={transaction} setTransaction={setTransaction} />
            <TransactionDate
              transaction={transaction}
              setTransaction={setTransaction}
            />
          </div>
          <Category
            transaction={transaction}
            setTransaction={setTransaction}
            categories={categories}
          />
          <Note transaction={transaction} setTransaction={setTransaction} />
          <TransactionType
            transaction={transaction}
            setTransaction={setTransaction}
          />
        </div>
        <SheetFooter className="flex h-fit w-full flex-row items-center justify-center gap-4">
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
          <SheetClose asChild>
            <Button disabled={isPending} variant="outline">
              Cancel
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
