"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "../../lib/auth/client";
import Link from "next/link";

export default function AdminPage() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [bootstrapStatus, setBootstrapStatus] = useState<string | null>(null);

  useEffect(() => {
    if (session?.user && session.user.role !== "admin") {
      router.push("/login");
    }
  }, [session, router]);

  async function handleBootstrap() {
    setBootstrapStatus("Memproses...");
    try {
      const res = await fetch("/api/admin/bootstrap", { method: "POST" });
      if (res.ok) {
        setBootstrapStatus("Role admin berhasil diaktifkan! Silakan refresh halaman.");
      } else {
        const data = await res.json();
        setBootstrapStatus(data.error ?? "Gagal");
      }
    } catch {
      setBootstrapStatus("Gagal menghubungi server");
    }
  }

  if (!session?.user) {
    return <div className="p-12 text-center text-gray-500">Memuat...</div>;
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-2xl font-bold">Panel Admin</h1>
      <p className="mt-1 text-sm text-gray-500">
        Selamat datang, {session.user.email}
      </p>

      {session.user.role !== "admin" && (
        <div className="mt-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4">
          <p className="text-sm text-yellow-800">
            Akun Anda belum memiliki role admin. Klik tombol di bawah untuk mengaktifkan.
          </p>
          <button
            onClick={handleBootstrap}
            className="mt-3 rounded-lg bg-yellow-600 px-4 py-2 text-sm font-medium text-white hover:bg-yellow-700"
          >
            Aktifkan Admin
          </button>
          {bootstrapStatus && (
            <p className="mt-2 text-sm">{bootstrapStatus}</p>
          )}
        </div>
      )}

      {session.user.role === "admin" && (
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Link
            href="/admin/payments"
            className="rounded-xl border p-6 transition-shadow hover:shadow-md"
          >
            <h2 className="font-semibold">Verifikasi Pembayaran</h2>
            <p className="mt-1 text-sm text-gray-500">
              Lihat dan konfirmasi pembayaran QRIS dari pengguna
            </p>
          </Link>

          <Link
            href="/dashboard"
            className="rounded-xl border p-6 transition-shadow hover:shadow-md"
          >
            <h2 className="font-semibold">Dashboard</h2>
            <p className="mt-1 text-sm text-gray-500">
              Kembali ke dashboard utama
            </p>
          </Link>
        </div>
      )}
    </div>
  );
}
