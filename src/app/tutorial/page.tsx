"use client";

import Link from "next/link";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { getDictionary } from "@/lib/i18n";
import { useAppStore } from "@/lib/store";

export default function TutorialPage() {
  const hydrate = useAppStore((s) => s.hydrate);
  const locale = useAppStore((s) => s.locale);
  const t = getDictionary(locale);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  const sections = [
    { title: t.tutorialSection1Title, body: t.tutorialSection1Body },
    { title: t.tutorialSection2Title, body: t.tutorialSection2Body },
    { title: t.tutorialSection3Title, body: t.tutorialSection3Body },
  ];

  const FAQ = [
    { q: t.faqNoLogin, a: t.faqNoLoginAnswer },
    {
      q: locale === "id" ? "Bagaimana cara backup data?" : "How do I back up my data?",
      a:
        locale === "id"
          ? "Buka tab Unduh → klik Simpan Data untuk download file JSON. Untuk restore, klik Load Data dan pilih file backup tersebut."
          : "Open the Export tab → click Save Data to download a JSON file. To restore, click Load Data and select your backup file.",
    },
    {
      q: locale === "id" ? "Apa bedanya Invoice, Kwitansi, dan Penawaran?" : "What's the difference between Invoice, Receipt, and Quotation?",
      a:
        locale === "id"
          ? "Invoice untuk tagihan ke klien (ada jatuh tempo). Kwitansi bukti pembayaran. Penawaran (quotation) untuk quote harga sebelum deal."
          : "Invoice bills a client (with due date). Receipt is proof of payment. Quotation is a price quote before a deal.",
    },
    {
      q: locale === "id" ? "Inventory itu untuk apa?" : "What is inventory for?",
      a:
        locale === "id"
          ? "Simpan daftar produk/jasa beserta harganya. Saat buat dokumen, pilih mode Sync Inventory supaya nama dan harga terisi otomatis."
          : "Save your products/services with prices. When creating a document, use Sync Inventory mode to auto-fill name and price.",
    },
    {
      q: locale === "id" ? "QRIS tidak bisa di-scan?" : "Why can't my QRIS be scanned?",
      a:
        locale === "id"
          ? "Pastikan gambar QRIS jelas dan tidak buram. Gunakan QRIS resmi dari penyedia pembayaran kamu. Coba upload ulang dengan resolusi lebih tinggi."
          : "Make sure the QRIS image is clear and not blurry. Use the official QRIS from your payment provider. Try re-uploading at higher resolution.",
    },
    { q: t.faqNoAccount, a: t.faqNoAccountAnswer },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-2xl space-y-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-600 hover:text-zinc-900">
          <ArrowLeft className="h-4 w-4" />
          {t.backToInvoice}
        </Link>

        <div>
          <h1 className="text-2xl font-extrabold text-zinc-900">{t.tutorial}</h1>
          <p className="mt-2 text-sm text-zinc-500">{t.tutorialInventoryTitle}</p>
        </div>

        <section className="space-y-4">
          {sections.map((section) => (
            <div key={section.title} className="rounded-2xl border border-zinc-100 bg-white p-5 shadow-sm">
              <h2 className="font-bold text-zinc-900">{section.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">{section.body}</p>
            </div>
          ))}
        </section>

        <section className="space-y-4 rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm">
          <h2 className="font-bold text-zinc-900">{locale === "id" ? "Cara pakai (3 menit)" : "Quick start (3 minutes)"}</h2>
          <ol className="list-decimal space-y-2 pl-5 text-sm text-zinc-600">
            <li>
              {locale === "id"
                ? "Isi tab Invoice — pilih tipe, klien, dan item."
                : "Fill the Invoice tab — pick type, client, and line items."}
            </li>
            <li>
              {locale === "id"
                ? "Atur tab Brand — logo, tema, gambar latar, QRIS, watermark."
                : "Configure Brand tab — logo, theme, background, QRIS, watermark."}
            </li>
            <li>
              {locale === "id"
                ? "Cek Preview, lalu Unduh PDF/gambar atau salin teks WA."
                : "Check Preview, then Export PDF/image or copy WhatsApp text."}
            </li>
            <li>
              {locale === "id"
                ? "Rutin klik Simpan Data untuk backup file JSON."
                : "Regularly click Save Data to back up your JSON file."}
            </li>
          </ol>
        </section>

        <section className="space-y-3">
          <h2 className="font-bold text-zinc-900">FAQ</h2>
          {FAQ.map((item) => (
            <details key={item.q} className="rounded-2xl border border-zinc-100 bg-white p-4 shadow-sm">
              <summary className="cursor-pointer text-sm font-semibold text-zinc-900">{item.q}</summary>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">{item.a}</p>
            </details>
          ))}
        </section>
      </div>
    </div>
  );
}