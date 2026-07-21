import type { Metadata } from "next";

import { RouteExperience } from "@/components/common/RouteExperience";
import { DispatchSystemSection } from "@/components/home/dispatch/DispatchSystemSection";
import { DispatchTrustSection } from "@/components/home/dispatch/DispatchTrustSection";
import Providers from "@/components/providers";
import Hero from "@/components/sections/hero";

const earlyAccessHref =
  "mailto:hello@atlas.study?subject=GGI%20Atlas%20early%20access";

export const metadata: Metadata = {
  title: "GGI Atlas — One journey, one real product",
  description:
    "The GGI Atlas operating system, combining the normal product hero with the editorial story.",
};

export default function HybridPage() {
  return (
    <RouteExperience route="dispatch">
      <div className="editorial-theme wise-hybrid-theme">
        <main id="main-content">
          <div>
            <Providers>
              <Hero
              // primaryAction={
              //   <a
              //     className="atlas-hero__primary-action"
              //     href={earlyAccessHref}
              //   >
              //     Get started — free
              //   </a>
              // }
              />
            </Providers>
          </div>
          <div id="features">
            <DispatchTrustSection animateTitles showProofs={false} />
          </div>
          <DispatchSystemSection animateTitles ctaHref={earlyAccessHref} />
        </main>
      </div>
    </RouteExperience>
  );
}
