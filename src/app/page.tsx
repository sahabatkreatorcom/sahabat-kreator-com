import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sahabat Kreator — Kelola Semua Sosial Media dalam Satu Tempat",
  description:
    "Platform manajemen sosial media all-in-one. Hubungkan Facebook, Instagram, Threads, LinkedIn, YouTube, TikTok & Pinterest. Jadwalkan posting, lihat analitik, kelola dari satu dashboard.",
  keywords: [
    "manajemen sosial media",
    "social media management",
    "jadwalkan posting",
    "content creator",
    "dashboard sosial media",
    "Indonesia",
  ],
  openGraph: {
    title: "Sahabat Kreator — Social Media Management Platform",
    description:
      "Hubungkan 8 platform sosial media. Jadwalkan, analisa, dan kelola semuanya dari satu dashboard.",
    type: "website",
    images: ["/images/logo-sahabat-kreator.png"],
  },
};

const PLATFORMS = [
  { name: "Facebook", color: "#1877F2" },
  { name: "Instagram", color: "#E4405F" },
  { name: "Threads", color: "#000000" },
  { name: "LinkedIn", color: "#0A66C2" },
  { name: "YouTube", color: "#FF0000" },
  { name: "TikTok", color: "#000000" },
  { name: "Pinterest", color: "#BD081C" },
];

