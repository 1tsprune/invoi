import jsQR from "jsqr";
import QRCode from "qrcode";

export async function scanQrisFromImage(dataUrl: string): Promise<string | null> {
  const img = await loadImage(dataUrl);
  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  ctx.drawImage(img, 0, 0);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const code = jsQR(imageData.data, imageData.width, imageData.height);
  return code?.data ?? null;
}

/** EMV QRIS dynamic — sisipkan nominal (tag 54) seperti Invoiceku */
export function buildDynamicQrisPayload(data: string, amount: number): string {
  const body = data.slice(0, -8);
  const tags: { tag: string; value: string }[] = [];
  let i = 0;
  while (i + 4 <= body.length) {
    const tag = body.slice(i, i + 2);
    const len = parseInt(body.slice(i + 2, i + 4), 10);
    if (Number.isNaN(len) || i + 4 + len > body.length) break;
    const value = body.slice(i + 4, i + 4 + len);
    tags.push({ tag, value });
    i += 4 + len;
  }

  const mapped = tags
    .map((t) => (t.tag === "01" ? { tag: "01", value: "12" } : t.tag === "54" ? null : t))
    .filter(Boolean) as { tag: string; value: string }[];

  const amountStr = String(Math.round(amount));
  const amountTag = { tag: "54", value: amountStr };
  const insertAt = mapped.findIndex((t) => parseInt(t.tag, 10) >= 58);
  if (insertAt > -1) mapped.splice(insertAt, 0, amountTag);
  else mapped.push(amountTag);

  const payload = mapped.map((t) => t.tag + String(t.value.length).padStart(2, "0") + t.value).join("") + "6304";

  let crc = 0xffff;
  for (let j = 0; j < payload.length; j++) {
    crc ^= payload.charCodeAt(j) << 8;
    for (let k = 0; k < 8; k++) {
      crc = crc & 0x8000 ? (crc << 1) ^ 0x1021 : crc << 1;
      crc &= 0xffff;
    }
  }
  return payload + crc.toString(16).toUpperCase().padStart(4, "0");
}

export async function generateDynamicQris(data: string, amount: number): Promise<string> {
  const payload = buildDynamicQrisPayload(data, amount);
  return QRCode.toDataURL(payload, { margin: 1, width: 240, errorCorrectionLevel: "M" });
}

export async function generateQrDataUrl(text: string): Promise<string> {
  return QRCode.toDataURL(text, { margin: 1, width: 240, errorCorrectionLevel: "M" });
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}