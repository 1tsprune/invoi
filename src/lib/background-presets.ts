export type BackgroundSize = "cover" | "contain" | "repeat";

export type BackgroundPreset = {
  id: string;
  name: string;
  url: string;
};

function svgUrl(svg: string): string {
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

export const BACKGROUND_PRESETS: BackgroundPreset[] = [
  {
    id: "dots-pink",
    name: "Dots Pink",
    url: svgUrl(
      `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><rect fill="#fff5f8" width="80" height="80"/><circle cx="20" cy="20" r="4" fill="#f9a8d4" opacity=".5"/><circle cx="60" cy="60" r="4" fill="#f9a8d4" opacity=".5"/></svg>`,
    ),
  },
  {
    id: "dots-blue",
    name: "Dots Blue",
    url: svgUrl(
      `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><rect fill="#f0f9ff" width="80" height="80"/><circle cx="20" cy="20" r="4" fill="#7dd3fc" opacity=".55"/><circle cx="60" cy="60" r="4" fill="#7dd3fc" opacity=".55"/></svg>`,
    ),
  },
  {
    id: "stripes",
    name: "Stripes",
    url: svgUrl(
      `<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60"><rect fill="#fefce8" width="60" height="60"/><path d="M0 0h20v60H0zm40 0h20v60H40z" fill="#fde68a" opacity=".45"/></svg>`,
    ),
  },
  {
    id: "hearts",
    name: "Hearts",
    url: svgUrl(
      `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect fill="#fff1f2" width="100" height="100"/><text x="15" y="35" font-size="18" fill="#fb7185" opacity=".4">♥</text><text x="65" y="85" font-size="18" fill="#fb7185" opacity=".4">♥</text></svg>`,
    ),
  },
  {
    id: "stars",
    name: "Stars",
    url: svgUrl(
      `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect fill="#fefce8" width="100" height="100"/><text x="20" y="40" font-size="16" fill="#fbbf24" opacity=".5">★</text><text x="70" y="80" font-size="16" fill="#fbbf24" opacity=".5">★</text></svg>`,
    ),
  },
  {
    id: "waves",
    name: "Waves",
    url: svgUrl(
      `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="60"><rect fill="#ecfeff" width="120" height="60"/><path d="M0 30 Q30 10 60 30 T120 30 V60 H0Z" fill="#67e8f9" opacity=".35"/></svg>`,
    ),
  },
  {
    id: "confetti",
    name: "Confetti",
    url: svgUrl(
      `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120"><rect fill="#fafafa" width="120" height="120"/><rect x="10" y="20" width="8" height="4" fill="#f472b6" opacity=".5" transform="rotate(25 14 22)"/><rect x="80" y="60" width="8" height="4" fill="#60a5fa" opacity=".5" transform="rotate(-15 84 62)"/><rect x="50" y="90" width="8" height="4" fill="#a78bfa" opacity=".5" transform="rotate(40 54 92)"/></svg>`,
    ),
  },
  {
    id: "clouds",
    name: "Clouds",
    url: svgUrl(
      `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="100"><rect fill="#f0f9ff" width="160" height="100"/><ellipse cx="50" cy="55" rx="28" ry="18" fill="#fff" opacity=".8"/><ellipse cx="75" cy="50" rx="22" ry="16" fill="#fff" opacity=".8"/><ellipse cx="120" cy="65" rx="30" ry="18" fill="#fff" opacity=".7"/></svg>`,
    ),
  },
  {
    id: "sakura",
    name: "Sakura",
    url: svgUrl(
      `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect fill="#fdf2f8" width="100" height="100"/><circle cx="25" cy="30" r="6" fill="#f9a8d4" opacity=".45"/><circle cx="70" cy="75" r="6" fill="#f9a8d4" opacity=".45"/></svg>`,
    ),
  },
  {
    id: "grid",
    name: "Grid",
    url: svgUrl(
      `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><rect fill="#fafafa" width="40" height="40"/><path d="M40 0H0V40" fill="none" stroke="#e4e4e7" stroke-width="1"/></svg>`,
    ),
  },
  {
    id: "marble",
    name: "Marble",
    url: svgUrl(
      `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><defs><radialGradient id="g"><stop offset="0%" stop-color="#fff"/><stop offset="100%" stop-color="#f4f4f5"/></radialGradient></defs><rect fill="url(#g)" width="200" height="200"/><ellipse cx="60" cy="80" rx="50" ry="30" fill="#e4e4e7" opacity=".25"/><ellipse cx="140" cy="130" rx="40" ry="25" fill="#d4d4d8" opacity=".2"/></svg>`,
    ),
  },
  {
    id: "watercolor",
    name: "Watercolor",
    url: svgUrl(
      `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect fill="#fff" width="200" height="200"/><circle cx="70" cy="90" r="55" fill="#fda4af" opacity=".18"/><circle cx="130" cy="110" r="50" fill="#93c5fd" opacity=".18"/><circle cx="100" cy="60" r="40" fill="#c4b5fd" opacity=".15"/></svg>`,
    ),
  },
  {
    id: "geometric",
    name: "Geometric",
    url: svgUrl(
      `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><rect fill="#f8fafc" width="80" height="80"/><polygon points="40,10 70,70 10,70" fill="#818cf8" opacity=".15"/></svg>`,
    ),
  },
  {
    id: "bubbles",
    name: "Bubbles",
    url: svgUrl(
      `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120"><rect fill="#f0fdf4" width="120" height="120"/><circle cx="30" cy="40" r="14" fill="#86efac" opacity=".25"/><circle cx="85" cy="75" r="18" fill="#4ade80" opacity=".2"/></svg>`,
    ),
  },
  {
    id: "leaves",
    name: "Leaves",
    url: svgUrl(
      `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect fill="#f7fee7" width="100" height="100"/><ellipse cx="30" cy="70" rx="12" ry="6" fill="#84cc16" opacity=".35" transform="rotate(-30 30 70)"/><ellipse cx="75" cy="35" rx="12" ry="6" fill="#65a30d" opacity=".3" transform="rotate(20 75 35)"/></svg>`,
    ),
  },
  {
    id: "rainbow",
    name: "Rainbow",
    url: svgUrl(
      `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><defs><linearGradient id="r" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#fda4af"/><stop offset="33%" stop-color="#fde68a"/><stop offset="66%" stop-color="#93c5fd"/><stop offset="100%" stop-color="#c4b5fd"/></linearGradient></defs><rect fill="url(#r)" width="200" height="200" opacity=".25"/></svg>`,
    ),
  },
  {
    id: "kawaii",
    name: "Kawaii",
    url: svgUrl(
      `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120"><rect fill="#fff7ed" width="120" height="120"/><circle cx="35" cy="45" r="16" fill="#fdba74" opacity=".25"/><circle cx="32" cy="42" r="2" fill="#78350f" opacity=".4"/><circle cx="38" cy="42" r="2" fill="#78350f" opacity=".4"/><path d="M30 50 Q35 54 40 50" stroke="#78350f" stroke-width="1.5" fill="none" opacity=".35"/></svg>`,
    ),
  },
  {
    id: "pastel-check",
    name: "Pastel Check",
    url: svgUrl(
      `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><rect fill="#fdf4ff" width="20" height="20"/><rect fill="#fce7f3" x="20" width="20" height="20"/><rect fill="#fce7f3" y="20" width="20" height="20"/><rect fill="#fdf4ff" x="20" y="20" width="20" height="20"/></svg>`,
    ),
  },
];

export function getBackgroundPreset(id: string): BackgroundPreset | undefined {
  return BACKGROUND_PRESETS.find((p) => p.id === id);
}