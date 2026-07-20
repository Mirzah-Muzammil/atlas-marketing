import type { Metadata } from "next";
import { RouteExperience } from "@/components/common/RouteExperience";
import { SiteFooter } from "@/components/footer/SiteFooter";
import { ConciergeInterlude } from "@/components/home/dispatch/ConciergeInterlude";
import { DispatchChapters } from "@/components/home/dispatch/DispatchChapters";
import { DispatchCTA } from "@/components/home/dispatch/DispatchCTA";
import { DispatchHero } from "@/components/home/dispatch/DispatchHero";
import { EssentialsDirectory } from "@/components/home/dispatch/EssentialsDirectory";
import { FieldGuide } from "@/components/home/dispatch/FieldGuide";
import { FragmentedJourney } from "@/components/home/dispatch/FragmentedJourney";
import { OperatingPrinciples } from "@/components/home/dispatch/OperatingPrinciples";
import { DispatchNav } from "@/components/navigation/DispatchNav";

export const metadata: Metadata = { title: "Dispatch — The Atlas journey, edited clearly" };

export default function EditorialPage() {
  return <RouteExperience route="dispatch"><DispatchNav /><main id="main-content"><DispatchHero /><FragmentedJourney /><DispatchChapters /><ConciergeInterlude /><FieldGuide /><EssentialsDirectory /><OperatingPrinciples /><DispatchCTA /></main><SiteFooter tone="light" /></RouteExperience>;
}
