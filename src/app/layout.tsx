import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { APP, SITE_URL } from "@/lib/config";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: APP.name,
  manifest: "/manifest.json",
  title: "Invoi — Invoice Satset, Gaperlu Login",
  description:
    "Bikin invoice, kwitansi, dan penawaran online gratis. No login, 210+ tema, upload background, QRIS dinamis, export PDF & gambar.",
  keywords: [
    "invoi",
    "invoice generator gratis",
    "buat kwitansi online",
    "invoice satset",
    "nota online gen z",
  ],
  openGraph: {
    title: "Invoi — Invoice Generator Gratis",
    description: "Buka, isi, download. Gaperlu login.",
    type: "website",
    locale: "id_ID",
    siteName: "Invoi",
  },
  twitter: {
    card: "summary_large_image",
    title: "Invoi — Invoice Generator Gratis",
    description: "Buka, isi, download. Gaperlu login.",
    creator: "@itsprune",
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#6366f1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}