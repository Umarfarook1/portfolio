import { Odometer } from "@/components/ui/Odometer";
import { Rise } from "@/components/ui/Rise";
import { TokenStream } from "@/components/ui/TokenStream";

// The set piece: metrics as imagery. Monumental digits roll, overshoot and
// settle like SGD; captions are figure plates. Ragged scales, never a
// uniform stat-banner row.
const headline = [
  {
    value: "14/15",
    caption: "exact-match field extraction from raw quote emails · 6 fields, n = 15",
    source: "fig. 1.1 · Cargo Concierge ablation",
    align: "self-start",
    size: "text-[clamp(4.8rem,13vw,11.5rem)]",
  },
  {
    value: "0.782",
    caption: "YOLOv8n mAP@0.5 · 6,000-image sample, 25 epochs",
    source: "fig. 1.2 · License Plate Privacy Blurring",
    align: "self-end text-right",
    size: "text-[clamp(3.8rem,10vw,8.5rem)]",
  },
  {
    value: "2,680 ms",
    caption: "mean extraction latency · Gemini Flash, full instruction block",
    source: "fig. 1.3 · Cargo Concierge ablation",
    align: "self-start sm:ml-[12%]",
    size: "text-[clamp(3.2rem,8vw,7rem)]",
  },
];

const secondary = [
  {
    value: "+33 pts",
    caption: "from the instruction block alone · 15-item ablation",
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
    <section id="evidence" className="relative py-28 sm:py-36">
      <div className="shell">
        <div className="flex items-baseline justify-between border-b border-line pb-5">
          <p className="mono-label text-lo">01 / evidence</p>
          <p className="mono-label hidden text-lo/60 sm:block">all numbers rerunnable from the repos</p>
        </div>

        <TokenStream
          text="Seven numbers, all rerunnable."
          wonkWord="rerunnable."
          className="display mt-10 max-w-3xl text-[clamp(2rem,4.5vw,3.6rem)] text-hi"
        />

        <div className="mt-16 flex flex-col gap-14 sm:gap-20">
          {headline.map((m, i) => (
            <Rise key={m.value} delay={i * 0.08} className={`flex max-w-full flex-col ${m.align}`}>
              <p className={`display tabular leading-none text-hi ${m.size}`}>
                <Odometer value={m.value} />
              </p>
              <p className="mt-3 max-w-md text-[15px] text-lo">{m.caption}</p>
              <p className="mono-label mt-1.5 text-ember">{m.source}</p>
            </Rise>
          ))}
        </div>

        <div className="mt-24 grid grid-cols-2 gap-x-8 gap-y-12 border-t border-line pt-12 lg:grid-cols-4">
          {secondary.map((m, i) => (
            <Rise key={m.value} delay={i * 0.06}>
              <p className="display tabular text-4xl text-hi sm:text-5xl">
                <Odometer value={m.value} />
              </p>
              <p className="mt-2.5 text-sm leading-6 text-lo">{m.caption}</p>
              <p className="mono-label mt-1.5 text-lo/60">{m.source}</p>
            </Rise>
          ))}
        </div>
      </div>
    </section>
  );
}
