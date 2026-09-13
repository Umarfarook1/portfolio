import Link from "next/link";
import { services } from "@/content/services";

// Terminal state of the page. No form; email and the booking link are the CTAs.
export function Contact() {
  return (
    <section id="contact" className="py-24 sm:py-36">
      <div className="shell">
        <p className="label">Contact</p>
        <h2 className="h1 mt-4 max-w-3xl">Write to me.</h2>

        <div className="mt-9 flex flex-wrap items-center gap-x-4 gap-y-3">
          <Link href="mailto:umarfarook0yt@gmail.com" className="btn btn-primary">
            Email umarfarook0yt@gmail.com
          </Link>
          <Link href={services.bookingUrl} className="btn btn-secondary">
            Book 15 minutes
          </Link>
        </div>

        <p className="mt-8 max-w-md text-[15px] leading-7 text-muted">
          I read my own inbox. I reply inside a day, most days.
        </p>
        {/* The four questions a foreign hiring manager asks, answered at the
            conversion point. Mirrored in the Hero status line and the Footer. */}
        <p className="mt-4 max-w-xl text-[15px] leading-7 text-muted">
          available now · 15-day notice · remote or contract · I work US, EU or AU hours from
          Bengaluru
        </p>
        <p className="mt-4 text-[15px]">
          <Link
            href="/Umarfarook_Gurramkonda_ML_Engineer.pdf"
            target="_blank"
            rel="noreferrer"
            className="link"
          >
            Resume ↗
          </Link>
        </p>
      </div>
    </section>
  );
}
