import fs from "fs";
const h = fs.readFileSync("ref.html", "utf8");

// Find theme definitions
const idx = h.indexOf("minimal");
const chunk = h.slice(idx - 500, idx + 3000);
console.log(chunk);

// signature related
for (const pat of ["signatureImage", "SignatureSection", "uploadSignature", "showSignature", "paymentBy", "Penandatangan"]) {
  let i = 0, c = 0;
  while ((i = h.indexOf(pat, i + 1)) >= 0 && c < 3) {
    console.log("\n==", pat, "==");
    console.log(h.slice(Math.max(0, i - 100), i + 200));
    c++;
  }
}