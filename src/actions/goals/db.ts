import { db } from "@/db"
import { goalsTable } from "@/db/schema"
import { and, eq } from "drizzle-orm"
import "server-only"

export const dbGetGoals = (userId: string) => {
    return db.query.goalsTable.findMany({
        where: eq(goalsTable.user_id, userId),
    })
}

export const dbGetGoal = (userId: string, goalId: string) => {
    return db.query.goalsTable.findFirst({
        where: and(
            eq(goalsTable.id, goalId),
            eq(goalsTable.user_id, userId),
        ),
    })  
}

export const dbCreateGoal = (userId: string, title: string, deadline: Date) => {
    return db.insert(goalsTable).values({
        user_id: userId,
        title,
        completed: false,
        deadline
    }).returning()
}

export const dbMarkGoalAsComplete = (userId: string, goalId: string) => {
    return db.update(goalsTable).set({
        completed: !goalsTable.completed
    }).where(
        and(
            eq(goalsTable.id, goalId),
            eq(goalsTable.user_id, userId),
        )
    ).returning()
}