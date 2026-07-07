"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, FileText, Palette } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";
import { BrandTab } from "@/components/BrandTab";
import { DataBrowserPanel } from "@/components/DataBrowserPanel";
import { DocumentFormTab } from "@/components/DocumentFormTab";
import { ExportTab } from "@/components/ExportTab";
import { PreviewColumn } from "@/components/PreviewColumn";
import { ScaledPreview } from "@/components/ScaledPreview";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { ConfirmModal } from "@/components/ConfirmModal";
import { StorageToast } from "@/components/StorageToast";
import { LEGACY_WELCOME_KEY, WELCOME_KEY } from "@/lib/config";
import { preloadCoreFonts } from "@/lib/fonts";
import { getDictionary } from "@/lib/i18n";
import { peekStoredLocale } from "@/lib/storage";
import { useAppStore } from "@/lib/store";
import type { TabId } from "@/lib/types";

const SIDEBAR_TABS: { id: Exclude<TabId, "preview">; icon: typeof FileText }[] = [
  { id: "form", icon: FileText },
  { id: "brand", icon: Palette },
  { id: "export", icon: Download },
];

export function KwitansiApp() {
  const exportRef = useRef<HTMLDivElement>(null);
  const hydrate = useAppStore((s) => s.hydrate);
  const hydrated = useAppStore((s) => s.hydrated);
  const activeTab = useAppStore((s) => s.activeTab);
  const setActiveTab = useAppStore((s) => s.setActiveTab);
  const resetDocument = useAppStore((s) => s.resetDocument);
  const locale = useAppStore((s) => s.locale);
  const t = getDictionary(locale);
  const [showWelcome, setShowWelcome] = useState<boolean | null>(null);
  const [showNewDocConfirm, setShowNewDocConfirm] = useState(false);

  useEffect(() => {
    hydrate();
    preloadCoreFonts();
  }, [hydrate]);

  useEffect(() => {
    if (!hydrated) return;
    const seen = localStorage.getItem(WELCOME_KEY) || localStorage.getItem(LEGACY_WELCOME_KEY);
    setShowWelcome(!seen);
  }, [hydrated]);

  function handleWelcomeStart() {
    localStorage.setItem(WELCOME_KEY, "1");
    localStorage.removeItem(LEGACY_WELCOME_KEY);
    setShowWelcome(false);
  }

  function handleNewDoc() {
    setShowNewDocConfirm(true);
  }

  function renderTabContent() {
    switch (activeTab) {
      case "brand":
        return <BrandTab />;
      case "export":
        return <ExportTab exportRef={exportRef} />;
      case "preview":
        return null;
      default:
        return <DocumentFormTab />;
    }
  }

  if (!hydrated || showWelcome === null) {
    const bootLocale = peekStoredLocale();
    const bootT = getDictionary(bootLocale);
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fafafa] text-sm text-zinc-500">
        {bootT.loading}
      </div>
    );
  }

  if (showWelcome) {
    return <WelcomeScreen onStart={handleWelcomeStart} />;
  }

  return (
    <div className="flex min-h-dvh flex-col bg-zinc-50" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <AppHeader onNewDoc={handleNewDoc} />

      {/* Desktop */}
      <div className="mx-auto hidden min-h-0 w-full max-w-screen-xl flex-1 lg:flex">
        <motion.aside
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15, type: "spring", stiffness: 300, damping: 30 }}
          className="sticky top-14 flex w-[340px] shrink-0 flex-col border-r border-zinc-100 bg-white xl:w-[380px]"
        >
          <div className="sticky top-0 z-10 flex border-b border-zinc-100 bg-white">
            {SIDEBAR_TABS.map(({ id, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setActiveTab(id)}
                className={`relative flex flex-1 flex-col items-center gap-1 py-3 text-[9px] font-semibold uppercase tracking-wider transition-colors ${
                  activeTab === id ? "text-zinc-900" : "text-zinc-400 hover:text-zinc-600"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {t.tabs[id]}
                {activeTab === id ? (
                  <motion.span
                    layoutId="desktop-tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 rounded-t-full bg-zinc-900"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                ) : null}
              </button>
            ))}
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto p-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15 }}
              >
                {renderTabContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.aside>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="min-h-[calc(100vh-56px)] flex-1 overflow-y-auto bg-zinc-50 p-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 300, damping: 25 }}
          >
            <PreviewColumn exportRef={exportRef} />
          </motion.div>
        </motion.section>
      </div>

      {/* Mobile */}
      <div className="min-h-0 flex-1 overflow-y-auto pb-20 lg:hidden">
        <AnimatePresence mode="wait">
          {activeTab === "preview" ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.18 }}
              className="min-h-[calc(100vh-56px)] bg-zinc-100 p-3"
            >
              <div className="mb-3 flex items-center justify-center gap-1.5">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
                <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                  {t.cleanResultHint}
                </span>
              </div>
              <div className="overflow-hidden rounded-xl border border-zinc-100 bg-white shadow-sm">
                <ScaledPreview scale={0.42} exportRef={exportRef} />
              </div>
              <div className="mt-3">
                <DataBrowserPanel />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.18 }}
              className="p-4"
            >
              {renderTabContent()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <BottomNav />

      <ConfirmModal
        open={showNewDocConfirm}
        title={t.newDocTitle}
        message={t.newDocConfirm}
        cancelLabel={t.cancel}
        confirmLabel={t.reset}
        onCancel={() => setShowNewDocConfirm(false)}
        onConfirm={() => {
          setShowNewDocConfirm(false);
          resetDocument();
        }}
      />

      <StorageToast />
    </div>
  );
}