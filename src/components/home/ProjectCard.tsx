import Link from "next/link";
import { ArrowDiagonal } from "@/components/ui/Arrow";
import { cn } from "@/lib/utils";

export interface Project {
  title: string;
  type: string;
  description: string;
  evidence: string[];
  stack: string[];
  repo: string;
  live?: string;
  liveLabel?: string;
  featured?: boolean;
}

// A case file. Hover is sequenced typesetting, total under 200ms:
// top rule draws (0ms) -> folio ticks red (+40ms) -> title underline (+80ms).
// Return leg reverses everything fast with zero delays.
export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article
      className={cn(
        "casefile group flex h-full flex-col overflow-hidden rounded-[6px] border bg-card p-7 sm:p-8",
        project.featured ? "border-foreground" : "border-foreground/20 hover:border-foreground/60",
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/60">{project.type}</p>
        <span className="font-mono text-[11px] font-semibold tracking-[0.18em] text-foreground/40 transition-colors delay-0 duration-[120ms] group-hover:text-accent group-hover:delay-[40ms]">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <h3
        className={cn(
          "display mt-5 text-foreground underline decoration-transparent decoration-[3px] underline-offset-[6px] transition-[text-decoration-color] duration-[120ms] group-hover:decoration-accent group-hover:delay-[80ms]",
          project.featured ? "text-4xl sm:text-5xl" : "text-3xl",
        )}
      >
        {project.title}
      </h3>

      <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground">{project.description}</p>

      <div className="mt-6 grid gap-2 border-l-2 border-accent pl-4">
        {project.evidence.map((item) => (
          <div key={item} className="font-mono text-[11px] tabular-nums text-foreground/75">
            {item}
          </div>
        ))}
      </div>

      <div className="mt-auto pt-7">
        <div className="flex flex-wrap gap-x-2 gap-y-2">
          {project.stack.map((item) => (
            <span
              key={item}
              className="rounded-[2px] bg-accent/15 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-foreground/70"
            >
              {item}
            </span>
          ))}
        </div>
        <div className="mt-6 flex items-center gap-6 border-t border-foreground/12 pt-5">
          <Link
            href={project.repo}
            target="_blank"
            rel="noreferrer"
            className="group/link inline-flex min-h-10 items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-wider text-foreground underline decoration-transparent decoration-2 underline-offset-4 transition-colors duration-[120ms] hover:decoration-accent"
          >
            Source
            <ArrowDiagonal className="h-3.5 w-3.5 transition-transform duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
          </Link>
          {project.live ? (
            <Link
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="group/link inline-flex min-h-10 items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-wider text-foreground underline decoration-transparent decoration-2 underline-offset-4 transition-colors duration-[120ms] hover:decoration-accent"
            >
              {project.liveLabel ?? "Live demo"}
              <ArrowDiagonal className="h-3.5 w-3.5 transition-transform duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}
