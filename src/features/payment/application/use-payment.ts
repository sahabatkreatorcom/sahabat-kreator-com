"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface CreatePaymentInput {
  planId: string;
  amount: number;
  method: string;
}

async function createPayment(data: CreatePaymentInput) {
  const res = await fetch("/api/payments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Gagal membuat pembayaran");
  return res.json();
}

async function confirmPayment(paymentId: string, proofImageUrl: string) {
  const res = await fetch(`/api/payments/${paymentId}/confirm`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ proofImageUrl }),
  });
  if (!res.ok) throw new Error("Gagal konfirmasi pembayaran");
  return res.json();
}

async function fetchPayments() {
  const res = await fetch("/api/payments");
  if (!res.ok) throw new Error("Gagal memuat riwayat pembayaran");
  return res.json();
}

export function useCreatePayment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPayment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payments"] });
    },
  });
}

export function useConfirmPayment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      paymentId,
      proofImageUrl,
    }: {
      paymentId: string;
      proofImageUrl: string;
    }) => confirmPayment(paymentId, proofImageUrl),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payments"] });
      queryClient.invalidateQueries({ queryKey: ["subscription"] });
    },
  });
}

export function usePayments() {
  return useQuery({
    queryKey: ["payments"],
    queryFn: fetchPayments,
  });
}
