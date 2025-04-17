"use client"

import { useRouter } from "next/navigation"
import { authClient } from "./client"
import { route } from "@/app/routes"
import type { ComponentProps, MouseEvent } from "react"

export function AnonymousSignInButton({
  redirectTo,
  onError,
  onClick,
  ...props
}: {
  redirectTo?: string
  onError?: (error: string) => void
} & ComponentProps<"button">) {

  const router = useRouter()


  const handleAnonymousSignIn = async (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    onClick?.(e)
    try {
      const res = await authClient.signIn.anonymous()
      console.log(res)
      router.push(redirectTo ?? route.dashboard)
    } catch (err) {
      onError?.('Failed to sign in anonymously. Please try again.')
    }
  }

  return (
    <button onClick={handleAnonymousSignIn} {...props} />
  )
}