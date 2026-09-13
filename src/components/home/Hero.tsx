import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="pb-20 pt-16 sm:pb-28 sm:pt-28">
      <div className="shell">
        <Image
          src="/avatar.jpg"
          alt="Umarfarook Gurramkonda"
          width={64}
          height={64}
          priority
          className="h-16 w-16 rounded-full object-cover"
        />

        <p className="label mt-8">
          Umarfarook Gurramkonda · founding ML engineer · HypeOn AI, Bengaluru
        </p>

        <h1 className="h1 mt-4 max-w-3xl">I measure what I ship.</h1>

        <p className="lead mt-6 max-w-2xl">
          I build multi-agent LLM systems and natural-language interfaces over data. I ship each
          one behind an eval harness and a hard cost cap, and the repos are public. Rerun any
          number on this page.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-x-4 gap-y-3">
          <Link href="mailto:umarfarook0yt@gmail.com" className="btn btn-primary">
            Email me
          </Link>
          <Link href="/services" className="btn btn-secondary">
            Hire me for a project
          </Link>
          <div className="flex items-center gap-5 sm:ml-2">
            <Link
              href="https://github.com/Umarfarook1"
              target="_blank"
              rel="noreferrer"
              className="link text-[15px]"
            >
              GitHub
            </Link>
            <Link
              href="https://linkedin.com/in/umarfarook-gurramkonda"
              target="_blank"
              rel="noreferrer"
              className="link text-[15px]"
            >
              LinkedIn
            </Link>
          </div>
        </div>

        {/* Availability above the fold. Same claim as the Contact line and
            the Footer label; edit all three together. */}
        <p className="mt-8 text-[15px] text-muted">
          available now · 15-day notice · remote or contract · I work US, EU or AU hours
        </p>
      </div>
    </section>
  );
}
