export type FontOption = {
  id: string;
  label: string;
  category?: "sans" | "serif" | "display" | "mono" | "script";
  system?: boolean;
};

export const INVOICE_FONTS: FontOption[] = [
  { id: "Inter", label: "Inter", category: "sans" },
  { id: "Outfit", label: "Outfit", category: "sans" },
  { id: "Space Grotesk", label: "Space Grotesk", category: "sans" },
  { id: "Poppins", label: "Poppins", category: "sans" },
  { id: "Nunito", label: "Nunito", category: "sans" },
  { id: "Raleway", label: "Raleway", category: "sans" },
  { id: "Roboto", label: "Roboto", category: "sans" },
  { id: "Lato", label: "Lato", category: "sans" },
  { id: "Playfair Display", label: "Playfair Display", category: "serif" },
  { id: "DM Sans", label: "DM Sans", category: "sans" },
  { id: "Montserrat", label: "Montserrat", category: "sans" },
  { id: "Open Sans", label: "Open Sans", category: "sans" },
  { id: "Plus Jakarta Sans", label: "Plus Jakarta Sans", category: "sans" },
  { id: "Manrope", label: "Manrope", category: "sans" },
  { id: "Rubik", label: "Rubik", category: "sans" },
  { id: "Work Sans", label: "Work Sans", category: "sans" },
  { id: "Fira Sans", label: "Fira Sans", category: "sans" },
  { id: "Source Sans 3", label: "Source Sans 3", category: "sans" },
  { id: "Oswald", label: "Oswald", category: "display" },
  { id: "Sora", label: "Sora", category: "sans" },
  { id: "Lexend", label: "Lexend", category: "sans" },
  { id: "IBM Plex Sans", label: "IBM Plex Sans", category: "sans" },
  { id: "Archivo", label: "Archivo", category: "sans" },
  { id: "Urbanist", label: "Urbanist", category: "sans" },
  { id: "Figtree", label: "Figtree", category: "sans" },
  { id: "Quicksand", label: "Quicksand", category: "sans" },
  { id: "Karla", label: "Karla", category: "sans" },
  { id: "Barlow", label: "Barlow", category: "sans" },
  { id: "Mukta", label: "Mukta", category: "sans" },
  { id: "Merriweather", label: "Merriweather", category: "serif" },
  { id: "Libre Baskerville", label: "Libre Baskerville", category: "serif" },
  { id: "Cormorant Garamond", label: "Cormorant Garamond", category: "serif" },
  { id: "PT Serif", label: "PT Serif", category: "serif" },
  { id: "Bebas Neue", label: "Bebas Neue", category: "display" },
  { id: "JetBrains Mono", label: "JetBrains Mono", category: "mono" },
  { id: "Georgia", label: "Georgia", category: "serif", system: true },
];

export const SIGNATURE_FONTS: FontOption[] = [
  { id: "Dancing Script", label: "Dancing Script", category: "script" },
  { id: "Sacramento", label: "Sacramento", category: "script" },
  { id: "Great Vibes", label: "Great Vibes", category: "script" },
  { id: "Pacifico", label: "Pacifico", category: "script" },
  { id: "Caveat", label: "Caveat", category: "script" },
  { id: "Allura", label: "Allura", category: "script" },
  { id: "Alex Brush", label: "Alex Brush", category: "script" },
  { id: "Kaushan Script", label: "Kaushan Script", category: "script" },
  { id: "Yellowtail", label: "Yellowtail", category: "script" },
  { id: "Satisfy", label: "Satisfy", category: "script" },
  { id: "Parisienne", label: "Parisienne", category: "script" },
  { id: "Tangerine", label: "Tangerine", category: "script" },
  { id: "Marck Script", label: "Marck Script", category: "script" },
  { id: "Italianno", label: "Italianno", category: "script" },
  { id: "Bilbo", label: "Bilbo", category: "script" },
  { id: "Pinyon Script", label: "Pinyon Script", category: "script" },
  { id: "Mrs Saint Delafield", label: "Mrs Saint Delafield", category: "script" },
  { id: "Mr Dafoe", label: "Mr Dafoe", category: "script" },
  { id: "Corinthia", label: "Corinthia", category: "script" },
  { id: "Ephesis", label: "Ephesis", category: "script" },
  { id: "Petit Formal Script", label: "Petit Formal Script", category: "script" },
  { id: "Herr Von Muellerhoff", label: "Herr Von Muellerhoff", category: "script" },
  { id: "Rouge Script", label: "Rouge Script", category: "script" },
  { id: "Lavishly Yours", label: "Lavishly Yours", category: "script" },
];

const loaded = new Set<string>(["Georgia", "Inter"]);

function fontHref(family: string, script = false): string {
  const name = family.replace(/ /g, "+");
  if (script) {
    return `https://fonts.googleapis.com/css2?family=${name}&display=swap`;
  }
  return `https://fonts.googleapis.com/css2?family=${name}:wght@300;400;500;600;700&display=swap`;
}

export function ensureFontLoaded(family: string, script = false): void {
  if (typeof document === "undefined" || loaded.has(family)) return;
  loaded.add(family);
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = fontHref(family, script);
  document.head.appendChild(link);
}

const SCRIPT_FONTS = new Set(SIGNATURE_FONTS.map((f) => f.id));

export function preloadCoreFonts(): void {
  ["Inter", "Outfit", "Space Grotesk", "Poppins", "Sacramento", "Dancing Script"].forEach((f) =>
    ensureFontLoaded(f, SCRIPT_FONTS.has(f)),
  );
}