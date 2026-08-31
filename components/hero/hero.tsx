import Image from "next/image";
import { heroBlurDataURL } from "@/app/hero-blur";
import { site } from "@/data/site";

/**
 * Full-viewport editorial cover: oversized wordmark layered with the
 * portrait, corner metadata, and a single signal rule tying the two together.
 */
export function Hero() {
  return (
    <section
      id="top"
      className="bg-carbon-deep relative isolate min-h-[100dvh] overflow-hidden"
    >
      {/* Layer 0 — the solid wordmark, behind the subject. */}
      <div className="hero-slot z-0">
        <h1 className="hero-word hero-word--solid">
          {site.name}
          <span className="sr-only">
            {" "}
            — {site.role} and {site.discipline}
          </span>
        </h1>
      </div>

      {/* The edit line: one rule crossing the whole composition at the
          wordmark baseline. */}
      <div
        aria-hidden="true"
        className="bg-signal/70 absolute inset-x-0 bottom-[21vh] z-20 h-px md:bottom-[15vh] md:z-0"
      />

      {/* Layer 1 — the subject. */}
      <div className="absolute inset-0 z-10">
        <div className="absolute right-[-12%] bottom-0 h-[70vh] w-[80%] sm:right-[-6%] sm:h-[82vh] sm:w-[74%] md:right-[2%] md:w-[54%] md:max-w-[680px] lg:right-[7%] lg:w-[46%]">
          <Image
            src="/images/kartik-hero.jpg"
            alt={`${site.name}, ${site.role.toLowerCase()}, photographed in a doorway`}
            fill
            preload
            fetchPriority="high"
            placeholder="blur"
            blurDataURL={heroBlurDataURL}
            sizes="(max-width: 639px) 80vw, (max-width: 767px) 74vw, (max-width: 1023px) 54vw, 46vw"
            className="hero-portrait object-cover object-[52%_14%]"
          />
          {/* Wash the lit wall on the right back down to carbon. */}
          <div className="to-carbon-deep absolute inset-0 bg-gradient-to-r from-transparent via-transparent" />
        </div>

        {/* Scrim: heavy on a phone, where the wordmark sits on top of the
            photograph; a whisper on desktop, where it only sinks the base. */}
        <div className="from-carbon-deep via-carbon-deep/60 absolute inset-x-0 bottom-0 h-[22vh] bg-gradient-to-t to-transparent md:hidden" />
      </div>

      {/* Layer 2 — outlined wordmark in front of the subject. */}
      <div className="hero-slot hero-outline-mask z-20" aria-hidden="true">
        <span className="hero-word hero-word--outline">{site.name}</span>
      </div>

      {/* Layer 3 — metadata. */}
      <div className="shell relative z-30 flex min-h-[100dvh] flex-col justify-between pt-24 pb-8 sm:pt-28 sm:pb-10">
        <div className="flex items-start justify-between gap-6">
          <p className="label text-silver">
            <span className="block sm:inline">{site.role}</span>
            <span className="text-muted hidden sm:inline" aria-hidden="true">
              {" "}
              /{" "}
            </span>
            <span className="mt-1 block sm:mt-0 sm:inline">
              {site.discipline}
            </span>
          </p>
          <p className="label text-muted flex shrink-0 items-center gap-2 text-right">
            <span
              className="bg-signal record-dot h-1.5 w-1.5 rounded-full"
              aria-hidden="true"
            />
            <span className="hidden sm:inline">{site.availability}</span>
            <span className="sm:hidden">Available</span>
          </p>
        </div>

        <div>
          {/* The tagline sits beside the scroll cue on wider screens; on a
              phone it gets its own line so it is not squeezed to two words. */}
          <p className="text-silver mb-7 text-sm leading-relaxed sm:hidden">
            <span className="block">Raw footage in.</span>
            <span className="block">A finished story out.</span>
          </p>

          <div className="flex items-end justify-between gap-8">
            <a
              href="#work"
              className="group text-muted hover:text-canvas flex items-center gap-3 transition-colors duration-300"
            >
              <span
                className="scroll-cue relative block h-10 w-px overflow-hidden bg-white/15"
                aria-hidden="true"
              />
              <span className="label">Scroll to explore</span>
            </a>

            <p className="text-silver hidden max-w-[22ch] text-right text-sm leading-relaxed text-balance sm:block">
              Raw footage in. A finished story out.
            </p>
          </div>
        </div>
      </div>

      <div
        id="header-sentinel"
        className="absolute top-[70vh] h-px w-px"
        aria-hidden="true"
      />
    </section>
  );
}
