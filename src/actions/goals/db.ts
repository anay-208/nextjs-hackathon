import { db } from "@/db";
import { goalsTable } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import "server-only";

export const dbGetGoals = async (userId: string) => {
  "use cache";
  cacheTag("goals");
  return db.query.goalsTable.findMany({
    where: eq(goalsTable.user_id, userId),
  });
};

export const dbGetGoal = async (userId: string, goalId: string) => {
  "use cache";
  cacheTag("goals");
  return db.query.goalsTable.findFirst({
    where: and(eq(goalsTable.id, goalId), eq(goalsTable.user_id, userId)),
  });
};

export const dbCreateGoal = async (
  userId: string,
  title: string,
  deadline: Date,
) => {
  const res = await db
    .insert(goalsTable)
    .values({
      user_id: userId,
      title,
      completed: false,
      deadline,
    })
    .returning();
  revalidateTag("goals");
  return res;
};

export const dbMarkGoalAsComplete = async (
  userId: string,
  goalId: string,
  completed: boolean,
) => {
  console.log(userId, goalId, completed)
  const res = await db
    .update(goalsTable)
    .set({
      completed: completed,
    })
    .where(and(eq(goalsTable.id, goalId), eq(goalsTable.user_id, userId)))
    .returning();
  console.log(res);
  revalidateTag("goals");
  return res;
};
