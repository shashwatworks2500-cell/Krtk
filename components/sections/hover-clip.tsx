"use client";

import { useRef } from "react";

type HoverClipProps = {
  src: string;
  poster: string | null;
};

/**
 * Muted preview loop. Only mounted for projects that actually have a clip, so
 * a portfolio of stills ships no client JavaScript for this.
 */
export function HoverClip({ src, poster }: HoverClipProps) {
  const ref = useRef<HTMLVideoElement>(null);

  const play = () => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    void video.play().catch(() => {
      /* Autoplay refusals are not worth surfacing — the poster stands in. */
    });
  };

  const pause = () => {
    const video = ref.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
  };

  return (
    <video
      ref={ref}
      src={src}
      poster={poster ?? undefined}
      muted
      loop
      playsInline
      preload="none"
      tabIndex={-1}
      aria-hidden="true"
      onMouseEnter={play}
      onMouseLeave={pause}
      onFocus={play}
      onBlur={pause}
      className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 ease-[var(--ease-out-quart)] group-hover:opacity-100 group-focus-within:opacity-100"
    />
  );
}
