"use client";

import { useQuery } from "@tanstack/react-query";
import { PLANS, type PlanId } from "../../../config/plans";

interface SubscriptionStatus {
  planId: PlanId;
  currentAccounts: number;
  maxAccounts: number;
  usagePercent: number;
}

async function fetchSubscriptionStatus(): Promise<SubscriptionStatus> {
  const res = await fetch("/api/subscription/status");
  if (!res.ok) throw new Error("Gagal memuat status langganan");
  return res.json();
}

export function useSubscription() {
  return useQuery({
    queryKey: ["subscription"],
    queryFn: fetchSubscriptionStatus,
  });
}

export function useAvailablePlans() {
  return Object.values(PLANS);
}

export function getPlan(planId: PlanId) {
  return PLANS[planId];
}
