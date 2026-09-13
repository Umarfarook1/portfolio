// All Services copy and prices live here. Layout files never carry wording.
// Prices are launch pricing set by the owner on 2026-09-13 (roughly half the
// 2026-09-12 list) so the first orders come in; raise them once case studies exist.
export const services = {
  eyebrow: "services · software and AI development",
  headline: "I build software and AI features. Then I measure them.",
  wonkWord: "measure",
  lede:
    "Full-stack web apps, mobile and desktop apps, and the LLM features inside them: agents, RAG, NL-to-SQL, with eval harnesses and cost guardrails. For seed to Series A teams with no ML hire yet, and for agencies that need white-label capacity.",
  availability: "available now · part-time immediately · full-time on 15 days notice · EU and US overlap hours",
  // Cal.com event created by the owner on 2026-09-13 (15 minutes).
  bookingUrl: "https://cal.com/umarfarook-gurramkonda/15min",
  email: "umarfarook0yt@gmail.com",
  groups: [
    {
      label: "AI and LLM features",
      intro: "For teams that shipped an AI feature and want it measured, or want the next one built with its evals.",
      packages: [
        {
          code: "01",
          name: "AI Reliability Audit",
          duration: "5 working days",
          price: "$600",
          note: "$450 for the first three clients, in exchange for a written testimonial",
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
          price: "$1,400",
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
          price: "$2,200 to $3,500",
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
    },
    {
      label: "Software builds",
      intro: "Whole products, not only the AI part. Scoped in writing, fixed price, daily written updates.",
      packages: [
        {
          code: "04",
          name: "Web Application Build",
          duration: "2 to 3 weeks",
          price: "$1,500 to $2,500",
          note: "a full-stack app, deployed on your cloud",
          deliverables: [
            "Next.js (React) front end with a FastAPI or Node.js back end",
            "PostgreSQL, auth, roles and payments as scoped",
            "Deployed on your AWS, GCP or Vercel with CI and tests",
            "Handover doc and two weeks of fix support",
          ],
          cta: "Scope a web app",
        },
        {
          code: "05",
          name: "Mobile App Build",
          duration: "4 to 6 weeks",
          price: "$3,000 to $4,500",
          note: "iOS and Android from one codebase, back end included",
          deliverables: [
            "Cross-platform iOS and Android app from a single codebase",
            "API back end and database included (FastAPI or Node.js, PostgreSQL)",
            "App Store and Play Store submission done with you",
            "Handover doc and two weeks of fix support",
          ],
          cta: "Scope a mobile app",
        },
        {
          code: "06",
          name: "Desktop App Build",
          duration: "3 to 5 weeks",
          price: "$2,500 to $4,000",
          note: "Windows, macOS and Linux from one codebase",
          deliverables: [
            "Cross-platform desktop app from a single codebase",
            "Local storage with optional sync to your back end",
            "Installers for each platform and a release pipeline",
            "Handover doc and two weeks of fix support",
          ],
          cta: "Scope a desktop app",
        },
      ],
    },
  ],
  pricingNote:
    "Launch pricing while I build the first public case studies. Fixed prices, written scope first, no hourly surprises.",
  after: "After a package: $25 per hour, or a 40-hour monthly retainer at $900.",
  proofLink: "the numbers behind the AI work, all rerunnable",
  steps: [
    { n: "1", title: "15-minute call", body: "You show me the product or the feature. I ask where it fails and what it costs." },
    { n: "2", title: "Written scope in 24 hours", body: "One page: what I will deliver, when, for how much. You reply yes or no." },
    { n: "3", title: "Work starts within a week", body: "Daily written updates. You see working software before you see a slide." },
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
      q: "Can you build the whole product, not only the AI part?",
      a: "Yes. Web, mobile and desktop builds are scoped the same way: one page of scope, a fixed price, daily written updates, and evals wherever an LLM is in the loop.",
    },
    {
      q: "What if the audit finds nothing wrong?",
      a: "You keep the golden set and the report. That is a measured 'it works', which is worth more than the assumption.",
    },
    {
      q: "Why are the prices this low?",
      a: "Launch pricing. I want the first few public case studies, and a fixed scope keeps the risk on my side, not yours.",
    },
  ],
} as const;
