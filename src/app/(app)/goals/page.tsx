import GoalsPage from "./page.client";
import { getGoals } from "@/actions/goals/actions";
import { serverAuth } from "@/auth/actions";
import { AppContent, PageLocation, PageTitle } from "../content-layouts";
import { Suspense } from "react";

export default async function Goals() {
  const session = await serverAuth.protectedPage('/goals')

  const goals = await getGoals()

  if (goals.error || !goals.data)
    return <div className="text-red-500">Error fetching goals</div>

  return (
    <AppContent>
      <PageLocation>Goals</PageLocation>
      <PageTitle>My Goals</PageTitle>
      <Suspense>
        <GoalsPage goalsList={goals.data} author={session.session.userId} />
      </Suspense>
    </AppContent>
  )
}