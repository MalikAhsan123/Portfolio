import { chromium } from "playwright";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(
  __dirname,
  "..",
  "public",
  "images",
  "projects",
  "one-linear-validator.png"
);

const html = `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      width: 1440px; height: 800px;
      font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
      background: linear-gradient(145deg, #0b1220 0%, #102a24 45%, #0f172a 100%);
      color: #fff; display: flex; align-items: center; justify-content: center;
    }
    .card {
      width: 1100px; border-radius: 28px; padding: 56px 64px;
      background: rgba(15, 23, 42, 0.72);
      border: 1px solid rgba(52, 211, 153, 0.28);
      box-shadow: 0 30px 80px rgba(0,0,0,0.35);
    }
    .badge {
      display: inline-flex; align-items: center; gap: 10px;
      padding: 10px 16px; border-radius: 999px;
      background: rgba(16, 185, 129, 0.14);
      border: 1px solid rgba(16, 185, 129, 0.35);
      color: #6ee7b7; font-weight: 600; font-size: 18px;
      margin-bottom: 28px;
    }
    h1 { font-size: 64px; letter-spacing: -0.03em; margin-bottom: 18px; }
    p { font-size: 26px; line-height: 1.45; color: #cbd5e1; max-width: 900px; }
    .meta { margin-top: 36px; display: flex; gap: 14px; flex-wrap: wrap; }
    .chip {
      padding: 10px 16px; border-radius: 12px; font-size: 18px; font-weight: 600;
      background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);
      color: #e2e8f0;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="badge">npm package</div>
    <h1>one-linear-validator</h1>
    <p>Minimalist zero-dependency JavaScript validation library using one-liner functions. 724+ downloads in the first 14 hours.</p>
    <div class="meta">
      <span class="chip">JavaScript</span>
      <span class="chip">ESM</span>
      <span class="chip">Node.js</span>
      <span class="chip">Open Source</span>
    </div>
  </div>
</body>
</html>`;

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 800 } });
await page.setContent(html, { waitUntil: "load" });
await page.screenshot({ path: out, type: "png" });
await browser.close();
console.log("Saved", out);
