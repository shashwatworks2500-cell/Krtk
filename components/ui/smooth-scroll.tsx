"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Momentum scrolling, opt-out by default for anyone who asked for reduced
 * motion. Native anchor behaviour, find-in-page and keyboard scrolling are
 * left intact — Lenis only interpolates wheel and touch deltas.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      // Native touch scrolling stays untouched: it is already smooth and
      // interpolating it breaks momentum and overscroll on iOS.
      syncTouch: false,
      touchMultiplier: 1,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    const stopOnReduceMotion = (event: MediaQueryListEvent) => {
      if (event.matches) lenis.stop();
      else lenis.start();
    };
    reduceMotion.addEventListener("change", stopOnReduceMotion);

    return () => {
      cancelAnimationFrame(frame);
      reduceMotion.removeEventListener("change", stopOnReduceMotion);
      lenis.destroy();
    };
  }, []);

  return null;
}
