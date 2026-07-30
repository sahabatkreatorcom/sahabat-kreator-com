import { z } from "zod";
import { platformSchema } from "../value-objects/platform";

export const socialAccountSchema = z.object({
  id: z.string(),
  userId: z.string(),
  platform: platformSchema,
  accountName: z.string(),
  accountId: z.string(),
  avatarUrl: z.string().nullable(),
  accessToken: z.string(),
  refreshToken: z.string().nullable(),
  tokenExpiresAt: z.date().nullable(),
  platformMetadata: z.record(z.string(), z.unknown()).nullable(),
  isActive: z.boolean(),
  lastSyncedAt: z.date().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type SocialAccount = z.infer<typeof socialAccountSchema>;
