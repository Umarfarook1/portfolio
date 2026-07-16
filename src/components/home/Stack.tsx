"use client";

import { Rise } from "@/components/ui/Rise";
import { Scramble } from "@/components/ui/Scramble";

// Working set: plain tracked mono, grouped by layer. No logos, no orbit
// clouds, no bars. Hover scrambles a name and resolves it — a hash settling.
const groups = [
  { label: "models + agents", items: ["PyTorch", "LangGraph", "LangChain", "Gemini", "OpenAI", "Hugging Face"] },
  { label: "backend + data", items: ["Python", "FastAPI", "PostgreSQL", "BigQuery", "Redis", "Pydantic"] },
  { label: "delivery", items: ["GCP", "AWS", "Docker", "GitHub Actions", "Prometheus", "Sentry"] },
  { label: "interface", items: ["TypeScript", "Next.js", "React", "Tailwind CSS", "SSE"] },
];

export function Stack() {
  return (
    <section id="stack" className="relative py-28 sm:py-32">
      <div className="shell">
        <div className="flex items-baseline justify-between border-b border-line pb-5">
          <p className="mono-label text-lo">05 / working set</p>
          <p className="mono-label hidden text-lo/60 sm:block">experiment → observable service</p>
        </div>

        <div className="mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {groups.map((g, i) => (
            <Rise key={g.label} delay={i * 0.06}>
              <p className="mono-label text-ember">{g.label}</p>
              <ul className="mt-5 space-y-2.5">
                {g.items.map((item) => (
                  <li key={item} className="font-mono text-sm text-lo">
                    <Scramble text={item} className="cursor-default transition-colors duration-150 hover:text-hi" />
                  </li>
                ))}
              </ul>
            </Rise>
          ))}
        </div>
      </div>
    </section>
  );
}
