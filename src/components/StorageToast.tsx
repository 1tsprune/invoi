"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";
import { getDictionary } from "@/lib/i18n";
import { useAppStore } from "@/lib/store";

export function StorageToast() {
  const locale = useAppStore((s) => s.locale);
  const storageToast = useAppStore((s) => s.storageToast);
  const clearStorageToast = useAppStore((s) => s.clearStorageToast);
  const setActiveTab = useAppStore((s) => s.setActiveTab);
  const t = getDictionary(locale);

  return (
    <AnimatePresence>
      {storageToast ? (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          className="fixed bottom-20 left-4 right-4 z-[200] mx-auto max-w-md lg:bottom-6 lg:left-auto lg:right-6"
        >
          <div className="flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 shadow-lg shadow-amber-100/80">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
            <div className="min-w-0 flex-1">
              <p className="text-[12px] font-bold text-amber-900">{t.storageQuotaTitle}</p>
              <p className="mt-1 text-[11px] leading-relaxed text-amber-800">{t.memoryLimitWarning}</p>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("export");
                  clearStorageToast();
                }}
                className="mt-2 text-[11px] font-bold text-amber-900 underline underline-offset-2 hover:text-amber-700"
              >
                {t.storageQuotaAction}
              </button>
            </div>
            <button
              type="button"
              onClick={clearStorageToast}
              className="shrink-0 rounded-lg p-1 text-amber-600 transition hover:bg-amber-100"
              aria-label={t.dismiss}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}