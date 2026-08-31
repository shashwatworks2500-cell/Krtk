"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type ProjectClipProps = {
  src: string;
};

/**
 * Muted preview loop. On a pointer device it plays on hover or keyboard focus;
 * on touch, where there is no hover, it plays while the card is on screen —
 * otherwise a phone visitor would never see the work move. Nothing autoplays
 * under reduced motion, and nothing is fetched until it is needed.
 *
 * Only mounted for projects that actually have a clip, so a portfolio of
 * stills ships none of this.
 */
export function ProjectClip({ src }: ProjectClipProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const play = () => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setPlaying(true);
    void video.play().catch(() => {
      // An autoplay refusal is not worth surfacing — the poster stands in.
      setPlaying(false);
    });
  };

  const stop = () => {
    const video = ref.current;
    setPlaying(false);
    if (!video) return;
    video.pause();
    video.currentTime = 0;
  };

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    // Hover devices are handled by the pointer and focus events below.
    if (window.matchMedia("(hover: hover)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPlaying(true);
          void video.play().catch(() => setPlaying(false));
        } else {
          setPlaying(false);
          video.pause();
        }
      },
      { threshold: 0.55 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      muted
      loop
      playsInline
      preload="none"
      tabIndex={-1}
      aria-hidden="true"
      onMouseEnter={play}
      onMouseLeave={stop}
      onFocus={play}
      onBlur={stop}
      className={cn(
        "absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-[var(--ease-out-quart)]",
        "group-hover:opacity-100 group-focus-within:opacity-100",
        playing ? "opacity-100" : "opacity-0",
      )}
    />
  );
}
