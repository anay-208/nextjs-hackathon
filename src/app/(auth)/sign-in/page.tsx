import { Suspense } from "react";
import SignInPage from "./page.client";


export default function Page() {
  return (
    <Suspense>
      <SignInPage />
    </Suspense>
  )
}