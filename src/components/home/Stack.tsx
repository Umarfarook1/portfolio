import { SectionHeader } from "@/components/ui/SectionHeader";

// Every item here appears in a shipped repo or in the resume. Nothing aspirational.
const groups = [
  {
    label: "Models + agents",
    items: ["Claude", "Gemini", "OpenAI", "LangChain", "sentence-transformers", "Hugging Face"],
  },
  {
    label: "Backend + data",
    items: ["Python", "FastAPI", "PostgreSQL", "BigQuery", "FAISS", "Redis", "Pydantic"],
  },
  { label: "Delivery", items: ["GCP", "AWS", "Docker", "GitHub Actions", "Alembic", "Prometheus"] },
  { label: "Interface", items: ["TypeScript", "Next.js", "React", "Tailwind CSS", "SSE"] },
];

export function Stack() {
  return (
    <section id="stack" className="py-24 sm:py-32">
      <div className="shell">
        <SectionHeader
          label="Stack"
          title="Everything here is in something I shipped."
          aside="nothing here is aspirational"
        />

        <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {groups.map((g) => (
            <div key={g.label}>
              <p className="label">{g.label}</p>
              <ul className="mt-4 space-y-2 text-[15px] leading-6 text-muted">
                {g.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
