import type { Metadata } from "next";

import "./globals.css";

import { LenisProvider } from "@/components/motion/LenisProvider";
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
    <LenisProvider duration={1.25} wheelMultiplier={0.85} syncScrollTrigger>
      <div className="premium-theme">
        <PremiumNav />
        <main id="main-content">
          <PremiumHero />
          <PremiumServices />
          <PremiumJourney />
        </main>
        <PremiumCinematicMotion />
      </div>
    </LenisProvider>
  );
}
