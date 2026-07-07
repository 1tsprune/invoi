import fs from "fs";

const html = fs.readFileSync("ref.html", "utf8");
const start = html.indexOf("YB={");
let depth = 0;
let end = start + 2;
for (let i = start + 2; i < html.length; i++) {
  if (html[i] === "{") depth++;
  if (html[i] === "}") {
    depth--;
    if (depth === 0) {
      end = i + 1;
      break;
    }
  }
}
const themes = Function(`return ${html.slice(start + 3, end)}`)();
const isMatch = html.match(/IS=(\[[\s\S]*?\]),pf=/);
const pages = Function(`return ${isMatch[1]}`)();

const lines = Object.entries(themes)
  .map(([id, t]) => {
    const e = (v) => JSON.stringify(v);
    return `  ${id}: { name: ${e(t.name)}, bg: ${e(t.bg)}, surface: ${e(t.surface)}, border: ${e(t.border)}, text: ${e(t.text)}, textMuted: ${e(t.textMuted)}, accent: ${e(t.accent)}, accentText: ${e(t.accentText)}, tableHeader: ${e(t.tableHeader)}, tableRow: ${e(t.tableRow)}, tableRowAlt: ${e(t.tableRowAlt)}, totalBg: ${e(t.totalBg)} },`;
  })
  .join("\n");

const pageLines = pages.map((p) => `  [${p.map((id) => JSON.stringify(id)).join(", ")}],`).join("\n");

const out = `import type { BrandData } from "./types";

export type ThemeTokens = {
  name: string;
  bg: string;
  surface: string;
  border: string;
  text: string;
  textMuted: string;
  accent: string;
  accentText: string;
  tableHeader: string;
  tableRow: string;
  tableRowAlt: string;
  totalBg: string;
};

export const THEMES: Record<string, ThemeTokens> = {
${lines}
};

export function resolveTheme(brand: BrandData): ThemeTokens {
  const base = THEMES[brand.theme] ?? THEMES.minimal;
  const has = (v: string) => v.trim() !== "";
  return {
    ...base,
    ...(has(brand.accentColor) ? { accent: brand.accentColor, tableHeader: brand.accentColor, totalBg: brand.accentColor } : {}),
    ...(has(brand.accentTextColor) ? { accentText: brand.accentTextColor } : {}),
    ...(has(brand.backgroundColor) ? { bg: brand.backgroundColor } : {}),
    ...(has(brand.textColor) ? { text: brand.textColor } : {}),
    ...(has(brand.alternateRowColor) ? { tableRowAlt: brand.alternateRowColor } : {}),
  };
}

/** 7 halaman × 30 tema — sama seperti Invoiceku */
export const THEME_PAGES: string[][] = [
${pageLines}
];

export function themeToBrandPatch(themeId: string): Partial<BrandData> {
  const t = THEMES[themeId] ?? THEMES.minimal;
  return {
    theme: themeId,
    backgroundColor: t.bg,
    textColor: t.text,
    accentColor: t.accent,
    accentTextColor: t.accentText,
    alternateRowColor: t.tableRowAlt,
  };
}
`;

fs.writeFileSync("src/lib/themes.ts", out);
console.log(`Generated ${Object.keys(themes).length} themes in ${pages.length} pages`);