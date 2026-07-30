"use client";

import {
  useSubscription,
  useAvailablePlans,
} from "../../../features/subscription/application/use-subscription";
import { PlanCard } from "../../../features/subscription/presentation/plan-card";

export default function SubscriptionPage() {
  const { data: subscription } = useSubscription();
  const plans = useAvailablePlans();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Langganan</h1>
        <p className="text-sm text-gray-500">
          {subscription
            ? `Kamu sedang menggunakan paket ${subscription.planId.toUpperCase()} (${subscription.currentAccounts}/${subscription.maxAccounts} akun)`
            : "Pilih paket yang sesuai untuk kamu"}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
