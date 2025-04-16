import { TransactionItemWithOptionalDate } from "@/actions/finance/types";
import { DatePicker } from "@/components/ui/date-picker";
import { Label } from "@/components/ui/label";
import { Dispatch, SetStateAction } from "react";
export function TransactionDate({
  transaction,
  setTransaction,
}: {
  transaction: TransactionItemWithOptionalDate;
  setTransaction: Dispatch<SetStateAction<TransactionItemWithOptionalDate>>;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor="label" className="text-main-1">
        Date
      </Label>
      <DatePicker
        date={transaction?.created_at ?? new Date()}
        setDate={(date: Date) => {
          setTransaction({ ...transaction, created_at: date });
        }}
      />
    </div>
  );
}
