import { Hero } from "@/components/home/Hero";
import { WhatIDo } from "@/components/home/WhatIDo";
import { FlagshipWork } from "@/components/home/FlagshipWork";
import { Thinking } from "@/components/home/Thinking";
import { TechStack } from "@/components/home/TechStack";
import { Contact } from "@/components/home/Contact";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col overflow-x-hidden">
      <Hero />
      <WhatIDo />
      <FlagshipWork />
      <Thinking />
      <TechStack />
      <Contact />
    </main>
  );
}
