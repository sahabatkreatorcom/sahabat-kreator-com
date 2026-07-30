"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useAvailablePlans, useSubscription } from "../../features/subscription/application/use-subscription";
import { PlanCard } from "../../features/subscription/presentation/plan-card";
import { QrisPayment } from "../../features/payment/presentation/qris-payment";
import type { PlanId } from "../../config/plans";

export function PricingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedPlan = searchParams.get("plan") as PlanId | null;
  const { data: subscription } = useSubscription();
  const plans = useAvailablePlans();

  if (selectedPlan && subscription?.planId !== selectedPlan) {
    const plan = plans.find((p) => p.id === selectedPlan);
    if (plan && plan.price > 0) {
      return (
        <div className="mx-auto max-w-lg py-12 px-4">
          <button onClick={() => router.push("/pricing")} className="mb-4 text-sm text-blue-600 hover:underline">
            ← Kembali
          </button>
          <QrisPayment
            planId={plan.id as PlanId}
            amount={plan.price}
            planLabel={plan.label}
          />
        </div>
      );
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Pilih Paket</h1>
        <p className="mt-2 text-gray-600">
          Mulai gratis. Upgrade kapan saja via QRIS atau transfer manual.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            isCurrent={plan.id === subscription?.planId}
          />
        ))}
      </div>
    </div>
  );
}
