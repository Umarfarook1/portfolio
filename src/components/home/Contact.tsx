import Link from "next/link";
import { Rise } from "@/components/ui/Rise";
import { TokenStream } from "@/components/ui/TokenStream";

// Terminal state of the page: back to the void, the run command at full
// scale. No form; mailto is the CTA.
export function Contact() {
  return (
    <section id="contact" className="relative py-32 sm:py-44">
      <div className="shell">
        <p className="mono-label text-lo">07 / contact</p>

        <TokenStream
          text="Write to me."
          wonkWord="Write"
          className="display mt-8 max-w-4xl text-[clamp(2.6rem,7vw,6.5rem)] text-hi"
        />

        <Rise delay={0.3} className="mt-12">
          <Link
            href="mailto:umarfarook0yt@gmail.com"
            className="runcmd caret inline-block max-w-full overflow-hidden rounded-[2px] px-6 py-5 text-[clamp(0.95rem,2.4vw,1.6rem)] sm:px-8"
          >
            $ mail umarfarook0yt@gmail.com
          </Link>
          <p className="mt-6 max-w-md text-[15px] leading-7 text-lo">
            I read my own inbox and reply fast. Research and ML engineering roles where evaluation
            and reliability count.
          </p>
        </Rise>
      </div>
    </section>
  );
}
