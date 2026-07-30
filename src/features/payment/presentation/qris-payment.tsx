"use client";

import { useState } from "react";
import { useCreatePayment } from "../application/use-payment";
import { formatCurrency } from "../../../shared/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../shared/ui/card";
import type { PlanId } from "../../../config/plans";

const QRIS_IMAGE = "/images/qris-placeholder.svg";

interface QrisPaymentProps {
  planId: PlanId;
  amount: number;
  planLabel: string;
}

export function QrisPayment({ planId, amount, planLabel }: QrisPaymentProps) {
  const [step, setStep] = useState<"info" | "upload" | "success">("info");
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const createPayment = useCreatePayment();

  async function handlePayment() {
    setError(null);
    try {
      await createPayment.mutateAsync({
        planId,
        amount,
        method: "qris",
      });
      setStep("upload");
    } catch {
      setError("Gagal membuat pembayaran. Silakan coba lagi.");
    }
  }

  async function handleUpload() {
    if (!proofFile) return;
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", proofFile);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) throw new Error("Upload failed");
      setStep("success");
    } catch {
      setError("Gagal upload bukti. Silakan coba lagi.");
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pembayaran QRIS</CardTitle>
        <CardDescription>
          Upgrade ke paket {planLabel} - {formatCurrency(amount)}
        </CardDescription>
      </CardHeader>

      <CardContent>
        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {step === "info" && (
          <div className="space-y-4">
            <div className="rounded-lg border p-4 text-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={QRIS_IMAGE}
                alt="QRIS Payment"
                className="mx-auto mb-4 h-48 w-48"
              />
              <p className="text-sm font-medium">
                Scan QRIS di atas untuk membayar
              </p>
              <p className="text-lg font-bold text-blue-600">
                {formatCurrency(amount)}
              </p>
            </div>

            <ol className="space-y-2 text-sm text-gray-600">
              <li>1. Buka aplikasi mobile banking / e-wallet</li>
              <li>2. Pilih QRIS / Scan QR</li>
              <li>3. Scan QR code di atas</li>
              <li>4. Masukkan nominal {formatCurrency(amount)}</li>
              <li>5. Konfirmasi pembayaran</li>
            </ol>

            <button
              onClick={handlePayment}
              disabled={createPayment.isPending}
              className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {createPayment.isPending ? "Memproses..." : "Saya Sudah Bayar"}
            </button>
          </div>
        )}

        {step === "upload" && (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Upload bukti transfer untuk verifikasi oleh admin (1x24 jam).
            </p>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProofFile(e.target.files?.[0] ?? null)}
              className="block w-full text-sm"
            />

            <button
              onClick={handleUpload}
              disabled={!proofFile}
              className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
              Upload Bukti Bayar
            </button>
          </div>
        )}

        {step === "success" && (
          <div className="text-center">
            <p className="font-medium text-green-600">
              Bukti berhasil diupload!
            </p>
            <p className="mt-1 text-sm text-gray-600">
              Admin akan memverifikasi pembayaran dalam 1x24 jam. Status upgrade
              akan otomatis berubah.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
