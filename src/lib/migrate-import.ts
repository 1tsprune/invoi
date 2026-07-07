import type { AppData, BrandData, InvoiceData, ProductLine } from "./types";

type LegacyProduct = ProductLine & { jenis?: string; harga?: number };
type LegacyBrand = BrandData & { font?: string };
type LegacyInvoice = Partial<InvoiceData> & { products?: LegacyProduct[] };
type LegacyAppData = Partial<AppData> & { invoice?: LegacyInvoice; brand?: LegacyBrand };

export function normalizeImportedData(parsed: LegacyAppData): Partial<AppData> {
  const invoice = parsed.invoice;
  if (!invoice) return parsed;

  const products = (invoice.products ?? []).map((raw) => {
    const line = raw as LegacyProduct;
    return {
      id: line.id,
      qty: line.qty ?? 1,
      name: line.name || line.jenis || "",
      price: line.price ?? line.harga ?? 0,
      duration: line.duration ?? "",
      inventoryId: line.inventoryId ?? null,
    };
  });

  const brand = parsed.brand
    ? {
        ...parsed.brand,
        fontFamily: parsed.brand.fontFamily || parsed.brand.font || "Inter",
      }
    : undefined;

  return {
    ...parsed,
    invoice: { ...invoice, products },
    brand,
  };
}