import { chromium } from "playwright";

const browser = await chromium.launch({ args: ["--no-sandbox"] });
const page = await browser.newPage();

// Load the raw source file directly, bypassing Next's image optimizer
// entirely, to check what the browser thinks its TRUE pixel dimensions are.
await page.goto("http://localhost:3000/brand/itms-logo.webp", { waitUntil: "load" });
const dims = await page.evaluate(() => {
  const img = document.querySelector("img");
  return img ? { naturalWidth: img.naturalWidth, naturalHeight: img.naturalHeight } : null;
});
console.log("raw source file dims (per browser decode):", JSON.stringify(dims));

await browser.close();
