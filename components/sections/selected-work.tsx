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

      <div className="shell mt-24 sm:mt-32">
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-12 md:gap-y-0">
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

/** The lead project runs edge to edge with its metadata set beside it. */
function FeaturedProject({ project }: { project: Project }) {
  return (
    <Reveal as="article" className="mt-16 sm:mt-24">
      <ProjectShell project={project}>
        <div className="shell">
          <div className="border-line flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-t pt-4">
            <span className="label text-canvas">{project.id}</span>
            <span className="meta text-muted uppercase">
              {project.category}
            </span>
            <span className="meta text-muted ml-auto uppercase">
              {project.year} · {project.runtime}
            </span>
          </div>
        </div>

        <div className="mt-6 px-[max(0px,calc((100vw-108rem)/2))]">
          <ProjectFrame
            project={project}
            sizes="100vw"
            className="border-x-0 sm:border-x"
          />
        </div>

        <div className="shell mt-6">
          <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-4">
            <h3 className="text-h3 max-w-[16ch] font-extrabold">
              {project.title}
            </h3>
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
          {project.year} · {project.runtime}
        </span>
      </div>
      <h3 className="text-h3 mt-4 font-extrabold">{project.title}</h3>
      <p className="meta text-muted mt-2 uppercase">{project.category}</p>
      <p className="text-silver mt-4 max-w-[44ch] text-sm leading-relaxed">
        {project.description}
      </p>
      <ProjectAction href={project.href} className="mt-6" />
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
