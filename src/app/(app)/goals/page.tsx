import { headers } from "next/headers";
import GoalsPage from "./page.client";
import { auth } from "@/auth";
import { unauthorized } from "next/navigation";
import { db } from "@/db";
import { goalsTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getGoals } from "@/actions/goals/actions";

export default async function Goals(){
    const session = await auth.api.getSession({
        headers: await headers()
    }) 
    if(!session){
        return unauthorized();
    }
    const goals = await getGoals()
    if(goals.error || !goals.data)
        return <div className="text-red-500">Error fetching goals</div>
    return (
        <>
        <GoalsPage goalsList={goals.data} author={session.session.userId} />
        </>
    )
}