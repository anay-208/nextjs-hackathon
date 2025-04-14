"use server";
import { authActionClient } from "@/safe-actions/authAction";
import { z } from "zod";
import { db } from "@/db"
import { user as userTable } from "@/db/schema";
import { eq } from "drizzle-orm";
const schema = z.object({
    currency: z.string().length(3),
});

export const setUserCurrency = authActionClient
    .schema(schema)
    .action(async ({ parsedInput: { currency}, ctx: { user: {session: { userId }} }}) => {

        await db
                .update(userTable)
                .set({ currency })
                .where(eq(userTable.id, userId))
                .execute();

        return {
            success: true,
            currency: currency
        }
    })