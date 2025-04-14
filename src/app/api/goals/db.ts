import { db } from "@/db"
import { goalsTable } from "@/db/schema"
import { eq } from "drizzle-orm"


export const getGoals = (userId: string) => {
    return db.select()
             .from(goalsTable)
             .where(eq( goalsTable.author_id, userId))
             .execute()  
}