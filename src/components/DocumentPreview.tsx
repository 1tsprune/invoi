"use client";

import { forwardRef, useEffect, useMemo, useState } from "react";
import { calculateTotals } from "@/lib/calculations";
import { ensureFontLoaded } from "@/lib/fonts";
import { getDictionary } from "@/lib/i18n";
import { generateDynamicQris, generateQrDataUrl } from "@/lib/qris";
import { resolveTheme } from "@/lib/themes";
import { useAppStore } from "@/lib/store";
import type { InventoryItem, ProductLine } from "@/lib/types";
import { formatDate, formatMoney } from "@/lib/utils";

type Props = {
  forExport?: boolean;
  panelMode?: boolean;
};

function resolveProduct(line: ProductLine, inventory: InventoryItem[]) {
  if (line.inventoryId) {
    const inv = inventory.find((i) => i.id === line.inventoryId);
    if (inv) return { name: inv.name, price: inv.price };
  }
  return { name: line.name, price: line.price };
}

export const DocumentPreview = forwardRef<HTMLDivElement, Props>(function DocumentPreview(
  { forExport = false, panelMode = false },
  ref,
) {
  const invoice = useAppStore((s) => s.invoice);
  const brand = useAppStore((s) => s.brand);
  const inventory = useAppStore((s) => s.inventory);
  const locale = useAppStore((s) => s.locale);
  const t = getDictionary(locale);
  const theme = resolveTheme(brand);
  const totals = calculateTotals(invoice);
  const [qrisDisplay, setQrisDisplay] = useState<string | null>(null);

  const subtotal = useMemo(
    () =>
      invoice.products.reduce((sum, line) => {
        const p = resolveProduct(line, inventory);
        return sum + line.qty * p.price;
      }, 0),
    [invoice.products, inventory],
  );

  useEffect(() => {
    ensureFontLoaded(brand.fontFamily);
    ensureFontLoaded(brand.signatureFont, true);
  }, [brand.fontFamily, brand.signatureFont]);

  useEffect(() => {
    let cancelled = false;
    async function renderQris() {
      if (!brand.qrisEnabled || !brand.showQrisOnInvoice) {
        setQrisDisplay(null);
        return;
      }
      if (brand.qrisDynamic && brand.qrisData) {
        const url = await generateDynamicQris(brand.qrisData, totals.total);
        if (!cancelled) setQrisDisplay(url);
        return;
      }
      if (brand.qrisImageUrl) {
        setQrisDisplay(brand.qrisImageUrl);
        return;
      }
      if (brand.qrisData) {
        const url = await generateQrDataUrl(brand.qrisData);
        if (!cancelled) setQrisDisplay(url);
        return;
      }
      setQrisDisplay(null);
    }
    void renderQris();
    return () => {
      cancelled = true;
    };
  }, [brand, totals.total]);

  const showQris = brand.qrisEnabled && brand.showQrisOnInvoice && !!qrisDisplay;
  const showDuration = brand.showDurationColumn;
  const fontFamily = `'${brand.fontFamily}', -apple-system, sans-serif`;

  const s = {
    root: {
      backgroundColor: theme.bg,
      fontFamily,
      color: theme.text,
      width: forExport ? "794px" : "100%",
      padding: forExport ? "48px 44px" : panelMode ? "40px 36px" : "48px 44px",
      boxSizing: "border-box" as const,
      position: "relative" as const,
      overflow: "hidden" as const,
    },
    watermarkText: {
      position: "absolute" as const,
      top: "50%",
      left: "50%",
      transform: `translate(-50%, -50%) rotate(${brand.watermarkRotation}deg)`,
      fontSize: "80px",
      fontWeight: 700,
      color: theme.text,
      opacity: 0.035,
      letterSpacing: "10px",
      whiteSpace: "nowrap" as const,
      pointerEvents: "none" as const,
      userSelect: "none" as const,
      zIndex: 10,
    },
    watermarkImage: {
      position: "absolute" as const,
      top: "50%",
      left: "50%",
      transform: `translate(-50%, -50%) rotate(${brand.watermarkRotation}deg)`,
      width: "55%",
      opacity: 0.08,
      pointerEvents: "none" as const,
      userSelect: "none" as const,
      zIndex: 10,
    },
    inner: { position: "relative" as const, zIndex: 1 },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: "32px",
    },
    logoBlock: { display: "flex", alignItems: "flex-start", gap: "16px" },
    logoImg: {
      width: "120px",
      height: "120px",
      objectFit: "contain" as const,
      borderRadius: "12px",
      display: "block",
      flexShrink: 0,
    },
    logoBox: {
      width: "120px",
      height: "120px",
      backgroundColor: theme.accent,
      borderRadius: "12px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    },
    brandTextContainer: {
      display: "flex",
      flexDirection: "column" as const,
      justifyContent: "center",
      alignItems: "flex-start",
      minHeight: "95px",
    },
    brandName: {
      fontSize: "36px",
      fontWeight: 800,
      color: theme.text,
      letterSpacing: "-0.5px",
      lineHeight: 1,
      display: "block",
      marginBottom: "13px",
    },
    brandSub: {
      fontSize: "16px",
      color: theme.textMuted,
      fontWeight: 400,
      lineHeight: 1.1,
      display: "block",
      marginTop: "4px",
    },
    brandSub2: {
      fontSize: "14px",
      color: theme.textMuted,
      fontWeight: 400,
      lineHeight: 1.1,
      display: "block",
      marginTop: "3px",
    },
    invoiceTitle: { textAlign: "right" as const },
    invoiceTitleText: {
      fontSize: "26px",
      fontWeight: 800,
      color: theme.accent,
      letterSpacing: "-1px",
      lineHeight: 1,
      display: "block",
    },
    invoiceNum: {
      fontSize: "10px",
      color: theme.textMuted,
      marginTop: "5px",
      fontWeight: 500,
      lineHeight: 1,
      display: "block",
    },
    divider: { height: "1px", backgroundColor: theme.border, marginBottom: "24px" },
    metaRow: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "30px",
      gap: "16px",
    },
    metaLabel: {
      fontSize: "9px",
      fontWeight: 600,
      color: theme.textMuted,
      textTransform: "uppercase" as const,
      letterSpacing: "1.2px",
      marginBottom: "5px",
      lineHeight: 1,
      display: "block",
    },
    metaValue: {
      fontSize: "13px",
      fontWeight: 600,
      color: theme.text,
      lineHeight: 1,
      display: "block",
    },
    metaValueRight: {
      fontSize: "12px",
      color: theme.text,
      fontWeight: 500,
      textAlign: "right" as const,
      lineHeight: 1,
      display: "block",
    },
    table: { width: "100%", borderCollapse: "collapse" as const, marginBottom: "20px" },
    th: (align: "left" | "center" | "right" = "left", width?: string) => ({
      paddingTop: "8px",
      paddingBottom: "20px",
      paddingLeft: "13px",
      paddingRight: "13px",
      textAlign: align,
      fontSize: "9px",
      fontWeight: 600,
      color: theme.accentText,
      textTransform: "uppercase" as const,
      letterSpacing: "0.8px",
      backgroundColor: theme.tableHeader,
      width,
      lineHeight: 1,
      verticalAlign: "top" as const,
    }),
    tdEven: {
      paddingTop: "6px",
      paddingBottom: "18px",
      paddingLeft: "13px",
      paddingRight: "13px",
      backgroundColor: theme.tableRow,
      borderBottom: `1px solid ${theme.border}`,
      fontSize: "11px",
      color: theme.text,
      lineHeight: 1,
      verticalAlign: "top" as const,
    },
    tdOdd: {
      paddingTop: "6px",
      paddingBottom: "18px",
      paddingLeft: "13px",
      paddingRight: "13px",
      backgroundColor: theme.tableRowAlt,
      borderBottom: `1px solid ${theme.border}`,
      fontSize: "11px",
      color: theme.text,
      lineHeight: 1,
      verticalAlign: "top" as const,
    },
    totalSection: { display: "flex", justifyContent: "flex-end", marginBottom: "28px" },
    totalBox: { width: "210px" },
    subtotalRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      paddingTop: "3px",
      paddingBottom: "10px",
      borderBottom: `1px solid ${theme.border}`,
      fontSize: "11px",
      lineHeight: 1,
    },
    totalRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      paddingTop: forExport ? "7px" : "10px",
      paddingBottom: forExport ? "25px" : "10px",
      paddingLeft: "13px",
      paddingRight: "13px",
      marginTop: "8px",
      backgroundColor: theme.totalBg,
      borderRadius: "7px",
    },
    totalLabel: {
      color: theme.accentText,
      fontWeight: 700,
      fontSize: "11px",
      textTransform: "uppercase" as const,
      letterSpacing: "0.8px",
      lineHeight: 1,
      display: "block",
    },
    totalValue: {
      color: theme.accentText,
      fontWeight: 800,
      fontSize: "15px",
      lineHeight: 1,
      display: "block",
      marginTop: forExport ? "-2px" : "0",
    },
    bottomSection: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-end",
      flexWrap: "wrap" as const,
      gap: "24px",
    },
    paymentBlock: { flex: 1, minWidth: "160px" },
    signatureBlock: { textAlign: "center" as const, minWidth: "130px" },
    signatureText: {
      fontFamily: `'${brand.signatureFont}', cursive`,
      fontSize: "28px",
      color: theme.text,
      lineHeight: 1,
      marginBottom: "8px",
      display: "block",
    },
    signatureLine: {
      height: "1px",
      backgroundColor: theme.border,
      width: "100%",
      marginTop: "18px",
      marginBottom: "5px",
    },
    footer: {
      marginTop: "36px",
      paddingTop: "16px",
      borderTop: `1px solid ${theme.border}`,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    footerText: { fontSize: "9px", color: theme.textMuted, lineHeight: 1, display: "block" },
    notesBox: {
      marginTop: "24px",
      paddingTop: "16px",
      paddingBottom: forExport ? "31px" : "16px",
      paddingLeft: "18px",
      paddingRight: "18px",
      backgroundColor: theme.surface,
      borderRadius: "12px",
      border: `1px solid ${theme.border}`,
      display: "flex",
      gap: "14px",
      alignItems: "flex-start",
    },
    notesIconBox: {
      width: "28px",
      height: "28px",
      borderRadius: "8px",
      backgroundColor: theme.border,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      color: theme.textMuted,
      marginTop: "2px",
    },
    notesContent: { flex: 1 },
  };

  const showBg = brand.showBackgroundImage && !!brand.backgroundImageUrl;
  const bgPosX = brand.backgroundPositionX ?? 50;
  const bgPosY = brand.backgroundPositionY ?? 50;
  const bgPosition = `${bgPosX}% ${bgPosY}%`;

  return (
    <div ref={ref} id="invoice-preview" style={s.root}>
      {showBg ? (
        brand.backgroundSize === "repeat" ? (
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${brand.backgroundImageUrl})`,
              backgroundRepeat: "repeat",
              backgroundSize: "120px",
              backgroundPosition: bgPosition,
              opacity: brand.backgroundOpacity / 100,
              pointerEvents: "none",
              zIndex: 0,
            }}
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={brand.backgroundImageUrl!}
            alt=""
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: brand.backgroundSize,
              objectPosition: bgPosition,
              opacity: brand.backgroundOpacity / 100,
              pointerEvents: "none",
              zIndex: 0,
            }}
          />
        )
      ) : null}
      {showBg && brand.backgroundOverlay > 0 ? (
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: theme.bg,
            opacity: brand.backgroundOverlay / 100,
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
      ) : null}

      {brand.showWatermark && brand.watermarkImageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={brand.watermarkImageUrl} alt="" style={s.watermarkImage} />
      ) : brand.showWatermark && brand.watermarkText ? (
        <div style={s.watermarkText}>{brand.watermarkText}</div>
      ) : null}

      {invoice.paymentStatus !== "none" ? (
        <div
          style={{
            position: "absolute",
            right: 40,
            top: 120,
            zIndex: 20,
            border: `2px solid ${invoice.paymentStatus === "paid" ? "#16a34a" : "#dc2626"}`,
            color: invoice.paymentStatus === "paid" ? "#16a34a" : "#dc2626",
            padding: "8px 16px",
            fontSize: "13px",
            fontWeight: 800,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            transform: "rotate(-12deg)",
            opacity: 0.85,
            borderRadius: "8px",
          }}
        >
          {invoice.paymentStatus === "paid" ? t.paidStamp : t.unpaidStamp}
        </div>
      ) : null}

      <div style={s.inner}>
        <div style={s.header}>
          <div style={s.logoBlock}>
            {brand.logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={brand.logoUrl} alt="Logo" style={s.logoImg} />
            ) : (
              <div style={s.logoBox}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={theme.accentText} strokeWidth="2">
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                  <line x1="7" y1="7" x2="7.01" y2="7" />
                </svg>
              </div>
            )}
            <div style={s.brandTextContainer}>
              <div style={s.brandName}>{brand.brandName || t.appName}</div>
              <div style={s.brandSub}>{brand.brandSub || "Official Statement"}</div>
              {brand.brandSub2 ? <div style={s.brandSub2}>{brand.brandSub2}</div> : null}
            </div>
          </div>
          <div style={s.invoiceTitle}>
            <div style={s.invoiceTitleText}>{t.docLabel[invoice.docType]}</div>
            <div style={s.invoiceNum}>#{invoice.invoiceNumber}</div>
          </div>
        </div>

        <div style={s.divider} />

        <div style={s.metaRow}>
          <div>
            <div style={s.metaLabel}>{t.billTo}</div>
            <div style={s.metaValue}>{invoice.invoiceFor || t.someone}</div>
          </div>
          <div>
            <div style={{ ...s.metaLabel, textAlign: "right" }}>{t.date}</div>
            <div style={s.metaValueRight}>{formatDate(invoice.date, locale)}</div>
            {invoice.docType !== "kwitansi" ? (
              <>
                <div style={{ ...s.metaLabel, textAlign: "right", marginTop: "8px" }}>{t.dueDate}</div>
                <div style={s.metaValueRight}>{formatDate(invoice.dueDate, locale)}</div>
              </>
            ) : null}
          </div>
        </div>

        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th("left", "10%")}>{t.qty}</th>
              <th style={s.th("left")}>{t.description}</th>
              {showDuration ? <th style={s.th("center", "18%")}>{t.duration}</th> : null}
              <th style={s.th("right", "22%")}>{t.unitPrice}</th>
              <th style={s.th("right", "22%")}>{t.total}</th>
            </tr>
          </thead>
          <tbody>
            {invoice.products.map((line, index) => {
              const p = resolveProduct(line, inventory);
              const td = index % 2 === 0 ? s.tdEven : s.tdOdd;
              return (
                <tr key={line.id}>
                  <td style={{ ...td, fontWeight: 600 }}>{line.qty}</td>
                  <td style={td}>{p.name || "—"}</td>
                  {showDuration ? (
                    <td style={{ ...td, textAlign: "center" }}>{line.duration?.trim() ? line.duration : "—"}</td>
                  ) : null}
                  <td style={{ ...td, textAlign: "right" }}>{formatMoney(p.price, invoice.currency)}</td>
                  <td style={{ ...td, textAlign: "right", fontWeight: 700 }}>
                    {formatMoney(line.qty * p.price, invoice.currency)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div style={s.totalSection}>
          <div style={s.totalBox}>
            <div style={s.subtotalRow}>
              <div style={{ color: theme.textMuted, lineHeight: 1 }}>{t.subtotal}</div>
              <div style={{ color: theme.text, fontWeight: 500, lineHeight: 1 }}>
                {formatMoney(subtotal, invoice.currency)}
              </div>
            </div>

            {invoice.discountEnabled && (invoice.discountPercent ?? 0) > 0 ? (
              <div style={s.subtotalRow}>
                <div style={{ color: theme.textMuted, lineHeight: 1 }}>
                  {t.discount} ({invoice.discountPercent}%)
                </div>
                <div style={{ color: "#ef4444", fontWeight: 500, lineHeight: 1 }}>
                  – {formatMoney(totals.discount, invoice.currency)}
                </div>
              </div>
            ) : null}

            {invoice.otherCostEnabled
              ? invoice.otherCosts
                  .filter((c) => c.type === "additional")
                  .map((cost) => (
                    <div key={cost.id} style={s.subtotalRow}>
                      <div style={{ color: theme.textMuted, lineHeight: 1 }}>
                        {cost.name || t.additionalCost}
                      </div>
                      <div style={{ color: theme.text, fontWeight: 500, lineHeight: 1 }}>
                        + {formatMoney(cost.amount, invoice.currency)}
                      </div>
                    </div>
                  ))
              : null}

            {invoice.otherCostEnabled
              ? invoice.otherCosts
                  .filter((c) => c.type === "reduction")
                  .map((cost) => (
                    <div key={cost.id} style={s.subtotalRow}>
                      <div style={{ color: theme.textMuted, lineHeight: 1 }}>
                        {cost.name || t.reduction}
                      </div>
                      <div style={{ color: "#ef4444", fontWeight: 500, lineHeight: 1 }}>
                        – {formatMoney(cost.amount, invoice.currency)}
                      </div>
                    </div>
                  ))
              : null}

            {invoice.taxEnabled && (invoice.taxPercent ?? 0) > 0 ? (
              <div style={s.subtotalRow}>
                <div style={{ color: theme.textMuted, lineHeight: 1 }}>
                  {t.tax} ({invoice.taxPercent}%)
                </div>
                <div style={{ color: theme.text, fontWeight: 500, lineHeight: 1 }}>
                  + {formatMoney(totals.tax, invoice.currency)}
                </div>
              </div>
            ) : null}

            <div style={s.totalRow}>
              <div style={s.totalLabel}>{t.total}</div>
              <div style={s.totalValue}>{formatMoney(totals.total, invoice.currency)}</div>
            </div>
          </div>
        </div>

        <div style={s.divider} />

        <div style={s.bottomSection}>
          <div style={s.paymentBlock}>
            <div style={s.metaLabel}>{t.paymentMethod}</div>
            <div
              style={{
                fontSize: "11px",
                color: theme.text,
                lineHeight: 1.5,
                whiteSpace: "pre-line",
                display: "block",
              }}
            >
              {invoice.paymentBy || t.paymentPlaceholder}
            </div>
            {invoice.bankName || invoice.bankAccount ? (
              <div style={{ fontSize: "10px", color: theme.textMuted, marginTop: "6px", lineHeight: 1.4 }}>
                {invoice.bankName}
                {invoice.bankAccount ? ` — ${invoice.bankAccount}` : ""}
              </div>
            ) : null}
            {showQris ? (
              <div style={{ marginTop: "12px" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={qrisDisplay!}
                  alt="QRIS"
                  style={{
                    width: "120px",
                    height: "120px",
                    display: "block",
                    borderRadius: "6px",
                    border: `1px solid ${theme.border}`,
                  }}
                />
                {brand.qrisDynamic && invoice.currency === "IDR" ? (
                  <div
                    style={{
                      fontSize: "8px",
                      fontWeight: 700,
                      color: theme.textMuted,
                      textTransform: "uppercase",
                      letterSpacing: "1.5px",
                      marginTop: "5px",
                      lineHeight: 1,
                      display: "block",
                    }}
                  >
                    QRIS Dinamis
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>

          {brand.showSignature ? (
            <div style={s.signatureBlock}>
              <div style={{ ...s.metaLabel, textAlign: "center", marginBottom: "10px" }}>{t.bestRegards}</div>
              {brand.signatureImageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={brand.signatureImageUrl}
                  alt="TTD"
                  style={{ maxHeight: "64px", maxWidth: "160px", objectFit: "contain", margin: "0 auto 8px", display: "block" }}
                />
              ) : (
                <span style={s.signatureText}>{invoice.signatureName || t.signature}</span>
              )}
              <div style={s.signatureLine} />
              <div style={{ fontSize: "9px", color: theme.textMuted, marginTop: "4px", lineHeight: 1, display: "block" }}>
                {invoice.signatureName || t.name}
              </div>
              {invoice.signatureTitle ? (
                <div style={{ fontSize: "9px", color: theme.textMuted, marginTop: "2px", lineHeight: 1, display: "block" }}>
                  {invoice.signatureTitle}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>

        {invoice.notes ? (
          <div style={s.notesBox}>
            <div style={s.notesIconBox}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
            </div>
            <div style={s.notesContent}>
              <div style={{ ...s.metaLabel, marginBottom: "6px" }}>{t.notes}</div>
              <div style={{ fontSize: "11.5px", color: theme.text, lineHeight: 1.6, fontWeight: 400 }}>
                {invoice.notes}
              </div>
            </div>
          </div>
        ) : null}

        <div style={s.footer}>
          <span style={s.footerText}>{t.appName}</span>
          <span style={s.footerText}>#{invoice.invoiceNumber}</span>
        </div>
      </div>
    </div>
  );
});