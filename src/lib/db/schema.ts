import { pgTable, text, timestamp, boolean, integer, jsonb } from 'drizzle-orm/pg-core';

export const user = pgTable("user", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	email: text("email").notNull().unique(),
	emailVerified: boolean("emailVerified").notNull(),
	image: text("image"),
	createdAt: timestamp("createdAt").notNull(),
	updatedAt: timestamp("updatedAt").notNull(),
	role: text("role"),
	banned: boolean("banned"),
	banReason: text("banReason"),
	banExpires: timestamp("banExpires"),
    twoFactorEnabled: boolean("twoFactorEnabled").default(false),
});

export const session = pgTable("session", {
	id: text("id").primaryKey(),
	expiresAt: timestamp("expiresAt").notNull(),
	token: text("token").notNull().unique(),
	createdAt: timestamp("createdAt").notNull(),
	updatedAt: timestamp("updatedAt").notNull(),
	ipAddress: text("ipAddress"),
	userAgent: text("userAgent"),
	userId: text("userId").notNull().references(() => user.id),
	activeOrganizationId: text("activeOrganizationId"),
    impersonatedBy: text("impersonatedBy"),
});

export const account = pgTable("account", {
	id: text("id").primaryKey(),
	accountId: text("accountId").notNull(),
	providerId: text("providerId").notNull(),
	userId: text("userId").notNull().references(() => user.id),
	accessToken: text("accessToken"),
	refreshToken: text("refreshToken"),
	idToken: text("idToken"),
	accessTokenExpiresAt: timestamp("accessTokenExpiresAt"),
	refreshTokenExpiresAt: timestamp("refreshTokenExpiresAt"),
	scope: text("scope"),
	password: text("password"),
	createdAt: timestamp("createdAt").notNull(),
	updatedAt: timestamp("updatedAt").notNull(),
});

export const verification = pgTable("verification", {
	id: text("id").primaryKey(),
	identifier: text("identifier").notNull(),
	value: text("value").notNull(),
	expiresAt: timestamp("expiresAt").notNull(),
	createdAt: timestamp("createdAt").notNull(),
	updatedAt: timestamp("updatedAt").notNull(),
});

// Admin Configuration for Auth Service (e.g., registration toggles, logo etc)
export const authConfig = pgTable("auth_config", {
    id: text("id").primaryKey(),
    logoUrl: text("logo_url"),
    appName: text("app_name").default("AVRXT AUTH"),
    registrationEnabled: boolean("registration_enabled").default(true),
    allowDiscordOnly: boolean("allow_discord_only").default(false),
    updatedAt: timestamp("updated_at").defaultNow(),
});

// OAuth Provider Configuration (Dynamic like Supabase)
export const oauthProviders = pgTable("oauth_providers", {
    id: text("id").primaryKey(), // e.g., "discord", "google", "github"
    name: text("name").notNull(),
    clientId: text("client_id").notNull(),
    clientSecret: text("client_secret").notNull(),
    enabled: boolean("enabled").default(false),
    updatedAt: timestamp("updated_at").defaultNow(),
});

// Audit Logs
export const auditLogs = pgTable("audit_logs", {
    id: text("id").primaryKey(),
    adminId: text("admin_id").references(() => user.id),
    action: text("action").notNull(),
    targetUserId: text("target_user_id"),
    details: text("details"),
    ipAddress: text("ip_address"),
    createdAt: timestamp("created_at").defaultNow(),
});
