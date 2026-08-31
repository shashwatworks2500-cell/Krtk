import { navigation, site, socials } from "@/data/site";
import { resolveChannelHref } from "@/lib/contact";

export function SiteFooter() {
  return (
    <footer className="border-line bg-carbon-deep border-t">
      <div className="shell py-14 sm:py-16">
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="text-canvas text-3xl font-black tracking-[-0.045em] uppercase sm:text-4xl">
              {site.name}
            </p>
            <p className="meta text-muted mt-3 uppercase">
              {site.role} / {site.discipline}
            </p>
          </div>

          <nav aria-label="Footer" className="md:col-span-3 md:col-start-7">
            <p className="label text-muted">Index</p>
            <ul className="mt-4 space-y-2">
              {navigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-silver hover:text-canvas text-sm transition-colors duration-300"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3 md:col-start-10">
            <p className="label text-muted">Elsewhere</p>
            <ul className="mt-4 space-y-2">
              {socials.map((channel) => {
                const href = resolveChannelHref(channel);
                return (
                  <li key={channel.label}>
                    {href ? (
                      <a
                        href={href}
                        className="text-silver hover:text-canvas text-sm transition-colors duration-300"
                      >
                        {channel.value}
                      </a>
                    ) : (
                      <span className="text-muted text-sm">
                        {channel.value}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="border-line mt-14 flex flex-wrap items-center justify-between gap-4 border-t pt-6">
          <p className="meta text-muted">
            © {site.year} {site.name}
          </p>
          <a
            href="#top"
            className="meta text-muted hover:text-canvas uppercase transition-colors duration-300"
          >
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
