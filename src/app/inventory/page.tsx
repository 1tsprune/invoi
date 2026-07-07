"use client";

import Link from "next/link";
import { useEffect } from "react";
import { ArrowLeft, HardDriveDownload, HardDriveUpload, Plus, Trash2 } from "lucide-react";
import { createInventoryItem } from "@/lib/defaults";
import { getDictionary } from "@/lib/i18n";
import { exportAppDataFile, importAppDataFile } from "@/lib/storage";
import { useAppStore } from "@/lib/store";
import { Button, Card, Input, Label } from "@/components/ui";

export default function InventoryPage() {
  const hydrate = useAppStore((s) => s.hydrate);
  const invoice = useAppStore((s) => s.invoice);
  const brand = useAppStore((s) => s.brand);
  const inventory = useAppStore((s) => s.inventory);
  const locale = useAppStore((s) => s.locale);
  const replaceAll = useAppStore((s) => s.replaceAll);
  const addInventoryItem = useAppStore((s) => s.addInventoryItem);
  const updateInventoryItem = useAppStore((s) => s.updateInventoryItem);
  const removeInventoryItem = useAppStore((s) => s.removeInventoryItem);
  const t = getDictionary(locale);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <div className="min-h-screen bg-[#fafafa] px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-3xl space-y-4">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-600 hover:text-zinc-900">
          <ArrowLeft className="h-4 w-4" />
          {t.backToInvoice}
        </Link>

        <div>
          <h1 className="text-2xl font-extrabold text-zinc-900">{t.inventoryTitle}</h1>
          <p className="mt-1 text-sm text-zinc-500">{t.inventoryPageSub}</p>
          <p className="mt-1 text-xs text-zinc-400">{t.inventoryLocalNote}</p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => exportAppDataFile({ invoice, brand, inventory, locale })}
            className="flex items-center justify-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-[10px] font-semibold text-zinc-600 hover:bg-zinc-50"
          >
            <HardDriveDownload className="h-3.5 w-3.5" />
            {t.inventorySaveData}
          </button>
          <button
            type="button"
            onClick={async () => {
              const data = await importAppDataFile(t.invalidBackupFile);
              if (data) replaceAll(data);
            }}
            className="flex items-center justify-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-[10px] font-semibold text-zinc-600 hover:bg-zinc-50"
          >
            <HardDriveUpload className="h-3.5 w-3.5" />
            {t.inventoryLoadData}
          </button>
        </div>

        {inventory.length === 0 ? (
          <Card title={t.inventoryEmpty}>
            <Button onClick={() => addInventoryItem(createInventoryItem())}>
              <Plus className="h-4 w-4" />
              {t.addProduct}
            </Button>
          </Card>
        ) : (
          <div className="space-y-3">
            {inventory.map((item) => (
              <Card key={item.id} title={item.name || t.newProduct}>
                <div className="grid gap-3 sm:grid-cols-2">
                  <label>
                    <Label>{t.inventoryName}</Label>
                    <Input
                      value={item.name}
                      onChange={(e) => updateInventoryItem(item.id, { name: e.target.value })}
                    />
                  </label>
                  <label>
                    <Label>{t.price}</Label>
                    <Input
                      type="number"
                      min={0}
                      value={item.price || ""}
                      onChange={(e) =>
                        updateInventoryItem(item.id, { price: Number(e.target.value) || 0 })
                      }
                    />
                  </label>
                  <label>
                    <Label>{t.unit}</Label>
                    <Input
                      value={item.unit}
                      onChange={(e) => updateInventoryItem(item.id, { unit: e.target.value })}
                    />
                  </label>
                  <label>
                    <Label>{t.inventoryDescription}</Label>
                    <Input
                      value={item.description}
                      onChange={(e) => updateInventoryItem(item.id, { description: e.target.value })}
                    />
                  </label>
                </div>
                <Button
                  variant="ghost"
                  className="mt-3 text-red-500"
                  onClick={() => removeInventoryItem(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                  {t.deleteProduct}
                </Button>
              </Card>
            ))}
            <Button variant="secondary" onClick={() => addInventoryItem(createInventoryItem())}>
              <Plus className="h-4 w-4" />
              {t.addProduct}
            </Button>
          </div>
        )}

        <Link href="/tutorial" className="block text-center text-xs font-semibold text-zinc-500 hover:text-zinc-800">
          {t.tutorial} →
        </Link>
      </div>
    </div>
  );
}