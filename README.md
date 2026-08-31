# Kartik — Video Editor & Visual Storyteller

A single-page editorial portfolio built as a cinematic cover rather than a
template: oversized display type layered with the portrait, carbon foundation,
and red used only as a mark.

Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4 ·
Lenis for momentum scrolling.

## Running it

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm run typecheck    # tsc --noEmit
npm run lint         # eslint
```

## Editing the content

Everything a visitor reads lives in `data/`. The components consume it, so
nothing in `components/` needs touching to publish real work.

| File | Holds |
|---|---|
| `data/site.ts` | Name, role, availability, the About quote, contact channels, social links, nav |
| `data/projects.ts` | The Selected Work slots |
| `data/services.ts` | The services list |
| `data/process.ts` | The four process steps |

### Publishing a real project

Open `data/projects.ts` and fill in a slot:

```ts
{
  id: "01",
  title: "Nightshift",              // real title
  category: "Commercial / Brand Film",
  description: "…",
  year: "2026",
  runtime: "02:14",
  format: "16:9",                    // drives the frame's shape in the grid
  poster: "/images/projects/project-01.jpg",
  clip: "/videos/projects/project-01.mp4",  // optional hover loop
  href: "https://…",                 // optional case study
  featured: true,                    // only the first entry should be featured
}
```

While `poster` and `clip` are `null` the slot renders a designed placeholder
frame — crop marks, the project index, a timecode strip — instead of filler
imagery. It disappears on its own the moment a still is supplied. While `href`
is `null` the card is deliberately not a link, so a placeholder never pretends
to be clickable.

Add or remove projects freely; the grid rhythm (column spans and offsets) is
applied by position, so the layout stays deliberately uneven at any count.

Asset drop points and export guidance: `public/images/projects/README.md` and
`public/videos/projects/README.md`.

### Contact details

`data/site.ts` holds the live channels — email, Instagram and WhatsApp. An
`href` of `null` with an address-shaped `value` is turned into a `mailto:`
automatically (`lib/contact.ts`); a channel with neither renders as plain text
rather than a dead link, so it is better to leave a channel out than to ship it
empty.

### Video

The finished cut never goes in the repository. Put it on a video host, link it
from the project's `href`, and keep only a short muted hover loop locally.
`public/videos/projects/README.md` has the size limits, the reasoning and the
ffmpeg recipe for producing the loop.

### Replacing the hero subject

The hero needs a **cut-out** — a subject on a transparent background. The whole
composition depends on it: the wordmark set behind him is genuinely occluded by
his silhouette, and a second outlined pass in front carries the hidden letters
back across his body so the word still reads. A photograph with a background
cannot do that, and the script rejects one.

```bash
npm run image:hero -- path/to/cutout.png
```

That finds the subject by its alpha channel (so it does not matter how much
empty canvas the export carried), scales it to the master size, applies the base
grade, writes `public/images/kartik-hero.webp` and regenerates the blur
placeholder in `app/hero-blur.ts`. WebP rather than PNG keeps the master around
260 KB instead of 2.9 MB, with no visible difference once the page renders it as
high-contrast monochrome.

The cinematic treatment — monochrome, contrast, the key light behind him, the
fade at the base — lives in CSS, so a replacement cut-out inherits it. If the
new subject stands noticeably further left or right, move the `hero-outline-mask`
switchover in `app/globals.css` to match: it is the point where the solid pass
hands over to the outlined one, and it should sit just before the subject's
leading edge.

Any other image (project stills, the About poster) goes through the general prep
script, which crops to a delivery ratio, resizes and compresses:

```bash
node scripts/prepare-media.mjs <source> <out> [--ratio 16:9] [--focus 0.45] [--grade mono|soft]
```

## Design system

Tokens are defined once in `app/globals.css` under `@theme`.

| Token | Value | Role |
|---|---|---|
| `carbon` | `#17181A` | Foundation |
| `carbon-deep` | `#0E0F10` | Full-bleed sections |
| `carbon-raised` | `#1E2023` | Frames and surfaces |
| `canvas` | `#F4F5F6` | Primary type |
| `silver` | `#C9CDD2` | Secondary type |
| `muted` | `#8A9097` | Metadata |
| `signal` | `#C8102E` | Marks, rules, the CTA |
| `signal-pressed` | `#8E0B20` | CTA pressed |

Contrast on carbon: canvas 16.3:1, silver 11.1:1, muted 5.5:1. Red measures
3.0:1, so it is never used for small text — only large display type, fills and
1px rules. Canvas on red is 5.4:1, which is why the CTA can hold copy.

Type is Archivo (display and body, variable width axis) with JetBrains Mono for
indices, timecodes and labels.

## Motion

Restrained by design. One entrance transition fired once per element by
`IntersectionObserver` (`components/ui/reveal.tsx`), transform-and-opacity only.
Lenis handles momentum scrolling and is not started at all under
`prefers-reduced-motion: reduce`, which also resolves every reveal immediately.
The scroll playhead under the header is a CSS scroll-driven animation, so it
costs no scroll listener.

## Quality gates

```bash
npm run shots      # screenshots at 375 / 768 / 1024 / 1440, checks for overflow
npm run audit:ui   # axe-core, LCP/CLS, tab order, reduced-motion pass
```

Both drive a real browser against a running server (`npm run build && npm start`
first). `audit:ui` also checks that every line-starting element at 375px is
flush to the page gutter, which is how the phone layout stays aligned as
content changes.

Current state: 0 axe violations at 375 and 1440, LCP ~230ms, CLS 0, no
horizontal overflow at any tested width, and no gutter drift at 375px.

## Notes on the phone layout

It is designed, not shrunk:

- The tagline breaks at the sentence so it reads as a title card.
- The lead project holds the page gutter instead of running edge to edge, and
  its category moves down beside the title so the metadata row never wraps.
- A 21:9 frame opens up to 16:9 — at 335px wide the wide master would be a
  143px sliver.
- Service indices drop from display numerals to small markers so titles stay
  flush left instead of being pushed in by the number.
- Contact labels sit above their values rather than in a fixed column that
  would cost a third of the screen.
- The wordmark is the same double exposure as the desktop hero — solid behind
  the subject, outlined in front of it — with a heavier stroke and a deeper
  grade on the subject, since the word crosses more of him at that size.
- The poster and the quote carry the About section, which is otherwise an
  unbroken wall of text on a phone.
