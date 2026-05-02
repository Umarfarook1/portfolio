import { Hero } from "@/components/home/Hero";
import { WhatIBuild } from "@/components/home/WhatIBuild";
import { NowBuilding } from "@/components/home/NowBuilding";
import { Experience } from "@/components/home/Experience";
import { Principles } from "@/components/home/Principles";
import { TechStack } from "@/components/home/TechStack";
import { Contact } from "@/components/home/Contact";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col overflow-x-hidden">
      <Hero />
      <WhatIBuild />
      <NowBuilding />
      <Experience />
      <Principles />
      <TechStack />
      <Contact />
    </main>
  );
}
