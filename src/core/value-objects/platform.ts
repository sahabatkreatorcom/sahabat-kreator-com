import { z } from "zod";

export const platformSchema = z.enum([
  "facebook",
  "instagram",
  "instagram_direct",
  "threads",
  "linkedin",
  "youtube",
  "tiktok",
  "pinterest",
]);

export type Platform = z.infer<typeof platformSchema>;

export const PLATFORMS: Platform[] = platformSchema.options;
