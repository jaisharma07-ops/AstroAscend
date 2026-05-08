import puppeteer from "puppeteer";
import fs from "node:fs";
import path from "node:path";

const PORT = 4042;
const BASE = `http://localhost:${PORT}`;
const OUT = "d:\\Dev_website\\_fetch\\shots";
fs.mkdirSync(OUT, { recursive: true });

const ROUTES = [
  { path: "/", id: "home" },
  { path: "/masterclasses", id: "masterclasses" },
  { path: "/another-comet", id: "another-comet" },
  { path: "/our-mentors", id: "our-mentors" },
  { path: "/coming-soon", id: "coming-soon" },
  { path: "/join-us", id: "join-us" },
];

const VIEWPORTS = [
  { w: 1280, h: 800, name: "desktop" },
  { w: 768, h: 1024, name: "tablet" },
  { w: 390, h: 844, name: "mobile" },
];

async function scrollThrough(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let total = 0;
      const distance = 320;
      const id = setInterval(() => {
        const sh = document.body.scrollHeight;
        window.scrollBy(0, distance);
        total += distance;
        if (total >= sh + 500) {
          clearInterval(id);
          resolve();
        }
      }, 90);
    });
    window.scrollTo(0, 0);
  });
  await new Promise((r) => setTimeout(r, 400));
}

const browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

try {
  for (const theme of ["dark", "light"]) {
    for (const vp of VIEWPORTS) {
      for (const route of ROUTES) {
        const page = await browser.newPage();
        await page.setViewport({ width: vp.w, height: vp.h, deviceScaleFactor: 1 });
        await page.evaluateOnNewDocument((t) => {
          try {
            localStorage.setItem("theme", t);
          } catch {}
          document.documentElement.classList.remove("light", "dark");
          document.documentElement.classList.add(t);
        }, theme);

        const url = BASE + route.path;
        await page.goto(url, { waitUntil: "networkidle0", timeout: 45000 });

        // Trigger scroll-driven reveals
        await scrollThrough(page);

        // For desktop: viewport-only shot (above-the-fold). For tablet/mobile: fullPage.
        const fullPage = vp.name !== "desktop";
        const filename = `${theme}-${vp.name}-${route.id}.png`;
        const fullpath = path.join(OUT, filename);
        await page.screenshot({ path: fullpath, fullPage });
        const size = fs.statSync(fullpath).size;
        console.log(`✓ ${filename} (${(size / 1024).toFixed(0)} KB)`);
        await page.close();
      }
    }
  }
} finally {
  await browser.close();
}
console.log("DONE");
