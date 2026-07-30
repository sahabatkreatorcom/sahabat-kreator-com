import { z } from "zod";
import type { PlanId } from "../../config/plans";

export const userSchema = z.object({
  id: z.string(),
  name: z.string().nullable(),
  email: z.string().email(),
  emailVerified: z.boolean(),
  image: z.string().nullable(),
  planId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type User = z.infer<typeof userSchema>;

export interface UserWithPlan extends User {
  planId: PlanId;
}
