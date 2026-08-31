/**
 * Headless audit: axe-core accessibility violations, Core Web Vitals proxies
 * (LCP, CLS), keyboard reachability and a reduced-motion pass.
 *
 * Usage: node scripts/audit.mjs [url]
 */
import { chromium } from "playwright";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const axeSource = readFileSync(require.resolve("axe-core/axe.min.js"), "utf8");
const url = process.argv[2] ?? "http://localhost:3000";

const browser = await chromium.launch({
  executablePath: "/opt/pw-browsers/chromium",
});

/* ---------- Accessibility, at mobile and desktop ---------- */
for (const width of [375, 1440]) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  await page.goto(url, { waitUntil: "networkidle" });
  await page.addScriptTag({ content: axeSource });
  const results = await page.evaluate(
    async () =>
      // @ts-expect-error injected at runtime
      await window.axe.run(document, {
        runOnly: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"],
      }),
  );
  console.log(
    `\n=== axe @ ${width}px — ${results.violations.length} violations ===`,
  );
  for (const v of results.violations) {
    console.log(`  [${v.impact}] ${v.id}: ${v.help}`);
    for (const node of v.nodes.slice(0, 3)) {
      console.log(`      ${node.target.join(" ")}`);
    }
  }
  await page.close();
}

/* ---------- Vitals ---------- */
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(url, { waitUntil: "load" });
const vitals = await page.evaluate(
  () =>
    new Promise((resolve) => {
      let lcp = 0;
      let cls = 0;
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) lcp = entry.startTime;
      }).observe({ type: "largest-contentful-paint", buffered: true });
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) cls += entry.value;
        }
      }).observe({ type: "layout-shift", buffered: true });
      setTimeout(() => {
        const nav = performance.getEntriesByType("navigation")[0];
        resolve({
          lcp: Math.round(lcp),
          cls: Number(cls.toFixed(4)),
          domContentLoaded: Math.round(nav.domContentLoadedEventEnd),
          transferKB: Math.round(
            performance
              .getEntriesByType("resource")
              .reduce((sum, r) => sum + (r.transferSize || 0), 0) / 1024,
          ),
        });
      }, 3500);
    }),
);
console.log("\n=== vitals @1440 ===");
console.log(JSON.stringify(vitals, null, 2));

/* ---------- Keyboard reachability ---------- */
const tabbed = [];
for (let i = 0; i < 14; i++) {
  await page.keyboard.press("Tab");
  tabbed.push(
    await page.evaluate(() => {
      const el = document.activeElement;
      if (!el) return "none";
      const style = getComputedStyle(el);
      return `${el.tagName.toLowerCase()}:${(el.textContent || "").trim().slice(0, 28)} [outline:${style.outlineWidth}]`;
    }),
  );
}
console.log("\n=== tab order (first 14) ===");
tabbed.forEach((t, i) => console.log(`  ${i + 1}. ${t}`));
await page.close();

/* ---------- Reduced motion ---------- */
const rm = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  reducedMotion: "reduce",
});
await rm.goto(url, { waitUntil: "networkidle" });
await rm.waitForTimeout(800);
console.log("\n=== reduced motion ===");
console.log(
  JSON.stringify(
    await rm.evaluate(() => {
      const hidden = [...document.querySelectorAll("[data-reveal]")].filter(
        (el) => getComputedStyle(el).opacity !== "1",
      ).length;
      return {
        revealsStillHidden: hidden,
        lenisClass: document.documentElement.className.includes("lenis"),
      };
    }),
  ),
);
await rm.close();

await browser.close();
