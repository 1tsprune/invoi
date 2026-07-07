import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const EXPORT_WIDTH = 794;
const CAPTURE_DELAY_MS = 180;

export async function capturePreviewElement(element: HTMLElement): Promise<HTMLCanvasElement> {
  await document.fonts.ready;

  const saved = {
    position: element.style.position,
    left: element.style.left,
    top: element.style.top,
    zIndex: element.style.zIndex,
    transform: element.style.transform,
    width: element.style.width,
    height: element.style.height,
    margin: element.style.margin,
  };

  const height = element.scrollHeight;
  element.style.position = "fixed";
  element.style.left = "0";
  element.style.top = "0";
  element.style.zIndex = "9999";
  element.style.transform = "none";
  element.style.width = `${EXPORT_WIDTH}px`;
  element.style.height = `${height}px`;
  element.style.margin = "0";

  await new Promise((r) => setTimeout(r, CAPTURE_DELAY_MS));

  try {
    return await html2canvas(element, {
      scale: 2.5,
      backgroundColor: null,
      useCORS: true,
      allowTaint: true,
      width: EXPORT_WIDTH,
      height,
      windowWidth: EXPORT_WIDTH,
      logging: false,
    });
  } finally {
    element.style.position = saved.position;
    element.style.left = saved.left;
    element.style.top = saved.top;
    element.style.zIndex = saved.zIndex;
    element.style.transform = saved.transform;
    element.style.width = saved.width;
    element.style.height = saved.height;
    element.style.margin = saved.margin;
  }
}

export async function downloadPreviewPng(element: HTMLElement, filename: string): Promise<void> {
  const canvas = await capturePreviewElement(element);
  const link = document.createElement("a");
  link.download = `${filename}.png`;
  link.href = canvas.toDataURL("image/png", 1);
  link.click();
}

export async function downloadPreviewJpg(element: HTMLElement, filename: string): Promise<void> {
  const canvas = await capturePreviewElement(element);
  const link = document.createElement("a");
  link.download = `${filename}.jpg`;
  link.href = canvas.toDataURL("image/jpeg", 0.95);
  link.click();
}

export async function downloadPreviewPdf(element: HTMLElement, filename: string): Promise<void> {
  const canvas = await capturePreviewElement(element);
  const imgData = canvas.toDataURL("image/png", 1);
  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const imgWidth = pageWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  let position = 0;
  let remaining = imgHeight;

  pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
  remaining -= pageHeight;

  while (remaining > 0) {
    position = remaining - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    remaining -= pageHeight;
  }

  pdf.save(`${filename}.pdf`);
}