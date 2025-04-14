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
import { TimeRange } from "@/app/api/types";
import { TransactionsData } from "@/app/api/finance/types";

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
      <div className="rounded-sm bg-black p-2 text-white">
        <p className="tracking-text text-sm font-medium text-white">
          Date: <span className="inline text-blue-500">{label}</span>
        </p>
        <p className="tracking-text text-sm font-medium text-white">
          Amount:{" "}
          <span className="inline text-blue-500">
            ₹{payload[0].value.toFixed(2)}
          </span>
        </p>
      </div>
    );
  }
  return null;
};

function GraphWrapper({ children, title }: { children: any; title: string }) {
  return (
    <div className="flex h-[400px] w-full flex-col items-start justify-start gap-6">
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

  const minAmount = Math.min(...points.map((p) => p.y));
  const maxAmount = Math.max(...points.map((p) => p.y));

  return (
    <GraphWrapper title="AMOUNT OVER TIME">
      <LineChart
        data={points}
        margin={{
          top: -20,
          right: 0,
          left: isTabletOrMobile ? 0 : 10,
          bottom: isTabletOrMobile ? 10 : 12,
        }}
      >
        <CartesianGrid stroke="rgba(255, 255, 255, 0.2)" strokeWidth={2} />
        <Legend
          verticalAlign="top"
          align="right"
          wrapperStyle={{ paddingBottom: 10 }}
        />
        <Line
          type="monotone"
          dataKey="y"
          stroke="#22c55e"
          name="Amount"
          strokeWidth={3}
        />
        <XAxis dataKey="x" style={{ fontSize: "0.8rem" }}>
          <Label
            value="Date"
            offset={-10}
            position="insideBottom"
            className="text-xss xl:text-sm"
          />
        </XAxis>
        <YAxis style={{ fontSize: "0.8rem" }}>
          <Label
            value="Amount (₹)"
            angle={-90}
            position="insideLeft"
            style={{ textAnchor: "middle" }}
            className="text-xss xl:text-sm"
          />
        </YAxis>
        <Tooltip content={<CustomTooltip />} />
        <ReferenceLine y={0} stroke="#e2e8f0" strokeDasharray="3 3" />
        {minAmount < 0 && (
          <ReferenceLine
            y={minAmount}
            label={{
              value: `Min: ₹${minAmount.toFixed(2)}`,
              position: "insideBottomRight",
              style: { fill: "#ef4444", fontSize: "12px" },
            }}
            stroke="#ef4444"
            strokeDasharray="3 3"
          />
        )}
        {maxAmount > 0 && (
          <ReferenceLine
            y={maxAmount}
            label={{
              value: `Max: ₹${maxAmount.toFixed(2)}`,
              position: "insideTopRight",
              style: { fill: "#22c55e", fontSize: "12px" },
            }}
            stroke="#22c55e"
            strokeDasharray="3 3"
          />
        )}
      </LineChart>
    </GraphWrapper>
  );
}
