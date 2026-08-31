import { services } from "@/data/services";
import { Reveal } from "@/components/ui/reveal";
import { SectionMarker } from "@/components/ui/section-marker";

export function Services() {
  return (
    <section
      id="services"
      className="border-line scroll-mt-24 border-t py-24 sm:py-32 lg:py-40"
    >
      <div className="shell">
        <Reveal className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
          <div>
            <SectionMarker index="03" label="Services" />
            <h2 className="text-h2 mt-6 max-w-[12ch] font-black">
              What I take on
            </h2>
          </div>
          <p className="text-silver max-w-[34ch] text-sm leading-relaxed">
            Scope is set per project. Ongoing retainers and one-off films are
            both on the table.
          </p>
        </Reveal>

        <ul className="mt-16 sm:mt-20">
          {services.map((service, index) => (
            <Reveal
              as="li"
              key={service.id}
              delay={Math.min(index, 3) * 60}
              className="border-line group relative border-t last:border-b"
            >
              <div className="relative grid grid-cols-1 items-start gap-x-8 gap-y-4 py-8 transition-transform duration-500 ease-[var(--ease-out-quart)] md:grid-cols-12 md:py-10 md:group-hover:translate-x-2">
                <span className="text-h3 group-hover:text-signal-bright font-mono font-medium text-white/35 transition-colors duration-500 md:col-span-2">
                  {service.id}
                </span>
                <h3 className="text-h3 font-extrabold md:col-span-4">
                  {service.title}
                </h3>
                <p className="text-silver max-w-[52ch] text-sm leading-relaxed md:col-span-5 md:col-start-8">
                  {service.description}
                  <span className="meta text-muted mt-4 block uppercase">
                    {service.includes.join(" · ")}
                  </span>
                </p>
              </div>
              <span
                aria-hidden="true"
                className="bg-signal absolute inset-x-0 top-0 h-px origin-left scale-x-0 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
              />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
