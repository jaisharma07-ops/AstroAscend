import puppeteer from "puppeteer";
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";

const URL = "https://astroascend.my.canva.site/";

const browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

  const requests = [];
  page.on("request", (r) => requests.push({ url: r.url(), type: r.resourceType() }));

  await page.goto(URL, { waitUntil: "networkidle2", timeout: 60000 });
  await new Promise((r) => setTimeout(r, 4000));

  // Trigger lazy-loaded sections
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let total = 0;
      const distance = 400;
      const id = setInterval(() => {
        const sh = document.body.scrollHeight;
        window.scrollBy(0, distance);
        total += distance;
        if (total >= sh + 500) {
          clearInterval(id);
          resolve();
        }
      }, 250);
    });
  });
  await new Promise((r) => setTimeout(r, 3000));
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 1500));

  const html = await page.content();
  await fs.writeFile(fileURLToPath(new URL("rendered.html", import.meta.url)), html);

  const data = await page.evaluate(() => {
    function visibleText(node) {
      const out = [];
      const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, {
        acceptNode(n) {
          const t = (n.nodeValue || "").trim();
          if (!t) return NodeFilter.FILTER_REJECT;
          let p = n.parentElement;
          while (p) {
            const tn = p.tagName;
            if (tn === "SCRIPT" || tn === "STYLE" || tn === "NOSCRIPT") return NodeFilter.FILTER_REJECT;
            p = p.parentElement;
          }
          return NodeFilter.FILTER_ACCEPT;
        },
      });
      let n;
      while ((n = walker.nextNode())) {
        const el = n.parentElement;
        const rect = el?.getBoundingClientRect?.();
        const cs = el ? window.getComputedStyle(el) : null;
        out.push({
          text: n.nodeValue.trim(),
          tag: el?.tagName?.toLowerCase() || null,
          y: rect ? Math.round(rect.top + window.scrollY) : null,
          x: rect ? Math.round(rect.left) : null,
          fontSize: cs ? parseFloat(cs.fontSize) : null,
          fontWeight: cs ? cs.fontWeight : null,
          color: cs ? cs.color : null,
          fontFamily: cs ? cs.fontFamily : null,
        });
      }
      return out;
    }
    const links = Array.from(document.querySelectorAll("a[href]")).map((a) => ({
      href: a.getAttribute("href"),
      text: (a.textContent || "").trim(),
      target: a.getAttribute("target"),
      y: Math.round(a.getBoundingClientRect().top + window.scrollY),
    }));
    const buttons = Array.from(document.querySelectorAll("button, [role='button']")).map((b) => ({
      text: (b.textContent || "").trim(),
      y: Math.round(b.getBoundingClientRect().top + window.scrollY),
    }));
    const images = Array.from(document.querySelectorAll("img")).map((img) => ({
      src: img.getAttribute("src"),
      alt: img.getAttribute("alt"),
      w: img.naturalWidth,
      h: img.naturalHeight,
      y: Math.round(img.getBoundingClientRect().top + window.scrollY),
    }));
    const meta = {
      title: document.title,
      description: document.querySelector('meta[name="description"]')?.content || null,
      ogTitle: document.querySelector('meta[property="og:title"]')?.content || null,
      lang: document.documentElement.lang,
      bodyHeight: document.body.scrollHeight,
      bodyBg: window.getComputedStyle(document.body).backgroundColor,
    };
    return { meta, texts: visibleText(document.body), links, buttons, images };
  });

  await fs.writeFile(
    fileURLToPath(new URL("extracted.json", import.meta.url)),
    JSON.stringify({ ...data, networkRequests: requests.filter((r) =>
      !r.url.startsWith("data:") &&
      !/\.(woff2?|ttf|otf|png|jpg|jpeg|webp|gif|svg|ico|css|js|mp4|webm)(\?|$)/i.test(r.url)
    ) }, null, 2)
  );

  await page.screenshot({ path: fileURLToPath(new URL("full.png", import.meta.url)), fullPage: true });

  console.log("DONE");
  console.log("Title:", data.meta.title);
  console.log("Body height:", data.meta.bodyHeight);
  console.log("Texts:", data.texts.length);
  console.log("Links:", data.links.length);
  console.log("Buttons:", data.buttons.length);
  console.log("Images:", data.images.length);
} catch (e) {
  console.error("FAILED:", e.message);
  process.exitCode = 1;
} finally {
  await browser.close();
}
