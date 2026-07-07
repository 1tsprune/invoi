import { calculateTotals, lineSubtotal } from "./calculations";
import { getDictionary } from "./i18n";
import type { AppData } from "./types";
import { formatDate, formatMoney } from "./utils";

export function buildWhatsAppText(data: AppData): string {
  const { invoice, brand, locale } = data;
  const t = getDictionary(locale);
  const totals = calculateTotals(invoice);
  const docTitle = t.docLabel[invoice.docType];

  const lines = [
    `*${docTitle} ${invoice.invoiceNumber}*`,
    `${t.date}: ${formatDate(invoice.date, locale)}`,
    invoice.docType !== "kwitansi" ? `${t.dueDate}: ${formatDate(invoice.dueDate, locale)}` : "",
    "",
    `*${brand.brandName || t.appName}*`,
    `${t.billTo}: ${invoice.invoiceFor || "-"}`,
    "",
    `*${t.productsServices}:*`,
  ].filter(Boolean);

  for (const item of invoice.products) {
    if (!item.name.trim()) continue;
    lines.push(
      `• ${item.name} (${item.qty}x) = ${formatMoney(lineSubtotal(item.qty, item.price), invoice.currency)}`,
    );
  }

  if (invoice.discountEnabled && totals.discount > 0) {
    lines.push(`${t.discount}: -${formatMoney(totals.discount, invoice.currency)}`);
  }
  if (invoice.taxEnabled && totals.tax > 0) {
    lines.push(`${t.tax} (${invoice.taxPercent}%): ${formatMoney(totals.tax, invoice.currency)}`);
  }

  lines.push(
    "",
    `*${t.total}: ${formatMoney(totals.total, invoice.currency)}*`,
    `${t.paymentMethod}: ${invoice.paymentBy || "-"}`,
  );

  if (invoice.notes.trim()) lines.push("", `${t.notes}: ${invoice.notes.trim()}`);
  lines.push("", `Dibuat dengan ${t.appName} — gratis, tanpa daftar.`);
  return lines.join("\n");
}