/**
 * Turns a camera file into a web preview loop plus its poster frame.
 *
 *   node scripts/prepare-clip.mjs <source> <out.mp4> [options]
 *
 *   --width 1280      output width, height follows (default 1280)
 *   --start 0         seconds to skip from the head (default 0)
 *   --duration N      seconds to keep (default: to the end)
 *   --crf 28          quality, lower is better and bigger (default 28)
 *   --poster <path>   poster JPEG (default: the matching path in
 *                     public/images/projects)
 *
 * Phone footage is usually HEVC in a .mov, which no browser plays reliably, so
 * this always re-encodes to H.264. Audio is dropped: the preview is muted, so
 * the track is pure weight. The poster is taken from the clip's own first
 * frame, so the card does not jump when the loop starts.
 */
import { argv } from "node:process";
import { execFileSync } from "node:child_process";
import { statSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import ffmpeg from "ffmpeg-static";
import ffprobe from "ffprobe-static";

const [source, out] = argv.slice(2);
if (!source || !out) {
  console.error(
    "usage: node scripts/prepare-clip.mjs <source> <out.mp4> [--width 1280] [--start 0] [--duration N] [--crf 28] [--poster <path>]",
  );
  process.exit(1);
}

const flag = (name, fallback) => {
  const index = argv.indexOf(`--${name}`);
  return index === -1 ? fallback : argv[index + 1];
};

const width = Number(flag("width", 1280));
const start = flag("start", "0");
const duration = flag("duration", null);
const crf = String(flag("crf", 28));
const poster =
  flag("poster", null) ??
  join(
    dirname(out).replace(/videos/, "images"),
    basename(out).replace(/\.mp4$/, ".jpg"),
  );

const run = (bin, args) => execFileSync(bin, args, { stdio: ["ignore", "pipe", "pipe"] });

const probe = JSON.parse(
  run(ffprobe.path, [
    "-v", "error",
    "-show_entries", "format=duration:stream=codec_type,codec_name,width,height",
    "-of", "json",
    source,
  ]).toString(),
);
const video = probe.streams.find((s) => s.codec_type === "video");
console.log(
  `source: ${video.codec_name} ${video.width}x${video.height}, ${Number(probe.format.duration).toFixed(2)}s`,
);

const trim = ["-ss", start, ...(duration ? ["-t", String(duration)] : [])];

run(ffmpeg, [
  "-v", "error",
  ...trim,
  "-i", source,
  // -2 keeps the height even, which H.264 requires.
  "-vf", `scale=${width}:-2`,
  "-c:v", "libx264",
  "-profile:v", "main",
  "-pix_fmt", "yuv420p",
  "-crf", crf,
  "-preset", "slow",
  // Index at the head so playback starts without downloading the whole file.
  "-movflags", "+faststart",
  "-an",
  "-y", out,
]);

run(ffmpeg, [
  "-v", "error",
  ...trim,
  "-i", source,
  "-frames:v", "1",
  "-vf", `scale=${width}:-2`,
  "-q:v", "3",
  "-y", poster,
]);

const kb = (path) => `${(statSync(path).size / 1024).toFixed(0)} KB`;
console.log(`wrote ${out} (${kb(out)})`);
console.log(`wrote ${poster} (${kb(poster)})`);
