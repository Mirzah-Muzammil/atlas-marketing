import type { Metadata } from "next";

import { AboutHero } from "@/components/about/AboutHero";
import { AboutPrinciples } from "@/components/about/AboutPrinciples";
import { AboutStory } from "@/components/about/AboutStory";
import { AboutWhyReveal } from "@/components/about/AboutWhyReveal";
import { ConciergeFinalCta } from "@/components/concierge/ConciergeFinalCta";

export const metadata: Metadata = {
  title: "About Atlas",
  description: "Why Atlas exists, the principles that guide it, and the team building it.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main
      className="min-h-screen bg-[#050506] text-white [background-image:linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.025)_1px,transparent_1px)] [background-size:72px_72px]"
      id="main-content"
    >
      <AboutHero />
      <AboutWhyReveal />
      <AboutPrinciples />
      <AboutStory />
      <ConciergeFinalCta
        ctaHref="/get-started"
        ctaLabel="Get started"
        description="Three minutes to set up. No card. A transparent system for the whole move."
        id="try-atlas"
        title={
          <>
            Read enough? <span className="text-[#f35a02]">Try the OS.</span>
          </>
        }
      />
    </main>
  );
}
