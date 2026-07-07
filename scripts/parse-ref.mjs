import fs from "fs";
const h = fs.readFileSync("ref.html", "utf8");
const i = h.indexOf("fillInfo");
console.log(h.slice(i, i + 6000));
const features = ["bankAccount", "paid", "unpaid", "status", "fontFamily", "signatureFont", "themes", "watermarkImage"];
for (const f of features) {
  const idx = h.indexOf(f);
  if (idx > 0) console.log(`\n${f}:`, h.slice(idx, idx + 120));
}