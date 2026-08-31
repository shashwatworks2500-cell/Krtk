# Project stills

Drop project posters here and point `data/projects.ts` at them:

```ts
poster: "/images/projects/project-01.jpg",
```

Suggested export: 2400px on the long edge, JPEG q85 or WebP. `next/image`
handles the responsive sizes and modern formats from there, so one good master
per project is enough.

Match the still's aspect ratio to the project's `format` field
(`21:9`, `16:9`, `4:5`, `1:1`, `9:16`) so the frame does not crop the shot.

While `poster` is `null` the designed placeholder frame renders instead.
