import AutoRedirectToDashboard from "@/app/(product)/AutoRedirect";
import { Suspense } from "react";
import SignUpPage from "./page.client";

export default function Page() {
  return (
    <Suspense>
      <AutoRedirectToDashboard />
      <SignUpPage />
    </Suspense>
  );
}
