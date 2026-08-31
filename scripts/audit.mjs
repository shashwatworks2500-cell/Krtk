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

/* ---------- Gutter alignment at phone width ---------- */
{
  const page = await browser.newPage({ viewport: { width: 375, height: 800 } });
  await page.goto(url, { waitUntil: "networkidle" });
  await page.evaluate(() => {
    document.querySelectorAll("[data-reveal]").forEach((el) => {
      el.dataset.reveal = "in";
    });
  });
  const drift = await page.evaluate(() => {
    const gutter = parseFloat(
      getComputedStyle(document.querySelector("main .shell")).paddingLeft,
    );
    const selectors = [
      "h1, h2, h3",
      "main p",
      "main .label",
      "main .meta",
      "footer a",
      "footer p",
    ];
    const out = [];
    for (const selector of selectors) {
      for (const el of document.querySelectorAll(selector)) {
        const style = getComputedStyle(el);
        // Only elements that start their own line can drift off the gutter.
        // Flex children (a marker label, a frame's timecode, the scroll cue)
        // are placed relative to their siblings by design, and flex blockifies
        // them, so they have to be excluded explicitly.
        if (style.display === "none" || style.textAlign === "right") continue;
        const parentDisplay = el.parentElement
          ? getComputedStyle(el.parentElement).display
          : "";
        if (parentDisplay.includes("flex")) continue;
        const rect = el.getBoundingClientRect();
        if (rect.width === 0) continue;
        // A near-miss is drift; a genuine second column (the footer's link
        // pair) sits far enough out to be a deliberate placement.
        const offset = Math.abs(rect.left - gutter);
        if (offset > 0.75 && offset <= 80) {
          out.push({
            left: Math.round(rect.left * 10) / 10,
            text: (el.textContent || "").trim().slice(0, 32),
          });
        }
      }
    }
    return { gutter, out };
  });
  console.log(`\n=== gutter alignment @375px (target ${drift.gutter}px) ===`);
  console.log(
    drift.out.length === 0
      ? "  every element flush to the gutter"
      : drift.out.map((d) => `  ${d.left}px — ${d.text}`).join("\n"),
  );
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
