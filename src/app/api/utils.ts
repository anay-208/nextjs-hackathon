import { APIResponse } from "./types";

export const getValidUser = async () => {
  // const session = await authClient.getSession();
  // if (!session || !session.data?.user) throw new Error("Unauthorized");

  // const parseResult = z.number().safeParse(session.data.user.id);
  // if (!parseResult.success) throw new Error("Invalid author ID");

  return {
    // ...session.data,
    user: {
      // ...session.data.user,
      id: "K2crlwyLkLaB2AkpUhlB75DWlJwYqwSD",
    },
  };
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
