/**
 * Placeholder project slots.
 *
 * To publish a real project: fill in `title`, `category`, `description`, `year`,
 * point `poster` at a still in /public/images/projects and, if there is a silent
 * loop to preview on hover, `clip` at a file in /public/videos/projects.
 * While `poster` is null the card renders the designed frame placeholder.
 *
 * `clip` is a short muted preview loop, not the finished film. Keep it under a
 * couple of megabytes — see public/videos/projects/README.md. The full cut
 * belongs on a video host, linked from `href`.
 */

export type ProjectFormat = "21:9" | "16:9" | "4:5" | "1:1" | "9:16";

export type Project = {
  /** Zero-padded index rendered as the editorial marker. */
  id: string;
  title: string;
  category: string;
  description: string;
  year: string;
  /** Runtime or deliverable length, shown as timecode metadata. */
  runtime: string;
  /** Delivery aspect ratio. Drives the shape of the frame in the grid. */
  format: ProjectFormat;
  /** Still frame, e.g. "/images/projects/project-01.jpg". */
  poster: string | null;
  /** Muted hover-preview loop, e.g. "/videos/projects/project-01.mp4". */
  clip: string | null;
  /** Case-study or external link. Null renders a non-interactive card. */
  href: string | null;
  /** Featured projects take the full-bleed treatment at the top of the section. */
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "01",
    title: "Project One",
    category: "Commercial / Brand Film",
    description:
      "A brand film cut for pace and restraint — built around a single idea and carried by sound design rather than effects.",
    year: "2026",
    runtime: "02:14",
    format: "16:9",
    poster: null,
    clip: null,
    href: null,
    featured: true,
  },
  {
    // First slot with real artwork. The title and description below are
    // stand-ins written to fit the still — replace them with the real ones.
    id: "02",
    title: "Morning Ride",
    category: "Automotive / Lifestyle",
    description:
      "Cut cold and quiet — fog, engine and no music for the first thirty seconds, so the ride arrives before the edit does.",
    year: "2026",
    runtime: "01:18",
    format: "4:5",
    poster: "/images/projects/project-02.jpg",
    clip: null,
    href: null,
  },
  {
    id: "03",
    title: "Project Three",
    category: "Short Film / Cinematic",
    description:
      "Narrative editing — performance, rhythm and silence given room to do the work.",
    year: "2025",
    runtime: "08:47",
    format: "16:9",
    poster: null,
    clip: null,
    href: null,
  },
  {
    id: "04",
    title: "Project Four",
    category: "Creator Content",
    description:
      "Long form creator editing with a consistent visual language across an entire series.",
    year: "2025",
    runtime: "12:06",
    format: "21:9",
    poster: null,
    clip: null,
    href: null,
  },
  {
    id: "05",
    title: "Project Five",
    category: "Product / Campaign",
    description:
      "Product-led campaign cut — precise timing, clean motion and a single message per beat.",
    year: "2025",
    runtime: "01:02",
    format: "1:1",
    poster: null,
    clip: null,
    href: null,
  },
  {
    id: "06",
    title: "Project Six",
    category: "Music / Performance",
    description:
      "Multi-camera performance edit cut to the track, matched and graded across every angle.",
    year: "2024",
    runtime: "03:58",
    format: "16:9",
    poster: null,
    clip: null,
    href: null,
  },
];
