import type { Metadata } from "next";
import { ArrowRight, ChevronDown } from "lucide-react";
import HomepageAnimatedTitle from "@/components/homepage/HomepageAnimatedTitle";
import { AgentComparison } from "@/components/homepage/AgentComparison";
import { ConciergeSection } from "@/components/homepage/ConciergeSection";
import { DashboardShowcase } from "@/components/homepage/DashboardShowcase";
import { FaqSection } from "@/components/homepage/FaqSection";
import { FreeProductSection } from "@/components/homepage/FreeProductSection";
import { HeroLanguageWord } from "@/components/homepage/HeroLanguageWord";
import { ReadinessSection } from "@/components/homepage/ReadinessSection";
import { ResourcesSection } from "@/components/homepage/ResourcesSection";
import { ServiceCatalogSection } from "@/components/homepage/ServiceCatalogSection";
import { ServicesSection } from "@/components/homepage/ServicesSection";
import { SupportSection } from "@/components/homepage/SupportSection";
import { WhatAtlasIs } from "@/components/homepage/WhatAtlasIs";
import AuroraBackground from "@/components/ui/aurora-background";

const getStartedHref =
  "mailto:hello@atlas.study?subject=Atlas%20early%20access";

export const metadata: Metadata = {
  title: "Your operating system for studying abroad",
  description: "Your whole UK move. One Atlas.",
};

export default function HomePage() {
  return (
    <main
      className="min-h-screen bg-[#050506] text-white [background-image:linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.025)_1px,transparent_1px)] [background-size:72px_72px]"
      data-atlas-homepage-global-grid
      id="main-content"
    >
      <section className="relative isolate min-h-[calc(100svh-5rem)] overflow-hidden bg-[#050506]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          data-atlas-homepage-visual
        >
          <AuroraBackground
            className="h-full w-full"
            gradientColors={[
              "var(--aurora-color1, rgba(243,90,2,0.34))",
              "var(--aurora-color2, rgba(255,177,94,0.25))",
            ]}
            pulseDuration={8}
            starCount={80}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,6,.5)_0%,rgba(5,5,6,.08)_48%,rgba(5,5,6,.7)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,transparent_0%,rgba(5,5,6,.08)_48%,rgba(5,5,6,.86)_100%)]" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[calc(100svh-5rem)] max-w-[1180px] flex-col items-center justify-center px-5 pb-16 pt-20 text-center sm:px-8 sm:pb-20">
          <p className="mb-5 text-xs font-medium uppercase tracking-[.22em] text-white/52">
            Study abroad, without the chaos
          </p>
          <HomepageAnimatedTitle
            as="h1"
            className="max-w-[72rem] text-balance text-[clamp(3rem,6.8vw,6.5rem)] font-semibold leading-[1.04] tracking-[-.055em]"
          >
            Your operating system for studying and succeeding{" "}
            <HeroLanguageWord />
          </HomepageAnimatedTitle>
          <p className="mt-7 max-w-2xl text-balance text-base leading-7 text-white/62 sm:text-lg">
            Your whole UK move. One Atlas.
          </p>
          <div className="mt-8 flex w-full max-w-md flex-col justify-center gap-3 sm:w-auto sm:max-w-none sm:flex-row">
            <a
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-medium text-black transition-colors hover:bg-white/88 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              href={getStartedHref}
            >
              Get started - free
              <ArrowRight aria-hidden="true" className="size-4" />
            </a>
            <a
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/6 px-5 text-sm font-medium text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              href="#platform"
            >
              Explore the platform
              <ChevronDown aria-hidden="true" className="size-4" />
            </a>
          </div>
        </div>
      </section>
      <WhatAtlasIs />
      <DashboardShowcase />
      <ServicesSection />
      <ServiceCatalogSection />
      <FreeProductSection />
      <AgentComparison />
      <ReadinessSection />
      <ConciergeSection />
      <ResourcesSection />
      <SupportSection />
      <FaqSection />
    </main>
  );
}
