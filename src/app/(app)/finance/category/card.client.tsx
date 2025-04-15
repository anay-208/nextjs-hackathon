"use client";

import { CategoryItem } from "@/app/api/finance/types";
import { Loader2, Pen, Trash2 } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { deleteCategory } from "@/app/api/finance/actions";
import Link from "next/link";
import { useCategoryDialog } from "@/components/category/context";
import { Button } from "@/components/ui/button";

export function CategoryCard({ data }: { data: CategoryItem }) {
  const [isPending, startTransition] = useTransition();
  const { openDialog } = useCategoryDialog();
  const router = useRouter();
  return (
    <div className="flex h-full w-full flex-row items-start justify-between gap-4 border-2 border-red-500 p-2">
      <div className="flex h-fit w-fit flex-col items-start justify-start gap-4">
        <div className="flex h-fit w-fit flex-col items-start justify-start">
          <p>Label:</p>
          <p className="text-fg2 text-lg font-bold">{data.label}</p>
        </div>
        <div className="flex h-fit w-fit flex-col items-start justify-start">
          <p>Budget:</p>
          <p className="text-fg2 text-lg font-bold">{data.budget}</p>
        </div>
        <div className="flex h-fit w-fit flex-col items-start justify-start">
          <p>Created At:</p>
          <p className="text-fg2 text-lg font-bold">
            {data.created_at.toDateString()}
          </p>
        </div>
        <Button asChild>
          <Link href={`/finance/category/${data.id}`}>View Transactions</Link>
        </Button>
      </div>
      <div className="flex h-full w-fit flex-col items-center justify-center gap-4">
        <button
          onClick={() => {
            openDialog({
              originalCategory: data,
            });
          }}
        >
          <Pen className="size-8 text-blue-500" />
        </button>
        <button
          className="size-5"
          onClick={() => {
            startTransition(async () => {
              toast.promise(deleteCategory(data.id), {
                loading: "Deleting category...",
                success: "Category deleted!",
                error: "Failed to delete category",
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
