"use client";

import { useRouter } from "next/navigation";
import { authClient } from "./client";
import { route } from "@/app/routes";
import { useState, type ComponentProps, type MouseEvent } from "react";
import { revalidate } from "./revalidate";

export function AnonymousSignInButton({
  redirectTo,
  onError,
  onClick,
  ...props
}: {
  redirectTo?: string;
  onError?: (error: string) => void;
} & ComponentProps<"button">) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const handleAnonymousSignIn = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  ) => {
    onClick?.(e);
    setIsPending(true);
    try {
      await authClient.signIn.anonymous();
      await revalidate();
      router.push(redirectTo ?? route.dashboard);
    } catch (err) {
      console.error(err);
      onError?.("Failed to sign in anonymously. Please try again.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <button disabled={isPending} onClick={handleAnonymousSignIn} {...props} />
  );
}
