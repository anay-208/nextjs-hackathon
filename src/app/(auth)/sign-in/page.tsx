import { Suspense } from "react";
import SignInPage from "./page.client";


export default function Page() {
  // TODO: Check session exists and redirect to dashboard
  return (
    <Suspense>
      <SignInPage />
    </Suspense>
  )
}