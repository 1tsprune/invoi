import { APP } from "./config";
import { createDefaultAppData } from "./defaults";
import { normalizeImportedData } from "./migrate-import";
import type { AppData, InvoiceData, Locale, OtherCost } from "./types";

export type SaveResult = { ok: true } | { ok: false; reason: "quota" | "unknown" };

export const STORAGE_KEY = `${APP.slug}:v1`;
const LEGACY_STORAGE_KEY = "kwitansi-cepat:v2";

function migrateLegacyStorage(): void {
  if (typeof window === "undefined") return;
  if (!localStorage.getItem(STORAGE_KEY)) {
    const legacy = localStorage.getItem(LEGACY_STORAGE_KEY);
    if (legacy) {
      localStorage.setItem(STORAGE_KEY, legacy);
      localStorage.removeItem(LEGACY_STORAGE_KEY);
    }
  }
}

function migrateInvoice(invoice: Partial<InvoiceData>, defaults: InvoiceData): InvoiceData {
  const merged = { ...defaults, ...invoice };
  merged.otherCosts = (merged.otherCosts ?? []).map((cost) => {
    const legacy = cost as OtherCost & { label?: string };
    return {
      id: legacy.id,
      name: legacy.name || legacy.label || "",
      amount: legacy.amount ?? 0,
      type: legacy.type === "reduction" ? "reduction" : "additional",
    };
  });
  return merged;
}

export function loadAppData(): AppData {
  if (typeof window === "undefined") return createDefaultAppData();
  migrateLegacyStorage();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createDefaultAppData();
    const parsed = JSON.parse(raw) as Partial<AppData>;
    const defaults = createDefaultAppData();
    return {
      invoice: migrateInvoice(parsed.invoice ?? {}, defaults.invoice),
      brand: { ...defaults.brand, ...parsed.brand },
      inventory: parsed.inventory ?? [],
      locale: parsed.locale === "en" ? "en" : "id",
    };
  } catch {
    return createDefaultAppData();
  }
}

export function peekStoredLocale(): Locale {
  if (typeof window === "undefined") return "id";
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return navigator.language.toLowerCase().startsWith("en") ? "en" : "id";
    }
    const parsed = JSON.parse(raw) as Partial<AppData>;
    return parsed.locale === "en" ? "en" : "id";
  } catch {
    return "id";
  }
}

export function saveAppData(data: AppData): SaveResult {
  if (typeof window === "undefined") return { ok: true };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return { ok: true };
  } catch (err) {
    const name = err instanceof DOMException ? err.name : "";
    if (name === "QuotaExceededError") return { ok: false, reason: "quota" };
    return { ok: false, reason: "unknown" };
  }
}

export function exportAppDataFile(data: AppData): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${APP.slug}-backup-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

export function importAppDataFile(invalidMessage: string): Promise<AppData | null> {
  return new Promise((resolve) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json,.json";
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) {
        resolve(null);
        return;
      }
      try {
        const text = await file.text();
        const parsed = normalizeImportedData(JSON.parse(text));
        const defaults = createDefaultAppData();
        resolve({
          invoice: migrateInvoice(parsed.invoice ?? {}, defaults.invoice),
          brand: { ...defaults.brand, ...parsed.brand },
          inventory: parsed.inventory ?? [],
          locale: parsed.locale === "en" ? "en" : "id",
        });
      } catch {
        alert(invalidMessage);
        resolve(null);
      }
    };
    input.click();
  });
}