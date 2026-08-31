import { Hero } from "@/components/hero/hero";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Process } from "@/components/sections/process";
import { SelectedWork } from "@/components/sections/selected-work";
import { Services } from "@/components/sections/services";
import { Statement } from "@/components/sections/statement";
import { site } from "@/data/site";

/** Person record so search engines read the site as a portfolio, not a page. */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: `${site.role} & ${site.discipline}`,
  description: site.description,
  url: site.url,
};

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Statement />
        <SelectedWork />
        <About />
        <Services />
        <Process />
        <Contact />
      </main>
      <SiteFooter />
      <script
        type="application/ld+json"
        // Static, author-controlled data — no user input reaches this string.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
    </>
  );
}
