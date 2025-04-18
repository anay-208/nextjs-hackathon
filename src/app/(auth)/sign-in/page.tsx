import AutoRedirectToDashboard from "@/app/(product)/AutoRedirect";
import { Suspense } from "react";
import SignInPage from "./page.client";

export default function Page() {
  return (
    <Suspense>
      <AutoRedirectToDashboard />
      <SignInPage />
    </Suspense>
  );
}
