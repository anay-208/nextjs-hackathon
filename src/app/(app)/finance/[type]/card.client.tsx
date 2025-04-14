"use client";

import { TransactionItem } from "@/app/api/finance/types";
import { useTransactionDrawer } from "@/components/transaction-drawer/context";
import { Loader2, Pen, Trash2 } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { deleteTransaction } from "@/app/api/finance/actions";

export function TransactionCard({ data }: { data: TransactionItem }) {
  const { openTransactionDrawer } = useTransactionDrawer();

  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <div className="flex h-full w-full flex-row items-start justify-between gap-4 border-2 border-red-500 p-2">
      <div className="flex h-fit w-fit flex-col items-start justify-start gap-4">
        <div className="flex h-fit w-fit flex-col items-start justify-start">
          <p>Label:</p>
          <p className="text-fg2 text-lg font-bold">{data.label}</p>
        </div>
        <div className="flex h-fit w-fit flex-col items-start justify-start">
          <p>Amount:</p>
          <p className="text-fg2 text-lg font-bold">{data.amount}</p>
        </div>
        <div className="flex h-fit w-fit flex-col items-start justify-start">
          <p className="text-fg2 text-lg font-bold">
            {data.category?.label ?? "Uncategorized"}
          </p>
        </div>
        <div className="flex h-fit w-fit flex-col items-start justify-start">
          <p>Created At:</p>
          <p className="text-fg2 text-lg font-bold">
            {data.created_at.toDateString()}
          </p>
        </div>
      </div>
      <div className="flex h-full w-fit flex-col items-center justify-center gap-4">
        <button
          onClick={() => {
            openTransactionDrawer({
              originalTransaction: data,
            });
          }}
        >
          <Pen className="size-8 text-blue-500" />
        </button>
        <button
          className="size-5"
          onClick={() => {
            startTransition(async () => {
              toast.promise(deleteTransaction(data.id), {
                loading: "Deleting transaction...",
                success: "Transaction deleted!",
                error: "Failed to delete transaction",
              });
              router.refresh();
            });
          }}
          disabled={isPending}
        >
          {isPending ? (
            <Loader2 className="size-8 animate-spin text-blue-500" />
          ) : (
            <Trash2 className="size-8 text-red-500" />
          )}
        </button>
      </div>
    </div>
  );
}
