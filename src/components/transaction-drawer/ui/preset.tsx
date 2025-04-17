import { FrontendAddTransactionInput } from "@/actions/finance/types";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Dispatch, SetStateAction } from "react";
export function TransactionPreset({
  transaction,
  setTransaction,
}: {
  transaction: FrontendAddTransactionInput;
  setTransaction: Dispatch<SetStateAction<FrontendAddTransactionInput>>;
}) {
  return (
    <div className="flex flex-row items-center justify-start gap-2">
      <Label htmlFor="preset" className="text-main-1">
        Is Preset
      </Label>
      <Checkbox
        name="preset"
        id="preset"
        checked={transaction?.is_preset}
        onCheckedChange={() => {
          setTransaction({ ...transaction, is_preset: !transaction.is_preset });
        }}
        className="mt-1"
      />
    </div>
  );
}
