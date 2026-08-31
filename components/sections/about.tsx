import Image from "next/image";
import { site } from "@/data/site";
import { Reveal } from "@/components/ui/reveal";
import { SectionMarker } from "@/components/ui/section-marker";

const ROLES = ["Editor", "Storyteller", "Visual thinker"] as const;

export function About() {
  return (
    <section
      id="about"
      className="border-line scroll-mt-24 border-t py-24 sm:py-32 lg:py-40"
    >
      <div className="shell grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-12">
        <Reveal className="md:col-span-4">
          <SectionMarker index="02" label="About" />
          <ul className="mt-10 flex flex-col">
            {ROLES.map((role) => (
              <li
                key={role}
                className="border-line text-canvas border-t py-4 text-2xl font-extrabold tracking-[-0.03em] uppercase last:border-b sm:text-3xl"
              >
                {role}
              </li>
            ))}
          </ul>

          <div className="border-line relative mt-12 hidden aspect-[4/5] max-w-[22rem] overflow-hidden border md:block">
            <Image
              src="/images/kartik-portrait.jpg"
              alt={`${site.name} at work`}
              fill
              loading="lazy"
              sizes="(max-width: 1023px) 40vw, 22rem"
              className="object-cover object-[52%_28%] brightness-[0.6] grayscale contrast-[1.2]"
            />
            {/* Sink the base of the crop into the section, matching the hero. */}
            <div
              aria-hidden="true"
              className="from-carbon absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t to-transparent"
            />
            <span
              aria-hidden="true"
              className="bg-signal absolute bottom-0 left-0 h-px w-16"
            />
          </div>
        </Reveal>

        <div className="md:col-span-7 md:col-start-6">
          <Reveal>
            <p className="text-lead text-canvas max-w-[26ch] font-semibold text-balance">
              Kartik is a video editor focused on turning raw footage into
              clear, engaging and visually memorable stories.
            </p>
          </Reveal>

          <Reveal delay={80} className="mt-10 max-w-[54ch] space-y-6">
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

          <Reveal delay={160} className="border-line mt-12 border-t pt-6">
            <p className="meta text-muted uppercase">Working in</p>
            <p className="text-silver mt-3 text-sm">
              Short form · Long form · Commercial · Cinematic · Creator content
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
