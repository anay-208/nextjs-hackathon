import { defaultActionClient } from "./default";
import { auth } from "@/auth";
import { headers } from "next/headers";
import { ActionError } from "./consts";
import "server-only";

export const authActionClient = defaultActionClient
  .use(async ({ next }) => {
    // Use the auth instance from better-auth
    const user = await auth.api.getSession({
        headers: await headers()
    });


    if (!user) {
      throw new ActionError("Unauthorized");
    }


    return next({ ctx: { user } });
  });