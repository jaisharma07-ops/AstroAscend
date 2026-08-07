import puppeteer from "puppeteer";
import fs from "node:fs";

const PORT = 4042;
const BASE = `http://localhost:${PORT}`;
const c = JSON.parse(fs.readFileSync(new URL("../content/source-content.json", import.meta.url), "utf8"));

// Map every "expected" string to the route(s) it should appear in.
const expectations = [];
function add(route, value, label) {
  if (typeof value === "string") {
    const v = value.trim();
    if (v) expectations.push({ route, label, value: v });
  } else if (Array.isArray(value)) {
    value.forEach((vv, i) => add(route, vv, label + `[${i}]`));
  } else if (value && typeof value === "object") {
    for (const k of Object.keys(value)) add(route, value[k], `${label}.${k}`);
  }
}

// Home
add("/", c.pages.home, "home");
add("/masterclasses", c.pages.masterclasses, "masterclasses");
add("/another-comet", c.pages["another-comet"], "another-comet");
add("/our-mentors", c.pages["our-mentors"], "our-mentors");
add("/coming-soon", c.pages["coming-soon"], "coming-soon");
add("/join-us", c.pages["join-us"], "join-us");
// Footer & nav appear on every page; check on home
add("/", c.footer, "footer");
add("/", c.navigation, "nav");

// Skip values that are URLs, IDs, kinds, schema markers — anything not visible-prose
const SKIP_KEYWORDS = ["forms.gle/", "https://", "mailto:", "/policies/"];
const SKIP_LABELS = [
  ".id", ".kind", "$schema", "icon", "fetched_at", "method", "lang", "url",
  "secondary_cta.href", "cta.href", "links[", "href",
];
const filtered = expectations.filter((e) => {
  if (SKIP_KEYWORDS.some((k) => e.value.includes(k))) return false;
  if (SKIP_LABELS.some((k) => e.label.includes(k))) return false;
  if (/^[a-z0-9-]+$/i.test(e.value) && e.value.length < 4) return false;
  // skip raw IDs that match JSON keys
  return true;
});

// Group by route
const byRoute = {};
for (const e of filtered) {
  if (!byRoute[e.route]) byRoute[e.route] = [];
  byRoute[e.route].push(e);
}

const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });
const issues = [];
let totalChecked = 0;

try {
  for (const [route, items] of Object.entries(byRoute)) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 900 });
    await page.goto(BASE + route, { waitUntil: "networkidle0", timeout: 45000 });
    // Expand mentor credentials so 'details' text appears in DOM
    if (route === "/our-mentors") {
      await page.evaluate(() => {
        document.querySelectorAll('button[aria-controls^="mentor-"]').forEach((b) => b.click());
      });
      await new Promise((r) => setTimeout(r, 500));
    }
    const text = await page.evaluate(() => {
      // Strip placeholder accent dots and noise; just plain visible text
      return document.body.innerText;
    });
    const norm = (s) => s.replace(/\s+/g, " ").replace(/[‘’“”]/g, (m) => ({ "‘": "'", "’": "'", "“": '"', "”": '"' }[m] || m)).trim().toLowerCase();
    const haystack = norm(text);

    for (const e of items) {
      totalChecked++;
      const needle = norm(e.value);
      // Allow partial match: shorter strings must be exact substring; long ones pass if first 60% appears
      const found = haystack.includes(needle);
      if (!found) {
        // Try first 60% of needle to catch line-break differences
        const partial = needle.slice(0, Math.max(40, Math.floor(needle.length * 0.6)));
        if (!haystack.includes(partial)) {
          issues.push({ route, label: e.label, value: e.value.slice(0, 120) });
        }
      }
    }
    await page.close();
  }
} finally {
  await browser.close();
}

console.log(`Checked ${totalChecked} expected strings.`);
console.log(`Issues: ${issues.length}`);
if (issues.length) {
  console.log("\n=== MISSING ===");
  issues.forEach((i, k) => {
    console.log(`${k + 1}. [${i.route}] ${i.label}`);
    console.log(`   "${i.value}"`);
  });
}
