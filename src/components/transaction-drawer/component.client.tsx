"use client";
import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
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
import {
  createTransaction,
  updateTransaction,
} from "@/actions/finance/actions";
import { useTransactionDrawer } from "./context";
import {
  CategoryData,
  FrontendAddTransactionInput,
  TransactionPresetsData,
  TransactionsData,
} from "@/actions/finance/types";
import { TransactionLabel } from "./ui/label";
import { TransactionAmount } from "./ui/amount";
import { TransactionCategory } from "./ui/category";
import { TransactionNote } from "./ui/note";
import { TransactionType } from "./ui/type";
import { TransactionDate } from "./ui/date";
import { TransactionTabs } from "./ui/tabs";
import { TransactionPreset } from "./ui/preset";

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
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [transaction, setTransaction] = useState<FrontendAddTransactionInput>({
    id: "",
    label: "",
    amount: 0,
    type: "expense",
    notes: "",
    category_id: "",
    is_preset: false,
  });

  useEffect(() => {
    if (!isOpen) return;
    const timeout = setTimeout(() => {
      scrollRef.current?.scrollTo({ top: 0 });
    }, 50); // let the DOM paint

    return () => clearTimeout(timeout);
  }, [isOpen]);

  useEffect(() => {
    if (originalTransaction) {
      console.log(originalTransaction);
      setTransaction(originalTransaction);
    }
  }, [originalTransaction]);

  const resetTransaction = () =>
    setTransaction({
      id: "",
      label: "",
      amount: 0,
      type: "expense",
      notes: "",
      category_id: "",
      is_preset: false,
    });

  return (
    <Sheet open={isOpen} onOpenChange={closeTransactionDrawer}>
      <SheetContent
        side="bottom"
        className="h-[70svh] w-full overflow-hidden p-0"
      >
        <div
          ref={scrollRef}
          className="flex w-full flex-col space-y-4 overflow-y-auto px-4 pt-4"
        >
          <SheetHeader className="px-0">
            <SheetTitle className="text-main-0 text-xl">
              Create a New Transaction
            </SheetTitle>
            <SheetDescription className="text-main-2">
              Enter the details of your transaction below
            </SheetDescription>
          </SheetHeader>

          <div className="w-full space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <TransactionLabel
                className="col-span-2"
                transaction={transaction}
                setTransaction={setTransaction}
              />
              <TransactionAmount
                transaction={transaction}
                setTransaction={setTransaction}
              />
            </div>
            <TransactionCategory
              transaction={transaction}
              setTransaction={setTransaction}
              categories={categories}
            />
            <TransactionNote
              transaction={transaction}
              setTransaction={setTransaction}
            />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <TransactionType
                transaction={transaction}
                setTransaction={setTransaction}
              />
              <TransactionPreset
                transaction={transaction}
                setTransaction={setTransaction}
              />
            </div>
            <TransactionTabs
              setTransaction={setTransaction}
              presets={presets}
              recent={transactions}
            />
          </div>
        </div>

        <SheetFooter className="flex h-fit w-full flex-row items-center justify-center gap-4 px-4 pt-2 pb-4">
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
              if (!transaction.category_id) {
                transaction.category_id = undefined;
              }
              if (transaction.id) {
                startTransition(async () => {
                  toast.promise(
                    updateTransaction(transaction.id!, transaction),
                    {
                      loading: "Updating transaction...",
                      success: "Transaction updated!",
                      error: "Failed to update transaction",
                    },
                  );
                  router.refresh();
                  resetTransaction();
                  closeTransactionDrawer();
                });
              } else {
                startTransition(async () => {
                  toast.promise(createTransaction(transaction), {
                    loading: "Saving transaction...",
                    success: "Transaction saved!",
                    error: "Failed to save transaction",
                  });
                  router.refresh();
                  resetTransaction();
                  closeTransactionDrawer();
                });
              }
            }}
          >
            Submit
          </Button>
          <SheetClose asChild>
            <Button
              disabled={isPending}
              variant="outline"
              onClick={resetTransaction}
            >
              Cancel
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
