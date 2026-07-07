"use client";

import { useEffect, useState } from "react";
import { ConfirmModal } from "@/components/ConfirmModal";
import { getDictionary } from "@/lib/i18n";
import {
  formatBytes,
  getStorageSnapshot,
  storageLevelClass,
  type StorageSnapshot,
} from "@/lib/storage-stats";
import { useAppStore } from "@/lib/store";

export function DataBrowserPanel() {
  const locale = useAppStore((s) => s.locale);
  const inventory = useAppStore((s) => s.inventory);
  const t = getDictionary(locale);
  const [snap, setSnap] = useState<StorageSnapshot | null>(null);
  const [showReset, setShowReset] = useState(false);

  useEffect(() => {
    const update = () => setSnap(getStorageSnapshot(inventory.length));
    update();
    const id = setInterval(update, 2000);
    return () => clearInterval(id);
  }, [inventory.length]);

  if (!snap) return null;

  const totalClass = storageLevelClass(snap.ratio);
  const brandClass = storageLevelClass(snap.invoiceStorageBytes / (2 * 1024 * 1024));

  function resetAll() {
    localStorage.clear();
    window.location.reload();
  }

  return (
    <>
      <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <h4 className="text-[12px] font-semibold text-zinc-800">{t.dataBrowser}</h4>
          <button
            type="button"
            onClick={() => setShowReset(true)}
            className="rounded-md border border-red-200 px-2 py-1 text-[10px] font-medium text-red-600 transition-colors hover:border-red-300 hover:text-red-700"
          >
            {t.resetData}
          </button>
        </div>

        <div className="mt-3 space-y-1.5 text-[10px] text-zinc-600">
          <div className="flex items-center justify-between">
            <span>{t.itemCount}</span>
            <span className="font-semibold text-zinc-800">{snap.keyCount}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>{t.inventoryCount}</span>
            <span className="font-semibold text-zinc-800">{snap.inventoryCount}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className={totalClass}>{t.totalSize}</span>
            <span className={`font-semibold ${totalClass}`}>{formatBytes(snap.totalBytes)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className={brandClass}>{t.brandDataSize}</span>
            <span className={`font-semibold ${brandClass}`}>{formatBytes(snap.invoiceStorageBytes)}</span>
          </div>
        </div>

        {snap.ratio >= 1 ? (
          <p className="mt-3 text-[10px] leading-relaxed text-red-600">{t.memoryLimitWarning}</p>
        ) : null}
      </div>

      <ConfirmModal
        open={showReset}
        title={t.resetBrowserData}
        message={t.resetBrowserDataSub}
        cancelLabel={t.cancel}
        confirmLabel={t.confirmReset}
        danger
        onCancel={() => setShowReset(false)}
        onConfirm={() => {
          setShowReset(false);
          resetAll();
        }}
      />
    </>
  );
}