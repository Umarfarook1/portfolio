import { Odometer } from "@/components/ui/Odometer";
import { Rise } from "@/components/ui/Rise";
import { TokenStream } from "@/components/ui/TokenStream";

// The set piece: metrics as imagery. Monumental digits roll, overshoot and
// settle like SGD; captions are figure plates. Ragged scales, never a
// uniform stat-banner row.
const headline = [
  {
    value: "80%",
    caption: "strict 7-field extraction from raw quote emails",
    source: "fig 1.1 · Cargo Concierge",
    align: "self-start",
    size: "text-[clamp(4.8rem,13vw,11.5rem)]",
  },
  {
    value: "0.782",
    caption: "YOLOv8n mAP@0.5, license-plate detection",
    source: "fig 1.2 · street-view-plate-blurring",
    align: "self-end text-right",
    size: "text-[clamp(3.8rem,10vw,8.5rem)]",
  },
  {
    value: "~$0.002",
    caption: "cost per agent quote, end to end",
    source: "fig 1.3 · Cargo Concierge",
    align: "self-start sm:ml-[12%]",
    size: "text-[clamp(3.2rem,8vw,7rem)]",
  },
];

const secondary = [
  { value: "+33 pts", caption: "from the instruction block alone", source: "Cargo ablation" },
  { value: "6", caption: "trust dimensions per agent answer", source: "TrustBench" },
  { value: "100 MB", caption: "mandatory query cost cap", source: "mcp-bigquery-evals" },
  { value: "~4.1 ms", caption: "detector inference, 3.0M params", source: "YOLOv8n" },
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
          text="The metrics are the imagery."
          wonkWord="imagery."
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
