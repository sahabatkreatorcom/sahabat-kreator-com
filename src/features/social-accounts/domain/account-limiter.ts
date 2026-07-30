import { PLANS, type PlanId } from "../../../config/plans";
import type { Platform } from "../../../core/value-objects/platform";

export interface AccountCountByPlatform {
  platform: Platform;
  count: number;
}

export interface AccountLimitResult {
  allowed: boolean;
  currentTotal: number;
  maxTotal: number;
  reason?: string;
}

export function checkAccountLimit(
  planId: PlanId,
  currentTotalAccounts: number,
): AccountLimitResult {
  const plan = PLANS[planId];
  if (!plan) {
    return {
      allowed: false,
      currentTotal: currentTotalAccounts,
      maxTotal: 0,
      reason: "Paket tidak valid",
    };
  }

  if (plan.maxAccounts <= 0) {
    return {
      allowed: true,
      currentTotal: currentTotalAccounts,
      maxTotal: Infinity,
    };
  }

  if (currentTotalAccounts >= plan.maxAccounts) {
    return {
      allowed: false,
      currentTotal: currentTotalAccounts,
      maxTotal: plan.maxAccounts,
      reason: `Batas akun ${plan.maxAccounts} telah tercapai. Upgrade paket untuk menambah akun.`,
    };
  }

  return {
    allowed: true,
    currentTotal: currentTotalAccounts,
    maxTotal: plan.maxAccounts,
  };
}
