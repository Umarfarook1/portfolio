import type { Metadata } from "next";
import { Fraunces, Schibsted_Grotesk, Fragment_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MotionProvider } from "@/components/ui/MotionProvider";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["opsz", "SOFT", "WONK"],
});
const schibsted = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-schibsted",
});
const fragment = Fragment_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-fragment",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://umarfarook-ai.vercel.app"),
  title: "Umarfarook Gurramkonda · Applied AI / ML Engineer",
  description:
    "I build multi-agent LLM systems, retrieval, and NL-to-SQL interfaces, and ship them with eval harnesses, cost caps, and reproducible numbers.",
  authors: [{ name: "Umarfarook Gurramkonda" }],
  keywords: ["AI Engineer", "ML Engineer", "LLM", "RAG", "AI Agents", "Evals", "NL-to-SQL", "Research Engineer"],
  openGraph: {
    title: "Umarfarook Gurramkonda · Applied AI / ML Engineer",
    description:
      "Multi-agent systems, retrieval, and NL-to-SQL, shipped with eval harnesses and reproducible numbers.",
    type: "website",
    url: "/",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // Font variables live on <html>: Tailwind v4 @theme resolves var() at :root.
    <html lang="en" className={cn(fraunces.variable, schibsted.variable, fragment.variable)}>
      <body className="min-h-screen">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-solar focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:text-void"
        >
          Skip to main content
        </a>
        <MotionProvider>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
