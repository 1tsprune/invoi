import fs from "fs";
const h = fs.readFileSync("ref.html", "utf8");
// Find main editor layout - search for N2 or ScaledPreview usage with lg:
const spots = [];
let i = 0;
while ((i = h.indexOf("N2", i + 1)) >= 0 && spots.length < 5) {
  spots.push(h.slice(i, i + 400));
}
spots.forEach((s, n) => console.log(`--- ${n} ---\n`, s, "\n"));

// signature in preview RS component
const rs = h.indexOf("RS=({previewRef");
console.log("\nRS component:", h.slice(rs, rs + 3500));