import { TransactionItemWithOptionalDate } from "@/actions/finance/types";
import { Input } from "@/components/ui/input";
import { Label as ShadLabel } from "@/components/ui/label";
import { Dispatch, SetStateAction } from "react";
export function Label({
  transaction,
  setTransaction,
}: {
  transaction: TransactionItemWithOptionalDate;
  setTransaction: Dispatch<SetStateAction<TransactionItemWithOptionalDate>>;
}) {
  return (
    <div className="space-y-2">
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
