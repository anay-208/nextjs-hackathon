import { FrontendAddTransactionInput } from "@/actions/finance/types";
import { DatePicker } from "@/components/ui/date-picker";
import { Label } from "@/components/ui/label";
import { Dispatch, SetStateAction } from "react";
export function TransactionDate({
  transaction,
  setTransaction,
}: {
  transaction: FrontendAddTransactionInput;
  setTransaction: Dispatch<SetStateAction<FrontendAddTransactionInput>>;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor="date" className="text-main-1">
        Date
      </Label>
      <DatePicker
        date={transaction?.created_at ?? new Date()}
        setDate={(date: Date | undefined) => {
          setTransaction({ ...transaction, created_at: date });
        }}
      />
    </div>
  );
}
