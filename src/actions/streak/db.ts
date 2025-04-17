import { db } from "@/db";
import { goalsTable, journalingTable, transactionsTable } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export const dbGetUserStreakData = async (
  userId: string,
  itemLimit: number,
) => {
  const journalDates = await db.query.journalingTable.findMany({
    columns: {
      id: true,
      created_at: true,
    },
    orderBy: [desc(journalingTable.created_at)],
    where: eq(journalingTable.user_id, userId),
  });

  const transactionDates = await db.query.transactionsTable.findMany({
    columns: {
      id: true,
      created_at: true,
    },
    orderBy: [desc(transactionsTable.created_at)],
    where: eq(transactionsTable.user_id, userId),
  });

  const goalDates = await db.query.goalsTable.findMany({
    columns: {
      id: true,
      created_at: true,
    },
    orderBy: [desc(goalsTable.created_at)],
    where: eq(goalsTable.user_id, userId),
  });

  const allEntries = [
    ...journalDates.map((entry) => ({
      id: entry.id,
      date: entry.created_at,
      type: "journal",
    })),
    ...transactionDates.map((entry) => ({
      id: entry.id,
      date: entry.created_at,
      type: "transaction",
    })),
    ...goalDates.map((entry) => ({
      id: entry.id,
      date: entry.created_at,
      type: "goal",
    })),
  ];

  const groupedByDate = allEntries.reduce(
    (acc, entry) => {
      const dateKey = entry.date.toISOString().split("T")[0];
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push({ id: entry.id, type: entry.type });
      return acc;
    },
    {} as Record<string, { id: string; type: string }[]>,
  );

  const sortedDates = Object.keys(groupedByDate)
    .map((date) => new Date(date))
    .sort((a, b) => b.getTime() - a.getTime());

  const result = sortedDates.slice(0, itemLimit).map((date) => ({
    date,
    entries: groupedByDate[date.toISOString().split("T")[0]], // Includes IDs and types
  }));

  return {
    streakCount: sortedDates.length,
    streakItems: result,
  };
};
