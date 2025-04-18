"use client";

import { useMediaQuery } from "react-responsive";
import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  format,
  isSameDay,
  isSameWeek,
  isSameMonth,
  isSameYear,
} from "date-fns";
import { TimeRange } from "@/actions/types";
import { TransactionsData } from "@/actions/finance/types";
import { cn } from "@/lib/utils";

const getDateKey = (date: Date, range: TimeRange): string => {
  const d = new Date(date);
  const start = new Date(range.startDate);
  const end = new Date(range.endDate);

  if (isSameDay(start, end)) return format(d, "HH:mm");
  if (isSameWeek(start, end)) return format(d, "EEE");
  if (isSameMonth(start, end)) return format(d, "d"); // Just show the day number
  if (isSameYear(start, end)) return format(d, "d MMM"); // Show day and month
  return format(d, "MMM yyyy");
};

const groupTransactions = (
  transactions: TransactionsData,
  range: TimeRange,
) => {
  const grouped: Record<string, number> = {};

  transactions.forEach((tx) => {
    const key = getDateKey(new Date(tx.created_at), range);
    if (!grouped[key]) grouped[key] = 0;
    grouped[key] += tx.type === "expense" ? -tx.amount : tx.amount;
  });

  return Object.entries(grouped).map(([x, y]) => ({ x, y }));
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 rounded-md border p-4 shadow-md outline-hidden">
        <p className="text-muted text-sm font-medium tracking-tight">
          Date: <span className="text-fg">{label}</span>
        </p>
        <p className="text-muted text-sm font-medium tracking-tight">
          Amount:{" "}
          <span className="text-fg">${payload[0].value.toFixed(2)}</span>
        </p>
      </div>
    );
  }
  return null;
};

function GraphWrapper({
  children,
  hasData,
  title,
}: {
  children: any;
  hasData: boolean;
  title: string;
}) {
  return (
    <div
      className={cn(
        "flex h-[400px] w-full flex-col items-start justify-start gap-6 px-2",
        {
          hidden: !hasData,
        },
      )}
    >
      <h2 className="text-lg text-white md:text-2xl">{title}</h2>
      <ResponsiveContainer width="100%" height="100%">
        {children}
      </ResponsiveContainer>
    </div>
  );
}

export function AmountGraph({
  data,
  timeRange,
}: {
  data: TransactionsData;
  timeRange: TimeRange;
}) {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1280px)" });
  const points = groupTransactions(data, timeRange);
  const hasData = points.length > 0;

  const minAmount = hasData ? Math.min(...points.map((p) => p.y)) : 0;
  const maxAmount = hasData ? Math.max(...points.map((p) => p.y)) : 0;

  return (
    <GraphWrapper hasData={hasData} title="AMOUNT OVER TIME">
      <LineChart
        data={points}
        margin={{
          top: -20,
          right: 10,
          left: isTabletOrMobile ? 0 : 10,
          bottom: isTabletOrMobile ? 10 : 12,
        }}
      >
        <CartesianGrid stroke="rgba(255, 255, 255, 0.2)" strokeWidth={2} />

        <XAxis
          dataKey="x"
          style={{ fontSize: "0.8rem" }}
          tick={hasData}
          axisLine
        >
          <Label
            value="Date"
            offset={-10}
            position="insideBottom"
            className="text-xss xl:text-sm"
          />
        </XAxis>

        <YAxis style={{ fontSize: "0.8rem" }} tick={hasData} axisLine>
          <Label
            value="Amount"
            angle={-90}
            position="insideLeft"
            style={{ textAnchor: "middle" }}
            className="text-xss xl:text-sm"
          />
        </YAxis>

        <Tooltip content={<CustomTooltip />} />
        <Legend
          verticalAlign="top"
          align="right"
          wrapperStyle={{ paddingBottom: 10 }}
        />
        <ReferenceLine y={0} stroke="#e2e8f0" strokeDasharray="3 3" />

        <Line
          type="monotone"
          dataKey="y"
          stroke="#5656a9"
          name="Amount"
          strokeWidth={3}
        />
        <ReferenceLine
          y={minAmount}
          label={{
            value: `Min: $${minAmount.toFixed(2)}`,
            position: "insideBottomRight",
            style: { fill: "#ef4444", fontSize: "12px" },
          }}
          stroke="#ef4444"
          strokeDasharray="3 3"
        />
        <ReferenceLine
          y={maxAmount}
          label={{
            value: `Max: $${maxAmount.toFixed(2)}`,
            position: "insideTopRight",
            style: { fill: "#22c55e", fontSize: "12px" },
          }}
          stroke="#22c55e"
          strokeDasharray="3 3"
        />
      </LineChart>
    </GraphWrapper>
  );
}
