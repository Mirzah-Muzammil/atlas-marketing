import type { Metadata } from "next";

import { ConciergeAgentComparison } from "@/components/concierge/ConciergeAgentComparison";
import { ConciergeFaqSection } from "@/components/concierge/ConciergeFaqSection";
import { ConciergeFinalCta } from "@/components/concierge/ConciergeFinalCta";
import { ConciergeRoute } from "@/components/concierge/ConciergeRoute";
import { PricingSection } from "@/components/concierge/PricingSection";
import { SpecialistsSection } from "@/components/concierge/SpecialistsSection";
import HomepageAnimatedTitle from "@/components/homepage/HomepageAnimatedTitle";

export const metadata: Metadata = {
  title: "Atlas Concierge",
  description:
    "Hand your hardest study-abroad steps to an Atlas specialist for a fixed, upfront fee.",
  alternates: { canonical: "/concierge" },
};

export default function ConciergePage() {
  return (
    <main
      className="min-h-screen bg-[#050506] text-white [background-image:linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.025)_1px,transparent_1px)] [background-size:72px_72px]"
      id="main-content"
    >
      <section
        className="relative isolate mx-auto grid min-h-[calc(100svh-5rem)] max-w-[1240px] items-center gap-12 overflow-hidden px-5 py-16 sm:px-8 lg:grid-cols-[.88fr_1.12fr] lg:gap-8 lg:py-20"
        data-concierge-secondary-hero
        id="concierge-route"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_52%_62%_at_74%_45%,rgba(243,90,2,.16),transparent_72%)]"
        />
        <div className="max-w-xl lg:pb-6">
          <HomepageAnimatedTitle
            as="h1"
            className="text-balance text-[clamp(3.4rem,6.4vw,6.4rem)] font-semibold leading-[.91] tracking-[-.07em]"
          >
            Your move, in <span className="text-[#f35a02]">expert hands.</span>
          </HomepageAnimatedTitle>
          <HomepageAnimatedTitle
            as="p"
            className="atlas-homepage-title-3d mt-7 max-w-[38rem] text-pretty text-base leading-7 text-white/64 sm:text-lg"
          >
            Hand any step to a dedicated Atlas specialist: visa, application, or
            arrival. A fixed fee, agreed before any work begins.
          </HomepageAnimatedTitle>
        </div>

        <ConciergeRoute />
      </section>
      <PricingSection />
      <SpecialistsSection />
      <ConciergeAgentComparison />
      <ConciergeFaqSection />
      <ConciergeFinalCta />
    </main>
  );
}
