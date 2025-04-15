"use server"

import { serverAuth } from "@/auth/actions"
import { redirect } from "next/navigation"

export async function logout(redirectTo: string) {
  await serverAuth.signOut()
  redirect(redirectTo)
}