const FEATURES = [
  {
    title: "Multi-Platform",
    desc: "Hubungkan 8 platform sosial media sekaligus. Kelola Facebook, Instagram, Threads, LinkedIn, YouTube, TikTok, dan Pinterest dari satu dashboard.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
      </svg>
    ),
  },
  {
    title: "Jadwalkan Posting",
    desc: "Buat konten sekarang, publikasi otomatis nanti. Atur jadwal harian/mingguan dengan kalender visual.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Analitik Mendalam",
    desc: "Pantau pertumbuhan akun, engagement rate, performa konten, dan insights real-time dari semua platform.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
  {
    title: "Tim Collaboration",
    desc: "Ajak timmu mengelola akun. Atur role, izin akses, dan workflow kolaborasi konten.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
  {
    title: "AI-Powered",
    desc: "Dapatkan saran konten, caption otomatis, dan rekomendasi waktu posting terbaik berbasis AI.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
  },
  {
    title: "API Access",
    desc: "Integrasikan dengan tools favoritmu via API. Fully RESTful API untuk automation dan reporting.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
  },
];

const PLANS = [
  {
    id: "free",
    label: "Gratis",
    price: 0,
    desc: "Coba fitur dasar sosial media management",
    popular: false,
    features: ["5 akun sosial media", "10 posting/hari", "Basic dashboard", "1 anggota tim"],
  },
  {
    id: "starter",
    label: "Starter",
    price: 49000,
    desc: "Untuk content creator & small business",
    popular: false,
    features: ["10 akun sosial media", "30 posting/hari", "Scheduling", "2 anggota tim"],
  },
  {
    id: "pro",
    label: "Pro",
    price: 99000,
    desc: "Untuk tim marketing & agency kecil",
    popular: true,
    features: ["25 akun sosial media", "100 posting/hari", "Advanced analitik", "5 anggota tim", "AI suggestions", "API access"],
  },
  {
    id: "business",
    label: "Business",
    price: 249000,
    desc: "Untuk agency & enterprise",
    popular: false,
    features: ["Unlimited akun", "Unlimited posting", "Advanced analitik", "15 anggota tim", "AI suggestions", "API access", "Prioritas support"],
  },
];

const FAQS = [
  { q: "Apa itu Sahabat Kreator?", a: "Sahabat Kreator adalah platform manajemen sosial media all-in-one yang memungkinkan Anda menghubungkan, mengelola, dan menjadwalkan posting ke 8 platform sosial media dari satu dashboard." },
  { q: "Platform apa saja yang didukung?", a: "Kami mendukung Facebook, Instagram (via Facebook & Direct), Threads, LinkedIn, YouTube, TikTok, dan Pinterest." },
  { q: "Apakah ada paket gratis?", a: "Ya! Paket Gratis mencakup 5 akun sosial media dan 10 posting per hari. Cukup untuk mencoba semua fitur dasar." },
  { q: "Bagaimana cara pembayaran?", a: "Kami menerima pembayaran via QRIS (semua e-wallet & mobile banking) dan transfer manual. Admin akan konfirmasi dalam 1x24 jam." },
  { q: "Bisa kolaborasi dengan tim?", a: "Ya, paket Pro dan Business mendukung multi-anggota tim dengan role dan izin akses yang bisa diatur." },
  { q: "Apakah ada API untuk integrasi?", a: "Ya, paket Pro dan Business menyertakan akses API penuh untuk integrasi dengan tools favorit Anda." },
];

function StarIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.811.71 1.453 1.434 1.017L10 15.29l3.999 2.283c.724.436 1.628-.206 1.434-1.017l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Sahabat Kreator",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            description:
              "Platform manajemen sosial media all-in-one untuk Facebook, Instagram, Threads, LinkedIn, YouTube, TikTok, dan Pinterest.",
            offers: [
              { "@type": "Offer", name: "Gratis", price: "0", priceCurrency: "IDR" },
              { "@type": "Offer", name: "Starter", price: "49000", priceCurrency: "IDR" },
              { "@type": "Offer", name: "Pro", price: "99000", priceCurrency: "IDR" },
              { "@type": "Offer", name: "Business", price: "249000", priceCurrency: "IDR" },
            ],
          }),
        }}
      />

      <div className="flex min-h-screen flex-col">
        <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-white/80 backdrop-blur-md">
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
              <Link href="#features" className="text-sm text-gray-600 hover:text-blue-600 hidden sm:block">
                Fitur
              </Link>
              <Link href="#pricing" className="text-sm text-gray-600 hover:text-blue-600 hidden sm:block">
                Harga
              </Link>
              <Link href="#faq" className="text-sm text-gray-600 hover:text-blue-600 hidden sm:block">
                FAQ
              </Link>
              <Link
                href="/login"
                className="text-sm font-medium text-gray-700 hover:text-blue-600"
              >
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

        <main className="flex-1">
          <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-white pt-32 pb-24">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent" />
            <div className="relative mx-auto max-w-6xl px-4 text-center">
              <span className="inline-block rounded-full bg-blue-100 px-4 py-1.5 text-sm font-medium text-blue-700 mb-6">
                Platform Manajemen Sosial Media #1 di Indonesia
              </span>
              <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
                Kelola Semua{" "}
                <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                  Sosial Media
                </span>{" "}
                dalam Satu Tempat
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
                Hubungkan Facebook, Instagram, Threads, LinkedIn, YouTube, TikTok,
                dan Pinterest. Jadwalkan posting, lihat analitik, dan kelola semuanya
                dari dashboard terpadu.
              </p>

              <div className="mt-10 flex items-center justify-center gap-4">
                <Link
                  href="/register"
                  className="rounded-lg bg-blue-600 px-8 py-3.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
                >
                  Mulai Gratis
                </Link>
                <Link
                  href="#features"
                  className="rounded-lg border border-gray-200 bg-white px-8 py-3.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Lihat Fitur
                </Link>
              </div>

              <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
                {PLATFORMS.map((p) => (
                  <span
                    key={p.name}
                    className="flex items-center gap-2 text-sm font-medium text-gray-500"
                  >
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: p.color }} />
                    {p.name}
                  </span>
                ))}
              </div>

              <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {[
                  { label: "Platform Didukung", value: "8" },
                  { label: "Pengguna Aktif", value: "500+" },
                  { label: "Posting Terjadwal", value: "10rb+" },
                  { label: "Akun Terhubung", value: "1rb+" },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl border bg-white p-4">
                    <p className="text-2xl font-bold text-blue-600">{s.value}</p>
                    <p className="text-xs text-gray-500">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="features" className="scroll-mt-20 py-24">
            <div className="mx-auto max-w-6xl px-4">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                  Semua yang Anda Butuhkan
                </h2>
                <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                  Fitur lengkap untuk mengelola sosial media secara profesional, dari
                  scheduling hingga analitik mendalam.
                </p>
              </div>

              <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {FEATURES.map((f) => (
                  <article
                    key={f.title}
                    className="group rounded-xl border border-gray-100 bg-white p-6 transition-shadow hover:shadow-lg"
                  >
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      {f.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{f.title}</h3>
                    <p className="mt-2 text-sm text-gray-600 leading-relaxed">{f.desc}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="border-t bg-gradient-to-b from-white to-blue-50 py-24">
            <div className="mx-auto max-w-6xl px-4">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                  Cara Kerjanya
                </h2>
                <p className="mt-4 text-gray-600">
                  Mulai dalam 3 langkah mudah. Tidak perlu instalasi atau technical skill.
                </p>
              </div>

              <div className="mt-16 grid gap-8 md:grid-cols-3">
                {[
                  {
                    step: "01",
                    title: "Hubungkan Akun",
                    desc: "Login dan otorisasi akun sosial media Anda. Kami menggunakan OAuth resmi — aman dan terenkripsi.",
                  },
                  {
                    step: "02",
                    title: "Buat & Jadwalkan",
                    desc: "Tulis konten, upload media, atur jadwal posting. Preview sebelum publikasi.",
                  },
                  {
                    step: "03",
                    title: "Pantau & Optimalkan",
                    desc: "Lihat performa setiap posting, analitik engagement, dan optimalkan strategi konten Anda.",
                  },
                ].map((s) => (
                  <div key={s.step} className="relative text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-xl font-bold text-white">
                      {s.step}
                    </div>
                    <h3 className="mt-6 text-lg font-semibold text-gray-900">{s.title}</h3>
                    <p className="mt-2 text-sm text-gray-600">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="pricing" className="scroll-mt-20 py-24">
            <div className="mx-auto max-w-6xl px-4">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                  Harga Sederhana
                </h2>
                <p className="mt-4 text-gray-600">
                  Mulai gratis. Upgrade kapan saja via QRIS atau transfer bank.
                </p>
              </div>

              <div className="mt-12 grid gap-6 lg:grid-cols-4">
                {PLANS.map((plan) => (
                  <div
                    key={plan.id}
                    className={`relative flex flex-col rounded-2xl border p-6 transition-shadow hover:shadow-lg ${
                      plan.popular
                        ? "border-blue-200 bg-white shadow-lg shadow-blue-100 scale-105 lg:scale-105"
                        : "border-gray-100 bg-white"
                    }`}
                  >
                    {plan.popular && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 px-4 py-1 text-xs font-medium text-white">
                        Paling Populer
                      </span>
                    )}
                    <h3 className="text-lg font-semibold text-gray-900">{plan.label}</h3>
                    <p className="mt-1 text-xs text-gray-500">{plan.desc}</p>
                    <p className="mt-4">
                      {plan.price === 0 ? (
                        <span className="text-3xl font-bold text-gray-900">Gratis</span>
                      ) : (
                        <>
                          <span className="text-3xl font-bold text-gray-900">
                            Rp{plan.price.toLocaleString("id-ID")}
                          </span>
                          <span className="text-sm text-gray-500">/bulan</span>
                        </>
                      )}
                    </p>
                    <ul className="mt-6 space-y-3 flex-1">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                          <StarIcon />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={plan.price === 0 ? "/register" : `/pricing?plan=${plan.id}`}
                      className={`mt-6 block rounded-lg py-2.5 text-center text-sm font-medium transition-colors ${
                        plan.popular
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {plan.price === 0 ? "Daftar Gratis" : "Pilih Paket"}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="border-t bg-gradient-to-b from-white to-blue-50 py-24">
            <div className="mx-auto max-w-6xl px-4">
              <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 p-12 text-center text-white">
                <h2 className="text-3xl font-bold">Siap Kelola Sosial Media dengan Lebih Mudah?</h2>
                <p className="mt-4 text-blue-100 max-w-2xl mx-auto">
                  Gabung gratis. Tidak perlu kartu kredit. Upgrade kapan saja.
                </p>
                <Link
                  href="/register"
                  className="mt-8 inline-block rounded-lg bg-white px-10 py-3.5 text-sm font-semibold text-blue-600 hover:bg-blue-50 transition-colors shadow-lg"
                >
                  Mulai Gratis Sekarang
                </Link>
              </div>
            </div>
          </section>

          <section id="faq" className="scroll-mt-20 py-24">
            <div className="mx-auto max-w-3xl px-4">
              <h2 className="text-center text-3xl font-bold text-gray-900">
                Pertanyaan Umum
              </h2>
              <div className="mt-12 space-y-4">
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
            </div>
          </section>
        </main>

        <footer className="border-t bg-white py-12">
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <Image
                  src="/images/logo-sahabat-kreator.png"
                  alt="Sahabat Kreator"
                  width={120}
                  height={32}
                  className="h-8 w-auto"
                />
                <p className="mt-4 text-sm text-gray-500 leading-relaxed">
                  Platform manajemen sosial media all-in-one untuk content creator, tim marketing, dan agency di Indonesia.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-900">Fitur</h4>
                <ul className="mt-4 space-y-2 text-sm text-gray-500">
                  <li><Link href="#features" className="hover:text-blue-600">Multi-Platform</Link></li>
                  <li><Link href="#features" className="hover:text-blue-600">Scheduling</Link></li>
                  <li><Link href="#features" className="hover:text-blue-600">Analitik</Link></li>
                  <li><Link href="#features" className="hover:text-blue-600">Kolaborasi Tim</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-900">Platform</h4>
                <ul className="mt-4 space-y-2 text-sm text-gray-500">
                  {PLATFORMS.map((p) => (
                    <li key={p.name}>{p.name}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-900">Perusahaan</h4>
                <ul className="mt-4 space-y-2 text-sm text-gray-500">
                  <li><Link href="/pricing" className="hover:text-blue-600">Harga</Link></li>
                  <li><Link href="/privacy" className="hover:text-blue-600">Kebijakan Privasi</Link></li>
                  <li><Link href="/terms" className="hover:text-blue-600">Syarat & Ketentuan</Link></li>
                </ul>
              </div>
            </div>
            <div className="mt-12 border-t pt-8 text-center text-sm text-gray-400">
              &copy; {new Date().getFullYear()} Sahabat Kreator. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
