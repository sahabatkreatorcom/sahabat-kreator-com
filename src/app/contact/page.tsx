import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kontak — Sahabat Kreator",
  description:
    "Hubungi tim Sahabat Kreator. Kirim email ke admin@sahabatkreator.com untuk pertanyaan, bantuan, atau laporan.",
  openGraph: {
    title: "Kontak — Sahabat Kreator",
    description: "Hubungi tim Sahabat Kreator.",
    type: "website",
    images: ["/images/logo-sahabat-kreator.png"],
  },
};

export default function ContactPage() {
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

      <main className="mx-auto max-w-2xl px-4 py-16">
        <div className="text-center">
          <span className="inline-block rounded-full bg-blue-100 px-4 py-1.5 text-sm font-medium text-blue-700 mb-4">
            Hubungi Kami
          </span>
          <h1 className="text-4xl font-bold text-gray-900">Kontak</h1>
          <p className="mt-4 text-gray-600">
            Punya pertanyaan, saran, atau butuh bantuan? Tim kami siap membantu.
          </p>
        </div>

        <div className="mt-12 space-y-6">
          <div className="rounded-xl border border-gray-100 bg-white p-6 transition-shadow hover:shadow-md">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 shrink-0">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">Email</h2>
                <p className="mt-1 text-sm text-gray-600">
                  Respon dalam 1x24 jam
                </p>
                <a
                  href="mailto:admin@sahabatkreator.com"
                  className="mt-2 inline-block text-sm font-medium text-blue-600 hover:underline"
                >
                  admin@sahabatkreator.com
                </a>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-gray-100 bg-white p-6 transition-shadow hover:shadow-md">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 shrink-0">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">Bantuan Teknis</h2>
                <p className="mt-1 text-sm text-gray-600">
                  Masalah login, koneksi akun, atau error teknis lainnya.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-gray-100 bg-white p-6 transition-shadow hover:shadow-md">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 shrink-0">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                </svg>
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">Pembayaran & Langganan</h2>
                <p className="mt-1 text-sm text-gray-600">
                  Konfirmasi pembayaran, upgrade paket, atau refund.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-gray-100 bg-white p-6 transition-shadow hover:shadow-md">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 shrink-0">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">Privasi & Data</h2>
                <p className="mt-1 text-sm text-gray-600">
                  Permintaan hapus data, akses data, atau pertanyaan kebijakan privasi.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 rounded-xl border border-blue-100 bg-blue-50 p-6 text-center">
          <p className="text-sm text-gray-700">
            Atau kunjungi halaman{" "}
            <Link href="/privacy" className="text-blue-600 hover:underline">
              Kebijakan Privasi
            </Link>{" "}
            dan{" "}
            <Link href="/terms" className="text-blue-600 hover:underline">
              Syarat & Ketentuan
            </Link>
          </p>
        </div>
      </main>

      <footer className="border-t bg-white py-8">
        <div className="mx-auto max-w-6xl px-4 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Sahabat Kreator. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
