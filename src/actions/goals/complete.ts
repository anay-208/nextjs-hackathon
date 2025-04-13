"use server";
import { db } from "@/db";
import { goalsTable } from "@/db/schema";
import { authActionClient } from "@/safe-actions/authAction";
import { ActionError } from "@/safe-actions/consts";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

const schema = z.object({
    id: z.string()
})

export const toggleGoalCompletion = authActionClient
    .schema(schema)
    .action(async ({ parsedInput: { id }, ctx: { user: { session: { userId }} } }) => {
        const goal = await db
        .select()
        .from(goalsTable)
        .where(and(eq(goalsTable.id, id), eq(goalsTable.author_id, userId)))
        .limit(1)
        .execute()

        if (goal.length === 0) {
            throw new ActionError("Goal not found");
        }
        const completed = goal[0].completed;
        // update
        const res = await db
        .update(goalsTable)
        .set({ completed: !completed })
        .where(and(eq(goalsTable.id, id), eq(goalsTable.author_id, userId)))
        .execute();
        // return response
        return {
            id,
            completed: !completed
        }
    })