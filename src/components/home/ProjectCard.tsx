"use client";

import Link from "next/link";
import { RegistrationMark } from "@/components/ui/RegistrationMark";
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

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <article
      onMouseMove={onMove}
      className={cn(
        "spotlight lift group flex h-full flex-col overflow-hidden rounded-2xl border bg-card p-7 sm:p-8",
        project.featured ? "border-foreground" : "border-foreground/15 hover:border-foreground/40",
      )}
    >
      {project.featured && <span className="absolute inset-x-0 top-0 h-1 bg-accent" aria-hidden="true" />}

      <div className="flex items-start justify-between gap-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/60">{project.type}</p>
        <span className="flex items-center gap-3 font-mono text-[11px] font-semibold text-foreground/40">
          {String(index + 1).padStart(2, "0")}
          <RegistrationMark className="h-3.5 w-3.5 text-foreground/35" />
        </span>
      </div>

      <h3
        className={cn(
          "mt-5 font-[family-name:var(--font-display)] font-extrabold tracking-tight text-foreground",
          project.featured ? "text-4xl sm:text-5xl" : "text-3xl",
        )}
      >
        {project.title}
      </h3>

      <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground">{project.description}</p>

      <div className="mt-6 grid gap-2 border-l-2 border-accent pl-4">
        {project.evidence.map((item) => (
          <div key={item} className="font-mono text-[11px] text-foreground/75">
            {item}
          </div>
        ))}
      </div>

      <div className="mt-auto pt-7">
        <div className="flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <span
              key={item}
              className="rounded-full border border-foreground/15 px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-foreground/55"
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
            className="group/link inline-flex min-h-10 items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-wider text-foreground"
          >
            Source
            <ArrowDiagonal className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
          </Link>
          {project.live ? (
            <Link
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="group/link inline-flex min-h-10 items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-wider text-foreground"
            >
              {project.liveLabel ?? "Live demo"}
              <ArrowDiagonal className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}
