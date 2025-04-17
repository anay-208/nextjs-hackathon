import { FrontendAddTransactionInput } from "@/actions/finance/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dispatch, SetStateAction } from "react";
export function TransactionAmount({
  transaction,
  setTransaction,
}: {
  transaction: FrontendAddTransactionInput;
  setTransaction: Dispatch<SetStateAction<FrontendAddTransactionInput>>;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor="amount" className="text-main-1">
        Amount
      </Label>
      <div className="relative">
        <Input
          id="amount"
          name="amount"
          type="number"
          placeholder="0.00"
          className="pl-6"
          value={transaction?.amount}
          onChange={(e) => {
            setTransaction({
              ...transaction,
              amount: Number(e.target.value),
            });
          }}
          required
        />
        <span className="absolute top-1/2 left-3 -translate-y-1/2 text-[var(--color-main-2)]">
          $
        </span>
      </div>
    </div>
  );
}
