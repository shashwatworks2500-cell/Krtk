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
| `data/site.ts` | Name, role, availability, contact channels, social links, nav |
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

`data/site.ts` holds placeholders. An `href` of `null` with an address-shaped
`value` is turned into a `mailto:` automatically (`lib/contact.ts`), so the
primary CTA works as soon as a real address is in place. Channels with neither
render as plain text rather than dead links.

### Replacing the portrait

Drop a new photograph anywhere and run:

```bash
npm run image:hero -- path/to/photo.jpg
```

That trims the watermark safe areas, applies the base grade, writes
`public/images/kartik-hero.jpg`, the About crop `public/images/kartik-portrait.jpg`,
and regenerates the blur placeholder in `app/hero-blur.ts`. The cinematic
treatment — contrast, carbon wash, edge dissolve — lives in CSS, so a
replacement photograph inherits it.

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
first). Current state: 0 axe violations at 375 and 1440, LCP ~230ms, CLS 0, no
horizontal overflow at any tested width.
