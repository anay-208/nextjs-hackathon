import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Tag } from "lucide-react";
import {
  CategoryData,
  TransactionItemWithOptionalDate,
} from "@/actions/finance/types";
import { Label as ShadLabel } from "@/components/ui/label";
import { Dispatch, SetStateAction } from "react";
import { useCategoryDialog } from "@/components/category/context";
import { Button } from "@/components/ui/button";
export function TransactionCategory({
  transaction,
  setTransaction,
  categories,
}: {
  transaction: TransactionItemWithOptionalDate;
  setTransaction: Dispatch<SetStateAction<TransactionItemWithOptionalDate>>;
  categories: CategoryData;
}) {
  const { openDialog } = useCategoryDialog();
  return (
    <div className="space-y-2">
      <ShadLabel htmlFor="category" className="text-main-2">
        Category
      </ShadLabel>
      <div className="flex gap-2">
        <Select
          name="category"
          value={transaction?.category_id ?? ""}
          onValueChange={(value) => {
            const category = categories.find((t) => t.id === value)!;
            console.log(category);
            setTransaction({
              ...transaction,
              category: category,
              category_id: category.id,
            });
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Categories</SelectLabel>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  <div className="flex items-center">
                    <Tag className="text-main-1 mr-2 h-3 w-3" />
                    <span>{category.label}</span>
                    {category.budget && category.budget > 0 && (
                      <span className="text-main-2 ml-2 text-xs">
                        (Budget: ${category.budget})
                      </span>
                    )}
                  </div>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => {
            openDialog();
          }}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
