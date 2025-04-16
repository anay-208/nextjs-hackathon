"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

import { createCategory, updateCategory } from "@/actions/finance/actions";
import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useCategoryDialog } from "./context";
import { toast } from "sonner";
import { CategoryItemWithOptionalDates } from "@/actions/finance/types";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function GlobalCategoryDialog() {
  const { isOpen, data, closeDialog } = useCategoryDialog();
  const { originalCategory } = data;
  const [category, setCategory] = useState<CategoryItemWithOptionalDates>({
    id: "",
    label: "",
    budget: 0,
  });

  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  useEffect(() => {
    if (originalCategory) {
      setCategory(originalCategory);
    }
  }, [originalCategory]);

  return (
    <Dialog open={isOpen} onOpenChange={closeDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Category Managemennt</DialogTitle>
          <DialogDescription>
            Create a new category or edit an existing one. A Category is a way
            for you to organize your transactions, set budgets etc
          </DialogDescription>
        </DialogHeader>
        <div className="flex h-full w-full flex-col items-start justify-start gap-4">
          <div className="space-y-2">
            <Label htmlFor="label" className="text-main-1">
              Label
            </Label>
            <div className="relative">
              <Input
                id="label"
                name="label"
                type="text"
                placeholder="Category Label"
                value={category?.label}
                onChange={(e) => {
                  setCategory({ ...category, label: e.target.value });
                }}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="budget" className="text-main-1">
              Budget
            </Label>
            <div className="relative">
              <Input
                id="budget"
                name="budget"
                type="number"
                placeholder="0.00"
                className="pl-6"
                value={category?.budget ?? ""}
                onChange={(e) => {
                  setCategory({ ...category, budget: Number(e.target.value) });
                }}
                required
              />
              <span className="absolute top-1/2 left-3 -translate-y-1/2 text-[var(--color-main-2)]">
                $
              </span>
            </div>
          </div>
        </div>

        <DialogFooter className="flex h-fit w-full flex-row items-center justify-center gap-4">
          <Button
            disabled={isPending}
            onClick={() => {
              if (!category.budget) {
                toast.error("Please enter a budget");
                return;
              }
              if (!category.label) {
                toast.error("Please enter a label");
                return;
              }
              if (category.id) {
                startTransition(async () => {
                  toast.promise(
                    updateCategory(category.id, {
                      label: category.label,
                      budget: category.budget,
                    }),
                    {
                      loading: "Updating category...",
                      success: "Category updated!",
                      error: "Failed to update categiry",
                    },
                  );
                  router.refresh();
                  closeDialog();
                });
              } else {
                startTransition(async () => {
                  toast.promise(
                    createCategory({
                      label: category.label,
                      budget: category.budget,
                    }),
                    {
                      loading: "Saving category...",
                      success: "Category saved!",
                      error: "Failed to save category",
                    },
                  );
                  router.refresh();
                  closeDialog();
                });
              }
            }}
          >
            Submit
          </Button>
          <DialogClose asChild>
            <Button disabled={isPending} variant="outline">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
