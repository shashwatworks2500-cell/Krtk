# Project preview clips

## The short version

**Never put a finished film in this folder.** These are 3–6 second silent
preview loops, and they should be **under about 2 MB each**. The finished cut
lives on a video host, linked from the project's `href` in `data/projects.ts`.

A project with no `clip` ships no client JavaScript for the preview, so only add
one where the movement genuinely sells the work.

## Why the big file will not go in

A 30 MB+ video hits three separate walls, and they are all real:

| Where | Limit |
|---|---|
| GitHub web upload (drag and drop) | **25 MB** per file |
| GitHub via `git push` | warns at 50 MB, **hard-rejects at 100 MB** |
| Git history | the file is stored **forever**, in every clone, even after you delete it |
| Hosting bandwidth | every visitor downloads the whole file before playing a frame |

The bandwidth one is the reason not to do it even when the file is small enough
to commit. A page that autoplays a 30 MB loop costs 30 MB per visitor and takes
several seconds to start on a phone. A proper video host streams it in chunks at
whatever quality the connection can carry.

## What to do instead

**1. The finished film → a video host.** Upload it, then put the watch URL in
the project's `href`:

```ts
href: "https://www.youtube.com/watch?v=…",   // or Vimeo, Cloudflare Stream, Bunny
```

Free and fine to start with: YouTube (unlisted) or Vimeo. If you want no branding
and no "up next" screen, Cloudflare Stream and Bunny Stream are a few dollars a
month.

**2. A still for the card → `/public/images/projects/`.** Export one frame from
the edit — the frame you would use as a thumbnail — and run it through the
prep script so it matches the project's `format`:

```bash
node scripts/prepare-media.mjs ~/exports/frame.png public/images/projects/project-03.jpg --ratio 16:9
```

**3. A tiny hover loop → this folder.** Cut 3–6 seconds of the most watchable
movement, strip the audio, and compress hard. With ffmpeg:

```bash
ffmpeg -i source.mp4 -ss 00:00:12 -t 5 \
  -vf "scale=960:-2,fps=24" \
  -c:v libx264 -profile:v main -pix_fmt yuv420p \
  -crf 30 -preset slow -movflags +faststart -an \
  public/videos/projects/project-03.mp4
```

- `-ss 00:00:12 -t 5` — start at 12 s, take 5 seconds. Pick your best beat.
- `scale=960:-2` — 960px wide is plenty for a card; `-2` keeps the aspect ratio.
- `-crf 30` — quality. Lower is better and bigger; 28–32 is the useful range.
- `-an` — drops the audio track. The preview is muted anyway, so this is free.
- `-movflags +faststart` — moves the index to the front so it starts instantly.

Check the result: `ls -lh public/videos/projects/`. If it is over ~2 MB, raise
the `crf` or shorten the clip.

Then point the project at both:

```ts
poster: "/images/projects/project-03.jpg",
clip: "/videos/projects/project-03.mp4",
href: "https://www.youtube.com/watch?v=…",
```

## If a large file is already committed

Deleting it in a new commit does not shrink the repository — the blob stays in
history and every clone still pays for it. Use
[`git filter-repo`](https://github.com/newren/git-filter-repo) to strip it, then
force-push. Ask before doing this on a shared branch; it rewrites history.

Git LFS is the other option, but GitHub's free LFS tier is 1 GB of storage and
1 GB of bandwidth per month, which one popular page will exhaust. A video host
is the better answer.
