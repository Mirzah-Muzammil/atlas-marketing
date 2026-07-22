import type { Metadata } from "next";

import "./globals.css";

import { PremiumHero } from "@/components/premium/PremiumHero";
import { PremiumCinematicMotion } from "@/components/premium/PremiumCinematicMotion";
import { PremiumJourney } from "@/components/premium/PremiumJourney";
import { PremiumNav } from "@/components/premium/PremiumNav";
import { PremiumServices } from "@/components/premium/PremiumServices";

export const metadata: Metadata = {
  title: "Atlas — Your operating system for studying and succeeding abroad",
  description:
    "Match universities, sort your services, settle in, and thrive abroad — all in one place. Free, end to end.",
};

export default function PremiumPage() {
  return (
    <div className="premium-theme">
      <PremiumNav />
      <main id="main-content">
        <PremiumHero />
        <PremiumServices />
        <PremiumJourney />
      </main>
      <PremiumCinematicMotion />
    </div>
  );
}
