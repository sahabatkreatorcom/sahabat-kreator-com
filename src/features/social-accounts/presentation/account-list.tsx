"use client";

import {
  useSocialAccounts,
  useDisconnectAccount,
} from "../application/use-social-accounts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../shared/ui/card";
import { PLATFORM_CONFIG } from "../../../config/platforms";
import type { Platform } from "../../../core/value-objects/platform";
import { PlatformIcon } from "../../../shared/ui/platform-icon";

export function AccountList() {
  const { data: accounts, isLoading, error } = useSocialAccounts();
  const disconnect = useDisconnectAccount();

  if (isLoading)
    return <div className="p-4 text-sm text-gray-500">Memuat akun...</div>;
  if (error)
    return (
      <div className="p-4 text-sm text-red-500">
        Gagal memuat: {error.message}
      </div>
    );

  if (!accounts?.length) {
    return (
      <div className="p-8 text-center text-gray-500">
        <p>Belum ada akun terhubung</p>
        <p className="mt-1 text-sm">Klik "Hubungkan Akun" untuk mulai</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {accounts.map((account) => {
        const config = PLATFORM_CONFIG[account.platform as Platform];
        return (
          <Card key={account.id}>
            <CardHeader className="flex-row items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                <PlatformIcon platform={account.platform as Platform} className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-sm">{account.accountName}</CardTitle>
                <p className="text-xs text-gray-500">
                  {config?.label ?? account.platform}
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span
                  className={`text-xs ${account.isActive ? "text-green-600" : "text-red-600"}`}
                >
                  {account.isActive ? "Aktif" : "Nonaktif"}
                </span>
                <button
                  onClick={() => disconnect.mutate(account.id)}
                  className="text-xs text-red-600 hover:underline"
                >
                  Putuskan
                </button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
