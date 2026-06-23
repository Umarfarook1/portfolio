import type { Metadata } from "next";
import { Hanken_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Cursor } from "@/components/ui/Cursor";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

const hanken = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-display" });
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  metadataBase: new URL("https://umarfarook-ai.vercel.app"),
  title: "Umarfarook Gurramkonda | Applied AI / ML Engineer",
  description:
    "I build agentic AI systems and the evals that prove they work: multi-agent orchestration, retrieval, and NL-to-SQL, shipped with cost caps and reproducible numbers.",
  authors: [{ name: "Umarfarook Gurramkonda" }],
  keywords: ["AI Engineer", "ML Engineer", "LLM", "RAG", "AI Agents", "Evals", "NL-to-SQL", "Research Engineer"],
  openGraph: {
    title: "Umarfarook Gurramkonda | Applied AI / ML Engineer",
    description: "Agents that are measured, not just demoed. Production AI held to evidence.",
    type: "website",
    url: "/",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen font-sans", hanken.variable, inter.variable)}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-foreground focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:text-background"
        >
          Skip to main content
        </a>
        <ScrollProgress />
        <Cursor />
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
