"use client";

import { useEffect, useRef, useState } from "react";
import { Maximize2, Minimize2, ZoomIn, ZoomOut } from "lucide-react";
import { DocumentPreview } from "@/components/DocumentPreview";
import { getDictionary } from "@/lib/i18n";
import { useAppStore } from "@/lib/store";

type Props = {
  exportRef?: React.RefObject<HTMLDivElement | null>;
};

export function LivePreviewPanel({ exportRef }: Props) {
  const locale = useAppStore((s) => s.locale);
  const t = getDictionary(locale);
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [autoScale, setAutoScale] = useState(1);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;

    const update = () => {
      const available = el.clientWidth - 16;
      setAutoScale(Math.min(1, Math.max(0.42, available / 720)));
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const inner = innerRef.current;
    const wrapper = wrapperRef.current;
    if (!inner || !wrapper) return;

    const updateHeight = () => {
      const scaled = inner.getBoundingClientRect().height;
      wrapper.style.height = `${Math.ceil(scaled)}px`;
    };

    const ro = new ResizeObserver(updateHeight);
    ro.observe(inner);
    updateHeight();
    return () => ro.disconnect();
  }, [autoScale, zoom]);

  const scale = autoScale * zoom;

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2 px-1">
        <div className="flex items-center gap-2">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">{t.tabs.preview}</p>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-emerald-700">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
            {t.live}
          </span>
        </div>
        <div className="flex items-center gap-1 rounded-lg border border-zinc-200 bg-white p-0.5">
          <button
            type="button"
            onClick={() => setZoom((z) => Math.max(0.5, +(z - 0.1).toFixed(2)))}
            className="rounded-md p-1.5 text-zinc-500 hover:bg-zinc-100"
            aria-label={t.zoomOut}
          >
            <ZoomOut className="h-4 w-4" />
          </button>
          <span className="min-w-10 text-center text-[10px] font-bold text-zinc-600">
            {Math.round(scale * 100)}%
          </span>
          <button
            type="button"
            onClick={() => setZoom((z) => Math.min(1.5, +(z + 0.1).toFixed(2)))}
            className="rounded-md p-1.5 text-zinc-500 hover:bg-zinc-100"
            aria-label={t.zoomIn}
          >
            <ZoomIn className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setZoom(1)}
            className="rounded-md p-1.5 text-zinc-500 hover:bg-zinc-100"
            aria-label={t.zoomReset}
          >
            <Minimize2 className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setZoom(1.15)}
            className="rounded-md p-1.5 text-zinc-500 hover:bg-zinc-100"
            aria-label={t.zoomFit}
          >
            <Maximize2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        ref={outerRef}
        className="min-h-0 flex-1 overflow-auto rounded-2xl border border-zinc-200 bg-white shadow-inner"
      >
        <div ref={wrapperRef} className="relative w-full overflow-hidden p-2">
          <div
            ref={innerRef}
            style={{
              transformOrigin: "top left",
              transform: `scale(${scale})`,
              width: `${Math.round(100 / scale)}%`,
            }}
          >
            <DocumentPreview panelMode />
          </div>
        </div>
      </div>

      <p className="mt-3 px-1 text-[10px] text-zinc-400">{t.cleanResultHint}</p>

      {exportRef ? (
        <div className="pointer-events-none fixed -left-[9999px] top-0 opacity-0" aria-hidden>
          <DocumentPreview ref={exportRef} forExport />
        </div>
      ) : null}
    </div>
  );
}