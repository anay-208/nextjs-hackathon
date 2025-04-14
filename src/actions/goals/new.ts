"use server"

import { db } from "@/db"
import { goalsTable } from "@/db/schema"
import { authActionClient } from "@/safe-actions/authAction"
import { z } from "zod"

const schema = z.object({
    title: z.string().min(1, "Title is required"),
    deadline: z.date(),
})

export const createGoal = authActionClient
    .schema(schema)
    .action(async ({ parsedInput: {title, deadline}, ctx: { user: { session: { userId }} } }) => {
        const data = await db.insert(goalsTable).values({
            author_id: userId,
            title,
            completed: false,
            deadline,
        }).returning()
        console.log(data)

        return { success: true, data}

    })