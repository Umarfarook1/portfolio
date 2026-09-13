import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// One family, three weights. Hierarchy comes from size, weight and tracking.
const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://umarfarook-ai.vercel.app"),
  title: "Umarfarook Gurramkonda · Software and AI Engineer",
  description:
    "I build software and AI features: web, mobile and desktop apps, multi-agent LLM systems and NL-to-SQL interfaces, each shipped behind an eval harness and a cost cap.",
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
    title: "Umarfarook Gurramkonda · Software and AI Engineer",
    description:
      "Multi-agent LLM systems and NL-to-SQL over BigQuery, with the eval numbers published.",
    type: "website",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Umarfarook Gurramkonda · Software and AI Engineer",
    description:
      "Multi-agent LLM systems and NL-to-SQL over BigQuery, with the eval numbers published.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // Font variable lives on <html>: Tailwind v4 @theme resolves var() at :root.
    <html lang="en" className={instrument.variable}>
      <body className="min-h-screen">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-accent-fg"
        >
          Skip to main content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
