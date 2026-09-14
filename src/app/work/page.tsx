import type { Metadata } from "next";
import { WorksSheet } from "@/components/folio/WorksSheet";
import { FolioRoute } from "@/components/shell/FolioRoute";

export const metadata: Metadata = {
  title: "Work · Umarfarook Gurramkonda",
  description:
    "Twelve projects: ten public repos with rerunnable numbers, and two production systems at Hypeon AI that are closed source.",
  openGraph: {
    title: "Work · Umarfarook Gurramkonda",
    description:
      "Twelve projects: ten public repos with rerunnable numbers, and two closed-source production systems.",
    type: "website",
    url: "/work",
  },
  twitter: {
    card: "summary_large_image",
    title: "Work · Umarfarook Gurramkonda",
    description:
      "Twelve projects: ten public repos with rerunnable numbers, and two closed-source production systems.",
  },
};

export default function WorkPage() {
  return (
    <FolioRoute route="works">
      <WorksSheet />
    </FolioRoute>
  );
}
