import { route } from "@/app/routes";
import { authClient } from "./client";
import { redirect } from "next/navigation";

export const auth = {
  async getSession() {
    return authClient.getSession()
  },
  async signOut() {
    return authClient.signOut()
  },
  async protectedPage() {
    const session = await authClient.getSession()
    if (session.error && session.error.status) {
      console.log(session.error)
      throw redirect(route.signin)
    }
    return session
  }
}
