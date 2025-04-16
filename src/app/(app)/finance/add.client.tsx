"use client";

import { useCategoryDialog } from "@/components/category/context";
import { useTransactionDrawer } from "@/components/transaction-drawer/context";
import { Button } from "@/components/ui/button";

export function AddButtons() {
  const { openTransactionDrawer } = useTransactionDrawer();
  const { openDialog } = useCategoryDialog();
  return (
    <div className="flex w-full flex-col items-center justify-center gap-8 md:w-fit md:flex-row">
      <Button
        onClick={() => {
          openTransactionDrawer();
        }}
        variant={"secondary"}
        className="w-full md:w-fit"
      >
        Add Transaction
      </Button>
      <Button
        onClick={() => {
          openDialog();
        }}
        variant={"secondary"}
        className="w-full md:w-fit"
      >
        Add Category
      </Button>
    </div>
  );
}
