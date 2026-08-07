import puppeteer from "puppeteer";
import fs from "node:fs";

const PORT = 4042;
const BASE = `http://localhost:${PORT}`;
const ROUTES = ["/", "/masterclasses", "/another-comet", "/our-mentors", "/coming-soon", "/join-us"];
const FINDINGS = [];
function log(severity, area, msg, detail) {
  FINDINGS.push({ severity, area, msg, detail });
  const s = { CRIT: "🔴", HIGH: "🟠", MED: "🟡", LOW: "🟢", INFO: "·" }[severity] || "·";
  console.log(`${s} [${severity}] ${area} :: ${msg}${detail ? "\n   " + detail : ""}`);
}

const browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

async function newPage(viewport = { width: 1280, height: 900 }) {
  const page = await browser.newPage();
  await page.setViewport(viewport);
  const consoleErrors = [];
  const reqFailed = [];
  page.on("pageerror", (e) => consoleErrors.push("pageerror: " + e.message));
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push("console: " + msg.text());
  });
  page.on("requestfailed", (r) => reqFailed.push(`${r.url()} -> ${r.failure()?.errorText}`));
  return { page, consoleErrors, reqFailed };
}

// ─── 1. Audit every link/button across every route ────────────────────────────
console.log("\n══════ 1. LINK & ROUTE AUDIT ══════");
const linkSet = new Set();
for (const route of ROUTES) {
  const { page, consoleErrors, reqFailed } = await newPage();
  const resp = await page.goto(BASE + route, { waitUntil: "networkidle0", timeout: 30000 });
  if (resp.status() !== 200) log("CRIT", `route ${route}`, `status ${resp.status()}`);
  // Wait for any deferred renders (mentor accordion etc)
  await new Promise((r) => setTimeout(r, 600));

  // Pull all anchors
  const anchors = await page.evaluate(() =>
    Array.from(document.querySelectorAll("a[href]")).map((a) => ({
      href: a.getAttribute("href"),
      text: (a.textContent || "").trim().slice(0, 80),
      target: a.getAttribute("target"),
      rel: a.getAttribute("rel"),
    }))
  );
  for (const a of anchors) {
    if (a.href.startsWith("http") || a.href.startsWith("mailto:")) {
      linkSet.add(a.href);
      if (a.href.startsWith("http") && (!a.target || a.target !== "_blank"))
        log("MED", `route ${route}`, `external link without target=_blank`, `${a.href} :: "${a.text}"`);
      if (a.href.startsWith("http") && a.target === "_blank" && (!a.rel || !a.rel.includes("noopener")))
        log("MED", `route ${route}`, `external link missing rel=noopener`, `${a.href}`);
    }
  }

  // Pull all buttons; check for accessible name
  const btns = await page.evaluate(() =>
    Array.from(document.querySelectorAll("button")).map((b) => ({
      text: (b.textContent || "").trim().slice(0, 80),
      ariaLabel: b.getAttribute("aria-label"),
      type: b.getAttribute("type"),
      disabled: b.disabled,
    }))
  );
  for (const b of btns) {
    if (!b.text && !b.ariaLabel) log("HIGH", `route ${route}`, `button without accessible name`);
  }

  // Headings sanity
  const headings = await page.evaluate(() => {
    const h1 = document.querySelectorAll("h1");
    return { h1Count: h1.length, h1Text: Array.from(h1).map((h) => (h.textContent || "").trim().slice(0, 60)) };
  });
  if (headings.h1Count !== 1) log("HIGH", `route ${route}`, `expected 1 <h1>, found ${headings.h1Count}`, headings.h1Text.join(" | "));

  if (consoleErrors.length) log("HIGH", `route ${route}`, `console errors: ${consoleErrors.length}`, consoleErrors.slice(0, 3).join("\n   "));
  if (reqFailed.length) log("HIGH", `route ${route}`, `failed requests: ${reqFailed.length}`, reqFailed.slice(0, 3).join("\n   "));

  await page.close();
}

