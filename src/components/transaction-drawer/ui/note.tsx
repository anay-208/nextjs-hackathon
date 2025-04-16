import { TransactionItemWithOptionalDate } from "@/actions/finance/types";
import { Label as ShadLabel } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dispatch, SetStateAction } from "react";
export function Note({
  transaction,
  setTransaction,
}: {
  transaction: TransactionItemWithOptionalDate;
  setTransaction: Dispatch<SetStateAction<TransactionItemWithOptionalDate>>;
}) {
  return (
    <div className="space-y-2">
      <ShadLabel htmlFor="note" className="text-main-1">
        Note <span className="text-main-2 text-xs">(optional)</span>
      </ShadLabel>
      <Textarea
        id="note"
        name="note"
        value={transaction?.notes ?? ""}
        onChange={(e) => {
          setTransaction({ ...transaction, notes: e.target.value });
        }}
        placeholder="Add additional details about this transaction"
        className="min-h-[80px]"
      />
    </div>
  );
}
