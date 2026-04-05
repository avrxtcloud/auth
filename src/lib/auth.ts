import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";
import * as schema from "./db/schema";
import { admin, twoFactor } from "better-auth/plugins";

// This function will fetch providers from the DB and merge them with static config
export async function getDynamicAuthConfig() {
    const providers = await db.query.oauthProviders.findMany({
        where: (fields, { eq }) => eq(fields.enabled, true)
    });

    const socialProviders: any = {};

    providers.forEach(p => {
        // e.g., if p.id is "discord", we set socialProviders.discord
        socialProviders[p.id] = {
            clientId: p.clientId,
            clientSecret: p.clientSecret,
        };
    });

    // Fallback to env if DB is empty for initial setup
    if (!socialProviders.discord && process.env.DISCORD_CLIENT_ID) {
        socialProviders.discord = {
            clientId: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_CLIENT_SECRET,
        };
    }

    return {
        database: drizzleAdapter(db, {
            provider: "pg",
            schema: schema,
        }),
        
        advanced: {
            cookiePrefix: "avrxt_auth",
            useSecureCookies: process.env.NODE_ENV === "production",
        },
        
        session: {
            cookieCache: {
                enabled: true,
                maxAge: 5 * 60,
            },
            expiresIn: 60 * 60 * 24 * 7,
        },

        trustedOrigins: [
            "https://auth.avrxt.in",
            "https://www.avrxt.in",
            "https://avrxt.in",
            "http://localhost:3000"
        ],

        plugins: [
            admin({
                defaultRole: "user",
            }),
            twoFactor({
                issuer: "AVRXT AUTH",
            }),
        ],

        socialProviders
    };
}

// We still export a "base" auth for cases where we don't need dynamic providers (or as a fallback)
export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: schema,
    }),
    advanced: { cookiePrefix: "avrxt_auth" },
    socialProviders: {
        // Static fallback for initial sync/dashboard access
        discord: {
            clientId: process.env.DISCORD_CLIENT_ID || "PLACEHOLDER",
            clientSecret: process.env.DISCORD_CLIENT_SECRET || "PLACEHOLDER",
        }
    }
});
