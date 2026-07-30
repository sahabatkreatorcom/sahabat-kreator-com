import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

export const user = sqliteTable("user", {
  id: text("id").primaryKey(),
  name: text("name"),
  email: text("email").notNull().unique(),
  emailVerified: integer("email_verified", { mode: "boolean" })
    .notNull()
    .default(false),
  image: text("image"),
  planId: text("plan_id").notNull().default("free"),
  role: text("role").default("user"),
  banned: integer("banned", { mode: "boolean" }).default(false),
  banReason: text("ban_reason"),
  banExpires: text("ban_expires"),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

export const session = sqliteTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  expiresAt: text("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  impersonatedBy: text("impersonated_by"),
});

export const account = sqliteTable("account", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  accessTokenExpiresAt: text("access_token_expires_at"),
  refreshTokenExpiresAt: text("refresh_token_expires_at"),
  scope: text("scope"),
  idToken: text("id_token"),
  password: text("password"),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

export const verification = sqliteTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: text("expires_at").notNull(),
  createdAt: text("created_at"),
  updatedAt: text("updated_at"),
});

export const socialAccount = sqliteTable("social_account", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  platform: text("platform", {
    enum: [
      "facebook",
      "instagram",
      "instagram_direct",
      "threads",
      "linkedin",
      "youtube",
      "tiktok",
      "pinterest",
    ],
  }).notNull(),
  accountName: text("account_name").notNull(),
  accountId: text("account_id").notNull(),
  avatarUrl: text("avatar_url"),
  accessToken: text("access_token").notNull(),
  refreshToken: text("refresh_token"),
  tokenExpiresAt: text("token_expires_at"),
  platformMetadata: text("platform_metadata"),
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
  lastSyncedAt: text("last_synced_at"),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

export const post = sqliteTable("post", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accountId: text("account_id")
    .notNull()
    .references(() => socialAccount.id, { onDelete: "cascade" }),
  platform: text("platform", {
    enum: [
      "facebook",
      "instagram",
      "instagram_direct",
      "threads",
      "linkedin",
      "youtube",
      "tiktok",
      "pinterest",
    ],
  }).notNull(),
  content: text("content").notNull(),
  mediaUrls: text("media_urls"),
  scheduledAt: text("scheduled_at"),
  publishedAt: text("published_at"),
  status: text("status", {
    enum: ["draft", "scheduled", "published", "failed", "deleted"],
  })
    .notNull()
    .default("draft"),
  platformPostId: text("platform_post_id"),
  errorMessage: text("error_message"),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

export const payment = sqliteTable("payment", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  planId: text("plan_id").notNull(),
  amount: real("amount").notNull(),
  method: text("method").notNull().default("qris"),
  status: text("status", {
    enum: ["pending", "confirmed", "expired", "cancelled"],
  })
    .notNull()
    .default("pending"),
  proofImageUrl: text("proof_image_url"),
  notes: text("notes"),
  confirmedAt: text("confirmed_at"),
  expiredAt: text("expired_at").notNull(),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

export const analytics = sqliteTable("analytics", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accountId: text("account_id")
    .notNull()
    .references(() => socialAccount.id, { onDelete: "cascade" }),
  platform: text("platform", {
    enum: [
      "facebook",
      "instagram",
      "instagram_direct",
      "threads",
      "linkedin",
      "youtube",
      "tiktok",
      "pinterest",
    ],
  }).notNull(),
  metricType: text("metric_type").notNull(),
  metricValue: real("metric_value").notNull(),
  periodStart: text("period_start").notNull(),
  periodEnd: text("period_end").notNull(),
  createdAt: text("created_at").notNull(),
});
