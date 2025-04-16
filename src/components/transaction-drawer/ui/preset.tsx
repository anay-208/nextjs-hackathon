import { TransactionItemWithOptionalDate } from "@/actions/finance/types";
import { Checkbox } from "@/components/ui/checkbox";
import { Label as ShadLabel } from "@/components/ui/label";
import { Dispatch, SetStateAction } from "react";
export function Preset({
  transaction,
  setTransaction,
}: {
  transaction: TransactionItemWithOptionalDate;
  setTransaction: Dispatch<SetStateAction<TransactionItemWithOptionalDate>>;
}) {
  return (
    <div className="flex flex-row items-center justify-start gap-2">
      <ShadLabel htmlFor="label" className="text-main-1">
        Is Preset
      </ShadLabel>
      <Checkbox
        checked={transaction?.is_preset}
        onCheckedChange={() => {
          setTransaction({ ...transaction, is_preset: !transaction.is_preset });
        }}
        className="mt-1"
      />
    </div>
  );
}
