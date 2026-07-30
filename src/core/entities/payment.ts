import { z } from "zod";

export const paymentStatusSchema = z.enum([
  "pending",
  "confirmed",
  "expired",
  "cancelled",
]);

export type PaymentStatus = z.infer<typeof paymentStatusSchema>;

export const paymentSchema = z.object({
  id: z.string(),
  userId: z.string(),
  planId: z.string(),
  amount: z.number(),
  method: z.string(),
  status: paymentStatusSchema,
  proofImageUrl: z.string().nullable(),
  notes: z.string().nullable(),
  confirmedAt: z.date().nullable(),
  expiredAt: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Payment = z.infer<typeof paymentSchema>;
