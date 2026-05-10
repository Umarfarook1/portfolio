import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MoonlitBackground } from "@/components/animations/MoonlitBackground";
import { Mountains } from "@/components/animations/Mountains";
import { ParallaxMoon } from "@/components/animations/ParallaxMoon";
import { FallingBlossoms } from "@/components/animations/FallingBlossoms";
import { Lanterns } from "@/components/animations/Lanterns";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Umarfarook Gurramkonda · AI Engineer",
  description:
    "AI engineer building production LLM systems. Multi-stage agents, retrieval pipelines, NL-to-SQL over warehouses, and the eval harnesses that keep them honest.",
  authors: [{ name: "Umarfarook Gurramkonda" }],
  keywords: [
    "AI Engineer",
    "ML Engineer",
    "LLM",
    "RAG",
    "Agents",
    "NL2SQL",
    "LangChain",
    "FastAPI",
    "Production AI",
  ],
  openGraph: {
    title: "Umarfarook Gurramkonda · AI Engineer",
    description:
      "Building production LLM systems: agents, RAG, NL-to-SQL, and the evals that keep them honest.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={cn(
          "min-h-screen bg-background font-sans text-foreground antialiased flex flex-col",
          inter.variable,
          jetbrainsMono.variable,
          playfair.variable
        )}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-stone-100 focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-stone-900"
        >
          Skip to main content
        </a>
        <MoonlitBackground />
        <ParallaxMoon />
        <Mountains />
        <Lanterns />
        <FallingBlossoms />
        <Navbar />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
