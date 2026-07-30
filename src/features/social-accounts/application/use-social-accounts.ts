"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Platform } from "../../../core/value-objects/platform";
import type { SocialAccount } from "../../../core/entities/social-account";

async function fetchAccounts(): Promise<SocialAccount[]> {
  const res = await fetch("/api/social-accounts");
  if (!res.ok) throw new Error("Gagal memuat akun");
  return res.json();
}

async function connectAccount(data: {
  platform: Platform;
  code: string;
}): Promise<SocialAccount> {
  const res = await fetch("/api/social-accounts/connect", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message ?? "Gagal menghubungkan akun");
  }
  return res.json();
}

async function disconnectAccount(accountId: string): Promise<void> {
  const res = await fetch(`/api/social-accounts/${accountId}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Gagal memutuskan akun");
}

export function useSocialAccounts() {
  return useQuery({
    queryKey: ["social-accounts"],
    queryFn: fetchAccounts,
  });
}

export function useConnectAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: connectAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["social-accounts"] });
    },
  });
}

export function useDisconnectAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: disconnectAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["social-accounts"] });
    },
  });
}
