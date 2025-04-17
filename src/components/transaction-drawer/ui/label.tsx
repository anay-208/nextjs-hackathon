import { FrontendAddTransactionInput } from "@/actions/finance/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";
export function TransactionLabel({
  transaction,
  setTransaction,
  className,
}: {
  transaction: FrontendAddTransactionInput;
  setTransaction: Dispatch<SetStateAction<FrontendAddTransactionInput>>;
  className?: string;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor="label" className="text-main-1">
        Label
      </Label>
      <Input
        id="label"
        name="label"
        placeholder="Transaction Label"
        value={transaction?.label}
        onChange={(e) => {
          setTransaction({ ...transaction, label: e.target.value });
        }}
        required
        maxLength={100}
        autoFocus
      />
    </div>
  );
}
