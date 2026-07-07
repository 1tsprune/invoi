"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { ensureFontLoaded, type FontOption } from "@/lib/fonts";
import { getDictionary } from "@/lib/i18n";
import { useAppStore } from "@/lib/store";

type Props = {
  label: string;
  value: string;
  fonts: FontOption[];
  script?: boolean;
  onChange: (fontId: string) => void;
};

export function FontPicker({ label, value, fonts, script = false, onChange }: Props) {
  const locale = useAppStore((s) => s.locale);
  const t = getDictionary(locale);
  const [query, setQuery] = useState("");

  useEffect(() => {
    ensureFontLoaded(value, script);
  }, [value, script]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return fonts;
    return fonts.filter((f) => f.label.toLowerCase().includes(q) || f.category?.includes(q));
  }, [fonts, query]);

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="text-[9px] font-semibold uppercase tracking-wider text-zinc-400">{label}</span>
        <span className="text-[9px] font-medium text-zinc-400">{fonts.length} {t.fontsAvailable}</span>
      </div>
      <div className="relative mb-2">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3 w-3 -translate-y-1/2 text-zinc-300" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.fontSearch}
          className="w-full rounded-lg border border-zinc-200 bg-white py-2 pl-8 pr-3 text-[11px] outline-none focus:border-zinc-400"
        />
      </div>
      <div className="grid max-h-44 grid-cols-2 gap-1.5 overflow-y-auto pr-0.5 sm:grid-cols-3">
        {filtered.map((font) => {
          const selected = value === font.id;
          return (
            <button
              key={font.id}
              type="button"
              onMouseEnter={() => ensureFontLoaded(font.id, script)}
              onFocus={() => ensureFontLoaded(font.id, script)}
              onClick={() => onChange(font.id)}
              className={`rounded-lg border px-2 py-2 text-left transition-all ${
                selected
                  ? "border-zinc-900 bg-zinc-900 text-white shadow-sm"
                  : "border-zinc-200 bg-zinc-50 hover:border-zinc-400 hover:bg-white"
              }`}
            >
              <span
                className={`block truncate text-[12px] font-semibold leading-tight ${selected ? "text-white" : "text-zinc-800"}`}
                style={{ fontFamily: `'${font.id}', ${script ? "cursive" : "sans-serif"}` }}
              >
                {font.label}
              </span>
              {font.category ? (
                <span className={`mt-0.5 block text-[8px] uppercase tracking-wider ${selected ? "text-zinc-300" : "text-zinc-400"}`}>
                  {font.category}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}