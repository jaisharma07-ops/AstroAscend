import fs from "node:fs";
const d = JSON.parse(fs.readFileSync("./extracted.json", "utf8"));
console.log("=== META ===");
console.log(JSON.stringify(d.meta, null, 2));
console.log("\n=== LINKS (" + d.links.length + ") ===");
d.links.forEach((l) => console.log(`  y=${l.y} | ${l.href} | "${l.text.slice(0, 90)}"`));
console.log("\n=== BUTTONS (" + d.buttons.length + ") ===");
d.buttons.forEach((b) => console.log(`  y=${b.y} | "${b.text.slice(0, 90)}"`));
console.log("\n=== IMAGES (" + d.images.length + ") ===");
d.images.forEach((i) => console.log(`  y=${i.y} | ${i.w}x${i.h} | alt="${(i.alt || "").slice(0, 60)}" | ${(i.src || "").slice(0, 80)}`));

console.log("\n=== TEXT BUCKETS BY Y ===");
const buckets = {};
d.texts.forEach((t) => {
  const b = Math.floor((t.y || 0) / 100) * 100;
  buckets[b] = (buckets[b] || 0) + 1;
});
Object.keys(buckets)
  .sort((a, b) => +a - +b)
  .forEach((k) => console.log(`  y=${k}-${+k + 100}: ${buckets[k]} text nodes`));

// Group text by Y position (similar Y = same line); reconstruct reading order
console.log("\n=== TOP 80 LARGEST FONTS (likely headings) ===");
const sorted = [...d.texts].sort((a, b) => (b.fontSize || 0) - (a.fontSize || 0));
sorted.slice(0, 80).forEach((t) => {
  console.log(`  y=${t.y} fs=${t.fontSize} fw=${t.fontWeight} | "${t.text.slice(0, 100)}"`);
});

console.log("\n=== NETWORK REQUESTS (non-static) ===");
(d.networkRequests || []).slice(0, 30).forEach((r) => console.log(`  ${r.type} ${r.url}`));
