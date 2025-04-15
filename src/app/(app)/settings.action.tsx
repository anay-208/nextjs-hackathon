"use server"

import { authClient } from "@/auth/client"
import { revalidatePath } from "next/cache"

export async function logout() {
  await authClient.signOut()
  revalidatePath('/')
}