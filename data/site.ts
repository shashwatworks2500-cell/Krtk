/**
 * Single source of truth for identity, contact details and social links.
 * Every value here is a placeholder until Kartik supplies the real one —
 * replace the strings, nothing else needs to change.
 */

export type ContactChannel = {
  label: string;
  /** Displayed text. Keep it human-readable, not a raw URL. */
  value: string;
  /** Leave as `null` until a real destination exists; the UI renders it as plain text. */
  href: string | null;
};

export const site = {
  name: "Kartik",
  role: "Video Editor",
  discipline: "Visual Storyteller",
  /** Used for <title>, Open Graph and the JSON-LD Person record. */
  title: "Kartik — Video Editor & Visual Storyteller",
  description:
    "Kartik is a video editor who turns raw footage into clear, engaging, visually memorable stories — short form, long form, commercial and cinematic work.",
  /** Set this once the site has a domain; metadataBase falls back gracefully. */
  url: "https://kartik.example.com",
  locale: "en_IN",
  availability: "Available for select projects",
  year: 2026,
} as const;

/**
 * A short line in Kartik's own voice, used beside the portrait. It is a
 * statement about craft, not a claim about results — keep it that way.
 */
export const aboutQuote = {
  text: "Every cut is a decision about what someone feels next. That is the whole job.",
  attribution: "Kartik",
} as const;

export const contact: ContactChannel[] = [
  { label: "Email", value: "hello@example.com", href: null },
  { label: "Instagram", value: "@placeholder", href: null },
  { label: "WhatsApp", value: "Add number", href: null },
];

export const socials: ContactChannel[] = [
  { label: "Instagram", value: "Instagram", href: null },
  { label: "YouTube", value: "YouTube", href: null },
  { label: "Vimeo", value: "Vimeo", href: null },
  { label: "LinkedIn", value: "LinkedIn", href: null },
];

export const navigation = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
] as const;
