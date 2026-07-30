import { z } from "zod";
import { platformSchema } from "../value-objects/platform";

export const postStatusSchema = z.enum([
  "draft",
  "scheduled",
  "published",
  "failed",
  "deleted",
]);

export type PostStatus = z.infer<typeof postStatusSchema>;

export const postSchema = z.object({
  id: z.string(),
  userId: z.string(),
  accountId: z.string(),
  platform: platformSchema,
  content: z.string(),
  mediaUrls: z.array(z.string()),
  scheduledAt: z.date().nullable(),
  publishedAt: z.date().nullable(),
  status: postStatusSchema,
  platformPostId: z.string().nullable(),
  errorMessage: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Post = z.infer<typeof postSchema>;
