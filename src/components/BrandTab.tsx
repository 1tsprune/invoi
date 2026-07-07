"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, PenLine, Upload } from "lucide-react";
import { BackgroundPicker } from "@/components/BackgroundPicker";
import { FontPicker } from "@/components/FontPicker";
import { ThemeCarousel } from "@/components/ThemeCarousel";
import { calculateTotals } from "@/lib/calculations";
import { INVOICE_FONTS, SIGNATURE_FONTS } from "@/lib/defaults";
import { getDictionary } from "@/lib/i18n";
import { scanQrisFromImage } from "@/lib/qris";
import { useAppStore } from "@/lib/store";
import { themeToBrandPatch } from "@/lib/themes";
import { formatMoney, readFileAsDataUrl } from "@/lib/utils";

function tpl(text: string, vars: Record<string, string>) {
  return text.replace(/\{(\w+)\}/g, (_, key: string) => vars[key] ?? "");
}
import { InventoryInline } from "@/components/InventoryInline";
import { Button, Card, Input, Label, SectionHeader, Textarea } from "@/components/ui";

export function BrandTab() {
  const brand = useAppStore((s) => s.brand);
  const invoice = useAppStore((s) => s.invoice);
  const locale = useAppStore((s) => s.locale);
  const totals = calculateTotals(invoice);
  const setBrand = useAppStore((s) => s.setBrand);
  const t = getDictionary(locale);
  const [qrisBusy, setQrisBusy] = useState(false);
  const [qrisMsg, setQrisMsg] = useState<string | null>(null);

  async function handleLogo(file: File | null) {
    if (!file) return setBrand({ logoUrl: null });
    setBrand({ logoUrl: await readFileAsDataUrl(file) });
  }

  async function handleSignature(file: File | null) {
    if (!file) return setBrand({ signatureImageUrl: null });
    setBrand({ signatureImageUrl: await readFileAsDataUrl(file), showSignature: true });
  }

  async function handleQris(file: File | null) {
    if (!file) return;
    setQrisBusy(true);
    setQrisMsg(t.qrisScanning);
    try {
      const dataUrl = await readFileAsDataUrl(file);
      const scanned = await scanQrisFromImage(dataUrl);
      setBrand({
        qrisImageUrl: dataUrl,
        qrisData: scanned ?? "",
        qrisEnabled: true,
      });
      setQrisMsg(scanned ? t.qrisSuccess : t.qrisErrorRead);
    } finally {
      setQrisBusy(false);
    }
  }

  function applyTheme(themeId: string) {
    setBrand(themeToBrandPatch(themeId));
  }

  const colorFields = [
    { key: "backgroundColor" as const, label: t.bgColor, hint: t.bgColorHint },
    { key: "textColor" as const, label: t.mainTextColor, hint: t.mainTextColorHint },
    { key: "accentColor" as const, label: t.accentColor, hint: t.accentColorHint },
    { key: "accentTextColor" as const, label: t.tableTextColor, hint: t.tableTextColorHint },
    { key: "alternateRowColor" as const, label: t.tableRowColor, hint: t.tableRowColorHint },
    { key: "surfaceColor" as const, label: t.surfaceColor, hint: t.surfaceColorHint },
    { key: "borderColor" as const, label: t.borderColor, hint: t.borderColorHint },
  ];

  return (
    <div className="space-y-4 pb-10 lg:pb-8">
      <SectionHeader title={t.brandSettings} sub={t.brandSettingsSub} />

      <Card title={t.brandIdentity}>
        <div className="grid gap-3">
          <label>
            <Label>{t.brandName}</Label>
            <Input value={brand.brandName} onChange={(e) => setBrand({ brandName: e.target.value })} placeholder={t.brandName} />
          </label>
          <label>
            <Label>{t.brandSub}</Label>
            <Input value={brand.brandSub} onChange={(e) => setBrand({ brandSub: e.target.value })} placeholder={t.subBrandPlaceholder} />
          </label>
          <label>
            <Label>{t.brandSub2}</Label>
            <Textarea
              value={brand.brandSub2}
              onChange={(e) => setBrand({ brandSub2: e.target.value })}
              rows={2}
              placeholder={t.subBrand2Placeholder}
            />
          </label>
          <div>
            <Label>{t.logo}</Label>
            {brand.logoUrl ? (
              <div className="mt-1 flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={brand.logoUrl} alt="Logo" className="h-14 w-14 rounded-lg border object-contain" />
                <div>
                  <p className="text-[10px] font-semibold text-emerald-700">{t.logoUploaded}</p>
                  <Button variant="ghost" onClick={() => setBrand({ logoUrl: null })}>{t.deleteImage}</Button>
                </div>
              </div>
            ) : (
              <label className="mt-1 flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-zinc-300 bg-zinc-50 px-4 py-6 text-sm font-semibold text-zinc-600 hover:bg-zinc-100">
                <Upload className="h-4 w-4" />
                {t.uploadLogo}
                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleLogo(e.target.files?.[0] ?? null)} />
              </label>
            )}
            <p className="mt-2 text-[10px] text-zinc-400">{t.logoHint}</p>
          </div>
        </div>
      </Card>

      <Card title={t.chooseTheme}>
        <ThemeCarousel activeTheme={brand.theme} onSelect={applyTheme} />
      </Card>

      <Card title={t.backgroundConfig} sub={t.backgroundSub}>
        <BackgroundPicker
          show={brand.showBackgroundImage}
          imageUrl={brand.backgroundImageUrl}
          presetId={brand.backgroundPresetId}
          opacity={brand.backgroundOpacity}
          size={brand.backgroundSize}
          positionX={brand.backgroundPositionX}
          positionY={brand.backgroundPositionY}
          overlay={brand.backgroundOverlay}
          onChange={(patch) => setBrand(patch)}
        />
      </Card>

      <Card title={t.colorCustomization}>
        <div className="grid gap-3 sm:grid-cols-2">
          {colorFields.map(({ key, label, hint }) => (
            <label key={key}>
              <Label>
                {label}{" "}
                <span className="font-normal text-zinc-400">{hint}</span>
              </Label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={brand[key]}
                  onChange={(e) => setBrand({ [key]: e.target.value })}
                  className="h-10 w-12 cursor-pointer rounded-lg border border-zinc-200"
                />
                <Input value={brand[key]} onChange={(e) => setBrand({ [key]: e.target.value })} />
              </div>
            </label>
          ))}
        </div>
        <label className="mt-3 flex items-center gap-2 text-sm">
          <input type="checkbox" checked={brand.showDurationColumn} onChange={(e) => setBrand({ showDurationColumn: e.target.checked })} />
          {t.showDuration}
        </label>
        <div className="mt-4 border-t border-zinc-100 pt-4">
          <FontPicker
            label={t.invoiceFont}
            value={brand.fontFamily}
            fonts={INVOICE_FONTS}
            onChange={(fontFamily) => setBrand({ fontFamily })}
          />
        </div>
      </Card>

      <Card title={t.signatureSettings} sub={t.signatureSettingsSub}>
        <label className="mb-3 flex items-center gap-2 text-sm">
          <input type="checkbox" checked={brand.showSignature} onChange={(e) => setBrand({ showSignature: e.target.checked })} />
          {t.showSignatureOnDoc}
        </label>
        <FontPicker
          label={t.signatureFontLabel}
          value={brand.signatureFont}
          fonts={SIGNATURE_FONTS}
          script
          onChange={(signatureFont) => setBrand({ signatureFont })}
        />
        <div className="mt-3">
          <Label>{t.uploadSignature}</Label>
          {brand.signatureImageUrl ? (
            <div className="mt-1 flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={brand.signatureImageUrl} alt="TTD" className="h-16 max-w-[140px] rounded border object-contain" />
              <Button variant="ghost" onClick={() => setBrand({ signatureImageUrl: null })}>{t.deleteImage}</Button>
            </div>
          ) : (
            <label className="mt-1 flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-zinc-300 bg-zinc-50 px-4 py-5 text-sm font-semibold text-zinc-600 hover:bg-zinc-100">
              <PenLine className="h-4 w-4" />
              {t.uploadSignature}
              <input type="file" accept="image/*" className="hidden" onChange={(e) => handleSignature(e.target.files?.[0] ?? null)} />
            </label>
          )}
          <p className="mt-2 text-xs text-zinc-400">{t.signatureImageHint}</p>
        </div>
        {brand.showSignature ? (
          <div className="mt-4 rounded-xl border border-zinc-100 bg-zinc-50 p-4 text-center">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">{t.previewSignature}</p>
            {brand.signatureImageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={brand.signatureImageUrl} alt="" className="mx-auto mt-2 h-14 max-w-[160px] object-contain" />
            ) : (
              <p className="mt-2 text-2xl" style={{ fontFamily: `'${brand.signatureFont}', cursive` }}>
                {t.signature}
              </p>
            )}
            <div className="mx-auto mt-3 h-px w-32 bg-zinc-300" />
          </div>
        ) : null}
      </Card>

      <Card title={t.watermarkConfig} sub={t.watermarkSub}>
        <label className="mb-3 flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={brand.showWatermark}
            onChange={(e) => setBrand({ showWatermark: e.target.checked })}
          />
          {t.addWatermark}
        </label>
        <label className="block">
          <Label>{t.watermark}</Label>
          <Input
            value={brand.watermarkText}
            onChange={(e) =>
              setBrand({
                watermarkText: e.target.value,
                showWatermark: brand.showWatermark || !!brand.watermarkImageUrl || !!e.target.value,
              })
            }
            placeholder={t.watermarkTextPlaceholder}
            disabled={!!brand.watermarkImageUrl || !brand.showWatermark}
          />
        </label>
        <div className="mt-3">
          <Label>{t.watermarkImage}</Label>
          {brand.watermarkImageUrl ? (
            <div className="mt-1 flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={brand.watermarkImageUrl} alt="" className="h-14 w-14 rounded border object-contain opacity-60" />
              <Button
                variant="ghost"
                onClick={() => setBrand({ watermarkImageUrl: null, showWatermark: !!brand.watermarkText })}
              >
                {t.deleteImage}
              </Button>
            </div>
          ) : (
            <label className="mt-1 flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-zinc-300 bg-zinc-50 px-4 py-4 text-sm font-semibold text-zinc-600 hover:bg-zinc-100">
              <Upload className="h-4 w-4" />
              {t.uploadWatermark}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                disabled={!brand.showWatermark}
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  setBrand({
                    watermarkImageUrl: await readFileAsDataUrl(file),
                    showWatermark: true,
                    watermarkText: "",
                  });
                }}
              />
            </label>
          )}
          <p className="mt-2 text-[10px] text-zinc-400">{t.watermarkHint}</p>
        </div>
        <label className="mt-3 block">
          <Label>
            {t.rotation} ({brand.watermarkRotation}°)
          </Label>
          <Input
            type="range"
            min={-90}
            max={90}
            value={brand.watermarkRotation}
            onChange={(e) => setBrand({ watermarkRotation: Number(e.target.value) })}
            disabled={!brand.showWatermark}
          />
        </label>
      </Card>

      <Card title={t.qrisConfig}>
        <p className="mb-1 text-sm text-zinc-500">{t.qrisSub}</p>
        <p className="mb-3 text-[10px] text-zinc-400">{t.qrisHint}</p>
        {brand.qrisImageUrl ? (
          <div className="mb-3 flex items-start gap-3 rounded-xl border border-zinc-100 bg-zinc-50 p-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={brand.qrisImageUrl} alt="QRIS" className="h-24 w-24 rounded-lg border object-contain bg-white" />
            <div className="min-w-0 flex-1 text-xs text-zinc-600">
              {qrisMsg ? (
                <p className="flex items-center gap-1 font-semibold text-emerald-700">
                  {qrisBusy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <CheckCircle2 className="h-3.5 w-3.5" />}
                  {qrisMsg}
                </p>
              ) : null}
              {brand.qrisData ? (
                <p className="mt-2 break-all opacity-70">
                  <span className="font-semibold">{t.qrisReadValue}:</span> {brand.qrisData.slice(0, 80)}...
                </p>
              ) : null}
              <div className="mt-2 flex flex-wrap gap-2">
                <label className="cursor-pointer text-[10px] font-semibold text-zinc-600 hover:underline">
                  {t.changeImage}
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleQris(e.target.files?.[0] ?? null)} />
                </label>
                <Button variant="ghost" className="text-red-600" onClick={() => setBrand({ qrisImageUrl: null, qrisData: "", qrisEnabled: false })}>
                  {t.deleteQris}
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-zinc-300 bg-zinc-50 px-4 py-6 text-sm font-semibold text-zinc-600 hover:bg-zinc-100">
            {qrisBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
            {qrisBusy ? t.qrisScanning : t.uploadQris}
            <input type="file" accept="image/*" className="hidden" onChange={(e) => handleQris(e.target.files?.[0] ?? null)} />
          </label>
        )}
        <div className="mt-3 space-y-3 text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={brand.qrisEnabled} onChange={(e) => setBrand({ qrisEnabled: e.target.checked })} />
            {t.showQris}
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={brand.showQrisOnInvoice} onChange={(e) => setBrand({ showQrisOnInvoice: e.target.checked })} />
            {t.showQrisOnInvoice}
          </label>
          <div>
            <Label>{t.qrisConfig}</Label>
            <div className="mt-1 flex rounded-lg border border-zinc-200 bg-zinc-50 p-0.5">
              <button
                type="button"
                onClick={() => setBrand({ qrisDynamic: false })}
                className={`flex-1 rounded-md px-3 py-2 text-[10px] font-bold uppercase tracking-wide transition ${
                  !brand.qrisDynamic ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-500"
                }`}
              >
                {t.qrisStatic}
              </button>
              <button
                type="button"
                onClick={() => setBrand({ qrisDynamic: true, qrisEnabled: true })}
                className={`flex-1 rounded-md px-3 py-2 text-[10px] font-bold uppercase tracking-wide transition ${
                  brand.qrisDynamic ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-500"
                }`}
              >
                {t.qrisDynamic}
              </button>
            </div>
          </div>
        </div>
        {brand.qrisDynamic ? (
          <p className="mt-2 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800">
            {tpl(t.qrisWarning, { total: formatMoney(totals.total, invoice.currency) })}
          </p>
        ) : null}
      </Card>

      <Card title={t.inventoryCardTitle}>
        <p className="mb-3 text-sm text-zinc-500">{t.inventoryCardSub}</p>
        <InventoryInline />
      </Card>
    </div>
  );
}