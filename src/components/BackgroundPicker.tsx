"use client";

import { ImagePlus, Upload, X } from "lucide-react";
import { BACKGROUND_PRESETS } from "@/lib/background-presets";
import { getDictionary } from "@/lib/i18n";
import { useAppStore } from "@/lib/store";
import type { BackgroundSize } from "@/lib/types";
import { readFileAsDataUrl } from "@/lib/utils";
import { Button, Label } from "@/components/ui";

type Props = {
  show: boolean;
  imageUrl: string | null;
  presetId: string | null;
  opacity: number;
  size: BackgroundSize;
  overlay: number;
  onChange: (patch: {
    showBackgroundImage?: boolean;
    backgroundImageUrl?: string | null;
    backgroundPresetId?: string | null;
    backgroundOpacity?: number;
    backgroundSize?: BackgroundSize;
    backgroundOverlay?: number;
  }) => void;
};

export function BackgroundPicker({
  show,
  imageUrl,
  presetId,
  opacity,
  size,
  overlay,
  onChange,
}: Props) {
  const locale = useAppStore((s) => s.locale);
  const t = getDictionary(locale);

  async function handleUpload(file: File | null) {
    if (!file) return;
    const dataUrl = await readFileAsDataUrl(file);
    onChange({
      backgroundImageUrl: dataUrl,
      backgroundPresetId: null,
      showBackgroundImage: true,
    });
  }

  return (
    <div className="space-y-3">
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={show}
          onChange={(e) => onChange({ showBackgroundImage: e.target.checked })}
        />
        {t.enableBackground}
      </label>

      {show ? (
        <>
          <div>
            <Label>{t.backgroundPresets}</Label>
            <div className="mt-1.5 grid grid-cols-4 gap-1.5 sm:grid-cols-6">
              {BACKGROUND_PRESETS.map((preset) => {
                const selected = presetId === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    title={preset.name}
                    onClick={() =>
                      onChange({
                        backgroundImageUrl: preset.url,
                        backgroundPresetId: preset.id,
                        showBackgroundImage: true,
                      })
                    }
                    className={`group relative aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                      selected ? "border-zinc-900 ring-2 ring-zinc-900/20" : "border-zinc-200 hover:border-zinc-400"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={preset.url} alt={preset.name} className="h-full w-full object-cover" />
                    <span className="absolute inset-x-0 bottom-0 bg-black/45 px-1 py-0.5 text-[7px] font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100">
                      {preset.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <Label>{t.uploadBackground}</Label>
            {imageUrl && !presetId ? (
              <div className="mt-1 flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imageUrl} alt="" className="h-16 w-24 rounded-lg border object-cover" />
                <Button variant="ghost" onClick={() => onChange({ backgroundImageUrl: null, showBackgroundImage: false })}>
                  {t.deleteImage}
                </Button>
              </div>
            ) : (
              <label className="mt-1 flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-zinc-300 bg-zinc-50 px-4 py-4 text-sm font-semibold text-zinc-600 hover:bg-zinc-100">
                <Upload className="h-4 w-4" />
                {t.uploadBackground}
                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleUpload(e.target.files?.[0] ?? null)} />
              </label>
            )}
            {imageUrl ? (
              <button
                type="button"
                onClick={() => onChange({ backgroundImageUrl: null, backgroundPresetId: null, showBackgroundImage: false })}
                className="mt-2 inline-flex items-center gap-1 text-[10px] font-semibold text-red-600 hover:underline"
              >
                <X className="h-3 w-3" />
                {t.deleteImage}
              </button>
            ) : null}
          </div>

          <label className="block">
            <Label>
              {t.backgroundOpacity} ({opacity}%)
            </Label>
            <input
              type="range"
              min={5}
              max={100}
              value={opacity}
              onChange={(e) => onChange({ backgroundOpacity: Number(e.target.value) })}
              className="w-full"
            />
          </label>

          <label className="block">
            <Label>{t.backgroundOverlay} ({overlay}%)</Label>
            <input
              type="range"
              min={0}
              max={90}
              value={overlay}
              onChange={(e) => onChange({ backgroundOverlay: Number(e.target.value) })}
              className="w-full"
            />
            <p className="mt-1 text-[10px] text-zinc-400">{t.backgroundOverlayHint}</p>
          </label>

          <label className="block">
            <Label>{t.backgroundSize}</Label>
            <div className="mt-1 flex flex-wrap gap-1.5">
              {(["cover", "contain", "repeat"] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => onChange({ backgroundSize: mode })}
                  className={`rounded-lg border px-3 py-1.5 text-[10px] font-semibold capitalize transition-colors ${
                    size === mode
                      ? "border-zinc-900 bg-zinc-900 text-white"
                      : "border-zinc-200 text-zinc-600 hover:border-zinc-400"
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </label>

          {imageUrl ? (
            <div className="overflow-hidden rounded-xl border border-zinc-100">
              <div className="relative h-24">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: size === "repeat" ? `url(${imageUrl})` : undefined,
                    backgroundRepeat: size === "repeat" ? "repeat" : undefined,
                    backgroundSize: size === "repeat" ? "80px" : undefined,
                  }}
                >
                  {size !== "repeat" ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={imageUrl}
                      alt=""
                      className="h-full w-full"
                      style={{ objectFit: size, opacity: opacity / 100 }}
                    />
                  ) : (
                    <div className="h-full w-full" style={{ backgroundImage: `url(${imageUrl})`, backgroundRepeat: "repeat", backgroundSize: "60px", opacity: opacity / 100 }} />
                  )}
                </div>
                <div className="absolute inset-0 bg-white" style={{ opacity: overlay / 100 }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <ImagePlus className="h-5 w-5 text-zinc-400" />
                </div>
              </div>
            </div>
          ) : null}
        </>
      ) : null}
    </div>
  );
}