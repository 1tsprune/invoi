"use client";

import Link from "next/link";
import { useState } from "react";
import { Package, Plus, RotateCcw, Trash2 } from "lucide-react";
import { CURRENCIES } from "@/lib/defaults";
import { getDictionary } from "@/lib/i18n";
import { useAppStore } from "@/lib/store";
import type { DocType, ProductLine } from "@/lib/types";
import { lineSubtotal } from "@/lib/calculations";
import { formatMoney, uid } from "@/lib/utils";
import { ConfirmModal } from "@/components/ConfirmModal";
import { Button, Card, Input, Label, Panel, SectionHeader, Select, Textarea } from "@/components/ui";

function updateProduct(products: ProductLine[], id: string, patch: Partial<ProductLine>) {
  return products.map((p) => (p.id === id ? { ...p, ...patch } : p));
}

export function DocumentFormTab() {
  const invoice = useAppStore((s) => s.invoice);
  const inventory = useAppStore((s) => s.inventory);
  const locale = useAppStore((s) => s.locale);
  const setInvoice = useAppStore((s) => s.setInvoice);
  const resetDocument = useAppStore((s) => s.resetDocument);
  const t = getDictionary(locale);
  const inventoryMode = invoice.productEntryMode === "inventory";
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  return (
    <div className="space-y-4 pb-10 lg:pb-8">
      <SectionHeader
        title={t.detailInvoice}
        sub={t.fillInfo}
        action={
          <button
            type="button"
            onClick={() => setShowResetConfirm(true)}
            className="flex items-center gap-1.5 rounded-md border border-zinc-200 px-2.5 py-1.5 text-[10px] text-zinc-500 transition-colors hover:border-zinc-400 hover:text-zinc-800"
          >
            <RotateCcw className="h-3 w-3" />
            {t.reset}
          </button>
        }
      />

      <Panel>
        <div className="mb-2 flex items-center gap-2">
          <Package className="h-3.5 w-3.5 text-zinc-400" />
          <span className="text-[11px] font-semibold tracking-tight text-zinc-700">{t.productsServices}</span>
        </div>
        <div className="flex rounded-lg border border-zinc-200 bg-zinc-50 p-0.5">
          <button
            type="button"
            onClick={() => setInvoice({ productEntryMode: "manual" })}
            className={`flex-1 rounded-md px-3 py-2 text-[10px] font-bold uppercase tracking-wide transition ${
              !inventoryMode ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-500 hover:text-zinc-700"
            }`}
          >
            {t.manualEntry}
          </button>
          <button
            type="button"
            onClick={() => setInvoice({ productEntryMode: "inventory" })}
            className={`flex-1 rounded-md px-3 py-2 text-[10px] font-bold uppercase tracking-wide transition ${
              inventoryMode ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-500 hover:text-zinc-700"
            }`}
          >
            {t.inventorySync}
          </button>
        </div>
        <p className="mt-2 text-[10px] leading-relaxed text-zinc-400">
          {inventoryMode ? t.inventorySyncHint : t.inventoryModeManualDesc}
        </p>
      </Panel>

      <Card title={t.fillInfo}>
        <div className="mb-3 flex flex-wrap gap-1.5">
          {(Object.keys(t.docTypes) as DocType[]).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setInvoice({ docType: type })}
              className={`rounded-md px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide transition ${
                invoice.docType === type
                  ? "bg-zinc-900 text-white"
                  : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
              }`}
            >
              {t.docTypes[type]}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <label>
            <Label>{t.invoiceNo}</Label>
            <Input
              value={invoice.invoiceNumber}
              onChange={(e) => setInvoice({ invoiceNumber: e.target.value })}
              className="font-mono"
            />
          </label>
          <label>
            <Label>{t.date}</Label>
            <Input type="date" value={invoice.date} onChange={(e) => setInvoice({ date: e.target.value })} />
          </label>
          {invoice.docType !== "kwitansi" ? (
            <label>
              <Label>{t.dueDate}</Label>
              <Input
                type="date"
                value={invoice.dueDate}
                onChange={(e) => setInvoice({ dueDate: e.target.value })}
              />
            </label>
          ) : null}
          <label className={invoice.docType === "kwitansi" ? "sm:col-span-2" : ""}>
            <Label>{t.clientName}</Label>
            <Input
              value={invoice.invoiceFor}
              onChange={(e) => setInvoice({ invoiceFor: e.target.value })}
              placeholder={t.clientPlaceholder}
            />
          </label>
          <label>
            <Label>{t.currency}</Label>
            <Select
              value={invoice.currency}
              onChange={(e) => setInvoice({ currency: e.target.value })}
            >
              {CURRENCIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Select>
          </label>
        </div>
      </Card>

      <Card title={t.productsServices}>
        {inventoryMode && inventory.length === 0 ? (
          <div className="mb-3 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-[10px] leading-relaxed text-amber-700 shadow-sm">
            {t.inventoryEmptyHint}
          </div>
        ) : null}
        <div className="space-y-3">
          {invoice.products.map((item) => (
            <div key={item.id} className="rounded-xl border border-zinc-100 bg-zinc-50/80 p-3">
              {invoice.productEntryMode === "inventory" ? (
                <label className="mb-2 block">
                  <Label>{t.selectInventory}</Label>
                  <Select
                    value={item.inventoryId ?? ""}
                    onChange={(e) => {
                      const inv = inventory.find((row) => row.id === e.target.value);
                      setInvoice({
                        products: updateProduct(invoice.products, item.id, {
                          inventoryId: e.target.value || null,
                          name: inv?.name ?? item.name,
                          price: inv?.price ?? item.price,
                        }),
                      });
                    }}
                  >
                    <option value="">—</option>
                    {inventory.map((inv) => (
                      <option key={inv.id} value={inv.id}>
                        {inv.name} ({inv.price})
                      </option>
                    ))}
                  </Select>
                </label>
              ) : null}

              <div className="grid gap-2 sm:grid-cols-12">
                <label className="sm:col-span-5">
                  <Label>{t.description}</Label>
                  <Input
                    value={item.name}
                    onChange={(e) =>
                      setInvoice({ products: updateProduct(invoice.products, item.id, { name: e.target.value }) })
                    }
                    disabled={invoice.productEntryMode === "inventory" && !!item.inventoryId}
                    placeholder={t.itemNamePlaceholder}
                  />
                </label>
                <label className="sm:col-span-2">
                  <Label>{t.qty}</Label>
                  <Input
                    type="number"
                    min={1}
                    value={item.qty}
                    onChange={(e) =>
                      setInvoice({
                        products: updateProduct(invoice.products, item.id, {
                          qty: Math.max(1, Number(e.target.value) || 1),
                        }),
                      })
                    }
                  />
                </label>
                <label className="sm:col-span-3">
                  <Label>{t.price}</Label>
                  <Input
                    type="number"
                    min={0}
                    value={item.price || ""}
                    onChange={(e) =>
                      setInvoice({
                        products: updateProduct(invoice.products, item.id, {
                          price: Math.max(0, Number(e.target.value) || 0),
                        }),
                      })
                    }
                    disabled={invoice.productEntryMode === "inventory" && !!item.inventoryId}
                  />
                  {invoice.productEntryMode === "inventory" && item.inventoryId ? (
                    <p className="mt-1 text-[9px] text-zinc-400">{t.inventoryPriceFromInventory}</p>
                  ) : null}
                </label>
                <div className="flex flex-col items-end justify-between gap-1 sm:col-span-2">
                  <p className="text-[10px] font-bold text-zinc-400">{t.itemSubtotal}</p>
                  <p className="text-sm font-bold text-zinc-800">
                    {formatMoney(lineSubtotal(item.qty, item.price), invoice.currency)}
                  </p>
                  <Button
                    variant="ghost"
                    className="text-red-500"
                    disabled={invoice.products.length <= 1}
                    onClick={() =>
                      setInvoice({ products: invoice.products.filter((p) => p.id !== item.id) })
                    }
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                {invoice.productEntryMode === "manual" ? (
                  <label className="sm:col-span-12">
                    <Label>{t.duration}</Label>
                    <Input
                      value={item.duration}
                      onChange={(e) =>
                        setInvoice({
                          products: updateProduct(invoice.products, item.id, { duration: e.target.value }),
                        })
                      }
                      placeholder={t.durationPlaceholder}
                    />
                  </label>
                ) : null}
              </div>
            </div>
          ))}
        </div>

        <Button
          variant="secondary"
          className="mt-3 w-full"
          onClick={() =>
            setInvoice({
              products: [
                ...invoice.products,
                { id: uid(), qty: 1, name: "", price: 0, duration: "", inventoryId: null },
              ],
            })
          }
        >
          <Plus className="h-4 w-4" />
          {t.addItem}
        </Button>

        <div className="mt-3 text-right">
          <Link href="/inventory" className="text-xs font-semibold text-teal-700 hover:underline">
            {t.manageInventory} →
          </Link>
        </div>
      </Card>

      <Card title={t.otherCosts}>
        <label className="mb-3 flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={invoice.otherCostEnabled}
            onChange={(e) => setInvoice({ otherCostEnabled: e.target.checked })}
          />
          {t.enableOtherCosts}
        </label>
        {invoice.otherCostEnabled ? (
          <div className="space-y-2">
            {invoice.otherCosts.map((cost) => (
              <div key={cost.id} className="grid grid-cols-12 gap-2">
                <Select
                  className="col-span-3"
                  value={cost.type}
                  onChange={(e) =>
                    setInvoice({
                      otherCosts: invoice.otherCosts.map((c) =>
                        c.id === cost.id ? { ...c, type: e.target.value as typeof cost.type } : c,
                      ),
                    })
                  }
                >
                  <option value="additional">{t.additionalCost}</option>
                  <option value="reduction">{t.reduction}</option>
                </Select>
                <Input
                  className="col-span-5"
                  value={cost.name}
                  placeholder={t.otherCostPlaceholder}
                  onChange={(e) =>
                    setInvoice({
                      otherCosts: invoice.otherCosts.map((c) =>
                        c.id === cost.id ? { ...c, name: e.target.value } : c,
                      ),
                    })
                  }
                />
                <Input
                  className="col-span-3"
                  type="number"
                  min={0}
                  value={cost.amount || ""}
                  onChange={(e) =>
                    setInvoice({
                      otherCosts: invoice.otherCosts.map((c) =>
                        c.id === cost.id ? { ...c, amount: Number(e.target.value) || 0 } : c,
                      ),
                    })
                  }
                />
                <Button
                  variant="ghost"
                  className="col-span-1 text-red-500"
                  onClick={() =>
                    setInvoice({ otherCosts: invoice.otherCosts.filter((c) => c.id !== cost.id) })
                  }
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              variant="secondary"
              onClick={() =>
                setInvoice({
                  otherCosts: [...invoice.otherCosts, { id: uid(), name: "", amount: 0, type: "additional" }],
                })
              }
            >
              <Plus className="h-4 w-4" />
              {t.addCost}
            </Button>
          </div>
        ) : null}
      </Card>

      <Card title={t.discountTaxTitle}>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={invoice.discountEnabled}
                onChange={(e) => setInvoice({ discountEnabled: e.target.checked })}
              />
              {t.discount}
            </label>
            {invoice.discountEnabled ? (
              <Input
                type="number"
                min={0}
                max={100}
                value={invoice.discountPercent}
                onChange={(e) => setInvoice({ discountPercent: Number(e.target.value) || 0 })}
              />
            ) : null}
          </div>
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={invoice.taxEnabled}
                onChange={(e) => setInvoice({ taxEnabled: e.target.checked })}
              />
              {t.tax}
            </label>
            {invoice.taxEnabled ? (
              <Input
                type="number"
                min={0}
                value={invoice.taxPercent}
                onChange={(e) => setInvoice({ taxPercent: Number(e.target.value) || 0 })}
              />
            ) : null}
          </div>
        </div>
      </Card>

      <Card title={t.paymentClosingTitle}>
        <div className="grid gap-3">
          <label>
            <Label>{t.paymentStatus}</Label>
            <Select
              value={invoice.paymentStatus}
              onChange={(e) =>
                setInvoice({ paymentStatus: e.target.value as typeof invoice.paymentStatus })
              }
            >
              <option value="none">{t.paymentStatusNone}</option>
              <option value="paid">{t.paidStamp}</option>
              <option value="unpaid">{t.unpaidStamp}</option>
            </Select>
          </label>
          <label>
            <Label>{t.paymentMethod}</Label>
            <Input
              value={invoice.paymentBy}
              onChange={(e) => setInvoice({ paymentBy: e.target.value })}
              placeholder={t.paymentPlaceholder}
            />
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            <label>
              <Label>{t.bankName}</Label>
              <Input
                value={invoice.bankName}
                onChange={(e) => setInvoice({ bankName: e.target.value })}
                placeholder={t.bankNamePlaceholder}
              />
            </label>
            <label>
              <Label>{t.bankAccount}</Label>
              <Input
                value={invoice.bankAccount}
                onChange={(e) => setInvoice({ bankAccount: e.target.value })}
                placeholder={t.bankAccountPlaceholder}
              />
            </label>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <label>
              <Label>{t.signatory}</Label>
              <Input
                value={invoice.signatureName}
                onChange={(e) => setInvoice({ signatureName: e.target.value })}
                placeholder={t.yourNamePlaceholder}
              />
            </label>
            <label>
              <Label>{t.signatureTitle}</Label>
              <Input
                value={invoice.signatureTitle}
                onChange={(e) => setInvoice({ signatureTitle: e.target.value })}
                placeholder={t.signatureTitlePlaceholder}
              />
            </label>
          </div>
          <label>
            <Label>{t.notes}</Label>
            <Textarea
              value={invoice.notes}
              onChange={(e) => setInvoice({ notes: e.target.value })}
              placeholder={t.notesPlaceholder}
              rows={4}
            />
          </label>
        </div>
      </Card>

      <ConfirmModal
        open={showResetConfirm}
        title={t.newDocTitle}
        message={t.newDocConfirm}
        cancelLabel={t.cancel}
        confirmLabel={t.reset}
        onCancel={() => setShowResetConfirm(false)}
        onConfirm={() => {
          setShowResetConfirm(false);
          resetDocument();
        }}
      />
    </div>
  );
}