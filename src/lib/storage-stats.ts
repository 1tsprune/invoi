import { STORAGE_KEY } from "./storage";

const LIMIT_BYTES = 2 * 1024 * 1024;

export type StorageSnapshot = {
  keyCount: number;
  inventoryCount: number;
  totalBytes: number;
  invoiceStorageBytes: number;
  ratio: number;
};

export function getStorageSnapshot(inventoryCount: number): StorageSnapshot {
  if (typeof window === "undefined") {
    return { keyCount: 0, inventoryCount, totalBytes: 0, invoiceStorageBytes: 0, ratio: 0 };
  }

  let totalBytes = 0;
  let invoiceStorageBytes = 0;
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key) continue;
    const size = (localStorage.getItem(key)?.length ?? 0) * 2;
    totalBytes += size;
    if (key === STORAGE_KEY || key.startsWith("kwitansi")) {
      invoiceStorageBytes += size;
    }
  }

  return {
    keyCount: localStorage.length,
    inventoryCount,
    totalBytes,
    invoiceStorageBytes,
    ratio: totalBytes / LIMIT_BYTES,
  };
}

export function formatBytes(bytes: number): string {
  const kb = bytes / 1024;
  if (kb >= 1000) return `${(kb / 1024).toFixed(2)} MB`;
  return `${kb.toFixed(2)} KB`;
}

export function storageLevel(ratio: number): "ok" | "warn" | "danger" {
  if (ratio >= 1) return "danger";
  if (ratio >= 0.8) return "warn";
  if (ratio >= 0.6) return "warn";
  return "ok";
}

export function storageLevelClass(ratio: number): string {
  if (ratio >= 1) return "text-red-600";
  if (ratio >= 0.8) return "text-orange-500";
  if (ratio >= 0.6) return "text-yellow-600";
  return "text-zinc-800";
}