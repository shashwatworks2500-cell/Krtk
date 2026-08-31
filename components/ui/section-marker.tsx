import { cn } from "@/lib/utils";

type SectionMarkerProps = {
  /** Zero-padded section index, e.g. "01". */
  index: string;
  label: string;
  className?: string;
};

/**
 * Editorial section marker: index, signal rule, name.
 * The red appears as a rule rather than as type — at 3:1 on carbon it is
 * legible as a mark but not as small copy.
 */
export function SectionMarker({ index, label, className }: SectionMarkerProps) {
  return (
    <div className={cn("flex items-center gap-3 sm:gap-4", className)}>
      <span className="label text-canvas">{index}</span>
      <span className="bg-signal h-px w-6 sm:w-10" aria-hidden="true" />
      <span className="label text-muted">{label}</span>
    </div>
  );
}
