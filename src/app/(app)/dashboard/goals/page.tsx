import { headers } from "next/headers";
import GoalsPage from "./page.client";
import { auth } from "@/auth";
import { unauthorized } from "next/navigation";
import { db } from "@/db";
import { goalsTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function Goals(){
    const session = await auth.api.getSession({
        headers: await headers()
    }) 
    if(!session){
        return unauthorized();
    }
    const goals = await db.select().from(goalsTable).where(eq(goalsTable.author_id, session.user.id));
    console.log(goals)
    return (
        <>
        <GoalsPage goalsList={goals} author={session.session.userId} />
        </>
    )
}