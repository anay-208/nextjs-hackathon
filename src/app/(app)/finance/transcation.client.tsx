"use client";

import { deleteTransaction } from "@/actions/finance/actions";
import { useTransactionDrawer } from "@/components/transaction-drawer/context";
import { Loader2, Pen, Trash2 } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { TransactionItem } from "@/actions/finance/types";

export function ListItem({ transaction }: { transaction: TransactionItem }) {
  const { openTransactionDrawer } = useTransactionDrawer();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <div className="border-border hover:bg-hover flex w-full flex-row flex-nowrap items-center border-t py-2 text-sm transition-colors md:grid md:grid-cols-6">
      <div className="text-main-1 col-span-2 w-[50%] truncate md:w-auto">
        {transaction.label}
      </div>
      <div className="text-main-1 w-[30%] truncate md:w-auto">
        {transaction.amount}
      </div>
      <div className="text-main-2 hidden truncate md:block">
        {transaction.category?.label ?? "Uncategorized"}
      </div>
      <div className="text-main-2 hidden truncate md:block">
        {transaction.created_at.toLocaleDateString()}
      </div>
      <div className="flex justify-end gap-2">
        <button
          onClick={() => {
            openTransactionDrawer({
              originalTransaction: transaction,
            });
          }}
          className="text-main-3 hover:text-primary"
        >
          <Pen className="h-4 w-4" />
        </button>
        <button
          className="text-main-3 hover:text-destroy"
          onClick={() => {
            startTransition(async () => {
              toast.promise(deleteTransaction(transaction.id), {
                loading: "Deleting transaction...",
                success: "Transaction deleted!",
                error: "Failed to delete transaction",
              });
              router.refresh();
            });
          }}
        >
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
          ) : (
            <Trash2 className="h-4 w-4 text-red-500" />
          )}
        </button>
      </div>
    </div>
  );
}
