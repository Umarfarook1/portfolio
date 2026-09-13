// All Services copy and prices live here. Layout files never carry wording.
export const services = {
  eyebrow: "services · for teams that shipped an AI feature",
  headline: "I build LLM features and I measure them.",
  wonkWord: "measure",
  lede:
    "Agents, RAG, NL-to-SQL, with eval harnesses and cost guardrails, so the AI feature you shipped stops surprising you. For seed to Series A teams with no ML hire yet, and for agencies that need white-label LLM capacity.",
  availability: "available now · part-time immediately · full-time on 15 days notice · EU and US overlap hours",
  // Cal.com event created by the owner on 2026-09-13 (15 minutes).
  bookingUrl: "https://cal.com/umarfarook-gurramkonda/15min",
  email: "umarfarook0yt@gmail.com",
  packages: [
    {
      code: "01",
      name: "AI Reliability Audit",
      duration: "5 working days",
      price: "$1,200",
      note: "$900 for the first three clients, in exchange for a written testimonial",
      deliverables: [
        "A 50-case golden set built from your real traffic",
        "Failure taxonomy: where it goes wrong and how often",
        "Cost per request, broken down by model and step",
        "A ranked fix list and a 30-minute walkthrough",
      ],
      cta: "Start with the audit",
    },
    {
      code: "02",
      name: "Eval Harness Sprint",
      duration: "2 weeks",
      price: "$2,500",
      note: "the audit, productised into your CI",
      deliverables: [
        "Golden sets per intent, versioned in your repo",
        "Deterministic checks plus a temperature-0 LLM-judge rubric",
        "A regression gate in CI that fails the build on a quality drop",
        "Per-intent pass-rate report and a handover doc",
      ],
      cta: "Book the sprint",
    },
    {
      code: "03",
      name: "LLM Feature Build",
      duration: "3 to 4 weeks",
      price: "$4,000 to $6,000",
      note: "one scoped feature, shipped with its evals",
      deliverables: [
        "One agent, RAG or NL-to-SQL feature, scoped in writing first",
        "Structured outputs, streaming and cost caps built in",
        "Evals and a golden set delivered with the code",
        "Two weeks of fix support after handover",
      ],
      cta: "Scope a build",
    },
  ],
  after: "After a package: $35 per hour, or a 40-hour monthly retainer at $1,300.",
  proofLink: "the numbers behind this, all rerunnable",
  steps: [
    { n: "1", title: "15-minute call", body: "You show me the feature. I ask where it fails and what it costs." },
    { n: "2", title: "Written scope in 24 hours", body: "One page: what I will deliver, when, for how much. You reply yes or no." },
    { n: "3", title: "Work starts within a week", body: "Daily written updates. You see the golden set before you see a slide." },
  ],
  faq: [
    {
      q: "Which hours do you work?",
      a: "Roughly 09:00 to 16:00 CET and 09:00 to 13:00 US Eastern are live overlap. Everything else is async with a written update every day.",
    },
    {
      q: "How do you invoice?",
      a: "Wise or Payoneer, in USD or EUR, as an individual. PayPal if you insist. Builds are 50% up front, the rest on delivery.",
    },
    {
      q: "What about the contract and IP?",
      a: "A one-page agreement: scope, price, payment terms. All IP is assigned to you on payment. No exclusivity either way.",
    },
    {
      q: "What if the audit finds nothing wrong?",
      a: "You keep the golden set and the report. That is a measured 'it works', which is worth more than the assumption.",
    },
  ],
} as const;
