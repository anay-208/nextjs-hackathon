"use client";

import { useRouter } from "next/navigation";
import { authClient } from "./client";
import { route } from "@/app/routes";
import type { ComponentProps, MouseEvent } from "react";
import { revalidate } from "./revalidate";
import { toast } from "sonner";

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

  const handleAnonymousSignIn = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  ) => {
    onClick?.(e);
    toast.promise(async () => {
    try {
      await authClient.signIn.anonymous();
      await revalidate();
      router.push(redirectTo ?? route.dashboard);
    } catch (err) {
      console.error(err);
      onError?.("Failed to sign in anonymously. Please try again.");
    }
  }, {
    loading: "Signing in anonymously...",
    success: "Signed in anonymously!",
    error: "Failed to sign in anonymously. Please try again or report it to me@anayparaswani.dev or discord @anay_208!",
  })
  };

  return <button onClick={handleAnonymousSignIn} {...props} />;
}

