import type { Metadata } from "next";
import { ServicesSheet } from "@/components/folio/ServicesSheet";
import { FolioRoute } from "@/components/shell/FolioRoute";

export const metadata: Metadata = {
  title: "Services · Umarfarook Gurramkonda",
  description:
    "Fixed-price software and AI development for early-stage teams: web, mobile and desktop builds, LLM reliability audits, eval harness sprints and feature builds. Launch pricing.",
  openGraph: {
    title: "Services · Umarfarook Gurramkonda",
    description:
      "Fixed-price software and AI development: web, mobile and desktop builds, LLM audits, eval sprints and feature builds.",
    type: "website",
    url: "/services",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services · Umarfarook Gurramkonda",
    description:
      "Fixed-price software and AI development: web, mobile and desktop builds, LLM audits, eval sprints and feature builds.",
  },
};

// Every word on this route comes from src/content/services.ts; nothing here is
// retyped by hand.
export default function ServicesPage() {
  return (
    <FolioRoute route="services">
      <ServicesSheet />
    </FolioRoute>
  );
}
