import Image from "next/image";
import type { Project } from "@/data/projects";
import { PlayIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { HoverClip } from "@/components/sections/hover-clip";

const ASPECT: Record<Project["format"], string> = {
  "21:9": "aspect-[21/9]",
  "16:9": "aspect-video",
  "4:5": "aspect-[4/5]",
  "1:1": "aspect-square",
  "9:16": "aspect-[9/16]",
};

type ProjectFrameProps = {
  project: Project;
  /** Responsive width hint for the still, matching the grid slot. */
  sizes: string;
  className?: string;
};

/**
 * The visual slot for a project, built as a viewer rather than a card: crop
 * marks, a playhead that scrubs across on hover, and a timecode strip. Until a
 * still or clip is supplied it holds the project index instead of filler.
 */
export function ProjectFrame({ project, sizes, className }: ProjectFrameProps) {
  const { poster, clip, id, format, runtime } = project;

  return (
    <div
      className={cn(
        "border-line bg-carbon-raised group-hover:border-line-strong relative overflow-hidden border transition-colors duration-500 ease-[var(--ease-out-quart)]",
        ASPECT[format],
        className,
      )}
    >
      {poster ? (
        <Image
          src={poster}
          alt=""
          fill
          sizes={sizes}
          className="scale-[1.01] object-cover brightness-90 grayscale-[0.15] transition-transform duration-[900ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.045]"
        />
      ) : (
        <div className="frame-surface absolute inset-0 grid place-items-center">
          <span
            aria-hidden="true"
            className="text-canvas/[0.06] text-[clamp(6rem,20cqw,16rem)] leading-none font-black tracking-[-0.06em] select-none"
          >
            {id}
          </span>
        </div>
      )}

      {clip ? <HoverClip src={clip} poster={poster} /> : null}

      {/* Crop marks — the frame reads as a shot, not a card. */}
      <span
        aria-hidden="true"
        className="crop-mark top-3 left-3 border-t border-l"
      />
      <span
        aria-hidden="true"
        className="crop-mark top-3 right-3 border-t border-r"
      />
      <span
        aria-hidden="true"
        className="crop-mark bottom-[3.25rem] left-3 border-b border-l"
      />
      <span
        aria-hidden="true"
        className="crop-mark right-3 bottom-[3.25rem] border-r border-b"
      />

      {/* Playhead: a full-width element offset so its trailing edge sits at the
          scrub position. Transform only, so it stays on the compositor. */}
      <div
        aria-hidden="true"
        className="border-signal pointer-events-none absolute inset-y-0 left-0 w-full -translate-x-[82%] border-r transition-transform duration-[1200ms] ease-[var(--ease-out-expo)] group-hover:translate-x-0 group-focus-within:translate-x-0"
      />

      {/* Timecode strip. */}
      <div className="border-line bg-carbon-deep/70 absolute inset-x-0 bottom-0 flex h-10 items-center gap-4 border-t px-3 backdrop-blur-[2px]">
        <span className="meta text-muted shrink-0">
          {poster || clip ? "00:00:00:00" : "NO SOURCE"}
        </span>
        <span
          aria-hidden="true"
          className="timeline-ticks h-2 flex-1 opacity-70"
        />
        <span className="meta text-muted flex shrink-0 items-center gap-2">
          <PlayIcon className="h-2.5 w-2.5" />
          {runtime} · {format}
        </span>
      </div>

      <div className="from-carbon-deep/40 pointer-events-none absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
    </div>
  );
}
