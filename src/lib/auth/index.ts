import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/lib/db"; // your drizzle instance
import * as schema from "./schema";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg", // or "mysql", "sqlite"
        schema,
    }),
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        google: {
            enabled: true,
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }
    }
});