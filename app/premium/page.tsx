import type { Metadata } from "next";

import { PremiumHero } from "@/components/premium/PremiumHero";
import { PremiumServices } from "@/components/premium/PremiumServices";

export const metadata: Metadata = {
  title: "Atlas — Your operating system for studying and succeeding abroad",
  description:
    "Match universities, sort your services, settle in, and thrive abroad — all in one place. Free, end to end.",
};

export default function PremiumPage() {
  return (
    <main>
      <PremiumHero />
      <PremiumServices />
    </main>
  );
}
