import Image from "next/image";
import { heroBlurDataURL } from "@/app/hero-blur";
import { site } from "@/data/site";

/**
 * Full-viewport editorial cover. The subject is a cut-out, so the wordmark set
 * behind him is genuinely occluded rather than masked around a rectangle; a
 * second outlined pass in front carries the hidden letters back across his body
 * so the word still reads as a word.
 */
export function Hero() {
  return (
    <section
      id="top"
      className="bg-carbon-deep relative isolate min-h-[100dvh] overflow-hidden"
    >
      {/* A single soft key light behind the subject, so he stands in the frame
          rather than floating on flat black. */}
      <div aria-hidden="true" className="hero-key-light" />

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
        className="bg-signal/70 absolute inset-x-0 bottom-[21vh] z-0 h-px md:bottom-[15vh]"
      />

      {/* Layer 1 — the subject, standing on the base of the frame. */}
      <div className="pointer-events-none absolute inset-0 z-10">
        <div className="absolute right-[-8%] bottom-0 h-[68vh] sm:right-[-2%] sm:h-[74vh] md:right-[3%] md:h-[76vh] lg:right-[8%] lg:h-[78vh]">
          <Image
            src="/images/kartik-hero.webp"
            alt={`${site.name}, ${site.role.toLowerCase()}, filming with a handheld gimbal`}
            width={1000}
            height={1837}
            preload
            fetchPriority="high"
            placeholder="blur"
            blurDataURL={heroBlurDataURL}
            sizes="(max-width: 639px) 80vw, (max-width: 767px) 60vw, (max-width: 1023px) 45vw, 32vw"
            className="hero-portrait h-full w-auto object-contain object-bottom"
          />
        </div>
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
