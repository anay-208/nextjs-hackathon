"use server"

import { serverAuth } from "@/auth/actions"
import { revalidatePath } from "next/cache"

export async function logout() {
  await serverAuth.signOut()
  revalidatePath('/')
}