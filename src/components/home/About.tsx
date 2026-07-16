import { Rise } from "@/components/ui/Rise";
import { TokenStream } from "@/components/ui/TokenStream";

// Short bone band. Restraint here makes the dark sections read louder.
export function About() {
  return (
    <section id="about" className="on-bone relative py-28 sm:py-36">
      <div className="shell">
        <div className="flex items-baseline justify-between border-b border-boneink/15 pb-5">
          <p className="mono-label text-bonelo">06 / about</p>
          <p className="mono-label hidden text-bonelo/70 sm:block">point of view</p>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-[11rem_1fr]">
          <Rise>
            <figure>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/avatar.jpg"
                alt="Umarfarook Gurramkonda"
                width={176}
                height={176}
                className="h-44 w-44 rounded-[2px] object-cover contrast-105"
              />
              <figcaption className="mono-label mt-3 text-bonelo/70">
                fig. 06 · the source image
              </figcaption>
            </figure>
          </Rise>

          <div>
            <TokenStream
              text="Most of my time goes to the layer around the model."
              wonkWord="around"
              className="display max-w-3xl text-[clamp(1.8rem,3.8vw,3rem)] text-boneink"
            />
            <Rise delay={0.25}>
              <p className="mt-8 max-w-2xl text-[17px] leading-8 text-bonelo">
                Deciding when a model earns its place, shaping what goes in and out, and checking
                the result still holds under real traffic. Evaluation, cost discipline, failure
                handling: the unglamorous work that makes a system dependable. I want research and
                ML engineering roles where that judgment counts as much as model choice.
              </p>
              <p className="display mt-10 text-2xl text-boneink">Umarfarook.</p>
            </Rise>
          </div>
        </div>
      </div>
    </section>
  );
}
