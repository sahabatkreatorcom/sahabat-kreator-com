import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Image
            src="/images/logo-sahabat-kreator.png"
            alt="Sahabat Kreator"
            width={120}
            height={32}
            className="h-8 w-auto"
            priority
          />
          <nav className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium hover:text-blue-600"
            >
              Masuk
            </Link>
            <Link
              href="/register"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Daftar Gratis
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="mx-auto max-w-6xl px-4 py-24 text-center">
          <h1 className="text-5xl font-bold tracking-tight">
            Kelola Semua <span className="text-blue-600">Sosial Media</span>{" "}
            dalam Satu Tempat
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            Hubungkan Facebook, Instagram, Threads, LinkedIn, YouTube, TikTok,
            dan Pinterest. Jadwalkan posting, analitik, dan kelola semuanya dari
            dashboard terpadu.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link
              href="/register"
              className="rounded-lg bg-blue-600 px-8 py-3 text-sm font-medium text-white hover:bg-blue-700"
            >
              Mulai Gratis
            </Link>
            <Link
              href="/pricing"
              className="rounded-lg border bg-white px-8 py-3 text-sm font-medium hover:bg-gray-50"
            >
              Lihat Harga
            </Link>
          </div>

          <div className="mt-8 flex items-center justify-center gap-8 text-sm text-gray-500">
            <span>Facebook</span>
            <span>Instagram</span>
            <span>Threads</span>
            <span>LinkedIn</span>
            <span>YouTube</span>
            <span>TikTok</span>
            <span>Pinterest</span>
          </div>
        </section>

        <section className="border-t bg-white py-24">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-center text-3xl font-bold">Harga Sederhana</h2>
            <p className="mt-4 text-center text-gray-600">
              Mulai gratis. Upgrade kapan saja via QRIS atau transfer.
            </p>
            <div className="mt-12 grid gap-8 md:grid-cols-4">
              {PLANS.map((plan) => (
                <div key={plan.id} className="rounded-xl border p-6">
                  <h3 className="font-semibold">{plan.label}</h3>
                  <p className="mt-2 text-3xl font-bold">
                    {plan.price === 0
                      ? "Gratis"
                      : `Rp${plan.price.toLocaleString("id-ID")}`}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    {plan.description}
                  </p>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li>
                      ✓{" "}
                      {plan.maxAccounts === -1 ? "Unlimited" : plan.maxAccounts}{" "}
                      akun
                    </li>
                    <li>
                      ✓{" "}
                      {plan.maxPostsPerDay === -1
                        ? "Unlimited"
                        : `${plan.maxPostsPerDay}/hari`}{" "}
                      posting
                    </li>
                    <li
                      className={plan.advancedAnalytics ? "" : "text-gray-300"}
                    >
                      {plan.advancedAnalytics ? "✓" : "✗"} Analitik
                    </li>
                    <li
                      className={plan.customScheduling ? "" : "text-gray-300"}
                    >
                      {plan.customScheduling ? "✓" : "✗"} Scheduling
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-white py-8 text-center text-sm text-gray-500">
        <div className="mx-auto flex flex-col items-center gap-4 px-4">
          <Image
            src="/images/logo-sahabat-kreator.png"
            alt="Sahabat Kreator"
            width={100}
            height={28}
            className="h-7 w-auto opacity-60"
          />
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-blue-600">
              Kebijakan Privasi
            </Link>
            <Link href="/terms" className="hover:text-blue-600">
              Syarat & Ketentuan
            </Link>
          </div>
        </div>
        <p className="mt-4">&copy; 2026 Sahabat Kreator. All rights reserved.</p>
      </footer>
    </div>
  );
}

const PLANS = [
  {
    id: "free",
    label: "Gratis",
    price: 0,
    description: "Coba fitur dasar",
    maxAccounts: 5,
    maxPostsPerDay: 10,
    advancedAnalytics: false,
    customScheduling: false,
  },
  {
    id: "starter",
    label: "Starter",
    price: 49000,
    description: "Untuk content creator",
    maxAccounts: 10,
    maxPostsPerDay: 30,
    advancedAnalytics: false,
    customScheduling: true,
  },
  {
    id: "pro",
    label: "Pro",
    price: 99000,
    description: "Untuk tim marketing",
    maxAccounts: 25,
    maxPostsPerDay: 100,
    advancedAnalytics: true,
    customScheduling: true,
  },
  {
    id: "business",
    label: "Business",
    price: 249000,
    description: "Untuk agency",
    maxAccounts: -1,
    maxPostsPerDay: -1,
    advancedAnalytics: true,
    customScheduling: true,
  },
];
