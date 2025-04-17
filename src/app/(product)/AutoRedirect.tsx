import { serverAuth } from "@/auth/actions";
import { redirect } from "next/navigation";

type AutoRedirectProps = {};

export default async function AutoRedirectToDashboard({}: AutoRedirectProps) {
  const session = await serverAuth.getSession();

  if (session) return redirect("/dashboard");
  return null;
}
