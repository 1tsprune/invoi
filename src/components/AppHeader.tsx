"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Globe, RefreshCw } from "lucide-react";
import { AppLogo } from "@/components/AppLogo";
import { SOCIAL } from "@/lib/config";
import { getDictionary } from "@/lib/i18n";
import { useAppStore } from "@/lib/store";

type Props = {
  onNewDoc?: () => void;
};

function XIcon({ className }: { className?: string }) {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.26 5.634L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function AppHeader({ onNewDoc }: Props) {
  const locale = useAppStore((s) => s.locale);
  const setLocale = useAppStore((s) => s.setLocale);
  const t = getDictionary(locale);

  return (
    <motion.header
      initial={{ y: -56 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="sticky top-0 z-50 shrink-0 border-b border-zinc-100 bg-white"
      style={{ boxShadow: "0 1px 0 0 #f4f4f5, 0 4px 16px 0 rgba(0,0,0,0.04)" }}
    >
      <div className="mx-auto flex h-14 max-w-screen-xl items-center justify-between gap-4 px-5">
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-2.5"
        >
          <AppLogo />
          <div className="flex flex-col leading-none">
            <span className="text-[15px] font-bold tracking-tight text-zinc-900">{t.appName}</span>
            <span className="mt-0.5 text-[9px] font-medium tracking-wide text-zinc-400">{t.tagline}</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
          className="flex items-center gap-3"
        >
          <a
            href={SOCIAL.twitter.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group hidden items-center gap-1.5 text-[9px] font-medium text-zinc-400 transition-colors hover:text-zinc-700 md:flex"
          >
            <XIcon className="text-zinc-400 transition-colors group-hover:text-zinc-700" />
            <span>{SOCIAL.twitter.handle}</span>
          </a>

          <button
            type="button"
            onClick={() => setLocale(locale === "id" ? "en" : "id")}
            className="flex items-center gap-1 rounded-md border border-zinc-200 px-2 py-1 text-[9px] font-bold tracking-wider text-zinc-500 hover:border-zinc-300 hover:text-zinc-800"
          >
            <Globe className="h-3 w-3" />
            {locale.toUpperCase()}
          </button>

          {onNewDoc ? (
            <button
              type="button"
              onClick={onNewDoc}
              className="hidden items-center gap-1 rounded-md border border-zinc-200 px-2.5 py-1.5 text-[10px] text-zinc-500 transition-colors hover:border-zinc-400 hover:text-zinc-800 sm:flex"
            >
              <RefreshCw className="h-3 w-3" />
              {t.newDoc}
            </button>
          ) : null}

          <Link
            href="/tutorial"
            className="hidden text-[10px] font-semibold text-zinc-500 hover:text-zinc-800 lg:block"
          >
            {t.tutorial}
          </Link>
        </motion.div>
      </div>
    </motion.header>
  );
}