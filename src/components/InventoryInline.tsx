"use client";

import Link from "next/link";
import { Plus, Trash2 } from "lucide-react";
import { createInventoryItem } from "@/lib/defaults";
import { getDictionary } from "@/lib/i18n";
import { useAppStore } from "@/lib/store";
import { Button, Input, Label } from "@/components/ui";

export function InventoryInline() {
  const inventory = useAppStore((s) => s.inventory);
  const locale = useAppStore((s) => s.locale);
  const addInventoryItem = useAppStore((s) => s.addInventoryItem);
  const updateInventoryItem = useAppStore((s) => s.updateInventoryItem);
  const removeInventoryItem = useAppStore((s) => s.removeInventoryItem);
  const t = getDictionary(locale);

  return (
    <div className="space-y-3">
      {inventory.length === 0 ? (
        <p className="text-sm text-zinc-500">{t.inventoryEmpty}</p>
      ) : (
        inventory.map((item) => (
          <div key={item.id} className="grid gap-2 rounded-xl border border-zinc-100 bg-zinc-50 p-3 sm:grid-cols-12">
            <Input
              className="sm:col-span-5"
              placeholder={t.inventoryName}
              value={item.name}
              onChange={(e) => updateInventoryItem(item.id, { name: e.target.value })}
            />
            <Input
              className="sm:col-span-3"
              type="number"
              min={0}
              placeholder={t.price}
              value={item.price || ""}
              onChange={(e) => updateInventoryItem(item.id, { price: Number(e.target.value) || 0 })}
            />
            <Input
              className="sm:col-span-3"
              placeholder={t.unit}
              value={item.unit}
              onChange={(e) => updateInventoryItem(item.id, { unit: e.target.value })}
            />
            <Button
              variant="ghost"
              className="sm:col-span-1 text-red-500"
              onClick={() => removeInventoryItem(item.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))
      )}
      <div className="flex flex-wrap gap-2">
        <Button variant="secondary" onClick={() => addInventoryItem(createInventoryItem())}>
          <Plus className="h-4 w-4" />
          {t.addProduct}
        </Button>
        <Link href="/inventory" className="text-xs font-semibold text-teal-700 hover:underline self-center">
          {t.inventoryFullPage} →
        </Link>
      </div>
    </div>
  );
}