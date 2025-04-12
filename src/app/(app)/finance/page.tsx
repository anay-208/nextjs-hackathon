import Link from "next/link";
import { isValidTime, Time } from "./time";
import Amount from "./amount";
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    amountTime: string | undefined;
  }>;
}) {
  let parsedAmountTime: Time = "today";
  const { amountTime } = await searchParams;
  if (amountTime && isValidTime(amountTime)) {
    parsedAmountTime = amountTime;
  }

  return (
    <div className="flex min-h-[100svh] w-full flex-row items-center justify-between gap-10">
      <div className="flex h-full w-[15%] shrink-0 flex-col items-start justify-start gap-10 border-2 border-red-500 px-2 py-4">
        <Link className="text-lg font-bold text-black" href="/finance">
          Summary
        </Link>
        <Link className="text-lg font-bold text-black" href="/finance/analysis">
          Analysis
        </Link>
        <Link className="text-lg font-bold text-black" href="/finance/budgets">
          Budgets and Plans
        </Link>
        <Link className="text-lg font-bold text-black" href="/finance/presets">
          Presets
        </Link>
        <Link className="text-lg font-bold text-black" href="/finance/presets">
          History
        </Link>
      </div>

      <div className="flex h-full w-full flex-col items-center justify-start">
        <h1 className="text-3xl font-bold text-black">Summary</h1>
        <Amount amountTime={parsedAmountTime} />
      </div>
    </div>
  );
}
