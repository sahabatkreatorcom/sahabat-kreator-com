import { pgTable, text, integer, real, pgEnum } from "drizzle-orm/pg-core";

export const platformEnum = pgEnum("platform", [
  "facebook",
  "instagram",
  "instagram_direct",
  "threads",
  "linkedin",
  "youtube",
  "tiktok",
  "pinterest",
]);

export const postStatusEnum = pgEnum("post_status", [
  "draft",
  "scheduled",
  "published",
  "failed",
  "deleted",
]);

export const paymentStatusEnum = pgEnum("payment_status", [
  "pending",
  "confirmed",
  "expired",
  "cancelled",
]);

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name"),
  email: text("email").notNull().unique(),
  emailVerified: integer("email_verified").notNull().default(0),
  image: text("image"),
  planId: text("plan_id").notNull().default("free"),
  role: text("role").default("user"),
  banned: integer("banned").default(0),
  banReason: text("ban_reason"),
  banExpires: text("ban_expires"),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  expiresAt: text("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  impersonatedBy: text("impersonated_by"),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
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

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: text("expires_at").notNull(),
  createdAt: text("created_at"),
  updatedAt: text("updated_at"),
});

export const socialAccount = pgTable("social_account", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  platform: platformEnum("platform").notNull(),
  accountName: text("account_name").notNull(),
  accountId: text("account_id").notNull(),
  avatarUrl: text("avatar_url"),
  accessToken: text("access_token").notNull(),
  refreshToken: text("refresh_token"),
  tokenExpiresAt: text("token_expires_at"),
  platformMetadata: text("platform_metadata"),
  isActive: integer("is_active").notNull().default(1),
  lastSyncedAt: text("last_synced_at"),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

export const post = pgTable("post", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  accountId: text("account_id").notNull().references(() => socialAccount.id, { onDelete: "cascade" }),
  platform: platformEnum("platform").notNull(),
  content: text("content").notNull(),
  mediaUrls: text("media_urls"),
  scheduledAt: text("scheduled_at"),
  publishedAt: text("published_at"),
  status: postStatusEnum("status").notNull().default("draft"),
  platformPostId: text("platform_post_id"),
  errorMessage: text("error_message"),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

export const payment = pgTable("payment", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  planId: text("plan_id").notNull(),
  amount: real("amount").notNull(),
  method: text("method").notNull().default("qris"),
  status: paymentStatusEnum("status").notNull().default("pending"),
  proofImageUrl: text("proof_image_url"),
  notes: text("notes"),
  confirmedAt: text("confirmed_at"),
  expiredAt: text("expired_at").notNull(),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

export const analytics = pgTable("analytics", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  accountId: text("account_id").notNull().references(() => socialAccount.id, { onDelete: "cascade" }),
  platform: platformEnum("platform").notNull(),
  metricType: text("metric_type").notNull(),
  metricValue: real("metric_value").notNull(),
  periodStart: text("period_start").notNull(),
  periodEnd: text("period_end").notNull(),
  createdAt: text("created_at").notNull(),
});
