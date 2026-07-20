import type { Metadata } from "next";

import { RouteExperience } from "@/components/common/RouteExperience";
import { DispatchHero } from "@/components/home/dispatch/DispatchHero";
import { DispatchSystemSection } from "@/components/home/dispatch/DispatchSystemSection";
import { DispatchTrustSection } from "@/components/home/dispatch/DispatchTrustSection";
import { DispatchNav } from "@/components/navigation/DispatchNav";

export const metadata: Metadata = {
  title: "GGI Atlas — Your operating system for studying and succeeding abroad",
  description:
    "Match universities, sort your services, settle in, and thrive abroad — all in one place. Free, end to end.",
};

export default function EditorialPage() {
  return (
    <RouteExperience route="dispatch">
      <div className="editorial-theme">
        <DispatchNav />
        <main id="main-content">
          <DispatchHero />
          <DispatchTrustSection />
          <DispatchSystemSection />
        </main>
      </div>
    </RouteExperience>
  );
}
