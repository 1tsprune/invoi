import fs from "fs";
const h = fs.readFileSync("ref.html", "utf8");
const rs = h.indexOf("RS=({previewRef");
const chunk = h.slice(rs, rs + 12000);
console.log(chunk);

const yb = h.indexOf("YB=");
console.log("\n\nTHEMES YB:", h.slice(yb, yb + 3000));