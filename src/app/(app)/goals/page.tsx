import GoalsPage from "./page.client";
import { getGoals } from "@/actions/goals/actions";
import { serverAuth } from "@/auth/actions";

export default async function Goals() {
  const session = await serverAuth.protectedPage('/goals')

  const goals = await getGoals()

  if (goals.error || !goals.data)
    return <div className="text-red-500">Error fetching goals</div>
  
  return (
    <>
      <GoalsPage goalsList={goals.data} author={session.session.userId} />
    </>
  )
}