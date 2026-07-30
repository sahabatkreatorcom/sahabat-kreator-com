import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Syarat & Ketentuan - Sahabat Kreator",
  description: "Syarat dan ketentuan penggunaan Sahabat Kreator",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold">Syarat & Ketentuan</h1>
      <p className="mt-2 text-sm text-gray-500">Terakhir diperbarui: 29 Juli 2026</p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-gray-700">
        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900">1. Penerimaan Syarat</h2>
          <p>Dengan menggunakan Sahabat Kreator, Anda menyetujui syarat dan ketentuan ini. Jika tidak setuju, jangan gunakan layanan kami.</p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900">2. Deskripsi Layanan</h2>
          <p>Sahabat Kreator adalah platform manajemen sosial media yang memungkinkan pengguna menghubungkan, mengelola, menjadwalkan posting, dan melihat analytics dari berbagai platform sosial media dalam satu dashboard. Pengguna dapat menghubungkan akun Instagram melalui dua metode: (1) via Facebook Page untuk akses penuh, atau (2) Direct Login untuk pengguna tanpa Facebook Page.</p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900">3. Kewajiban Pengguna</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Memberikan informasi akun yang akurat dan terkini.</li>
            <li>Tidak menyalahgunakan layanan untuk spam, konten ilegal, atau pelanggaran hak cipta.</li>
            <li>Tidak mencoba mengakses akun pengguna lain.</li>
            <li>Mematuhi syarat & ketentuan masing-masing platform sosial media.</li>
            <li>Bertanggung jawab atas keamanan akun Sahabat Kreator Anda.</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900">4. Akun & Pendaftaran</h2>
          <p>Anda harus berusia minimal 13 tahun untuk mendaftar. Satu orang hanya boleh memiliki satu akun. Kami berhak menangguhkan akun yang melanggar syarat & ketentuan.</p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900">5. Pembayaran & Langganan</h2>
          <p>Pembayaran dilakukan via QRIS atau transfer manual. Pembayaran diverifikasi oleh admin dalam 1x24 jam. Setelah pembayaran dikonfirmasi, paket langganan akan diaktifkan. Tidak ada refund untuk pembayaran yang sudah dikonfirmasi.</p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900">6. Batasan Layanan</h2>
          <p>Setiap paket memiliki batasan jumlah akun dan posting per hari. Detail batasan dapat dilihat di halaman harga. Kami berhak mengubah batasan dengan pemberitahuan terlebih dahulu.</p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900">7. Batasan Tanggung Jawab</h2>
          <p>Kami tidak bertanggung jawab atas kerugian akibat gangguan layanan, perubahan API dari platform sosial media, atau konten yang diposting oleh pengguna. Layanan disediakan &ldquo;apa adanya&rdquo; tanpa jaminan.</p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900">8. Pengakhiran</h2>
          <p>Anda dapat menghapus akun kapan saja melalui dashboard. Kami dapat menangguhkan atau menghentikan akses jika terjadi pelanggaran syarat & ketentuan.</p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900">9. Perubahan Syarat</h2>
          <p>Kami dapat memperbarui syarat & ketentuan ini kapan saja. Perubahan akan diumumkan melalui email atau notifikasi di dashboard. Penggunaan lanjutan setelah perubahan berarti persetujuan Anda.</p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900">10. Kontak</h2>
          <p>Hubungi kami melalui halaman <a href="/contact" className="text-blue-600 underline">Kontak</a> atau email <a href="mailto:admin@sahabatkreator.com" className="text-blue-600 underline">admin@sahabatkreator.com</a> untuk pertanyaan terkait syarat & ketentuan.</p>
        </section>
      </div>
    </div>
  );
}
