import { contact, site } from "@/data/site";
import { resolveChannelHref } from "@/lib/contact";
import { ArrowIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { SectionMarker } from "@/components/ui/section-marker";

export function Contact() {
  const primary = contact[0];
  const primaryHref = primary ? resolveChannelHref(primary) : null;

  return (
    <section
      id="contact"
      className="border-line scroll-mt-24 border-t py-24 sm:py-32 lg:py-40"
    >
      <div className="shell">
        <Reveal>
          <SectionMarker index="05" label="Contact" />
        </Reveal>

        <Reveal delay={60}>
          <h2 className="text-h2 mt-8 max-w-[15ch] font-black">
            Send the footage.{" "}
            <span className="block">
              I&rsquo;ll send back a{" "}
              <span className="text-signal-bright">story.</span>
            </span>
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 sm:mt-14 md:grid-cols-12 lg:mt-20">
          <Reveal delay={120} className="md:col-span-5">
            {primaryHref ? (
              <a
                href={primaryHref}
                className="group bg-signal text-canvas hover:bg-signal-pressed inline-flex items-center gap-4 px-7 py-4 text-sm font-bold tracking-[0.08em] uppercase transition-colors duration-300 ease-[var(--ease-out-quart)]"
              >
                Start a project
                <ArrowIcon className="h-4 w-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1.5" />
              </a>
            ) : null}
            <p className="text-silver mt-8 max-w-[34ch] text-sm leading-relaxed">
              Tell me what you shot, who it is for and when you need it. A rough
              cut brief is enough to start.
            </p>
          </Reveal>

          <Reveal delay={180} className="md:col-span-6 md:col-start-7">
            <ul>
              {contact.map((channel) => {
                const href = resolveChannelHref(channel);
                return (
                  <li
                    key={channel.label}
                    className="border-line group border-t last:border-b"
                  >
                    <ChannelRow channel={channel} href={href} />
                  </li>
                );
              })}
            </ul>
            <p className="meta text-muted mt-8 uppercase">
              {site.availability}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ChannelRow({
  channel,
  href,
}: {
  channel: { label: string; value: string };
  href: string | null;
}) {
  const content = (
    <>
      {/* A fixed label column costs a third of a phone screen, so the label
          sits above the value until there is room beside it. */}
      <span className="flex min-w-0 flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
        <span className="label text-muted sm:w-24 sm:shrink-0">
          {channel.label}
        </span>
        <span className="text-canvas truncate text-lg font-semibold tracking-[-0.01em] sm:text-xl">
          {channel.value}
        </span>
      </span>
      {href ? (
        <ArrowIcon className="text-muted ml-auto h-4 w-4 shrink-0 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1.5" />
      ) : null}
    </>
  );

  const className =
    "flex items-center gap-4 py-4 transition-colors duration-300 sm:py-5";

  if (!href) {
    return <div className={className}>{content}</div>;
  }

  return (
    <a href={href} className={className}>
      {content}
    </a>
  );
}
