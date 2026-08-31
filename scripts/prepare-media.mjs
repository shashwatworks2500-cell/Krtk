/**
 * Prepares a photograph or artwork for the site: crops it to a delivery ratio,
 * resizes it, applies an optional grade, and writes an optimised JPEG.
 *
 *   node scripts/prepare-media.mjs <source> <out> [options]
 *
 *   --ratio 16:9     crop to this aspect ratio (default: leave as shot)
 *   --width 2000     longest edge in pixels (default 1800)
 *   --focus 0.5      vertical crop anchor, 0 = top, 1 = bottom (default 0.5)
 *   --grade mono     mono | soft | none (default none)
 *
 * Stills for the work grid should match their project's `format` in
 * data/projects.ts, so the frame never crops the shot.
 */
import { argv } from "node:process";
import sharp from "sharp";

const [source, out] = argv.slice(2);
if (!source || !out) {
  console.error(
    "usage: node scripts/prepare-media.mjs <source> <out> [--ratio 16:9] [--width 1800] [--focus 0.5] [--grade mono|soft|none]",
  );
  process.exit(1);
}

const flag = (name, fallback) => {
  const index = argv.indexOf(`--${name}`);
  return index === -1 ? fallback : argv[index + 1];
};

const ratio = flag("ratio", null);
const width = Number(flag("width", 1800));
const focus = Number(flag("focus", 0.5));
const grade = flag("grade", "none");

const image = sharp(source).rotate();
const meta = await image.metadata();
if (!meta.width || !meta.height) throw new Error(`cannot read ${source}`);

let pipeline = sharp(source).rotate();

if (ratio) {
  const [w, h] = ratio.split(":").map(Number);
  if (!w || !h) throw new Error(`bad --ratio "${ratio}", expected e.g. 16:9`);
  const target = w / h;
  const current = meta.width / meta.height;

  if (current > target) {
    // Too wide: trim the sides, keeping the centre.
    const cropWidth = Math.round(meta.height * target);
    pipeline = pipeline.extract({
      left: Math.round((meta.width - cropWidth) / 2),
      top: 0,
      width: cropWidth,
      height: meta.height,
    });
  } else if (current < target) {
    // Too tall: trim top and bottom around the focus point.
    const cropHeight = Math.round(meta.width / target);
    const slack = meta.height - cropHeight;
    pipeline = pipeline.extract({
      left: 0,
      top: Math.round(slack * focus),
      width: meta.width,
      height: cropHeight,
    });
  }
}

pipeline = pipeline.resize({ width, withoutEnlargement: true });

if (grade === "mono") {
  // Matches the hero and About treatment.
  pipeline = pipeline.grayscale().linear(1.18, -12);
} else if (grade === "soft") {
  // Keeps colour but calms it down enough to sit on carbon.
  pipeline = pipeline.modulate({ saturation: 0.88, brightness: 0.96 }).linear(1.04, -4);
}

await pipeline.jpeg({ quality: 88, mozjpeg: true }).toFile(out);

const result = await sharp(out).metadata();
console.log(`wrote ${out} (${result.width}x${result.height})`);
