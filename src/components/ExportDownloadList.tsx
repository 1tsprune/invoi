"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, FileImage, FileText, Loader2 } from "lucide-react";
import { downloadPreviewJpg, downloadPreviewPdf, downloadPreviewPng } from "@/lib/export";
import { getDictionary } from "@/lib/i18n";
import { useAppStore } from "@/lib/store";

type ExportKind = "pdf" | "jpg" | "png";

type Props = {
  exportRef: React.RefObject<HTMLDivElement | null>;
};

const FORMATS: { type: ExportKind; color: string; ext: string }[] = [
  { type: "pdf", color: "#ef4444", ext: ".pdf" },
  { type: "jpg", color: "#f59e0b", ext: ".jpg" },
  { type: "png", color: "#3b82f6", ext: ".png" },
];

export function ExportDownloadList({ exportRef }: Props) {
  const invoice = useAppStore((s) => s.invoice);
  const locale = useAppStore((s) => s.locale);
  const t = getDictionary(locale);
  const [busy, setBusy] = useState<ExportKind | null>(null);
  const [success, setSuccess] = useState<ExportKind | null>(null);

  const labels: Record<ExportKind, { label: string; desc: string }> = {
    pdf: { label: t.downloadPdf, desc: t.downloadPdfDesc },
    jpg: { label: t.downloadJpg, desc: t.downloadJpgDesc },
    png: { label: t.downloadPng, desc: t.downloadPngDesc },
  };

  async function runExport(kind: ExportKind) {
    const el = exportRef.current;
    if (!el || busy) return;
    const slug = `${invoice.invoiceNumber}-${invoice.invoiceFor || "invoice"}`
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9-_]/g, "");

    setBusy(kind);
    setSuccess(null);
    try {
      if (kind === "pdf") await downloadPreviewPdf(el, slug);
      else if (kind === "jpg") await downloadPreviewJpg(el, slug);
      else await downloadPreviewPng(el, slug);
      setSuccess(kind);
      setTimeout(() => setSuccess(null), 2800);
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="space-y-2.5">
      {FORMATS.map(({ type, color, ext }, index) => {
        const isBusy = busy === type;
        const isSuccess = success === type;
        const disabled = !!busy && !isBusy;
        const { label, desc } = labels[type];

        return (
          <motion.button
            key={type}
            type="button"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => runExport(type)}
            disabled={disabled}
            className={`flex w-full items-center justify-between rounded-xl border px-4 py-3.5 text-left transition-all disabled:cursor-not-allowed disabled:opacity-40 ${
              isSuccess
                ? "border-green-200 bg-green-50"
                : isBusy
                  ? "cursor-wait border-zinc-200 bg-zinc-50"
                  : "border-zinc-200 bg-white hover:border-zinc-300 hover:shadow-sm"
            }`}
            style={{ animationDelay: `${index * 60}ms` }}
          >
            <div className="flex items-center gap-3">
              <div
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                style={{ backgroundColor: isSuccess ? "#f0fdf4" : isBusy ? "#f4f4f5" : `${color}12` }}
              >
                {isBusy ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-zinc-500" />
                ) : isSuccess ? (
                  <Check className="h-3.5 w-3.5 text-green-600" strokeWidth={3} />
                ) : type === "pdf" ? (
                  <FileText className="h-3.5 w-3.5" style={{ color }} />
                ) : (
                  <FileImage className="h-3.5 w-3.5" style={{ color }} />
                )}
              </div>
              <div>
                <p className="text-[11px] font-semibold text-zinc-800">
                  {isSuccess ? t.downloadSuccess : label}
                </p>
                <p className="text-[9px] text-zinc-400">{isSuccess ? label : desc}</p>
              </div>
            </div>
            <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">{ext}</span>
          </motion.button>
        );
      })}
    </div>
  );
}