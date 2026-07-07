"use client";

import { create } from "zustand";
import { createDefaultAppData, createDefaultInvoice, docNumberPrefix } from "./defaults";
import { loadAppData, saveAppData } from "./storage";
import type {
  AppData,
  BrandData,
  InventoryItem,
  InvoiceData,
  Locale,
  TabId,
} from "./types";

type AppStore = AppData & {
  activeTab: TabId;
  hydrated: boolean;
  hydrate: () => void;
  setActiveTab: (tab: TabId) => void;
  setLocale: (locale: Locale) => void;
  setInvoice: (patch: Partial<InvoiceData>) => void;
  setBrand: (patch: Partial<BrandData>) => void;
  setInventory: (items: InventoryItem[]) => void;
  addInventoryItem: (item: InventoryItem) => void;
  updateInventoryItem: (id: string, patch: Partial<InventoryItem>) => void;
  removeInventoryItem: (id: string) => void;
  resetDocument: () => void;
  replaceAll: (data: AppData) => void;
  persist: () => void;
};

export const useAppStore = create<AppStore>((set, get) => ({
  ...createDefaultAppData(),
  activeTab: "form",
  hydrated: false,

  hydrate: () => {
    if (get().hydrated) return;
    set({ ...loadAppData(), hydrated: true });
  },

  setActiveTab: (tab) => set({ activeTab: tab }),

  setLocale: (locale) => {
    set({ locale });
    get().persist();
  },

  setInvoice: (patch) => {
    set((s) => {
      const invoice = { ...s.invoice, ...patch };
      if (patch.docType && patch.docType !== s.invoice.docType) {
        const prefix = docNumberPrefix(patch.docType);
        const tail = s.invoice.invoiceNumber.includes("-")
          ? s.invoice.invoiceNumber.split("-").slice(1).join("-")
          : createDefaultInvoice().invoiceNumber.split("-").slice(1).join("-");
        invoice.invoiceNumber = `${prefix}-${tail}`;
      }
      return { invoice };
    });
    get().persist();
  },

  setBrand: (patch) => {
    set((s) => ({ brand: { ...s.brand, ...patch } }));
    get().persist();
  },

  setInventory: (items) => {
    set({ inventory: items });
    get().persist();
  },

  addInventoryItem: (item) => {
    set((s) => ({ inventory: [...s.inventory, item] }));
    get().persist();
  },

  updateInventoryItem: (id, patch) => {
    set((s) => ({
      inventory: s.inventory.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    }));
    get().persist();
  },

  removeInventoryItem: (id) => {
    set((s) => ({ inventory: s.inventory.filter((item) => item.id !== id) }));
    get().persist();
  },

  resetDocument: () => {
    const current = get().invoice.docType;
    set({ invoice: createDefaultInvoice({ docType: current }) });
    get().persist();
  },

  replaceAll: (data) => {
    set({ ...data });
    get().persist();
  },

  persist: () => {
    const { invoice, brand, inventory, locale } = get();
    saveAppData({ invoice, brand, inventory, locale });
  },
}));