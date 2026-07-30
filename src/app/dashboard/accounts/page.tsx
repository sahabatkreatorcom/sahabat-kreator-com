"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { AccountList } from "../../../features/social-accounts/presentation/account-list";
import { ConnectButton } from "../../../features/social-accounts/presentation/connect-button";

interface FacebookPage {
  id: string;
  name: string;
  avatar: string | null;
  accessToken: string;
}

function AccountsPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const connect = searchParams.get("connect");
  const errorReason = searchParams.get("reason");
  const pendingAccountId = searchParams.get("accountId");
  const [pages, setPages] = useState<FacebookPage[]>([]);
  const [selecting, setSelecting] = useState(false);

  useEffect(() => {
    if (connect === "pending" && pendingAccountId) {
      fetch(`/api/social-accounts`)
        .then((r) => r.json())
        .then((accounts) => {
          const acc = accounts.find((a: any) => a.id === pendingAccountId);
          if (acc?.platformMetadata) {
            setPages(JSON.parse(acc.platformMetadata));
            setSelecting(true);
          }
        });
    }
  }, [connect, pendingAccountId]);

  async function handleSelectPage(page: FacebookPage) {
    if (!pendingAccountId) return;
    await fetch(`/api/social-accounts/${pendingAccountId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pageId: page.id,
        pageAccessToken: page.accessToken,
        pageName: page.name,
        pageAvatar: page.avatar,
      }),
    });
    setSelecting(false);
    router.replace("/dashboard/accounts?connect=success");
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Akun Sosial Media</h1>
          <p className="text-sm text-gray-500">
            Hubungkan dan kelola akun sosial media kamu
          </p>
        </div>
        <ConnectButton />
      </div>

      {selecting && pages.length > 0 && (
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
          <h3 className="font-medium text-blue-900">Pilih Halaman Facebook</h3>
          <p className="mt-1 text-sm text-blue-700">
            Kamu memiliki {pages.length} halaman. Pilih satu untuk dihubungkan.
          </p>
          <div className="mt-3 space-y-2">
            {pages.map((page) => (
              <button
                key={page.id}
                onClick={() => handleSelectPage(page)}
                className="flex w-full items-center gap-3 rounded-lg border bg-white px-4 py-3 text-left text-sm hover:bg-blue-50"
              >
                <div className="h-8 w-8 rounded-full bg-blue-100" />
                <span className="font-medium">{page.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {connect === "success" && !selecting && (
        <div className="rounded-lg bg-green-50 p-3 text-sm text-green-700">
          Akun berhasil dihubungkan!
        </div>
      )}

      {connect === "error" && errorReason === "limit" && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
          Batas akun telah tercapai. Upgrade paket untuk menambah akun.
        </div>
      )}

      {connect === "error" && !errorReason && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
          Gagal menghubungkan akun. Silakan coba lagi.
        </div>
      )}

      <AccountList />
    </div>
  );
}

export default function AccountsPage() {
  return (
    <Suspense>
      <AccountsPageContent />
    </Suspense>
  );
}
