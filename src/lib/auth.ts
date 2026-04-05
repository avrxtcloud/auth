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

	// Base config for all Discord instances
	const createDiscordProvider = (clientId: string, clientSecret: string) => ({
		clientId: clientId,
		clientSecret: clientSecret,
		scope: ["identify", "email", "guilds.members.read"],
		mapProfile: async (profile: any, tokens: any) => {
			const guildId = process.env.DISCORD_GUILD_ID;
			const adminRoleId = process.env.DISCORD_ADMIN_ROLE_ID;

			let role = "user";

			if (guildId && adminRoleId && tokens?.accessToken) {
				try {
					const res = await fetch(`https://discord.com/api/v10/users/@me/guilds/${guildId}/member`, {
						headers: {
							Authorization: `Bearer ${tokens.accessToken}`,
						},
					});

					if (res.ok) {
						const member = await res.json();
						// Check if user has the specific role ID
						if (member.roles && member.roles.includes(adminRoleId)) {
							role = "admin";
							console.log(`[AUTH] Admin Node Access Granted: ${profile.username} (${profile.id})`);
						}
					}
				} catch (e) {
					console.error("[AUTH] Discord Role Check Pipeline Error:", e);
				}
			}

			return {
				id: profile.id,
				name: profile.username || profile.id,
				email: profile.email,
				emailVerified: true,
				image: profile.avatar ? `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png` : null,
				role: role,
			};
		}
	});

	const socialProviders: any = {};

	providers.forEach(p => {
		if (p.id === 'discord') {
			socialProviders[p.id] = createDiscordProvider(p.clientId, p.clientSecret);
		} else {
			socialProviders[p.id] = {
				clientId: p.clientId,
				clientSecret: p.clientSecret,
			};
		}
	});

	// Fallback to env if DB is empty for initial setup
	if (!socialProviders.discord && process.env.DISCORD_CLIENT_ID) {
		socialProviders.discord = createDiscordProvider(
			process.env.DISCORD_CLIENT_ID,
			process.env.DISCORD_CLIENT_SECRET as string
		);
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

		user: {
			additionalFields: {
				role: {
					type: "string",
					required: false,
					defaultValue: "user",
				},
				banned: {
					type: "boolean",
					required: false,
					defaultValue: false,
				},
			}
		},

		socialProviders
	};
}

// Global Auth Instance (Shared)
export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
		schema: schema,
	}),
	advanced: { cookiePrefix: "avrxt_auth" },
});
