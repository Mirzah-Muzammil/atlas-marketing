import { ArrowDown } from "lucide-react";

import { DispatchConnectorArtwork } from "@/components/home/dispatch/DispatchConnectorArtwork";
import { DispatchHeroMotion } from "@/components/home/dispatch/DispatchHeroMotion";
import { DispatchJourneyPanel } from "@/components/home/dispatch/DispatchJourneyPanel";

const journeyTabs = [
  { label: "Apply", index: 0, panelId: "atlas-stage-apply" },
  { label: "Settle", index: 1, panelId: "atlas-stage-prepare" },
  { label: "Thrive", index: 2, panelId: "atlas-stage-arrive" },
];

export function DispatchHero() {
  return (
    <section
      className="relative overflow-clip bg-dispatch-canvas text-dispatch-ink"
      data-editorial-hero
      data-testid="dispatch-hero"
    >
      <div
        className="relative flex min-h-[100svh] flex-col overflow-hidden px-4 pb-5 pt-36 sm:px-6 lg:px-8 lg:pb-4 lg:pt-[9.6rem]"
        data-editorial-stage
      >
        <div className="container-shell relative z-10 grid items-end gap-7 lg:grid-cols-[1.34fr_.66fr] lg:gap-14">
          <h1
            className="max-w-[58rem] text-[100px] font-editorial leading-[0.82] tracking-[-0.078em]"
            data-editorial-heading
          >
            <span className="block overflow-hidden pb-5">
              <span
                className="block"
                data-dispatch-entrance="heading"
                data-dispatch-entrance-step="0"
                data-editorial-heading-line
              >
                Your operating system for studying.
              </span>
            </span>{" "}
          </h1>

          <div
            className="max-w-[23rem] pb-2 lg:pb-[1.2rem]"
            data-dispatch-entrance="intro"
            data-editorial-intro-copy
          >
            <p className="text-xl font-editorial leading-[1.42] tracking-[-0.025em] text-dispatch-ink/78">
              Match universities. Sort your services. Settle in. Then build a
              life. All in one place — from your first application to long after
              you&apos;ve landed.
            </p>
            <a
              className="group mt-5 font-editorial inline-flex items-center gap-2 text-[13px] font-semibold underline decoration-dispatch-ink/25 underline-offset-4 transition-colors hover:decoration-dispatch-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dispatch-ink"
              href="#journey"
            >
              See how it works
              <ArrowDown
                aria-hidden="true"
                className="h-3.5 w-3.5 transition-transform group-hover:translate-y-1"
              />
            </a>
          </div>
        </div>

        <div
          className="container-shell relative -mt-1 flex min-h-[27rem] flex-1 items-end justify-center lg:min-h-[25rem]"
          data-editorial-scene
        >
          <DispatchConnectorArtwork />

          <div
            className="relative z-10 w-full max-w-[47rem]"
            data-editorial-panel-wrap
          >
            <DispatchJourneyPanel />

            <div
              aria-label="Your journey"
              className="mx-auto grid w-full max-w-[38rem] grid-cols-3 gap-4 px-1 pt-4 sm:gap-8"
              role="tablist"
            >
              {journeyTabs.map((tab) => (
                <button
                  aria-controls={tab.panelId}
                  aria-selected={tab.index === 0}
                  className="group min-h-12 text-left text-dispatch-ink/82 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dispatch-ink data-[active]:text-dispatch-ink"
                  data-active={tab.index === 0 ? "" : undefined}
                  data-journey-tab
                  data-journey-tab-index={tab.index}
                  id={`atlas-tab-${tab.label.toLowerCase()}`}
                  key={tab.label}
                  role="tab"
                  tabIndex={tab.index === 0 ? 0 : -1}
                  type="button"
                >
                  <span className="flex items-center justify-between gap-2 text-[12px] font-semibold sm:text-[13px]">
                    <span>{tab.label}</span>
                    <span className="text-[9px] font-bold tracking-[0.16em]">
                      0{tab.index + 1}
                    </span>
                  </span>
                  <span className="mt-2 block h-px overflow-hidden bg-dispatch-ink/16">
                    <span
                      className="block h-full origin-left scale-x-0 bg-dispatch-ink transition-transform duration-500 group-data-[active]:scale-x-100"
                      data-tab-progress
                    />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <DispatchHeroMotion />
      </div>
    </section>
  );
}
