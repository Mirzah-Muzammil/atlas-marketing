import { RouteExperience } from "@/components/common/RouteExperience";
import { SiteFooter } from "@/components/footer/SiteFooter";
import { ConciergeSection } from "@/components/home/horizon/ConciergeSection";
import { EssentialsSection } from "@/components/home/horizon/EssentialsSection";
import { HorizonCTA } from "@/components/home/horizon/HorizonCTA";
import { HorizonHero } from "@/components/home/horizon/HorizonHero";
import { JourneyStory } from "@/components/home/horizon/JourneyStory";
import { ProductProof } from "@/components/home/horizon/ProductProof";
import { ResourcesSection } from "@/components/home/horizon/ResourcesSection";
import { TrustStrip } from "@/components/home/horizon/TrustStrip";
import { HorizonNav } from "@/components/navigation/HorizonNav";

export default function HomePage() {
  return (
    <RouteExperience route="horizon">
      <HorizonNav />
      <main id="main-content">
        <HorizonHero />
        <TrustStrip />
        <JourneyStory />
        <ProductProof />
        <EssentialsSection />
        <ConciergeSection />
        <ResourcesSection />
        <HorizonCTA />
      </main>
      <SiteFooter />
    </RouteExperience>
  );
}
