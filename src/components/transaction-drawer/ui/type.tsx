import { TransactionItemWithOptionalDate } from "@/actions/finance/types";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
export function TransactionType({
  transaction,
  setTransaction,
}: {
  transaction: TransactionItemWithOptionalDate;
  setTransaction: Dispatch<SetStateAction<TransactionItemWithOptionalDate>>;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-main-1">Transaction Type</Label>
      <RadioGroup
        defaultValue="expense"
        value={transaction.type}
        onValueChange={(e) => {
          if (e === "expense" || e === "income") {
            setTransaction({ ...transaction, type: e });
          }
        }}
        className="flex space-x-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value="expense"
            id="expense"
            className="border-border-strong text-destroy"
          />
          <Label
            htmlFor="expense"
            className={cn(
              "flex cursor-pointer items-center space-x-1",
              transaction.type === "expense" ? "text-destroy" : "text-main-2",
            )}
          >
            <ArrowDown
              className={cn(
                "h-3 w-3",
                transaction.type === "expense" ? "text-destroy" : "text-main-2",
              )}
            />
            <span>Expense</span>
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value="income"
            id="income"
            className="border-border-strong text-green-500"
          />
          <Label
            htmlFor="income"
            className={cn(
              "flex cursor-pointer items-center space-x-1",
              transaction.type === "income" ? "text-green-500" : "text-main-2",
            )}
          >
            <ArrowUp
              className={cn(
                "h-3 w-3",
                transaction.type === "income"
                  ? "text-green-500"
                  : "text-main-2",
              )}
            />
            <span>Income</span>
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
}
