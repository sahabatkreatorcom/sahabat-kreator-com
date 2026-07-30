"use client";

import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../shared/ui/card";
import { formatCurrency } from "../../../shared/lib/utils";
import type { PlanConfig } from "../../../config/plans";

interface PlanCardProps {
  plan: PlanConfig;
  isCurrent?: boolean;
}

export function PlanCard({ plan, isCurrent }: PlanCardProps) {
  const router = useRouter();

  return (
    <Card className={`relative ${isCurrent ? "ring-2 ring-blue-600" : ""}`}>
      {isCurrent && (
        <span className="absolute -top-2 right-4 rounded-full bg-blue-600 px-3 py-0.5 text-xs text-white">
          Aktif
        </span>
      )}

      <CardHeader>
        <CardTitle>{plan.label}</CardTitle>
        <CardDescription>{plan.description}</CardDescription>
      </CardHeader>

      <CardContent>
        <p className="text-3xl font-bold">
          {plan.price === 0 ? "Gratis" : formatCurrency(plan.price)}
          {plan.price > 0 && (
            <span className="text-sm font-normal text-gray-500">/bulan</span>
          )}
        </p>

        <ul className="mt-4 space-y-2 text-sm">
          <li className="flex items-center gap-2">
            <span className="text-green-600">✓</span>
            {plan.maxAccounts === -1
              ? "Akun tidak terbatas"
              : `Hingga ${plan.maxAccounts} akun`}
          </li>
          <li className="flex items-center gap-2">
            <span
              className={
                plan.customScheduling ? "text-green-600" : "text-gray-300"
              }
            >
              {plan.customScheduling ? "✓" : "✗"}
            </span>
            Penjadwalan konten
          </li>
          <li className="flex items-center gap-2">
            <span
              className={
                plan.advancedAnalytics ? "text-green-600" : "text-gray-300"
              }
            >
              {plan.advancedAnalytics ? "✓" : "✗"}
            </span>
            Analitik lanjutan
          </li>
          <li className="flex items-center gap-2">
            <span
              className={
                plan.teamMembers > 1 ? "text-green-600" : "text-gray-300"
              }
            >
              {plan.teamMembers > 1 ? "✓" : "✗"}
            </span>
            {plan.teamMembers} anggota tim
          </li>
        </ul>
      </CardContent>

      <CardFooter>
        <button
          onClick={() => router.push(`/pricing?plan=${plan.id}`)}
          disabled={isCurrent}
          className={`w-full rounded-lg px-4 py-2 text-sm font-medium ${
            isCurrent
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {plan.price === 0
            ? "Gratis Selamanya"
            : isCurrent
              ? "Paket Saat Ini"
              : "Pilih Paket"}
        </button>
      </CardFooter>
    </Card>
  );
}
