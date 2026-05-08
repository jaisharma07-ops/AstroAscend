import puppeteer from "puppeteer";

const PORT = 3851;
const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844 });
await page.goto(`http://localhost:${PORT}/`, { waitUntil: "networkidle0" });
await new Promise((r) => setTimeout(r, 600));

// State 1: closed
const closed = await page.evaluate(() => {
  const menu = document.getElementById("mobile-nav-menu");
  const links = Array.from(menu.querySelectorAll("a")).map((a) => {
    const r = a.getBoundingClientRect();
    const cs = window.getComputedStyle(a);
    return {
      href: a.getAttribute("href"),
      visible: r.height > 0 && r.width > 0 && cs.visibility !== "hidden" && cs.pointerEvents !== "none",
      ph: cs.pointerEvents,
      vis: cs.visibility,
    };
  });
  return { ariaHidden: menu.getAttribute("aria-hidden"), links };
});
console.log("CLOSED state:", JSON.stringify(closed, null, 2));

// Open menu
await page.click('button[aria-controls="mobile-nav-menu"]');
await new Promise((r) => setTimeout(r, 600));

const opened = await page.evaluate(() => {
  const menu = document.getElementById("mobile-nav-menu");
  const links = Array.from(menu.querySelectorAll("a")).map((a) => {
    const r = a.getBoundingClientRect();
    const cs = window.getComputedStyle(a);
    return {
      href: a.getAttribute("href"),
      x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height),
      ph: cs.pointerEvents, vis: cs.visibility,
    };
  });
  return { ariaHidden: menu.getAttribute("aria-hidden"), links };
});
console.log("\nOPEN state:", JSON.stringify(opened, null, 2));

// Click the masterclasses link from inside the mobile menu
const masterLink = await page.$('#mobile-nav-menu a[href="/masterclasses"]');
console.log("\nMasterclasses link in mobile menu found:", !!masterLink);
if (masterLink) {
  await Promise.all([
    page.waitForNavigation({ waitUntil: "networkidle0" }).catch(() => {}),
    masterLink.click(),
  ]);
  await new Promise((r) => setTimeout(r, 400));
  console.log("After click, URL:", page.url());
  const expandedAfter = await page.evaluate(() =>
    document.querySelector('button[aria-controls="mobile-nav-menu"]')?.getAttribute("aria-expanded")
  );
  console.log("aria-expanded after navigation:", expandedAfter);
}

await browser.close();
