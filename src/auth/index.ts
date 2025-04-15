import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db"; 
import { anonymous } from "better-auth/plugins"
import "server-only"

export const auth = betterAuth({
    // TODO: Social Providers
    database: drizzleAdapter(db, {
        provider: "pg", 
    }),
    plugins: [anonymous()],
    user: {
        additionalFields: {
            currency: {
                type: "string",
                required: false,
                defaultValue: "USD",
                input: true
            }
        }
    }
});