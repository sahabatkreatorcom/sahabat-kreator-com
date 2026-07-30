"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "../../../lib/auth/client";

interface Payment {
  id: string;
  userId: string;
  planId: string;
  amount: number;
  method: string;
  status: string;
  proofImageUrl: string | null;
  createdAt: string;
}

interface UserInfo {
  id: string;
  email: string;
  name: string;
}

export default function AdminPaymentsPage() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [users, setUsers] = useState<Record<string, UserInfo>>({});
  const [loading, setLoading] = useState(true);
  const [confirmingId, setConfirmingId] = useState<string | null>(null);

  useEffect(() => {
    if (session?.user && session.user.role !== "admin") {
      router.push("/login");
    }
  }, [session, router]);

  useEffect(() => {
    if (session?.user?.role === "admin") {
      loadData();
    }
  }, [session]);

  async function loadData() {
    try {
      const [paymentsRes, usersRes] = await Promise.all([
        fetch("/api/payments"),
        fetch("/api/auth/admin/list-users"),
      ]);

      const paymentsData = await paymentsRes.json();
      const usersData = await usersRes.json();

      const userMap: Record<string, UserInfo> = {};
      for (const u of usersData.users ?? []) {
        userMap[u.id] = u;
      }

      setPayments(paymentsData);
      setUsers(userMap);
    } catch (e) {
      console.error("Failed to load data:", e);
    } finally {
      setLoading(false);
    }
  }

  async function handleConfirm(paymentId: string) {
    setConfirmingId(paymentId);
    try {
      await fetch(`/api/admin/confirm-payment/${paymentId}`, {
        method: "POST",
      });
    } catch (e) {
      console.error("Failed to confirm:", e);
    }
    setConfirmingId(null);
    loadData();
  }

  if (!session?.user) {
    return <div className="p-12 text-center text-gray-500">Memuat...</div>;
  }

  const pending = payments.filter((p) => p.status === "pending");
  const history = payments.filter((p) => p.status !== "pending");

  function getUserInfo(userId: string): UserInfo {
    return (
      users[userId] ?? { id: userId, email: "Unknown", name: "Unknown" }
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-2xl font-bold">Verifikasi Pembayaran</h1>
      <p className="mt-1 text-sm text-gray-500">
        Konfirmasi pembayaran dari pengguna
      </p>

      {loading ? (
        <p className="mt-8 text-sm text-gray-500">Memuat data...</p>
      ) : (
        <>
          <div className="mt-8 space-y-4">
            {pending.length === 0 && (
              <p className="text-sm text-gray-500">
                Tidak ada pembayaran pending.
              </p>
            )}

            {pending.map((p) => {
              const u = getUserInfo(p.userId);
              return (
                <div key={p.id} className="rounded-xl border p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium">{u.name}</p>
                      <p className="text-sm text-gray-500">{u.email}</p>
                      <p className="mt-1 text-sm">
                        Paket: <span className="font-medium">{p.planId}</span>{" "}
                        &mdash; Rp{p.amount.toLocaleString("id-ID")}
                      </p>
                      <p className="text-xs text-gray-400">
                        {new Date(p.createdAt).toLocaleString("id-ID")}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {p.proofImageUrl && (
                        <a
                          href={p.proofImageUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-lg border px-3 py-1.5 text-sm hover:bg-gray-50"
                        >
                          Lihat Bukti
                        </a>
                      )}
                      <button
                        onClick={() => handleConfirm(p.id)}
                        disabled={confirmingId === p.id}
                        className="rounded-lg bg-green-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50"
                      >
                        {confirmingId === p.id ? "..." : "Konfirmasi"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {history.length > 0 && (
            <div className="mt-12">
              <h2 className="text-lg font-semibold">Riwayat</h2>
              <div className="mt-4 space-y-2">
                {history.map((p) => {
                  const u = getUserInfo(p.userId);
                  return (
                    <div key={p.id} className="rounded-lg border p-3 text-sm">
                      <div className="flex items-center justify-between">
                        <span>
                          {u.name} &mdash; {p.planId} &mdash; Rp
                          {p.amount.toLocaleString("id-ID")}
                        </span>
                        <span
                          className={`text-xs font-medium ${
                            p.status === "confirmed"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {p.status === "confirmed"
                            ? "Dikonfirmasi"
                            : p.status}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
