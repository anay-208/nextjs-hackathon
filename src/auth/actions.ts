import { route } from "@/app/routes";
import { redirect } from "next/navigation";
import { auth } from ".";
import { headers } from "next/headers";
import { cache } from "react";
export const serverAuth = {
  getSession: cache(async () => {
    return auth.api.getSession({
      headers: await headers(),
    });
  }),
  async signOut() {
    return auth.api.signOut({
      headers: await headers(),
    });
  },
  async protectedPage<T extends string | undefined>(
    redirectToIfNotAuthenticated?: T,
  ) {
    const session = await serverAuth.getSession();
    if (!session) {
      if (redirectToIfNotAuthenticated) {
        redirect(route.signin(redirectToIfNotAuthenticated));
      }
      return null as T extends string ? never : null;
    }
    return session;
  },
};
