import { auth } from "@/auth";
import { headers } from "next/headers";
import { unauthorized } from "next/navigation";
import { APIResponse } from "./types";
import React from "react";

export const getValidUser = React.cache(async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || !session.user) return unauthorized();

  return session;
});

export const withAuth = async <T>(
  fn: (user: Awaited<ReturnType<typeof getValidUser>>) => Promise<T>,
): Promise<T> => {
  const user = await getValidUser();

  return fn(user);
};

export const handle = async <T>(
  fn: () => Promise<T>,
  context: string,
): Promise<APIResponse<T>> => {
  try {
    const result = await fn();

    return { data: result, error: undefined };
  } catch (err: any) {
    if (
      String(err).includes("Error: During prerendering") ||
      String(err).includes('used "revalidateTag')
    )
      throw err;
    console.error(`Error in ${context}:`, err);
    return { data: undefined, error: err.message || "Unknown error" };
  }
};