// ─── 2. Probe external links (HEAD only, follow redirects) ─────────────────────
console.log("\n══════ 2. EXTERNAL LINK PROBE ══════");
for (const url of linkSet) {
  if (!url.startsWith("http")) continue;
  try {
    const resp = await fetch(url, { method: "HEAD", redirect: "follow" });
    if (resp.status >= 400) log("HIGH", "external", `dead link ${resp.status}`, url);
    else if (resp.status >= 300) log("INFO", "external", `redirects ${resp.status}`, url);
  } catch (e) {
    log("MED", "external", `fetch error`, `${url} :: ${e.message}`);
  }
}

// ─── 3. Theme toggle ────────────────────────────────────────────────────────────
console.log("\n══════ 3. THEME TOGGLE ══════");
{
  const { page, consoleErrors } = await newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 400));
  const initial = await page.evaluate(() => document.documentElement.classList.contains("dark"));
  // Click toggle (only the visible one)
  const clicked = await page.evaluate(() => {
    const btn = document.querySelector('button[aria-label*="Switch"]');
    if (!btn) return false;
    btn.click();
    return true;
  });
  if (!clicked) log("CRIT", "theme", "theme toggle button not found by aria-label");
  await new Promise((r) => setTimeout(r, 600));
  const afterToggle = await page.evaluate(() => document.documentElement.classList.contains("dark"));
  if (initial === afterToggle) log("HIGH", "theme", "theme did not change after click", `initial=${initial}, after=${afterToggle}`);
  // Check persistence (storage)
  const stored = await page.evaluate(() => localStorage.getItem("theme"));
  if (!stored) log("MED", "theme", "theme not persisted to localStorage");

  if (consoleErrors.length) log("HIGH", "theme", "console errors", consoleErrors.join(" | "));
  await page.close();
}

// ─── 4. Mobile menu ────────────────────────────────────────────────────────────
console.log("\n══════ 4. MOBILE NAV ══════");
{
  const { page, consoleErrors } = await newPage({ width: 390, height: 844 });
  await page.goto(BASE + "/", { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 400));

  // Burger button should be visible
  const burgerExists = await page.evaluate(() => !!document.querySelector('button[aria-expanded][aria-label*="menu" i]'));
  if (!burgerExists) log("HIGH", "mobile-nav", "menu button not found");

  // Open the menu
  await page.click('button[aria-expanded][aria-label*="menu" i]');
  await new Promise((r) => setTimeout(r, 500));
  const expandedAfterOpen = await page.evaluate(() => document.querySelector('button[aria-expanded][aria-label*="menu" i]')?.getAttribute("aria-expanded"));
  if (expandedAfterOpen !== "true") log("HIGH", "mobile-nav", `aria-expanded=${expandedAfterOpen} after open`);

  // Visible mobile-menu links
  const visibleLinks = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll("header nav ~ div a, header > div > div:nth-of-type(2) a"));
    return links.filter((a) => a.getBoundingClientRect().height > 0).map((a) => a.textContent?.trim());
  });
  if (visibleLinks.length < 5) log("MED", "mobile-nav", `expected 6 mobile links visible, got ${visibleLinks.length}`, JSON.stringify(visibleLinks));

  // Click a link inside the mobile menu specifically (scoped, not first DOM match)
  const link = await page.$('#mobile-nav-menu a[href="/masterclasses"]');
  if (link) {
    await Promise.all([
      page.waitForNavigation({ waitUntil: "networkidle0" }),
      link.click(),
    ]).catch(() => {});
    await new Promise((r) => setTimeout(r, 500));
    const onRoute = page.url().includes("/masterclasses");
    if (!onRoute) log("HIGH", "mobile-nav", "click on mobile link did not navigate", page.url());
    // Check menu collapsed on new page
    const expanded = await page.evaluate(() => document.querySelector('button[aria-expanded][aria-label*="menu" i]')?.getAttribute("aria-expanded"));
    if (expanded !== "false") log("MED", "mobile-nav", `menu still open after navigation, aria-expanded=${expanded}`);
  }

  if (consoleErrors.length) log("HIGH", "mobile-nav", "console errors", consoleErrors.slice(0, 2).join(" | "));
  await page.close();
}

