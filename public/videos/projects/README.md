# Project preview clips

Optional silent hover loops. Point `data/projects.ts` at them:

```ts
clip: "/videos/projects/project-01.mp4",
```

Keep them short (3–6s), muted, H.264 MP4, under ~2 MB. They are `preload="none"`
and only play on hover or keyboard focus, and never play for visitors who have
asked for reduced motion.

A project with no `clip` ships no client JavaScript for the preview.
