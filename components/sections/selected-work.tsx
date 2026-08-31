import type { Project } from "@/data/projects";
import { projects } from "@/data/projects";
import { ArrowIcon } from "@/components/ui/icons";
import { ProjectFrame } from "@/components/sections/project-frame";
import { Reveal } from "@/components/ui/reveal";
import { SectionMarker } from "@/components/ui/section-marker";
import { cn } from "@/lib/utils";

/**
 * Column spans and vertical offsets applied by position, so the grid stays
 * deliberately uneven however many projects the data holds.
 */
const RHYTHM = [
  { slot: "md:col-span-4", sizes: "(max-width: 767px) 90vw, 30vw" },
  {
    slot: "md:col-span-7 md:col-start-6 md:mt-40",
    sizes: "(max-width: 767px) 90vw, 52vw",
  },
  { slot: "md:col-span-12", sizes: "(max-width: 767px) 90vw, 90vw" },
  { slot: "md:col-span-5 md:mt-16", sizes: "(max-width: 767px) 90vw, 38vw" },
  {
    slot: "md:col-span-6 md:col-start-7 md:mt-48",
    sizes: "(max-width: 767px) 90vw, 45vw",
  },
] as const;

export function SelectedWork() {
  const [featured, ...rest] = projects;

  return (
    <section id="work" className="scroll-mt-24 pt-8 pb-24 sm:pb-32 lg:pb-40">
      <div className="shell">
        <Reveal className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
          <div>
            <SectionMarker index="01" label="Selected work" />
            <h2 className="text-h2 mt-6 max-w-[14ch] font-black">
              The cut is the <span className="type-outline">story</span>
            </h2>
          </div>
          <p className="text-silver max-w-[38ch] text-sm leading-relaxed">
            A working selection. Each slot below is a live placeholder — real
            films drop straight in as they are cleared for release.
          </p>
        </Reveal>
      </div>

      {featured ? <FeaturedProject project={featured} /> : null}

      <div className="shell mt-20 sm:mt-28 lg:mt-32">
        <div className="grid grid-cols-1 gap-x-8 gap-y-20 sm:gap-y-24 md:grid-cols-12 md:gap-y-0">
          {rest.map((project, index) => {
            const rhythm = RHYTHM[index % RHYTHM.length];
            return (
              <Reveal
                key={project.id}
                as="article"
                className={cn("md:mb-24", rhythm.slot)}
              >
                <ProjectCard project={project} sizes={rhythm.sizes} />
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/**
 * The lead project. It runs edge to edge once there is width for it; on a
 * phone it holds the page gutter so every element in the column shares one
 * left edge.
 */
function FeaturedProject({ project }: { project: Project }) {
  return (
    <Reveal as="article" className="mt-12 sm:mt-20 lg:mt-24">
      <ProjectShell project={project}>
        <div className="shell">
          {/* The category would wrap to a ragged second line on a phone, so it
              moves down beside the title there. */}
          <div className="border-line flex items-baseline justify-between gap-4 border-t pt-4">
            <span className="label text-canvas">{project.id}</span>
            <span className="meta text-muted hidden uppercase sm:block">
              {project.category}
            </span>
            <span className="meta text-muted uppercase">
              {project.runtime
                ? `${project.year} · ${project.runtime}`
                : project.year}
            </span>
          </div>
        </div>

        <div className="shell mt-5 sm:mt-6 sm:px-0">
          <div className="sm:px-[max(0px,calc((100vw-108rem)/2))]">
            <ProjectFrame
              project={project}
              sizes="(max-width: 639px) 90vw, 100vw"
            />
          </div>
        </div>

        <div className="shell mt-5 sm:mt-6">
          <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-3">
            <div>
              <h3 className="text-h3 max-w-[16ch] font-extrabold">
                {project.title}
              </h3>
              <p className="meta text-muted mt-2 uppercase sm:hidden">
                {project.category}
              </p>
            </div>
            <p className="text-silver max-w-[46ch] text-sm leading-relaxed">
              {project.description}
            </p>
            <ProjectAction href={project.href} />
          </div>
        </div>
      </ProjectShell>
    </Reveal>
  );
}

function ProjectCard({ project, sizes }: { project: Project; sizes: string }) {
  return (
    <ProjectShell project={project}>
      <ProjectFrame project={project} sizes={sizes} />
      <div className="border-line mt-5 flex items-baseline justify-between gap-4 border-t pt-4">
        <span className="label text-canvas">{project.id}</span>
        <span className="meta text-muted uppercase">
          {project.runtime
            ? `${project.year} · ${project.runtime}`
            : project.year}
        </span>
      </div>
      <h3 className="text-h3 mt-3.5 font-extrabold">{project.title}</h3>
      <p className="meta text-muted mt-2 uppercase">{project.category}</p>
      <p className="text-silver mt-4 max-w-[44ch] text-sm leading-relaxed">
        {project.description}
      </p>
      <ProjectAction href={project.href} className="mt-5" />
    </ProjectShell>
  );
}

/**
 * Wraps a project in a link once it has a destination, and in a plain
 * container while it does not — a placeholder never pretends to be clickable.
 */
function ProjectShell({
  project,
  children,
}: {
  project: Project;
  children: React.ReactNode;
}) {
  if (!project.href) {
    return <div className="group block">{children}</div>;
  }
  return (
    <a
      href={project.href}
      className="group block"
      aria-label={`${project.title} — ${project.category}`}
    >
      {children}
    </a>
  );
}

function ProjectAction({
  href,
  className,
}: {
  href: string | null;
  className?: string;
}) {
  if (!href) {
    return (
      <span className={cn("label text-muted/70", className)}>
        Case study soon
      </span>
    );
  }
  return (
    <span
      className={cn(
        "label text-canvas flex items-center gap-3 transition-colors duration-300",
        className,
      )}
    >
      View project
      <ArrowIcon className="h-4 w-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1.5" />
    </span>
  );
}
