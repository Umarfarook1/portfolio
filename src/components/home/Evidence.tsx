import { SectionHeader } from "@/components/ui/SectionHeader";

// Three headline figures, four supporting ones. Every value is in the named
// repo and can be rerun from it.
const headline = [
  {
    value: "14/15",
    caption: "exact-match field extraction from raw quote emails · 6 fields, n = 15",
    source: "Cargo Concierge ablation",
  },
  {
    value: "0.782",
    caption: "YOLOv8n mAP@0.5 · 6,000-image sample, 25 epochs",
    source: "License Plate Privacy Blurring",
  },
  {
    value: "2,680 ms",
    caption: "mean extraction latency · Gemini Flash, full instructions",
    source: "Cargo Concierge ablation",
  },
];

const secondary = [
  {
    value: "+33 pts",
    caption: "accuracy the rules block is worth · 15-item ablation",
    source: "Cargo ablation",
  },
  { value: "82", caption: "offline tests, no API key needed", source: "TrustBench" },
  { value: "100 MB", caption: "mandatory query cost cap", source: "mcp-bigquery-evals" },
  {
    value: "~4.1 ms",
    caption: "detector inference on a T4 · 3.0M params",
    source: "License Plate Privacy Blurring",
  },
];

export function Evidence() {
  return (
    <section id="evidence" className="py-24 sm:py-32">
      <div className="shell">
        <SectionHeader
          label="Evidence"
          title="Seven numbers, all rerunnable."
          aside="all numbers rerunnable from the repos"
        />

        <div className="mt-12 grid gap-10 sm:grid-cols-3 sm:gap-8">
          {headline.map((m) => (
            <div key={m.value}>
              <p className="figure text-[clamp(2.75rem,6vw,4rem)]">{m.value}</p>
              <p className="mt-4 text-[15px] leading-6 text-muted">{m.caption}</p>
              <p className="mt-1 text-[13px] text-muted">{m.source}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-2 gap-x-8 gap-y-10 border-t border-line pt-10 lg:grid-cols-4">
          {secondary.map((m) => (
            <div key={m.value}>
              <p className="figure text-[2rem]">{m.value}</p>
              <p className="mt-3 text-[15px] leading-6 text-muted">{m.caption}</p>
              <p className="mt-1 text-[13px] text-muted">{m.source}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
