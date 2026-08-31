import { Reveal } from "@/components/ui/reveal";

/** Bridge between the cover and the work — one idea, given room. */
export function Statement() {
  return (
    <section className="border-line border-t py-20 sm:py-28 lg:py-36">
      <div className="shell grid grid-cols-1 gap-10 md:grid-cols-12">
        <Reveal className="md:col-span-3">
          <p className="meta text-muted uppercase">The premise</p>
        </Reveal>
        <Reveal delay={80} className="md:col-span-9">
          <p className="text-statement text-canvas max-w-[20ch] font-extrabold">
            Footage is raw material. The edit is where it becomes something
            people finish.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
