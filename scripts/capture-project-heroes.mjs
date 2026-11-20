import { chromium } from "playwright";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "public", "images", "projects");
fs.mkdirSync(outDir, { recursive: true });

const sites = [
  { slug: "resaia", url: "https://resaia.org/" },
  { slug: "mytm-travels", url: "https://mytmtravels.com/" },
  { slug: "oladoc", url: "https://oladoc.com/" },
  { slug: "skinos", url: "https://skin-os.com/" },
  { slug: "squid-academy", url: "https://squid.gg/en" },
  {
    slug: "one-linear-validator",
    url: "https://www.npmjs.com/package/one-linear-validator",
  },
];

const cookieSelectors = [
  'button:has-text("Accept")',
  'button:has-text("Accept all")',
  'button:has-text("Got it")',
  'button:has-text("I agree")',
  'button:has-text("Allow all")',
  '[aria-label="Close"]',
];

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});

for (const site of sites) {
  const page = await context.newPage();
  try {
    console.log("Capturing", site.slug, "...");
    await page.goto(site.url, {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });
    await page.waitForTimeout(3500);

    for (const sel of cookieSelectors) {
      try {
        const btn = page.locator(sel).first();
        if (await btn.isVisible({ timeout: 800 })) {
          await btn.click({ timeout: 1000 });
        }
      } catch {
        // ignore
      }
    }

    await page.waitForTimeout(800);
    const file = path.join(outDir, `${site.slug}.png`);
    await page.screenshot({
      path: file,
      type: "png",
      clip: { x: 0, y: 0, width: 1440, height: 800 },
    });
    console.log("Saved", file);
  } catch (err) {
    console.error("Failed", site.slug, err.message);
  } finally {
    await page.close();
  }
}

await browser.close();
console.log("Done");
