import { isValidTime, Time } from "./time";
import Amount from "./amount";
import Presets from "./presets";
import TransactionList from "./transaction";
import Graph from "./graph";
import TimeSelector from "./time.client";
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    timeFrame: string | undefined;
  }>;
}) {
  let parsedTimeFrame: Time = "today";
  const { timeFrame } = await searchParams;
  if (timeFrame && isValidTime(timeFrame)) {
    parsedTimeFrame = timeFrame;
  }

  return (
    <div className="flex min-h-[100svh] w-full flex-row items-center justify-between gap-10">
      <div className="flex h-full w-full flex-col items-center justify-start gap-10">
        <h1 className="text-3xl font-bold text-black">Summary</h1>
        <TimeSelector time={parsedTimeFrame} />
        <Amount timeFrame={parsedTimeFrame} />
        <Presets />
        <TransactionList timeFrame={parsedTimeFrame} />
        <Graph timeFrame={parsedTimeFrame} />
      </div>
    </div>
  );
}
