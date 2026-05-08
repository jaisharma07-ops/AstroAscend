import { content } from "@/lib/content";
import { Hero } from "@/components/sections/hero";
import { WhySection } from "@/components/sections/why-section";
import { WhatSection } from "@/components/sections/what-section";
import { CodeOfConduct } from "@/components/sections/code-of-conduct";
import { VisionMission } from "@/components/sections/vision-mission";
import { MasterclassesPreview } from "@/components/sections/masterclasses-preview";
import { HomeClosing } from "@/components/sections/home-closing";

export default function HomePage() {
  const sections = content.pages.home.sections;
  const masterclasses = content.pages.masterclasses.courses;

  const hero = sections.find((s) => s.id === "hero");
  const why = sections.find((s) => s.id === "why");
  const what = sections.find((s) => s.id === "what");
  const coc = sections.find((s) => s.id === "code-of-conduct");
  const vm = sections.find((s) => s.id === "vision-mission");
  const closing = sections.find((s) => s.id === "closing");

  return (
    <>
      {hero?.kind === "hero" && <Hero brandMark={hero.brand_mark} tagline={hero.tagline} />}
      {why?.kind === "text-block" && <WhySection heading={why.heading} body={why.body} />}
      {what?.kind === "text-block" && (
        <WhatSection heading={what.heading} bodyLead={what.body_lead} body={what.body} />
      )}
      {coc?.kind === "three-column" && <CodeOfConduct heading={coc.heading} columns={coc.columns} />}
      {vm?.kind === "two-column" && <VisionMission columns={vm.columns} />}
      <MasterclassesPreview courses={masterclasses} />
      {closing?.kind === "tagline-block" && <HomeClosing lines={closing.lines} />}
    </>
  );
}
