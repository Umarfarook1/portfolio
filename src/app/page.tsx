import { Hero } from "@/components/home/Hero";
import { Evidence } from "@/components/home/Evidence";
import { Work } from "@/components/home/Work";
import { Method } from "@/components/home/Method";
import { Checkpoints } from "@/components/home/Checkpoints";
import { Stack } from "@/components/home/Stack";
import { About } from "@/components/home/About";
import { Contact } from "@/components/home/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Evidence />
      <Work />
      <Method />
      <Checkpoints />
      <Stack />
      <About />
      <Contact />
    </>
  );
}
