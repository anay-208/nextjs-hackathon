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

export const getTimeRanges = (allTimeStartDate?: Date) => {
  const now = new Date();

  const todayStart = formatStartOfDay(now);
  const todayEnd = formatEndOfDay(now);

  const lastWeekStart = new Date(now);
  lastWeekStart.setDate(now.getDate() - 7);

  const lastMonthStart = new Date(now);
  lastMonthStart.setMonth(now.getMonth() - 1);

  const lastYearStart = new Date(now);
  lastYearStart.setFullYear(now.getFullYear() - 1);

  return {
    today: {
      startDate: todayStart,
      endDate: todayEnd,
    },
    lastWeek: {
      startDate: formatStartOfDay(lastWeekStart),
      endDate: todayEnd,
    },
    lastMonth: {
      startDate: formatStartOfDay(lastMonthStart),
      endDate: todayEnd,
    },
    lastYear: {
      startDate: formatStartOfDay(lastYearStart),
      endDate: todayEnd,
    },
    allTime: allTimeStartDate
      ? {
          startDate: formatStartOfDay(allTimeStartDate),
          endDate: todayEnd,
        }
      : null,
  };
};
