/**
 * Single source of truth for identity, contact details and social links.
 */

export type ContactChannel = {
  label: string;
  /** Displayed text. Keep it human-readable, not a raw URL. */
  value: string;
  /** `null` renders the channel as plain text instead of a link. */
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
  /** Replace once the site has its own domain; drives metadataBase and OG URLs. */
  url: "https://kartik.example.com",
  locale: "en_IN",
  availability: "Available for select projects",
  year: 2026,
} as const;

/**
 * A short line in Kartik's own voice, used beside the artwork in About. It is a
 * statement about craft, not a claim about results — keep it that way.
 */
export const aboutQuote = {
  text: "Every cut is a decision about what someone feels next. That is the whole job.",
  attribution: "Kartik",
} as const;

export const contact: ContactChannel[] = [
  {
    label: "Email",
    value: "kartikediting7@gmail.com",
    href: "mailto:kartikediting7@gmail.com",
  },
  {
    label: "Instagram",
    value: "@kartik2x",
    href: "https://www.instagram.com/kartik2x",
  },
  {
    label: "WhatsApp",
    value: "+91 83818 11235",
    href: "https://wa.me/918381811235",
  },
];

/**
 * Footer links. Add channels here as they go live — anything with a `null`
 * href renders as plain text, so it is better to leave one out than to ship a
 * dead link.
 */
export const socials: ContactChannel[] = [
  {
    label: "Instagram",
    value: "Instagram",
    href: "https://www.instagram.com/kartik2x",
  },
  { label: "WhatsApp", value: "WhatsApp", href: "https://wa.me/918381811235" },
  { label: "Email", value: "Email", href: "mailto:kartikediting7@gmail.com" },
];

export const navigation = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
] as const;
