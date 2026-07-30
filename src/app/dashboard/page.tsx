"use client";

import { useAnalyticsSummary } from "../../features/analytics/application/use-analytics";
import { useSocialAccounts } from "../../features/social-accounts/application/use-social-accounts";
import { useSubscription } from "../../features/subscription/application/use-subscription";
import { Card, CardContent, CardHeader, CardTitle } from "../../shared/ui/card";
import { PLATFORM_CONFIG } from "../../config/platforms";
import type { Platform } from "../../core/value-objects/platform";
import { Users, CalendarPlus, BarChart3, CreditCard } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { data: summary } = useAnalyticsSummary();
  const { data: accounts } = useSocialAccounts();
  const { data: sub } = useSubscription();

  const stats = [
    {
      label: "Total Akun",
      value: summary?.totalAccounts ?? accounts?.length ?? 0,
      icon: Users,
      color: "text-blue-600",
      href: "/dashboard/accounts",
    },
    {
      label: "Total Post",
      value: summary?.totalPosts ?? 0,
      icon: CalendarPlus,
      color: "text-green-600",
      href: "/dashboard/posts",
    },
    {
      label: "Post Bulan Ini",
      value: summary?.postsThisMonth ?? 0,
      icon: BarChart3,
      color: "text-purple-600",
      href: "/dashboard/analytics",
    },
    {
      label: "Paket",
      value: sub?.planId
        ? sub.planId.charAt(0).toUpperCase() + sub.planId.slice(1)
        : "Gratis",
      icon: CreditCard,
      color: "text-orange-600",
      href: "/dashboard/subscription",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-gray-500">Overview akun sosial media kamu</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <Card className="transition-shadow hover:shadow-md">
              <CardContent className="flex items-center gap-4 p-6">
                <div className={`rounded-lg bg-gray-50 p-3 ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Akun Terhubung</CardTitle>
          </CardHeader>
          <CardContent>
            {accounts?.length ? (
              <div className="space-y-3">
                {accounts.slice(0, 5).map((acc) => (
                  <div
                    key={acc.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">
                        {acc.accountName}
                      </span>
                      <span className="text-xs text-gray-500">
                        {PLATFORM_CONFIG[acc.platform as Platform]?.label ?? acc.platform}
                      </span>
                    </div>
                    <span
                      className={`text-xs ${acc.isActive ? "text-green-600" : "text-red-600"}`}
                    >
                      {acc.isActive ? "Aktif" : "Nonaktif"}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">Belum ada akun terhubung</p>
            )}
          </CardContent>
        </Card>

        {sub && (
          <Card>
            <CardHeader>
              <CardTitle>Pemakaian Paket</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm">
                    <span>
                      Akun ({sub.currentAccounts}/{sub.maxAccounts})
                    </span>
                    <span
                      className={
                        sub.usagePercent >= 80 ? "text-red-600 font-medium" : ""
                      }
                    >
                      {sub.usagePercent}%
                    </span>
                  </div>
                  <div className="mt-1 h-2 rounded-full bg-gray-100">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        sub.usagePercent >= 80 ? "bg-red-600" : "bg-blue-600"
                      }`}
                      style={{ width: `${Math.min(sub.usagePercent, 100)}%` }}
                    />
                  </div>
                </div>
                {sub.usagePercent >= 80 && (
                  <Link
                    href="/dashboard/subscription"
                    className="block text-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                  >
                    Upgrade Paket
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
