import { Suspense } from "react";
import { PricingContent } from "./pricing-content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Harga — Sahabat Kreator",
  description:
    "Lihat paket harga Sahabat Kreator. Mulai gratis, upgrade kapan saja via QRIS. Tersedia paket Starter, Pro, dan Business untuk content creator, tim marketing, dan agency.",
  openGraph: {
    title: "Harga — Sahabat Kreator",
    description: "Mulai gratis. Upgrade kapan saja via QRIS atau transfer.",
    type: "website",
    images: ["/images/logo-sahabat-kreator.png"],
  },
};

export default function PricingPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
            <p className="mt-4 text-sm text-gray-500">Memuat...</p>
          </div>
        </div>
      }
    >
      <PricingContent />
    </Suspense>
  );
}
