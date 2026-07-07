"use client";

import { motion } from "framer-motion";
import { Download, Eye, FileText, Palette } from "lucide-react";
import { getDictionary } from "@/lib/i18n";
import { useAppStore } from "@/lib/store";
import type { TabId } from "@/lib/types";

const TABS: { id: TabId; icon: typeof FileText }[] = [
  { id: "form", icon: FileText },
  { id: "brand", icon: Palette },
  { id: "preview", icon: Eye },
  { id: "export", icon: Download },
];

export function BottomNav() {
  const activeTab = useAppStore((s) => s.activeTab);
  const locale = useAppStore((s) => s.locale);
  const setActiveTab = useAppStore((s) => s.setActiveTab);
  const t = getDictionary(locale);

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-zinc-100 bg-white lg:hidden">
      <div className="grid h-16 grid-cols-4">
        {TABS.map(({ id, icon: Icon }) => (
          <motion.button
            key={id}
            type="button"
            whileTap={{ scale: 0.88 }}
            onClick={() => setActiveTab(id)}
            className={`relative flex flex-col items-center justify-center gap-1 transition-colors ${
              activeTab === id ? "text-zinc-900" : "text-zinc-400"
            }`}
          >
            {activeTab === id ? (
              <motion.span
                layoutId="mobile-tab-indicator"
                className="absolute top-0 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-b-full bg-zinc-900"
              />
            ) : null}
            <Icon className="h-3.5 w-3.5" />
            <span className="text-[9px] font-semibold uppercase tracking-wider">{t.tabs[id]}</span>
          </motion.button>
        ))}
      </div>
    </nav>
  );
}