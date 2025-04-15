import { route } from "@/app/routes";
import { redirect } from "next/navigation";
import { auth } from ".";
import { headers } from "next/headers";

export const serverAuth = {
  async getSession() {
    return auth.api.getSession({
      headers: await headers()
    })
  },
  async signOut() {
    return auth.api.signOut({
      headers: await headers()
    })
  },
  async protectedPage<T extends string | undefined>(redirectToIfNotAuthenticated?: T) {
    const session = await serverAuth.getSession()
    if (!session) {
      if (redirectToIfNotAuthenticated) {
        redirect(route.signin + '?redirectTo=' + redirectToIfNotAuthenticated);
      }
      return null as T extends string ? never : null
    }
    return session
  }
}
