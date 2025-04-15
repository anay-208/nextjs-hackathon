import { auth } from "@/auth";
import { headers } from "next/headers";
import { APIResponse } from "./types";

export const getValidUser = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || !session.user) throw new Error("Unauthorized");

  return session;
};

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
    console.error(`Error in ${context}:`, err);
    return { data: undefined, error: err.message || "Unknown error" };
  }
};
