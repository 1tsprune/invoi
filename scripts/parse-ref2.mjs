import fs from "fs";

const h = fs.readFileSync("ref.html", "utf8");
const start = h.indexOf('fillInfo:"Isi informasi');
if (start >= 0) {
  console.log(h.slice(start, start + 4000));
}

const themes = h.match(/theme:"[^"]+"/g);
console.log("\nThemes:", [...new Set(themes || [])].slice(0, 20));

const fonts = h.match(/font:"[^"]+"/g);
console.log("Fonts sample:", [...new Set(fonts || [])].slice(0, 10));