/**
 * The work grid.
 *
 * Titles and descriptions on the video slots are stand-ins written to fit what
 * is on screen — replace them with the real ones.
 *
 * To publish a project: fill in the copy, point `poster` at a still in
 * /public/images/projects and, where there is a preview loop, `clip` at a file
 * in /public/videos/projects. While `poster` is null the card renders the
 * designed frame placeholder instead.
 *
 * `clip` is a short muted preview, not the finished film. Keep it under a
 * couple of megabytes — `scripts/prepare-clip.mjs` produces one, and
 * public/videos/projects/README.md explains why the full cut belongs on a video
 * host linked from `href`.
 */

export type ProjectFormat = "21:9" | "16:9" | "4:5" | "1:1" | "9:16";

export type Project = {
  /** Zero-padded index rendered as the editorial marker. */
  id: string;
  title: string;
  category: string;
  description: string;
  year: string;
  /** Length of the preview, shown as timecode metadata. Null hides it. */
  runtime: string | null;
  /** Delivery aspect ratio. Drives the shape of the frame in the grid. */
  format: ProjectFormat;
  /** Still frame, e.g. "/images/projects/project-01.jpg". */
  poster: string | null;
  /** Muted preview loop, e.g. "/videos/projects/project-01.mp4". */
  clip: string | null;
  /** Case-study or external link. Null renders a non-interactive card. */
  href: string | null;
  /** Featured projects take the full-bleed treatment at the top of the section. */
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "01",
    title: "Sync Cut",
    category: "Music / Sync Edit",
    description:
      "Picture cut to a vocal take — the frame splits on the beat so the bike and the performance trade the eye back and forth without a transition doing the work.",
    year: "2026",
    runtime: "00:04",
    format: "16:9",
    poster: "/images/projects/project-01.jpg",
    clip: "/videos/projects/project-01.mp4",
    href: null,
    featured: true,
  },
  {
    id: "02",
    title: "Open Road",
    category: "Social / Vertical",
    description:
      "Vertical short form. One pass, held long enough to feel the speed, graded cold so the headlight carries the frame.",
    year: "2026",
    runtime: "00:03",
    format: "9:16",
    poster: "/images/projects/project-02.jpg",
    clip: "/videos/projects/project-02.mp4",
    href: null,
  },
  {
    id: "03",
    title: "Morning Ride",
    category: "Automotive / Lifestyle",
    description:
      "Cut cold and quiet — fog, engine and no music for the first thirty seconds, so the ride arrives before the edit does.",
    year: "2026",
    runtime: null,
    format: "4:5",
    poster: "/images/projects/project-03.jpg",
    clip: null,
    href: null,
  },
  {
    id: "04",
    title: "Sync Cut II",
    category: "Music / Sync Edit",
    description:
      "A second pass at the same idea, further into the track — the split holds longer and the cut lands on the lyric instead of the bar.",
    year: "2026",
    runtime: "00:03",
    format: "16:9",
    poster: "/images/projects/project-04.jpg",
    clip: "/videos/projects/project-04.mp4",
    href: null,
  },
];
