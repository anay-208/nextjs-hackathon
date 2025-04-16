import { TransactionItemWithOptionalDate } from "@/actions/finance/types";
import { Input } from "@/components/ui/input";
import { Label as ShadLabel } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";
export function Label({
  transaction,
  setTransaction,
  className,
}: {
  transaction: TransactionItemWithOptionalDate;
  setTransaction: Dispatch<SetStateAction<TransactionItemWithOptionalDate>>;
  className?: string;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      <ShadLabel htmlFor="label" className="text-main-1">
        Label
      </ShadLabel>
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
