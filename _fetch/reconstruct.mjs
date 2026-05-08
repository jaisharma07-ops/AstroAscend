import fs from "node:fs";
const d = JSON.parse(fs.readFileSync("./extracted.json", "utf8"));

// Preserve DOM order with original index
const items = d.texts.map((t, idx) => ({
  idx,
  text: t.text,
  x: t.x ?? 0,
  y: t.y ?? 0,
  fs: Math.round(t.fontSize || 0),
  fw: t.fontWeight || "",
  color: t.color || "",
}));

// Strategy:
// 1. Group consecutive items in DOM order that share (y, x, fs, fw, color) and are full strings (>1 char) into paragraphs (join with space).
// 2. For groups of single-char fragments (Canva exports each char as its own positioned span), reconstruct via word-gap detection.

const groupKey = (it) => `${Math.round(it.y / 6) * 6}|${it.fs}|${it.fw}|${it.color}|${Math.round(it.x / 50) * 50}`;

// Pass 1: collapse adjacent multi-char fragments at same (y, x, fs, fw) into paragraphs.
const collapsed = [];
let i = 0;
while (i < items.length) {
  const it = items[i];
  if (it.text.length > 1) {
    // Look ahead for adjacent multi-char fragments with identical (y, x, fs, fw, color) — these are wrapped paragraph lines
    const buf = [it.text];
    let j = i + 1;
    while (
      j < items.length &&
      items[j].text.length > 1 &&
      items[j].y === it.y &&
      items[j].x === it.x &&
      items[j].fs === it.fs &&
      items[j].fw === it.fw &&
      items[j].color === it.color
    ) {
      buf.push(items[j].text);
      j++;
    }
    collapsed.push({ ...it, text: buf.join(" ") });
    i = j;
  } else {
    collapsed.push(it);
    i++;
  }
}

// Pass 2: for single-char fragments, group by (yBucket + fs + fw + color) and reconstruct rows
const rows = new Map();
const paragraphs = [];
for (const it of collapsed) {
  if (it.text.length > 1) {
    paragraphs.push(it);
  } else {
    const key = `${Math.round(it.y / 6) * 6}|${it.fs}|${it.fw}|${it.color}`;
    if (!rows.has(key)) rows.set(key, []);
    rows.get(key).push(it);
  }
}

function reconstructSegment(seg) {
  if (seg.length === 0) return "";
  if (seg.length === 1) return seg[0].text;
  const gaps = [];
  for (let k = 1; k < seg.length; k++) gaps.push(seg[k].x - seg[k - 1].x);
  const sorted = [...gaps].sort((a, b) => a - b);
  const lowerHalf = sorted.slice(0, Math.max(1, Math.floor(sorted.length / 2)));
  const median = lowerHalf[Math.floor(lowerHalf.length / 2)] || 1;
  const wordGapThreshold = median * 1.6 + 1;
  let text = seg[0].text;
  for (let k = 1; k < seg.length; k++) {
    const gap = seg[k].x - seg[k - 1].x;
    if (gap > wordGapThreshold) text += " ";
    text += seg[k].text;
  }
  return text.replace(/\s+/g, " ").trim();
}

const lines = [];
for (const p of paragraphs) {
  lines.push({ y: Math.round(p.y / 6) * 6, x: p.x, fontSize: p.fs, fontWeight: p.fw, color: p.color, text: p.text });
}
for (const [key, arr] of rows) {
  arr.sort((a, b) => a.x - b.x);
  // split into column segments
  const segments = [];
  let current = [];
  for (const it of arr) {
    if (current.length === 0) {
      current.push(it);
      continue;
    }
    const prev = current[current.length - 1];
    const gap = it.x - prev.x;
    if (gap > it.fs * 5) {
      segments.push(current);
      current = [];
    }
    current.push(it);
  }
  if (current.length) segments.push(current);
  for (const seg of segments) {
    const text = reconstructSegment(seg);
    if (!text) continue;
    const first = seg[0];
    lines.push({ y: Math.round(first.y / 6) * 6, x: first.x, fontSize: first.fs, fontWeight: first.fw, color: first.color, text });
  }
}

lines.sort((a, b) => a.y - b.y || a.x - b.x);

console.log("=== RECONSTRUCTED LINES ===\n");
for (const l of lines) {
  console.log(`y=${String(l.y).padStart(4)} x=${String(l.x).padStart(4)} fs=${String(l.fontSize).padStart(3)} fw=${l.fontWeight.padEnd(3)} | "${l.text}"`);
}

fs.writeFileSync("./lines.json", JSON.stringify(lines, null, 2));
console.log(`\nTotal: ${lines.length} reconstructed lines`);
