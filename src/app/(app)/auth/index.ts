import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db"; 
import { anonymous } from "better-auth/plugins"

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true
    },
    // TODO: Social Providers
    database: drizzleAdapter(db, {
        provider: "pg", 
    }),
    plugins: [anonymous()]
});