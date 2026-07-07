"use client";

import { useState } from "react";
import { Check, Copy, HardDriveDownload, HardDriveUpload } from "lucide-react";
import { DonationFooter } from "@/components/DonationFooter";
import { ExportDownloadList } from "@/components/ExportDownloadList";
import { ScaledPreview } from "@/components/ScaledPreview";
import { getDictionary } from "@/lib/i18n";
import { exportAppDataFile, importAppDataFile } from "@/lib/storage";
import { useAppStore } from "@/lib/store";
import { buildWhatsAppText } from "@/lib/whatsapp";

type Props = {
  exportRef: React.RefObject<HTMLDivElement | null>;
};

export function ExportTab({ exportRef }: Props) {
  const [copied, setCopied] = useState(false);
  const locale = useAppStore((s) => s.locale);
  const invoice = useAppStore((s) => s.invoice);
  const brand = useAppStore((s) => s.brand);
  const inventory = useAppStore((s) => s.inventory);
  const replaceAll = useAppStore((s) => s.replaceAll);
  const t = getDictionary(locale);

  async function copyWa() {
    await navigator.clipboard.writeText(
      buildWhatsAppText({ invoice, brand, inventory, locale }),
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-4 pb-10 lg:pb-8">
      <div>
        <h2 className="text-[13px] font-semibold text-zinc-900">{t.downloadTitle}</h2>
        <p className="mt-0.5 text-[10px] text-zinc-400">{t.downloadSub}</p>
      </div>

      <div className="lg:hidden">
        <div className="mb-2 flex items-center justify-center gap-1.5">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
          <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
            {t.cleanResultHint}
          </span>
        </div>
        <div className="overflow-hidden rounded-xl border border-zinc-100 bg-white shadow-sm">
          <ScaledPreview scale={0.35} exportRef={exportRef} />
        </div>
      </div>

      <DonationFooter />
      <ExportDownloadList exportRef={exportRef} />

      <button
        type="button"
        onClick={copyWa}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-3 text-[11px] font-semibold text-zinc-700 transition hover:border-zinc-300 hover:shadow-sm"
      >
        {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
        {copied ? t.copied : t.copyWhatsapp}
      </button>

      <div className="grid grid-cols-2 gap-2 pt-2">
        <button
          type="button"
          onClick={() => exportAppDataFile({ invoice, brand, inventory, locale })}
          className="flex items-center justify-center gap-1.5 rounded-lg border border-zinc-200 px-3 py-2.5 text-[10px] font-semibold text-zinc-600 hover:bg-zinc-50"
        >
          <HardDriveDownload className="h-3.5 w-3.5" />
          {t.saveData}
        </button>
        <button
          type="button"
          onClick={async () => {
            const data = await importAppDataFile(t.invalidBackupFile);
            if (data) replaceAll(data);
          }}
          className="flex items-center justify-center gap-1.5 rounded-lg border border-zinc-200 px-3 py-2.5 text-[10px] font-semibold text-zinc-600 hover:bg-zinc-50"
        >
          <HardDriveUpload className="h-3.5 w-3.5" />
          {t.loadData}
        </button>
      </div>
    </div>
  );
}