"use server";

import { authActionClient } from "@/safe-actions/authAction";


// For creating actions, for example 
// if its for jounrnalling, create like
// actions/journalling/[someName].ts

export const test = authActionClient.action(async ({ ctx: { user} }) => {
    console.log(user)

    return "Success"
})