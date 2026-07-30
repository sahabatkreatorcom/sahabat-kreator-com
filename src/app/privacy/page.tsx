import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kebijakan Privasi - Sahabat Kreator",
  description: "Kebijakan privasi Sahabat Kreator — platform manajemen sosial media",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold">Kebijakan Privasi</h1>
      <p className="mt-2 text-sm text-gray-500">Terakhir diperbarui: 29 Juli 2026</p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-gray-700">
        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900">1. Data yang Kami Kumpulkan</h2>
          <p>Kami mengumpulkan data berikut saat Anda menggunakan Sahabat Kreator:</p>
          <ul className="mt-2 list-disc pl-5 space-y-1">
            <li><strong>Data Akun:</strong> nama, email, foto profil, dan ID pengguna dari platform sosial media yang Anda hubungkan.</li>
            <li><strong>Data Akun Instagram (Direct):</strong> jika menggunakan opsi Instagram (Direct), kami mengakses username Instagram, ID akun profesional, foto profil, dan data media Anda langsung melalui API Instagram tanpa melalui Facebook Page.</li>
            <li><strong>Data Konten:</strong> posting, caption, media (gambar/video), jadwal posting yang Anda buat melalui platform kami.</li>
            <li><strong>Data Analytics:</strong> metrik engagement, jumlah pengikut, jangkauan posting, dan data insights lain dari akun yang terhubung.</li>
            <li><strong>Data Pembayaran:</strong> bukti transfer QRIS yang Anda upload. Kami tidak menyimpan data kartu kredit atau rekening bank.</li>
            <li><strong>Data Teknis:</strong> alamat IP, user agent browser, halaman yang dikunjungi, dan waktu akses.</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900">2. Cara Kami Menggunakan Data</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Menyediakan layanan manajemen sosial media (posting, scheduling, analytics) — termasuk Instagram Direct tanpa Facebook Page.</li>
            <li>Menampilkan dashboard dan laporan analytics akun Anda.</li>
            <li>Memproses upgrade langganan dan verifikasi pembayaran.</li>
            <li>Mengirim notifikasi terkait jadwal posting dan status akun.</li>
            <li>Meningkatkan kualitas layanan dan pengalaman pengguna.</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900">3. Penyimpanan & Retensi Data</h2>
          <p>Data Anda disimpan di server dengan enkripsi. Token akses disimpan dalam keadaan terenkripsi di database. Kami menyimpan data Anda selama akun Anda aktif. Jika akun dihapus, data akan dihapus dalam waktu 30 hari.</p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900">4. Berbagi Data dengan Pihak Ketiga</h2>
          <p>Kami membagikan data Anda hanya dengan platform sosial media yang Anda hubungkan (Facebook, Instagram, Threads, LinkedIn, YouTube, TikTok, Pinterest) melalui API resmi mereka. Kami tidak menjual data Anda ke pihak ketiga.</p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900">5. Hak Anda</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Mengakses data Anda kapan saja melalui dashboard.</li>
            <li>Memperbarui atau memperbaiki data yang tidak akurat.</li>
            <li>Menghapus akun dan data Anda kapan saja.</li>
            <li>Mencabut akses token platform sosial media kapan saja.</li>
            <li>Mengunduh data Anda dalam format JSON.</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900">6. Keamanan</h2>
          <p>Kami menggunakan enkripsi TLS untuk semua transmisi data, token akses terenkripsi di database, dan session management yang aman. Audit keamanan dilakukan secara berkala.</p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900">7. Kontak</h2>
          <p>Jika ada pertanyaan tentang kebijakan privasi, hubungi kami di <a href="mailto:admin@sahabatkreator.com" className="text-blue-600 underline">admin@sahabatkreator.com</a>.</p>
        </section>
      </div>
    </div>
  );
}
