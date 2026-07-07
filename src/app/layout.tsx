import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} h-full antialiased`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;600;700&family=Pacifico&family=Caveat:wght@400;600&family=Sacramento&family=Great+Vibes&family=Allura&family=Alex+Brush&family=Kaushan+Script&family=Yellowtail&family=Satisfy&family=Inter:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600;700&family=DM+Sans&family=Roboto:wght@300;400;500&family=Lato:wght@300;400;700&family=Nunito:wght@300;400;500;600;700&family=Raleway:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}