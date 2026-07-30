"use client";

import { useQuery } from "@tanstack/react-query";

interface AnalyticsSummary {
  totalAccounts: number;
  totalPosts: number;
  postsThisMonth: number;
  accountsByPlatform: Record<string, number>;
  postsByStatus: Record<string, number>;
}

interface AccountAnalytics {
  id: string;
  accountName: string;
  platform: string;
  followers: number;
  engagement: number;
  postsThisMonth: number;
}

async function fetchSummary(): Promise<AnalyticsSummary> {
  const res = await fetch("/api/analytics/summary");
  if (!res.ok) throw new Error("Gagal memuat ringkasan");
  return res.json();
}

async function fetchAccountAnalytics(): Promise<AccountAnalytics[]> {
  const res = await fetch("/api/analytics/accounts");
  if (!res.ok) throw new Error("Gagal memuat analitik akun");
  return res.json();
}

export function useAnalyticsSummary() {
  return useQuery({
    queryKey: ["analytics", "summary"],
    queryFn: fetchSummary,
    refetchInterval: 60_000,
  });
}

export function useAccountAnalytics() {
  return useQuery({
    queryKey: ["analytics", "accounts"],
    queryFn: fetchAccountAnalytics,
    refetchInterval: 60_000,
  });
}
