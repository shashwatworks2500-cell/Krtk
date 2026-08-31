import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const URL = process.env.SHOT_URL ?? "http://localhost:3000";
const OUT =
  process.env.SHOT_OUT ??
  "/tmp/claude-0/-home-user/7dd0cd35-5439-52c4-b762-7cf45571a4b4/scratchpad/shots";
const VIEWPORTS = [
  { name: "375", width: 375, height: 780 },
  { name: "768", width: 768, height: 1024 },
  { name: "1024", width: 1024, height: 800 },
  { name: "1440", width: 1440, height: 900 },
];

await mkdir(OUT, { recursive: true });
const browser = await chromium.launch({
  executablePath: "/opt/pw-browsers/chromium",
});
const messages = [];

for (const vp of VIEWPORTS) {
  const page = await browser.newPage({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
  });
  page.on("console", (m) => {
    if (m.type() === "error" || m.type() === "warning")
      messages.push(`[${vp.name}] ${m.type()}: ${m.text()}`);
  });
  page.on("pageerror", (e) =>
    messages.push(`[${vp.name}] pageerror: ${e.message}`),
  );

  await page.goto(URL, { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${OUT}/${vp.name}-hero.png` });

  // Walk the page so lazy images load and reveals fire, then pin everything
  // to its resolved state before the full capture.
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.8;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });
  await page.evaluate(async () => {
    document.querySelectorAll("[data-reveal]").forEach((el) => {
      el.dataset.reveal = "in";
    });
    // fullPage capture does not drive lazy loading, so force it.
    document.querySelectorAll("img").forEach((img) => {
      img.loading = "eager";
    });
    await Promise.all(
      [...document.images].map((img) =>
        img.complete ? null : img.decode().catch(() => {}),
      ),
    );
  });
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${OUT}/${vp.name}-full.png`, fullPage: true });

  const overflow = await page.evaluate(
    () =>
      document.documentElement.scrollWidth -
      document.documentElement.clientWidth,
  );
  if (overflow > 0)
    messages.push(`[${vp.name}] HORIZONTAL OVERFLOW: ${overflow}px`);
  await page.close();
}

await browser.close();
console.log(
  messages.length ? messages.join("\n") : "no console errors, no overflow",
);
