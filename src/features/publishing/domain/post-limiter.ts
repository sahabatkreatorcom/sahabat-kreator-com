import { PLANS, type PlanId } from "../../../config/plans";

export interface PostLimitResult {
  allowed: boolean;
  currentCount: number;
  maxPerDay: number;
  reason?: string;
}

export function checkPostLimit(
  planId: PlanId,
  postsToday: number,
): PostLimitResult {
  const plan = PLANS[planId];
  if (!plan) {
    return {
      allowed: false,
      currentCount: postsToday,
      maxPerDay: 0,
      reason: "Paket tidak valid",
    };
  }

  if (plan.maxPostsPerDay === -1) {
    return { allowed: true, currentCount: postsToday, maxPerDay: Infinity };
  }

  if (postsToday >= plan.maxPostsPerDay) {
    return {
      allowed: false,
      currentCount: postsToday,
      maxPerDay: plan.maxPostsPerDay,
      reason: `Batas post per hari (${plan.maxPostsPerDay}) telah tercapai.`,
    };
  }

  return {
    allowed: true,
    currentCount: postsToday,
    maxPerDay: plan.maxPostsPerDay,
  };
}
