export type DocType = "invoice" | "kwitansi" | "quotation";
export type Locale = "id" | "en";
export type ProductEntryMode = "manual" | "inventory";
export type TabId = "form" | "brand" | "preview" | "export";

export type ProductLine = {
  id: string;
  qty: number;
  name: string;
  price: number;
  duration: string;
  inventoryId: string | null;
};

export type OtherCost = {
  id: string;
  name: string;
  amount: number;
  type: "additional" | "reduction";
};

export type PaymentStatus = "none" | "paid" | "unpaid";

export type InvoiceData = {
  docType: DocType;
  invoiceNumber: string;
  invoiceFor: string;
  date: string;
  dueDate: string;
  products: ProductLine[];
  productEntryMode: ProductEntryMode;
  paymentBy: string;
  bankName: string;
  bankAccount: string;
  paymentStatus: PaymentStatus;
  signatureName: string;
  signatureTitle: string;
  notes: string;
  discountEnabled: boolean;
  discountPercent: number;
  taxEnabled: boolean;
  taxPercent: number;
  currency: string;
  otherCostEnabled: boolean;
  otherCosts: OtherCost[];
};

export type BackgroundSize = "cover" | "contain" | "repeat";

export type BrandData = {
  brandName: string;
  brandSub: string;
  brandSub2: string;
  logoUrl: string | null;
  watermarkText: string;
  watermarkImageUrl: string | null;
  watermarkRotation: number;
  showWatermark: boolean;
  showDurationColumn: boolean;
  theme: string;
  fontFamily: string;
  signatureFont: string;
  signatureImageUrl: string | null;
  showSignature: boolean;
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  accentTextColor: string;
  alternateRowColor: string;
  surfaceColor: string;
  borderColor: string;
  backgroundImageUrl: string | null;
  backgroundPresetId: string | null;
  showBackgroundImage: boolean;
  backgroundOpacity: number;
  backgroundSize: BackgroundSize;
  backgroundPositionX: number;
  backgroundPositionY: number;
  backgroundOverlay: number;
  qrisEnabled: boolean;
  qrisImageUrl: string | null;
  qrisData: string;
  showQrisOnInvoice: boolean;
  qrisDynamic: boolean;
};

export type InventoryItem = {
  id: string;
  name: string;
  price: number;
  unit: string;
  description: string;
};

export type AppData = {
  invoice: InvoiceData;
  brand: BrandData;
  inventory: InventoryItem[];
  locale: Locale;
};