// ─── 5. Mentor accordion ───────────────────────────────────────────────────────
console.log("\n══════ 5. MENTOR ACCORDION ══════");
{
  const { page, consoleErrors } = await newPage();
  await page.goto(BASE + "/our-mentors", { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 600));

  const accordionStates = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('button[aria-controls^="mentor-"]')).map((b) => ({
      controls: b.getAttribute("aria-controls"),
      expanded: b.getAttribute("aria-expanded"),
      text: b.textContent?.trim(),
    }));
  });
  if (accordionStates.length !== 5) log("HIGH", "accordion", `expected 5 mentor accordions, got ${accordionStates.length}`);
  for (const a of accordionStates) {
    if (a.expanded !== "false" && a.expanded !== "true")
      log("MED", "accordion", `aria-expanded missing/invalid on ${a.controls}`, a.expanded);
  }

  // Click first accordion
  await page.click('button[aria-controls^="mentor-"]');
  await new Promise((r) => setTimeout(r, 500));
  const firstExpanded = await page.evaluate(() =>
    document.querySelector('button[aria-controls^="mentor-"]').getAttribute("aria-expanded")
  );
  if (firstExpanded !== "true") log("HIGH", "accordion", `expand failed; aria-expanded=${firstExpanded}`);
  // Check the controlled element exists and has content
  const detailsVisible = await page.evaluate(() => {
    const id = document.querySelector('button[aria-controls^="mentor-"]').getAttribute("aria-controls");
    const el = document.getElementById(id);
    return !!el && el.getBoundingClientRect().height > 20;
  });
  if (!detailsVisible) log("HIGH", "accordion", "details panel not visible after expand");

  if (consoleErrors.length) log("HIGH", "accordion", "console errors", consoleErrors.slice(0, 2).join(" | "));
  await page.close();
}

// ─── 6. Keyboard nav / focus / skip link ───────────────────────────────────────
console.log("\n══════ 6. KEYBOARD NAV ══════");
{
  const { page } = await newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 500));
  await page.keyboard.press("Tab");
  const firstFocused = await page.evaluate(() => {
    const a = document.activeElement;
    return a ? { tag: a.tagName, text: (a.textContent || "").trim().slice(0, 60), href: a.getAttribute?.("href") } : null;
  });
  if (!firstFocused || !firstFocused.text.toLowerCase().includes("skip"))
    log("MED", "a11y", `first Tab focus is not the skip link`, JSON.stringify(firstFocused));

  // Cycle a few tabs and check focus is visible (have outline / box-shadow)
  let withoutFocusStyle = 0;
  for (let i = 0; i < 8; i++) {
    await page.keyboard.press("Tab");
    const ok = await page.evaluate(() => {
      const a = document.activeElement;
      if (!a) return true;
      const cs = window.getComputedStyle(a);
      return cs.outlineStyle !== "none" || (cs.boxShadow && cs.boxShadow !== "none");
    });
    if (!ok) withoutFocusStyle++;
  }
  if (withoutFocusStyle > 1) log("MED", "a11y", `${withoutFocusStyle}/8 tab stops had no visible focus indicator`);

  await page.close();
}

// ─── 7. Anchor scroll / Skip-to-content / back-to-top ──────────────────────────
console.log("\n══════ 7. ANCHOR / SKIP / BACK-TO-TOP ══════");
{
  const { page } = await newPage();
  await page.goto(BASE + "/our-mentors", { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 600));
  await page.evaluate(() => window.scrollTo(0, 4000));
  await new Promise((r) => setTimeout(r, 400));
  // Click back-to-top
  const clicked = await page.evaluate(() => {
    const a = Array.from(document.querySelectorAll('a[href="#main"]')).find((el) => el.textContent?.toLowerCase().includes("top"));
    if (!a) return false;
    a.click();
    return true;
  });
  if (!clicked) log("MED", "anchor", `back-to-top link not found`);
  await new Promise((r) => setTimeout(r, 1800));
  const y = await page.evaluate(() => window.scrollY);
  if (y > 200) log("HIGH", "anchor", `back-to-top did not scroll to top, y=${y}`);
  await page.close();
}

