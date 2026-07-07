import type { AppData, BrandData, InvoiceData, InventoryItem } from "./types";
import { themeToBrandPatch } from "./themes";
import { dueDateIso, generateDocNumber, todayIso, uid } from "./utils";

export { INVOICE_FONTS, SIGNATURE_FONTS } from "./fonts";

export const CURRENCIES = ["IDR", "USD", "SGD", "MYR"] as const;

export function createDefaultInvoice(overrides: Partial<InvoiceData> = {}): InvoiceData {
  return {
    docType: "invoice",
    invoiceNumber: generateDocNumber("INV"),
    invoiceFor: "",
    date: todayIso(),
    dueDate: dueDateIso(7),
    products: [{ id: uid(), qty: 1, name: "", price: 0, duration: "", inventoryId: null }],
    productEntryMode: "manual",
    paymentBy: "",
    bankName: "",
    bankAccount: "",
    paymentStatus: "none",
    signatureName: "",
    signatureTitle: "",
    notes: "",
    discountEnabled: false,
    discountPercent: 0,
    taxEnabled: false,
    taxPercent: 11,
    currency: "IDR",
    otherCostEnabled: false,
    otherCosts: [],
    ...overrides,
  };
}

export function createDefaultBrand(overrides: Partial<BrandData> = {}): BrandData {
  const preset = themeToBrandPatch("minimal");
  return {
    brandName: "",
    brandSub: "",
    brandSub2: "",
    logoUrl: null,
    watermarkText: "",
    watermarkImageUrl: null,
    showWatermark: false,
    showDurationColumn: false,
    theme: "minimal",
    fontFamily: "Inter",
    signatureFont: "Sacramento",
    signatureImageUrl: null,
    showSignature: true,
    backgroundColor: preset.backgroundColor!,
    textColor: preset.textColor!,
    accentColor: preset.accentColor!,
    accentTextColor: preset.accentTextColor!,
    alternateRowColor: preset.alternateRowColor!,
    surfaceColor: preset.surfaceColor!,
    borderColor: preset.borderColor!,
    backgroundImageUrl: null,
    backgroundPresetId: null,
    showBackgroundImage: false,
    backgroundOpacity: 35,
    backgroundSize: "cover",
    backgroundPositionX: 50,
    backgroundPositionY: 50,
    backgroundOverlay: 55,
    watermarkRotation: 0,
    qrisEnabled: false,
    qrisImageUrl: null,
    qrisData: "",
    showQrisOnInvoice: true,
    qrisDynamic: false,
    ...overrides,
  };
}

export function createDefaultAppData(): AppData {
  return {
    invoice: createDefaultInvoice(),
    brand: createDefaultBrand(),
    inventory: [],
    locale: "id",
  };
}

export function docNumberPrefix(docType: InvoiceData["docType"]): string {
  if (docType === "kwitansi") return "KW";
  if (docType === "quotation") return "QT";
  return "INV";
}

export function createInventoryItem(partial: Partial<InventoryItem> = {}): InventoryItem {
  return {
    id: uid(),
    name: "",
    price: 0,
    unit: "pcs",
    description: "",
    ...partial,
  };
}