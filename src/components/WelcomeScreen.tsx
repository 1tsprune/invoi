"use client";

import { motion } from "framer-motion";
import { Shield, Sparkles, Zap } from "lucide-react";
import { DevAvatar } from "@/components/DevAvatar";
import { SOCIAL } from "@/lib/config";
import { getDictionary } from "@/lib/i18n";
import { peekStoredLocale } from "@/lib/storage";
import { useAppStore } from "@/lib/store";

type Props = {
  onStart: () => void;
};

const FEATURE_ICONS = [Zap, Sparkles, Shield] as const;

export function WelcomeScreen({ onStart }: Props) {
  const hydrated = useAppStore((s) => s.hydrated);
  const storeLocale = useAppStore((s) => s.locale);
  const locale = hydrated ? storeLocale : peekStoredLocale();
  const t = getDictionary(locale);

  const features = [
    { title: t.feature1, sub: t.feature1Sub },
    { title: t.feature2, sub: t.feature2Sub },
    { title: t.feature3, sub: t.feature3Sub },
  ];

  return (
    <div
      className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-[#fafafa] px-4 py-16"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundSize: "40px 40px",
          backgroundImage: `
            linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)
          `,
          maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
        }}
      />
      <div
        className="pointer-events-none absolute left-1/4 top-1/4 h-96 w-96 animate-pulse rounded-full bg-zinc-300/40 blur-3xl mix-blend-multiply opacity-50"
        style={{ animationDuration: "8s" }}
      />
      <div
        className="pointer-events-none absolute bottom-1/4 right-1/4 h-96 w-96 animate-pulse rounded-full bg-zinc-400/30 blur-3xl mix-blend-multiply opacity-50"
        style={{ animationDuration: "10s" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex w-full max-w-3xl flex-col items-center text-center"
      >
        <h1 className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-500 bg-clip-text pb-2 text-5xl font-extrabold tracking-tighter text-transparent md:text-7xl">
          {t.welcomePrefix}
          <br className="hidden md:block" />
          {t.appName}
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mx-auto mt-6 w-[85%] space-y-3 sm:max-w-md md:max-w-xl"
        >
          <p className="text-sm font-medium leading-relaxed text-zinc-500 md:text-lg">
            {t.welcomeLead}{" "}
            <strong className="font-bold text-green-500">{t.welcomeFree}</strong>{" "}
            {t.welcomeMid}
            <br className="hidden md:block" />{" "}
            <strong className="font-bold text-red-500">{t.welcomeForbidden}</strong>{" "}
            {t.welcomeEnd}
            <br />
            <br />
            {t.welcomeSupport}{" "}
            <a
              href={SOCIAL.twitter.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-blue-500 transition-colors hover:underline"
            >
              {SOCIAL.twitter.handle}
            </a>{" "}
            {t.welcomeSupportSuffix}
          </p>

          <a
            href={SOCIAL.twitter.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group mx-auto mt-8 inline-flex max-w-[280px] items-center rounded-2xl border border-zinc-200/60 bg-white/60 p-1.5 pr-4 text-left shadow-sm shadow-zinc-200/50 backdrop-blur-md transition-all hover:bg-white hover:shadow-md sm:mx-0 sm:max-w-max"
          >
            <DevAvatar size="md" />
            <div className="ml-3 mr-4 flex flex-col">
              <span className="flex items-center gap-1.5 text-[12px] font-bold leading-tight text-zinc-900">
                {SOCIAL.twitter.name}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#3b82f6" aria-hidden>
                  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1.9 14.7L6 12.6l1.5-1.5 2.6 2.6 6.4-6.4 1.5 1.5-7.9 7.9z" />
                </svg>
              </span>
              <span className="mt-0.5 line-clamp-1 text-[10px] font-medium leading-tight text-zinc-500">
                {SOCIAL.twitter.handle} · {t.developer}
              </span>
            </div>
            <div className="ml-auto rounded-lg border border-zinc-200/60 bg-zinc-100 px-3 py-1.5 text-[10px] font-bold text-zinc-900 shadow-sm transition-all group-hover:bg-zinc-900 group-hover:text-white">
              {t.follow}
            </div>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3"
        >
          {features.map(({ title, sub }, i) => {
            const Icon = FEATURE_ICONS[i];
            return (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 + i * 0.08 }}
                className="rounded-xl border border-zinc-100 bg-white/80 p-3 text-left shadow-sm backdrop-blur-sm"
              >
                <Icon className="mb-2 h-4 w-4 text-zinc-700" />
                <p className="text-[11px] font-bold text-zinc-900">{title}</p>
                <p className="mt-0.5 text-[10px] leading-relaxed text-zinc-500">{sub}</p>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.5 }}
          className="mt-10"
        >
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onStart}
            className="group inline-flex items-center justify-center gap-1.5 px-6 py-2 text-[13px] font-semibold text-zinc-500 transition-colors hover:text-zinc-900"
          >
            {t.startNow}
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}