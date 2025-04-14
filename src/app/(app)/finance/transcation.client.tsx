"use client";

import {
  deleteTransaction,
  getTransactionsByTimeRange,
} from "@/app/api/finance/actions";
import { useTransactionDrawer } from "@/components/transaction-drawer/context";
import { Loader2, Pen, Trash2 } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function ListItem({
  transaction,
}: {
  transaction: NonNullable<
    Awaited<ReturnType<typeof getTransactionsByTimeRange>>["data"]
  >[number];
}) {
  const { openTransactionDrawer } = useTransactionDrawer();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <div className="flex h-fit w-full flex-row items-center justify-start gap-2">
      <div className="flex h-full w-[30%] flex-col items-start justify-start gap-1">
        <p>Label:</p>
        {transaction.label}
      </div>
      <div className="flex h-full w-[20%] flex-col items-start justify-start gap-1">
        <p>Amount:</p>
        {transaction.amount}
      </div>
      <div className="flex h-full w-[20%] flex-col items-start justify-start gap-1">
        <p>Category:</p>
        {transaction.category?.label ?? "Uncategorized"}
      </div>
      <div className="flex h-full w-[20%] flex-col items-start justify-start gap-1">
        <p>Created At:</p>
        {transaction.created_at.toLocaleDateString()}
      </div>
      <div className="flex h-full w-[10%] flex-row items-center justify-center gap-1">
        <button
          onClick={() => {
            openTransactionDrawer({
              originalTransaction: transaction,
            });
          }}
        >
          <Pen className="size-4" />
        </button>
        <button
          className="size-5"
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
            <Loader2 className="size-4 animate-spin text-blue-500" />
          ) : (
            <Trash2 className="size-4 text-red-500" />
          )}
        </button>
      </div>
    </div>
  );
}
