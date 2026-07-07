"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { THEME_PAGES, THEMES } from "@/lib/themes";

type Props = {
  activeTheme: string;
  onSelect: (themeId: string) => void;
};

export function ThemeCarousel({ activeTheme, onSelect }: Props) {
  const [page, setPage] = useState(0);
  const dragStart = useRef<number | null>(null);
  const pageCount = THEME_PAGES.length;

  useEffect(() => {
    const idx = THEME_PAGES.findIndex((p) => p.includes(activeTheme));
    if (idx >= 0) setPage(idx);
  }, [activeTheme]);

  const finishDrag = useCallback((clientX: number) => {
    if (dragStart.current === null) return;
    const delta = dragStart.current - clientX;
    if (Math.abs(delta) > 40) {
      if (delta > 0) setPage((p) => Math.min(p + 1, pageCount - 1));
      else setPage((p) => Math.max(p - 1, 0));
    }
    dragStart.current = null;
  }, [pageCount]);

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <div className="flex gap-1">
          {Array.from({ length: pageCount }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setPage(i)}
              aria-label={`Halaman tema ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === page ? "w-6 bg-zinc-800" : "w-2 bg-zinc-300 hover:bg-zinc-400"
              }`}
            />
          ))}
        </div>
        <div className="flex gap-1">
          <button
            type="button"
            disabled={page === 0}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            className="flex h-6 w-6 items-center justify-center rounded border border-zinc-200 text-[10px] text-zinc-500 transition-colors hover:border-zinc-400 disabled:cursor-not-allowed disabled:opacity-30"
            aria-label="Tema sebelumnya"
          >
            ‹
          </button>
          <button
            type="button"
            disabled={page >= pageCount - 1}
            onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
            className="flex h-6 w-6 items-center justify-center rounded border border-zinc-200 text-[10px] text-zinc-500 transition-colors hover:border-zinc-400 disabled:cursor-not-allowed disabled:opacity-30"
            aria-label="Tema berikutnya"
          >
            ›
          </button>
        </div>
      </div>

      <div
        className="grid touch-pan-y grid-cols-6 gap-1.5 select-none"
        onMouseDown={(e) => {
          dragStart.current = e.clientX;
        }}
        onMouseUp={(e) => finishDrag(e.clientX)}
        onMouseLeave={(e) => {
          if (dragStart.current !== null) finishDrag(e.clientX);
        }}
        onTouchStart={(e) => {
          dragStart.current = e.touches[0]?.clientX ?? null;
        }}
        onTouchEnd={(e) => {
          const x = e.changedTouches[0]?.clientX;
          if (x !== undefined) finishDrag(x);
        }}
      >
        {THEME_PAGES[page].map((themeId) => {
          const preset = THEMES[themeId];
          const selected = activeTheme === themeId;
          return (
            <button
              key={themeId}
              type="button"
              onClick={() => onSelect(themeId)}
              title={preset.name}
              className={`relative flex flex-col items-center gap-1 rounded-lg border-2 p-1.5 transition-all active:scale-95 ${
                selected ? "border-zinc-900 shadow-sm" : "border-zinc-200 hover:border-zinc-400"
              }`}
            >
              <div className="h-4 w-full rounded-sm" style={{ backgroundColor: preset.tableHeader }} />
              <div
                className="h-2 w-full rounded-sm"
                style={{ backgroundColor: preset.bg, border: `1px solid ${preset.border}` }}
              />
              <span className="w-full truncate text-center text-[7px] font-medium capitalize leading-none text-zinc-500">
                {preset.name}
              </span>
              {selected ? (
                <span className="absolute -right-1 -top-1 flex h-3 w-3 items-center justify-center rounded-full bg-zinc-900 text-white">
                  <Check className="h-2 w-2" strokeWidth={3} />
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      <p className="mt-2 text-center text-[9px] text-zinc-400">
        {page + 1} / {pageCount} · geser kiri/kanan
      </p>
    </div>
  );
}