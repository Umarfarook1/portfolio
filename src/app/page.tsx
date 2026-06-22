import { Hero } from "@/components/home/Hero";
import { SelectedResults } from "@/components/home/SelectedResults";
import { NowBuilding } from "@/components/home/NowBuilding";
import { WhatIBuild } from "@/components/home/WhatIBuild";
import { About } from "@/components/home/About";
import { Experience } from "@/components/home/Experience";
import { TechStack } from "@/components/home/TechStack";
import { Contact } from "@/components/home/Contact";
import { Marquee } from "@/components/ui/Marquee";

const marqueeItems = [
  "Agent orchestration",
  "Retrieval / RAG",
  "NL → SQL",
  "Evaluation harnesses",
  "Cost discipline",
  "Production reliability",
];

export default function Home() {
  return (
    <>
      <Hero />
      <SelectedResults />
      <NowBuilding />
      <Marquee items={marqueeItems} />
      <WhatIBuild />
      <About />
      <Experience />
      <TechStack />
      <Contact />
    </>
  );
}