// ─── 8. Visual layout sanity at all breakpoints ────────────────────────────────
console.log("\n══════ 8. LAYOUT / OVERFLOW ══════");
for (const vp of [
  { w: 1920, h: 1080, name: "1920" },
  { w: 1280, h: 800, name: "1280" },
  { w: 768, h: 1024, name: "768" },
  { w: 360, h: 800, name: "360" },
]) {
  for (const route of ROUTES) {
    const { page } = await newPage({ width: vp.w, height: vp.h });
    await page.goto(BASE + route, { waitUntil: "networkidle0" });
    await new Promise((r) => setTimeout(r, 400));
    const overflow = await page.evaluate(() => {
      // Detect any element wider than the viewport
      const docW = document.documentElement.clientWidth;
      const all = Array.from(document.querySelectorAll("body *"));
      const hits = [];
      for (const el of all) {
        const r = el.getBoundingClientRect();
        if (r.right > docW + 1 || r.left < -1) {
          // ignore intentionally off-screen aurora blob and skip-link
          const cs = window.getComputedStyle(el);
          const isAurora =
            el.closest("[aria-hidden]") || cs.position === "fixed" || el.classList.contains("sr-only");
          if (!isAurora && r.width > 60) {
            hits.push({
              tag: el.tagName.toLowerCase(),
              cls: (el.className || "").toString().slice(0, 60),
              left: Math.round(r.left),
              right: Math.round(r.right),
              docW,
            });
          }
        }
      }
      return hits.slice(0, 5);
    });
    if (overflow.length > 0) {
      log("HIGH", `layout ${vp.name}px${route}`, `${overflow.length} elements overflow horizontally`, JSON.stringify(overflow[0]));
    }

    // Tap targets: any <a> or <button> with bounding box < 22x22.
    // Skip sr-only elements (intentionally 1x1 until focused) and decorative icons inside larger buttons.
    const tinyTargets = await page.evaluate(() => {
      return Array.from(document.querySelectorAll("a, button"))
        .filter((el) => !el.classList.contains("sr-only") && !el.closest(".sr-only"))
        .map((el) => {
          const r = el.getBoundingClientRect();
          return { w: r.width, h: r.height, text: (el.textContent || "").trim().slice(0, 30), ariaLabel: el.getAttribute("aria-label") };
        })
        .filter((t) => t.w > 0 && t.h > 0 && (t.w < 22 || t.h < 22));
    });
    if (tinyTargets.length > 0)
      log("MED", `layout ${vp.name}px${route}`, `${tinyTargets.length} tap targets < 22px`, JSON.stringify(tinyTargets[0]));

    await page.close();
  }
}

// ─── 9. Lighthouse-light: measure key perf signals ─────────────────────────────
console.log("\n══════ 9. PERF SIGNALS ══════");
{
  const { page } = await newPage();
  const t0 = Date.now();
  await page.goto(BASE + "/", { waitUntil: "load" });
  const loadMs = Date.now() - t0;
  const metrics = await page.metrics();
  const heap = (metrics.JSHeapUsedSize / 1024 / 1024).toFixed(1);
  console.log(`   load=${loadMs}ms  heap=${heap}MB  layoutCount=${metrics.LayoutCount}  recalcStyle=${metrics.RecalcStyleCount}`);
  if (loadMs > 4000) log("MED", "perf", `slow page load ${loadMs}ms`);
  await page.close();
}

// ─── Summary ──────────────────────────────────────────────────────────────────
console.log("\n══════ SUMMARY ══════");
const counts = FINDINGS.reduce((a, f) => ((a[f.severity] = (a[f.severity] || 0) + 1), a), {});
console.log(JSON.stringify(counts, null, 2));
fs.writeFileSync(new URL("qa-findings.json", import.meta.url), JSON.stringify(FINDINGS, null, 2));
console.log(`Saved ${FINDINGS.length} findings to qa-findings.json`);

await browser.close();
