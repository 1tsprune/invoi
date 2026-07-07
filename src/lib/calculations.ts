import type { InvoiceData } from "./types";

export type InvoiceTotals = {
  subtotal: number;
  discount: number;
  otherCosts: number;
  tax: number;
  total: number;
};

export function lineSubtotal(qty: number, price: number): number {
  return Math.max(0, qty) * Math.max(0, price);
}

export function calculateTotals(invoice: InvoiceData): InvoiceTotals {
  const subtotal = invoice.products.reduce(
    (sum, p) => sum + lineSubtotal(p.qty, p.price),
    0,
  );

  const discount = invoice.discountEnabled
    ? Math.round(subtotal * (Math.max(0, invoice.discountPercent) / 100))
    : 0;

  const afterDiscount = subtotal - discount;

  let additional = 0;
  let reduction = 0;
  if (invoice.otherCostEnabled) {
    for (const c of invoice.otherCosts) {
      const amount = Math.max(0, c.amount);
      if (c.type === "reduction") reduction += amount;
      else additional += amount;
    }
  }
  const otherCosts = additional - reduction;

  const taxable = afterDiscount + otherCosts;

  const tax = invoice.taxEnabled
    ? Math.round(taxable * (Math.max(0, invoice.taxPercent) / 100))
    : 0;

  return {
    subtotal,
    discount,
    otherCosts,
    tax,
    total: taxable + tax,
  };
}