"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useAvailablePlans, useSubscription } from "../../features/subscription/application/use-subscription";
import { PlanCard } from "../../features/subscription/presentation/plan-card";
import { QrisPayment } from "../../features/payment/presentation/qris-payment";
import type { PlanId } from "../../config/plans";
import Link from "next/link";

const FAQS = [
  { q: "Apakah ada paket gratis?", a: "Ya! Paket Gratis mencakup 5 akun sosial media dan 10 posting per hari. Tidak perlu kartu kredit." },
  { q: "Bagaimana cara pembayaran?", a: "Kami menerima pembayaran via QRIS (semua e-wallet & mobile banking) dan transfer manual. Admin akan konfirmasi dalam 1x24 jam." },
  { q: "Bisa upgrade/downgrade kapan saja?", a: "Tentu. Upgrade langsung aktif setelah pembayaran dikonfirmasi. Downgrade akan berlaku di periode berikutnya." },
  { q: "Apakah ada refund?", a: "Tidak ada refund untuk pembayaran yang sudah dikonfirmasi. Namun Anda bisa downgrade ke paket Gratis kapan saja." },
  { q: "Bagaimana jika melebihi batas akun?", a: "Anda tidak bisa menambahkan akun baru sampai upgrade paket atau menghapus akun yang tidak terpakai." },
];

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
        <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 py-12">
          <div className="mx-auto max-w-lg px-4">
            <button
              onClick={() => router.push("/pricing")}
              className="mb-6 flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 transition-colors"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Kembali ke harga
            </button>
            <QrisPayment
              planId={plan.id as PlanId}
              amount={plan.price}
              planLabel={plan.label}
            />
          </div>
        </div>
      );
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="text-lg font-bold text-blue-600">
            Sahabat Kreator
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-blue-600">
              Masuk
            </Link>
            <Link
              href="/register"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
            >
              Daftar Gratis
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-16">
        <div className="text-center">
          <span className="inline-block rounded-full bg-blue-100 px-4 py-1.5 text-sm font-medium text-blue-700 mb-4">
            Investasi untuk Pertumbuhan
          </span>
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            Pilih Paket yang Tepat
          </h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Mulai gratis, upgrade kapan saja. Semua paket termasuk akses ke 8 platform
            sosial media dengan fitur scheduling dan dashboard terpadu.
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

        <section className="mt-24">
          <h2 className="text-center text-2xl font-bold text-gray-900">
            Pertanyaan Umum
          </h2>
          <div className="mt-8 mx-auto max-w-2xl space-y-3">
            {FAQS.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-xl border border-gray-100 bg-white transition-shadow [&[open]]:shadow-md"
              >
                <summary className="flex cursor-pointer items-center justify-between px-6 py-4 text-sm font-medium text-gray-900">
                  {faq.q}
                  <svg
                    className="h-4 w-4 text-gray-500 transition-transform group-open:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="border-t border-gray-100 px-6 py-4 text-sm text-gray-600 leading-relaxed">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-24 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 p-12 text-center text-white">
          <h2 className="text-3xl font-bold">Siap Memulai?</h2>
          <p className="mt-4 text-blue-100">
            Gabung gratis sekarang. Tidak perlu kartu kredit.
          </p>
          <Link
            href="/register"
            className="mt-8 inline-block rounded-lg bg-white px-10 py-3.5 text-sm font-semibold text-blue-600 hover:bg-blue-50 transition-colors shadow-lg"
          >
            Daftar Gratis
          </Link>
        </section>
      </main>

      <footer className="border-t bg-white py-8">
        <div className="mx-auto max-w-6xl px-4 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Sahabat Kreator. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
