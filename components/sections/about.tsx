import Image from "next/image";
import { aboutQuote, site } from "@/data/site";
import { joinInline } from "@/lib/typography";
import { Reveal } from "@/components/ui/reveal";
import { SectionMarker } from "@/components/ui/section-marker";

const ROLES = ["Editor", "Storyteller", "Visual thinker"] as const;

export function About() {
  return (
    <section
      id="about"
      className="border-line scroll-mt-24 border-t py-20 sm:py-32 lg:py-40"
    >
      <div className="shell grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-12 md:gap-y-14">
        <Reveal className="md:col-span-5 lg:col-span-4">
          <SectionMarker index="02" label="About" />
          <ul className="mt-8 flex flex-col md:mt-10">
            {ROLES.map((role) => (
              <li
                key={role}
                className="border-line text-canvas border-t py-3.5 text-2xl font-extrabold tracking-[-0.03em] uppercase last:border-b sm:text-3xl md:py-4"
              >
                {role}
              </li>
            ))}
          </ul>

          {/* The portrait carries the section on a phone, where the copy would
              otherwise be an unbroken wall of text. */}
          <figure className="mt-10 md:mt-12">
            <div className="border-line relative aspect-[4/5] overflow-hidden border md:max-w-[22rem]">
              <Image
                src="/images/kartik-portrait.jpg"
                alt={`${site.name} at work`}
                fill
                loading="lazy"
                sizes="(max-width: 767px) 88vw, (max-width: 1023px) 40vw, 22rem"
                className="object-cover object-[52%_28%] brightness-[0.6] grayscale contrast-[1.2]"
              />
              <div
                aria-hidden="true"
                className="from-carbon absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t to-transparent"
              />
              <span
                aria-hidden="true"
                className="bg-signal absolute bottom-0 left-0 h-px w-16"
              />
            </div>

            <figcaption className="mt-6 md:max-w-[22rem]">
              <blockquote className="text-canvas text-lg leading-snug font-semibold text-balance sm:text-xl">
                &ldquo;{aboutQuote.text}&rdquo;
              </blockquote>
              <p className="label text-muted mt-4 flex items-center gap-3">
                <span aria-hidden="true" className="bg-signal h-px w-6" />
                {aboutQuote.attribution}
              </p>
            </figcaption>
          </figure>
        </Reveal>

        <div className="md:col-span-6 md:col-start-7 lg:col-span-7 lg:col-start-6">
          <Reveal>
            <p className="text-lead text-canvas max-w-[26ch] font-semibold text-balance">
              Kartik is a video editor focused on turning raw footage into
              clear, engaging and visually memorable stories.
            </p>
          </Reveal>

          <Reveal delay={80} className="mt-8 max-w-[54ch] space-y-6 md:mt-10">
            <p className="text-silver">
              The work starts before the timeline. Watching everything that was
              shot, finding the line the material actually wants to follow, and
              deciding what the piece has to do for whoever is watching it —
              that is where the edit is won or lost.
            </p>
            <p className="text-silver">
              What follows is craft: rhythm, silence, sound, colour and the
              restraint to cut anything that does not earn its place. The goal
              is never to make the editing visible. It is to make the story
              land.
            </p>
          </Reveal>

          <Reveal
            delay={160}
            className="border-line mt-10 border-t pt-6 md:mt-12"
          >
            <p className="meta text-muted uppercase">Working in</p>
            <p className="text-silver mt-3 text-sm">
              {joinInline([
                "Short form",
                "Long form",
                "Commercial",
                "Cinematic",
                "Creator content",
              ])}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
