import type { Metadata } from "next";
import { RouteExperience } from "@/components/common/RouteExperience";
import { SiteFooter } from "@/components/footer/SiteFooter";
import { EcosystemSection } from "@/components/home/orbit/EcosystemSection";
import { OrbitConcierge } from "@/components/home/orbit/OrbitConcierge";
import { OrbitCTA } from "@/components/home/orbit/OrbitCTA";
import { OrbitHero } from "@/components/home/orbit/OrbitHero";
import { ProductConstellation } from "@/components/home/orbit/ProductConstellation";
import { StudentRoute } from "@/components/home/orbit/StudentRoute";
import { OrbitNav } from "@/components/navigation/OrbitNav";

export const metadata: Metadata = { title: "Orbit — Map your study-abroad journey" };

export default function OrbitPage() {
  return <RouteExperience><OrbitNav /><main id="main-content"><OrbitHero /><ProductConstellation /><EcosystemSection /><StudentRoute /><OrbitConcierge /><OrbitCTA /></main><SiteFooter /></RouteExperience>;
}
