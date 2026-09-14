import type { Metadata } from "next";
import { AboutSheet } from "@/components/folio/AboutSheet";
import { FolioRoute } from "@/components/shell/FolioRoute";

export const metadata: Metadata = {
  title: "About · Umarfarook Gurramkonda",
  description:
    "Founding ML engineer with 2+ years in LLM systems, NL-to-SQL and the web apps around them. Roles, education, certifications, stack and the four stages every project goes through.",
  openGraph: {
    title: "About · Umarfarook Gurramkonda",
    description:
      "Founding ML engineer with 2+ years in LLM systems, NL-to-SQL and the web apps around them.",
    type: "website",
    url: "/about",
  },
  twitter: {
    card: "summary_large_image",
    title: "About · Umarfarook Gurramkonda",
    description:
      "Founding ML engineer with 2+ years in LLM systems, NL-to-SQL and the web apps around them.",
  },
};

export default function AboutPage() {
  return (
    <FolioRoute route="about">
      <AboutSheet />
    </FolioRoute>
  );
}
