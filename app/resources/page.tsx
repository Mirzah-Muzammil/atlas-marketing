import type { Metadata } from "next";

import { ConciergeFinalCta } from "@/components/concierge/ConciergeFinalCta";
import { BrowseByStudyStage } from "@/components/resources/BrowseByStudyStage";
import { Community } from "@/components/resources/Community";
import { CountryGuides } from "@/components/resources/CountryGuides";
import { FeaturedGuideBook } from "@/components/resources/FeaturedGuideBook";
import { FreeTools } from "@/components/resources/FreeTools";
import { NewsletterSignup } from "@/components/resources/NewsletterSignup";
import { ResourcesHero } from "@/components/resources/ResourcesHero";
import { TrendingReading } from "@/components/resources/TrendingReading";

export const metadata: Metadata = {
  title: "Resources and free tools",
  description: "Free guides, tools, and country research for studying abroad.",
  alternates: { canonical: "/resources" },
};

export default function ResourcesPage() {
  return (
    <main
      className="min-h-screen bg-[#050506] text-white [background-image:linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.025)_1px,transparent_1px)] [background-size:72px_72px]"
      id="main-content"
    >
      <ResourcesHero />
      <FeaturedGuideBook />
      <TrendingReading />
      <BrowseByStudyStage />
      <FreeTools />
      <CountryGuides />
      <Community />
      <NewsletterSignup />
      <ConciergeFinalCta
        ctaHref="/get-started"
        ctaLabel="Get started"
        description="Three minutes. No card. The whole Atlas system is ready when you are."
        id="get-started"
        title={
          <>
            Done reading? <span className="text-[#f35a02]">Set yourself up free.</span>
          </>
        }
      />
    </main>
  );
}
