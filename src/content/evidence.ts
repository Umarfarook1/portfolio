// The seven figures, moved verbatim from the old src/components/home/Evidence.tsx.
// Every value is in the named repo and can be rerun from it. Do not round, do not
// restate: the caption carries the sample size because the ledger requires it.
export type Metric = {
  value: string;
  unit?: string;
  caption: string;
  source: string;
  // The pen circles exactly one figure on the page, the ablation delta.
  pen?: boolean;
};

export const metrics: Metric[] = [
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
    value: "2,680",
    unit: "ms",
    caption: "mean extraction latency · Gemini Flash, full instructions",
    source: "Cargo Concierge ablation",
  },
  {
    value: "+33",
    unit: "pts",
    caption: "accuracy the rules block is worth · 15-item ablation",
    source: "Cargo ablation",
    pen: true,
  },
  {
    value: "82",
    caption: "offline tests, no API key needed",
    source: "TrustBench",
  },
  {
    value: "100",
    unit: "MB",
    caption: "mandatory query cost cap",
    source: "mcp-bigquery-evals",
  },
  {
    value: "~4.1",
    unit: "ms",
    caption: "detector inference on a T4 · 3.0M params",
    source: "License Plate Privacy Blurring",
  },
];

export const evidenceNote =
  "Every number above carries its sample size. Nothing here is a vendor claim.";

// Caveat, one of three on the site.
export const evidenceMarginNote = "the ablation, not the hunch";
