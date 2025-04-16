import { isValidTime, Time } from "./time";
import { Amount } from "./amount";
import Presets from "./presets";
import { TransactionList } from "./transaction";
import { Graph } from "./graph";
import { AppContent, PageLocation, PageTitle } from "../content-layouts";
import { Suspense } from "react";
import { TimeSelector } from "./time-selector";
import { AddButtons } from "./add.client";
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
      <div className="flex w-full flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div className="flex flex-col">
          <PageLocation>Finance</PageLocation>
          <PageTitle>My Finance</PageTitle>
          <TimeSelector time={getTimeFrame} />
        </div>
        <AddButtons />
      </div>
      <Suspense>
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
