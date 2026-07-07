import fs from "fs";
const h = fs.readFileSync("ref.html", "utf8");
const idx = h.indexOf("Wb=[{id:\"form\"");
console.log(h.slice(idx, idx + 2500));