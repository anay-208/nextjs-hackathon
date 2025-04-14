import { getGoals } from "@/actions/goals/actions";
import { NextRequest, NextResponse } from "next/server";



export  async function GET(request: NextRequest){
    // For page, use this to get searchParams and use method like .get()
    // const searchParams = request.nextUrl.searchParams
    const goals = await getGoals()
    return NextResponse.json(goals)
}