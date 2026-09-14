import { Colophon } from "@/components/folio/Colophon";
import { Commission } from "@/components/folio/Commission";
import { Cover } from "@/components/folio/Cover";
import { Evidence } from "@/components/folio/Evidence";
import { Experiences } from "@/components/folio/Experiences";
import { Intro } from "@/components/folio/Intro";
import { RelatedWork } from "@/components/folio/RelatedWork";
import { Studio } from "@/components/folio/Studio";
import { WhatIDo } from "@/components/folio/WhatIDo";
import { WorkPause } from "@/components/folio/WorkPause";
import { FolioRoute } from "@/components/shell/FolioRoute";

// The home route: the cover, seven chapters and the colophon, laid out left to
// right. The track is pinned and scrubbed on a pointer, and stacks into a plain
// vertical read under 768px or under prefers-reduced-motion.
export default function Home() {
  return (
    <FolioRoute route="home">
      <div className="story" id="story" data-horizontal-story>
        <div className="pin" data-horizontal-pin>
          <div className="track" data-horizontal-track>
            <Cover />
            <Intro />
            <Evidence />
            <WorkPause />
            <RelatedWork />
            <WhatIDo />
            <Experiences />
            <Studio />
            <Commission />
            <Colophon />
          </div>
        </div>
      </div>
    </FolioRoute>
  );
}
