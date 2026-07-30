"use client";

import { useAnalyticsSummary } from "../../../features/analytics/application/use-analytics";
import { PLATFORM_CONFIG } from "../../../config/platforms";
import type { Platform } from "../../../core/value-objects/platform";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../shared/ui/card";

export default function AnalyticsPage() {
  const { data: summary, isLoading } = useAnalyticsSummary();

  if (isLoading)
    return <div className="text-sm text-gray-500">Memuat analitik...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Analitik</h1>
        <p className="text-sm text-gray-500">
          Ringkasan performa akun sosial media
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Total Akun</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{summary?.totalAccounts ?? 0}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Total Post</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{summary?.totalPosts ?? 0}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Post Bulan Ini</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{summary?.postsThisMonth ?? 0}</p>
          </CardContent>
        </Card>
      </div>

      {summary?.accountsByPlatform && (
        <Card>
          <CardHeader>
            <CardTitle>Akun per Platform</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(summary.accountsByPlatform).map(
                ([platform, count]) => (
                  <div
                    key={platform}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm">{PLATFORM_CONFIG[platform as Platform]?.label ?? platform}</span>
                    <span className="text-sm font-medium">{count}</span>
                  </div>
                ),
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
