import puppeteer from "puppeteer";
import fs from "node:fs";
import path from "node:path";

const PORT = 3742;
const BASE = `http://localhost:${PORT}`;
const OUT = "d:\\Dev_website\\_fetch\\shots";
const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });
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

try {
  for (const theme of ["dark", "light"]) {
    for (const vp of [
      { w: 1280, h: 800, name: "desktop" },
      { w: 768, h: 1024, name: "tablet" },
      { w: 390, h: 844, name: "mobile" },
    ]) {
      const page = await browser.newPage();
      await page.setViewport({ width: vp.w, height: vp.h, deviceScaleFactor: 1 });
      await page.evaluateOnNewDocument((t) => {
        try { localStorage.setItem("theme", t); } catch {}
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(t);
      }, theme);
      await page.goto(BASE + "/", { waitUntil: "networkidle0", timeout: 45000 });
      await scrollThrough(page);
      const filename = `${theme}-${vp.name}-home.png`;
      const fp = path.join(OUT, filename);
      await page.screenshot({ path: fp, fullPage: vp.name !== "desktop" });
      console.log(`✓ ${filename} ${(fs.statSync(fp).size/1024).toFixed(0)} KB`);
      await page.close();
    }
  }
} finally {
  await browser.close();
}
