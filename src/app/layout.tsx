import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  axes: ["wdth"],
});
const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
});
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-plex-mono",
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
    <html lang="en" className={cn(archivo.variable, sourceSerif.variable, plexMono.variable)}>
      <body className="min-h-screen">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-foreground focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:text-background"
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
