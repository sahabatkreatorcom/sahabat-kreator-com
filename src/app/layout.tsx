import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  metadataBase: new URL("https://sahabatkreator.com"),
  title: "Sahabat Kreator - Kelola Semua Sosial Media dalam Satu Tempat",
  description: "Hubungkan Facebook, Instagram, Threads, LinkedIn, YouTube, TikTok, dan Pinterest. Jadwalkan posting, analitik, dan kelola semuanya dari dashboard terpadu.",
  icons: {
    icon: "/images/logo-sahabat-kreator.png",
  },
  openGraph: {
    title: "Sahabat Kreator",
    description: "Kelola semua sosial media dalam satu tempat",
    type: "website",
    images: ["/images/logo-sahabat-kreator.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
