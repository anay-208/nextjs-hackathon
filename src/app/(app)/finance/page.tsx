import { isValidTime, Time } from "./time";
import { Amount } from "./amount";
import Presets from "./presets";
import { TransactionList } from "./transaction";
import { Graph } from "./graph";
import { AppContent, PageLocation, PageTitle } from "../content-layouts";
import { Suspense } from "react";
import { TimeSelector } from "./time-selector";
export default function Page(props: {
  searchParams: Promise<{
    timeFrame: string;
  }>;
}) {
  const getSp = props.searchParams.then((params) => params);

  const getTimeFrame = getSp.then((params) => {
    let timeFrame: Time = "today";
    if (params.timeFrame) {
      if (isValidTime(params.timeFrame)) {
        timeFrame = params.timeFrame;
      }
    }
    return timeFrame;
  });
  return (
    <AppContent>
      <PageLocation>Finance</PageLocation>
      <PageTitle>My Finance</PageTitle>
      <Suspense>
        <TimeSelector time={getTimeFrame} />
        <div className="flex flex-col gap-4 pt-12">
          <div className="grid h-full w-full flex-1 grid-cols-1 gap-4">
            <Amount timeFrame={getTimeFrame} />
            <Presets />
            <TransactionList timeFrame={getTimeFrame} />
            <Graph timeFrame={getTimeFrame} />
          </div>
        </div>
      </Suspense>
    </AppContent>
  );
}
