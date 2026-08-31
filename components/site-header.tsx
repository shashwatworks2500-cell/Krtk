"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { navigation, site } from "@/data/site";
import { cn } from "@/lib/utils";

const SECTION_IDS = navigation.map((item) => item.href.slice(1));

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [lifted, setLifted] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  /* Solid backing once the hero is behind us. A one-pixel sentinel keeps this
     off the scroll thread. */
  useEffect(() => {
    const sentinel = document.getElementById("header-sentinel");
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => setLifted(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  /* Active section for the nav. */
  useEffect(() => {
    const sections = SECTION_IDS.map((id) =>
      document.getElementById(id),
    ).filter((node): node is HTMLElement => node !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  /* Escape, scroll lock and a focus loop while the mobile panel is open. */
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled])",
      );
      if (!focusable || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    panelRef.current?.querySelector<HTMLElement>("a[href]")?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, close]);

  return (
    <>
      {/* Dims the page behind the mobile panel; tapping it closes the menu.
          It lives outside <header> because the header's backdrop-filter would
          otherwise become the containing block for a fixed child. */}
      <button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        hidden={!open}
        onClick={close}
        className="bg-carbon-deep/80 fixed inset-x-0 top-16 bottom-0 z-40 md:hidden"
      />

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
          "ease-[var(--ease-out-quart)] border-b",
          lifted || open
            ? "border-line bg-carbon/85 backdrop-blur-md"
            : "border-transparent bg-transparent",
        )}
      >
        <a
          href="#work"
          className="label bg-canvas text-carbon sr-only px-4 py-2 focus-visible:not-sr-only focus-visible:absolute focus-visible:top-3 focus-visible:left-3"
        >
          Skip to content
        </a>

        <div className="shell flex h-16 items-center justify-between gap-6 sm:h-20">
          <a
            href="#top"
            className="group flex items-baseline gap-2"
            aria-label={`${site.name} — home`}
          >
            <span className="text-canvas text-lg leading-none font-extrabold tracking-[-0.04em] uppercase sm:text-xl">
              {site.name}
            </span>
            <span
              className="bg-signal mb-[3px] h-1 w-1 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-[-2px]"
              aria-hidden="true"
            />
          </a>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-8 lg:gap-10">
              {navigation.map((item) => {
                const isActive = active === item.href.slice(1);
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "label group relative block py-2 transition-colors duration-300",
                        isActive
                          ? "text-canvas"
                          : "text-muted hover:text-canvas",
                      )}
                    >
                      {item.label}
                      <span
                        className={cn(
                          "bg-signal absolute -bottom-px left-0 h-px origin-left transition-transform duration-500 ease-[var(--ease-out-expo)]",
                          "w-full scale-x-0 group-hover:scale-x-100",
                          isActive && "scale-x-100",
                        )}
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="label text-canvas -mr-1 px-1 py-2 md:hidden"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>

        {/* Playhead: scroll progress as a scrubber. CSS-only, so it costs no
          scroll listener; browsers without scroll timelines simply omit it. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
        >
          <div className="bg-signal playhead h-full w-full origin-left scale-x-0" />
        </div>

        <div
          ref={panelRef}
          id="mobile-nav"
          hidden={!open}
          className="border-line bg-carbon/98 border-t backdrop-blur-md md:hidden"
        >
          <nav aria-label="Primary mobile" className="shell py-8">
            <ul className="flex flex-col">
              {navigation.map((item, index) => (
                <li
                  key={item.href}
                  className="border-line border-b last:border-b-0"
                >
                  <a
                    href={item.href}
                    onClick={close}
                    className="text-canvas flex items-baseline gap-4 py-5 text-3xl font-extrabold tracking-[-0.03em] uppercase"
                  >
                    <span className="meta text-muted">0{index + 1}</span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="meta text-muted mt-8 uppercase">
              {site.availability}
            </p>
          </nav>
        </div>
      </header>
    </>
  );
}
