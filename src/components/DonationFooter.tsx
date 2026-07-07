"use client";

import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import { DevAvatar } from "@/components/DevAvatar";
import { DONATION } from "@/lib/config";
import { getDictionary } from "@/lib/i18n";
import { useAppStore } from "@/lib/store";

function tpl(text: string, vars: Record<string, string>) {
  return text.replace(/\{(\w+)\}/g, (_, key: string) => vars[key] ?? "");
}

type Props = {
  compact?: boolean;
};

export function DonationFooter({ compact = false }: Props) {
  const brand = useAppStore((s) => s.brand);
  const locale = useAppStore((s) => s.locale);
  const t = getDictionary(locale);
  const percent = DONATION.goalPercent.toFixed(1);
  const userName = brand.brandName.trim() || (locale === "id" ? "Pengguna" : "User");

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className={`relative overflow-hidden rounded-2xl border border-zinc-100 bg-gradient-to-br from-zinc-50 via-white to-zinc-50 shadow-sm ${
        compact ? "p-3" : "p-4"
      }`}
    >
      <div className="relative z-10 flex gap-4">
        <div className="shrink-0">
          <DevAvatar size="lg" rounded="full" className="border-2 border-white shadow-sm" />
        </div>

        <div className="min-w-0 space-y-3">
          <div>
            <h4 className="text-[13px] font-bold text-zinc-900">
              {tpl(t.haloUser, { name: userName })}
            </h4>
            <p className="mt-1 text-[11px] leading-relaxed text-zinc-600">{t.donationMessage}</p>
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-[9px] font-semibold uppercase tracking-wider text-zinc-500">
                {t.donationGoalLabel}
              </span>
              <span className="text-[10px] font-bold text-zinc-700">
                {tpl(t.donationGoalReached, { percent })}
              </span>
            </div>
            <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-zinc-100 shadow-inner">
              <div
                className="donation-goal-bar absolute inset-y-0 left-0 rounded-full"
                style={{
                  width: `${DONATION.goalPercent}%`,
                  background: "linear-gradient(90deg, #be1e2d 0%, #e63946 50%, #be1e2d 100%)",
                }}
              >
                <div className="donation-goal-shimmer absolute inset-0 rounded-full" />
                <div className="donation-goal-pulse absolute bottom-0 right-0 top-0 w-3 rounded-full" />
              </div>
            </div>
          </div>

          <motion.a
            href={DONATION.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02, backgroundColor: "#a31a27" }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-[10px] font-semibold text-white shadow-md transition-all"
            style={{ backgroundColor: "#be1e2d" }}
          >
            <Star className="h-3 w-3 fill-[#ffb800] text-[#ffb800]" />
            {t.donationButton}
          </motion.a>

          <div className="flex max-w-[240px] flex-col gap-1 rounded-lg border border-emerald-100 bg-emerald-50/30 p-2">
            <div className="flex items-start gap-1.5">
              <span className="mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded bg-emerald-500 text-white">
                <Check className="h-2.5 w-2.5" strokeWidth={3} />
              </span>
              <span className="text-[10px] font-medium leading-tight text-zinc-700">{t.mayGoalReached}</span>
            </div>
            <span className="pl-5 text-[10px] font-semibold text-emerald-600">{t.thankYou}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}