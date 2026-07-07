import fs from "fs";
const h = fs.readFileSync("ref.html", "utf8");

const patterns = [
  /themes:\[[\s\S]{0,4000}?\]/,
  /THEMES[\s\S]{0,2000}/,
  /chooseTheme[\s\S]{0,3000}/,
  /signatureName[\s\S]{0,500}/,
  /SignatureBlock[\s\S]{0,500}/,
];

for (const p of patterns) {
  const m = h.match(p);
  if (m) console.log("MATCH:", m[0].slice(0, 800), "\n---\n");
}

// grid layout classes
const layout = h.match(/grid-cols-[^\s"']+/g);
console.log("grid:", [...new Set(layout || [])].slice(0, 15));

// preview scale
const scale = h.match(/scale:\s*0\.[0-9]+/g);
console.log("scales:", [...new Set(scale || [])]);