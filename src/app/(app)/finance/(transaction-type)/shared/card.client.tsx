"use client";

import { deleteTransaction } from "@/actions/finance/actions";
import { TransactionItem } from "@/actions/finance/types";
import { useTransactionDrawer } from "@/components/transaction-drawer/context";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
export function NewTransactionCard({ type }: { type: "expense" | "income" }) {
  const { openTransactionDrawer } = useTransactionDrawer();
  return (
    <Button
      asChild
      variant="ghost"
      onClick={() => {
        openTransactionDrawer({
          originalTransaction: {
            id: "",
            label: "",
            amount: 0,
            type: type,
            notes: "",
            category_id: "",
            is_preset: false,
            category: { label: "", budget: 0 },
            created_at: new Date(),
          },
        });
      }}
    >
      <Card className="border-border animate-card-insert flex h-full flex-col items-center justify-center gap-4 border transition-shadow hover:shadow-md">
        <Plus className="text-main-4/40 size-6" />
        <p className="text-lg font-semibold">Create New</p>
      </Card>
    </Button>
  );
}
export function TransactionCard({ data }: { data: TransactionItem }) {
  const { openTransactionDrawer } = useTransactionDrawer();

  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <Card
      key={data.id}
      className="border-border animate-card-insert h-full border shadow-sm transition-shadow hover:shadow-md"
    >
      <CardHeader className="border-border bg-hover border-b p-4 pb-2">
        <div className="flex flex-col gap-1">
          <div className="text-fg-2 text-sm">Label:</div>
          <h3 className="text-main-0 truncate text-lg font-medium">
            {data.label}
          </h3>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 p-4">
        <div>
          <div className="text-fg-2 text-sm">Amount:</div>
          <div className="text-primary text-xl font-semibold">
            {data.amount.toFixed(2)}
          </div>
        </div>

        <div>
          <div className="text-fg-2 text-sm">Notes:</div>
          <p className="text-main-1 line-clamp-3 text-base">{data.notes}</p>
        </div>

        <div>
          <div className="text-fg-2 text-sm">Category:</div>
          <div className="text-main-1 text-base">
            {data.category?.label ?? "Uncategorized"}
          </div>
        </div>

        <div>
          <div className="text-fg-2 text-sm">Created At:</div>
          <div className="text-main-1 text-base">
            {data.created_at.toLocaleString()}
          </div>
        </div>
      </CardContent>
      <CardFooter className="mt-auto flex justify-end gap-2 p-3 pt-0">
        <Button
          onClick={() => {
            openTransactionDrawer({
              originalTransaction: data,
            });
          }}
          variant="ghost"
          size="icon"
          className="text-main-3 hover:text-primary hover:bg-hover clickable h-8 w-8"
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => {
            startTransition(() => {
              toast.promise(deleteTransaction(data.id), {
                loading: "Deleting Transaction...",
                success: "Transaction Deleted!",
                error: "Failed to delete transaction",
              });
              router.refresh();
            });
          }}
          variant="ghost"
          size="icon"
          className="text-destroy hover:bg-hover clickable h-8 w-8"
        >
          {isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Trash2 className="h-4 w-4" />
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
