import puppeteer from "puppeteer";
const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });
const page = await browser.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push("pageerror: " + e.message + "\n" + e.stack));
page.on("console", (msg) => {
  if (msg.type() === "error") errors.push("console.error: " + msg.text());
});
page.on("requestfailed", (r) => errors.push("requestfailed: " + r.url() + " - " + r.failure()?.errorText));
await page.goto("http://localhost:3742/", { waitUntil: "networkidle0", timeout: 30000 });
await new Promise((r) => setTimeout(r, 1500));
console.log("--- ERRORS ---");
console.log(errors.join("\n\n"));
await browser.close();
