import { SectionHeader } from "@/components/ui/SectionHeader";

export function About() {
  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="shell">
        <SectionHeader
          label="About"
          title="Most of my time goes to the layer around the model."
          aside="what I spend the day on"
        />

        <div className="mt-10 max-w-2xl">
          <p className="text-[17px] leading-8 text-muted">
            I decide when a model earns its place, then check the output still holds under real
            traffic. Most of the work is evaluation and cost discipline. Neither is fun. I want
            applied ML and LLM engineering roles at early-stage companies, where that judgment
            counts as much as model choice.
          </p>
          <p className="mt-8 text-[17px] font-semibold tracking-tight">Umarfarook.</p>
        </div>
      </div>
    </section>
  );
}
