import type { Metadata, Viewport } from "next";
import { Caveat, Fraunces, Schibsted_Grotesk, Spline_Sans_Mono } from "next/font/google";
import "./globals.css";
import { FolioShell } from "@/components/shell/FolioShell";

/* Four families, four non-overlapping roles.
   Fraunces carries the optical size axis and pins SOFT 0 and WONK 0 in the
   stylesheet, so the register stays institutional rather than indie. */
const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
  variable: "--font-fraunces",
  display: "swap",
});

const schibsted = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-schibsted",
  display: "swap",
});

const splineMono = Spline_Sans_Mono({
  subsets: ["latin"],
  variable: "--font-spline-mono",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://umarfarook-ai.vercel.app"),
  title: "Umarfarook Gurramkonda · AI / ML Engineer",
  description:
    "I build multi-agent LLM systems and NL-to-SQL interfaces, shipped behind an eval harness and a cost cap. Also full-stack web, mobile and desktop builds.",
  authors: [{ name: "Umarfarook Gurramkonda" }],
  keywords: [
    "AI Engineer",
    "ML Engineer",
    "LLM",
    "RAG",
    "AI Agents",
    "Evals",
    "NL-to-SQL",
    "Remote",
    "Contract",
  ],
  openGraph: {
    title: "Umarfarook Gurramkonda · AI / ML Engineer",
    description:
      "Multi-agent LLM systems and NL-to-SQL over BigQuery, with the eval numbers published.",
    type: "website",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Umarfarook Gurramkonda · AI / ML Engineer",
    description:
      "Multi-agent LLM systems and NL-to-SQL over BigQuery, with the eval numbers published.",
  },
};

/* Anything hidden for the sake of an entrance is gated on this class, so a
   browser with scripting off, or with the motion bundle blocked, still gets a
   legible page. Reduced motion never hides anything in the first place. The
   two viewport variables are written here as well so the first paint already
   has the panel width the track will be measured against. */
const PRELUDE = [
  "(function(){var d=document.documentElement;",
  'if(!window.matchMedia||!window.matchMedia("(prefers-reduced-motion: reduce)").matches){',
  'd.classList.add("has-motion");}',
  'd.style.setProperty("--vw",d.clientWidth+"px");',
  'd.style.setProperty("--vh",window.innerHeight+"px");})();',
].join("");

/* The browser chrome takes the colour of the ground the cover opens on. */
export const viewport: Viewport = {
  themeColor: "#9b1b1b",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      /* the prelude below writes has-motion and the two viewport variables
         onto this element before React hydrates, which is the point of it */
      suppressHydrationWarning
      className={`${fraunces.variable} ${schibsted.variable} ${splineMono.variable} ${caveat.variable}`}
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: PRELUDE }} />
        <a className="skip-link" href="#main">
          Skip to the content
        </a>
        <FolioShell>{children}</FolioShell>
      </body>
    </html>
  );
}
