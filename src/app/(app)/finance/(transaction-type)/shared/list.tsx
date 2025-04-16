import { GetTransactionListResponse } from "@/actions/finance/types";
import { NewTransactionCard, TransactionCard } from "./card.client";

export async function TransactionPageList(props: {
  transactionList: Promise<GetTransactionListResponse>;
  type: "expense" | "income";
}) {
  const transactionList = await props.transactionList;
  const { type } = props;
  const data = transactionList.data ?? [];
  return (
    <div className="grid h-full w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      <NewTransactionCard type={type} />
      {data.map((d) => (
        <TransactionCard key={d.id} data={d} />
      ))}
    </div>
  );
}
