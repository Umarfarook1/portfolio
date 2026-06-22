"use client";

import Link from "next/link";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
import { RegistrationMark } from "@/components/ui/RegistrationMark";
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
        "spotlight lift group flex h-full flex-col overflow-hidden rounded-2xl border bg-card/70 p-7 backdrop-blur-sm sm:p-8",
        project.featured ? "border-primary/25 glow-ring" : "border-border/80 hover:border-primary/30",
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-primary">{project.type}</p>
        <span className="flex items-center gap-3 font-mono text-[10px] text-muted-foreground">
          {String(index + 1).padStart(2, "0")}
          <RegistrationMark className="h-3.5 w-3.5" />
        </span>
      </div>

      <h3
        className={cn(
          "mt-5 font-[family-name:var(--font-display)] font-semibold tracking-tight text-foreground",
          project.featured ? "text-4xl sm:text-5xl" : "text-3xl",
        )}
      >
        {project.title}
      </h3>

      <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground">{project.description}</p>

      <div className="mt-6 grid gap-2 border-l border-primary/35 pl-4">
        {project.evidence.map((item) => (
          <div key={item} className="flex items-center gap-2 font-mono text-[11px] text-foreground/80">
            <span className="h-1 w-1 rounded-full bg-primary" aria-hidden="true" />
            {item}
          </div>
        ))}
      </div>

      <div className="mt-auto pt-7">
        <div className="flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <span
              key={item}
              className="rounded-full border border-border/80 bg-background/40 px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-muted-foreground"
            >
              {item}
            </span>
          ))}
        </div>
        <div className="mt-6 flex items-center gap-5 border-t border-border/60 pt-5">
          <Link
            href={project.repo}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-10 items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-foreground transition-colors hover:text-primary"
          >
            <Github className="h-4 w-4" aria-hidden="true" /> Source
            <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
          </Link>
          {project.live ? (
            <Link
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-10 items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-foreground transition-colors hover:text-primary"
            >
              <ExternalLink className="h-4 w-4" aria-hidden="true" /> {project.liveLabel ?? "Live demo"}
              <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}
