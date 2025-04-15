import { TimeRange } from "@/actions/types";

export const validTimes = [
  "today",
  "yesterday",
  "this-week",
  "last-week",
  "this-month",
  "last-month",
  "this-year",
  "last-year",
  "all-time",
] as const;

export type Time = (typeof validTimes)[number];

export const isValidTime = (value: any): value is Time => {
  return validTimes.includes(value);
};

export const toReadableTime = (time: Time) => {
  switch (time) {
    case "today":
      return "Today";
    case "yesterday":
      return "Yesterday";
    case "this-week":
      return "This Week";
    case "last-week":
      return "Last Week";
    case "this-month":
      return "This Month";
    case "last-month":
      return "Last Month";
    case "this-year":
      return "This Year";
    case "last-year":
      return "Last Year";
    case "all-time":
      return "All Time";
    default:
      return "Today";
  }
};

const formatStartOfDay = (date: Date): string => {
  const d = new Date(date);
  d.setUTCHours(0, 0, 0, 0);
  return d.toISOString();
};

const formatEndOfDay = (date: Date): string => {
  const d = new Date(date);
  d.setUTCHours(23, 59, 59, 999);
  return d.toISOString();
};

export const getTimeRange = (
  range: Time,
  allTimeStartDate?: Date,
): TimeRange => {
  const now = new Date();

  switch (range) {
    case "today": {
      return {
        startDate: formatStartOfDay(now),
        endDate: formatEndOfDay(now),
      };
    }

    case "yesterday": {
      const yesterday = new Date(now);
      yesterday.setDate(now.getDate() - 1);
      return {
        startDate: formatStartOfDay(yesterday),
        endDate: formatEndOfDay(yesterday),
      };
    }

    case "this-week": {
      const start = new Date(now);
      start.setDate(now.getDate() - now.getDay()); // sunday
      return {
        startDate: formatStartOfDay(start),
        endDate: formatEndOfDay(now),
      };
    }

    case "last-week": {
      const thisWeekStart = new Date(now);
      thisWeekStart.setDate(now.getDate() - now.getDay());
      const lastWeekStart = new Date(thisWeekStart);
      lastWeekStart.setDate(thisWeekStart.getDate() - 7);
      const lastWeekEnd = new Date(thisWeekStart.getTime() - 1);
      return {
        startDate: formatStartOfDay(lastWeekStart),
        endDate: formatEndOfDay(lastWeekEnd),
      };
    }

    case "this-month": {
      const start = new Date(now.getFullYear(), now.getMonth(), 1);
      return {
        startDate: formatStartOfDay(start),
        endDate: formatEndOfDay(now),
      };
    }

    case "last-month": {
      const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const end = new Date(now.getFullYear(), now.getMonth(), 0);
      return {
        startDate: formatStartOfDay(start),
        endDate: formatEndOfDay(end),
      };
    }

    case "this-year": {
      const start = new Date(now.getFullYear(), 0, 1);
      return {
        startDate: formatStartOfDay(start),
        endDate: formatEndOfDay(now),
      };
    }

    case "last-year": {
      const start = new Date(now.getFullYear() - 1, 0, 1);
      const end = new Date(now.getFullYear(), 0, 0);
      return {
        startDate: formatStartOfDay(start),
        endDate: formatEndOfDay(end),
      };
    }

    case "all-time": {
      if (!allTimeStartDate)
        return {
          startDate: formatStartOfDay(now),
          endDate: formatEndOfDay(now),
        };
      return {
        startDate: formatStartOfDay(allTimeStartDate),
        endDate: formatEndOfDay(now),
      };
    }

    default:
      console.error("Invalid time range, defaulting to today");
      return {
        startDate: formatStartOfDay(now),
        endDate: formatEndOfDay(now),
      };
  }
};
