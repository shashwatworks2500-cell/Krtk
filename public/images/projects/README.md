# Project stills

Drop project posters here and point `data/projects.ts` at them:

```ts
poster: "/images/projects/project-01.jpg",
```

Match the still's aspect ratio to the project's `format` field
(`21:9`, `16:9`, `4:5`, `1:1`, `9:16`) so the frame does not crop the shot. The
prep script does the crop, resize and compression in one step:

```bash
node scripts/prepare-media.mjs <source> public/images/projects/project-01.jpg --ratio 16:9
```

Useful flags: `--focus 0.35` moves the crop anchor up when a tall source would
otherwise cut a head off, and `--grade mono` matches the monochrome treatment
used in the hero.

`next/image` generates the responsive sizes and modern formats from there, so
one good master per project is enough.

While `poster` is `null` the designed placeholder frame renders instead.
