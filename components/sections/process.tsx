import { processSteps } from "@/data/process";
import { Reveal } from "@/components/ui/reveal";
import { SectionMarker } from "@/components/ui/section-marker";

export function Process() {
  return (
    <section className="border-line bg-carbon-deep border-t py-24 sm:py-32 lg:py-36">
      <div className="shell">
        <Reveal className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
          <SectionMarker index="04" label="Process" />
          <p className="text-silver max-w-[36ch] text-sm leading-relaxed">
            Four stages, the same every time — so you always know where a
            project stands.
          </p>
        </Reveal>

        <ol className="mt-14 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {processSteps.map((step, index) => (
            <Reveal
              as="li"
              key={step.id}
              delay={index * 70}
              className="border-line relative border-t pt-5"
            >
              <span
                aria-hidden="true"
                className="bg-signal absolute top-0 left-0 h-px w-8"
              />
              <span className="meta text-muted">{step.id}</span>
              <h3 className="mt-4 text-xl font-extrabold tracking-[-0.02em] uppercase sm:text-2xl">
                {step.title}
              </h3>
              <p className="text-silver mt-3 text-sm leading-relaxed">
                {step.description}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
