"use client";

import { useState } from "react";

import Landing3AnimatedTitle from "@/components/landing-3/Landing3AnimatedTitle";

const tools = [
  { phrase: "Compare universities.", name: "University comparison", meta: "4 courses · total cost · outcomes", result: "Your best fit is clearer when course, cost, city, and outcomes sit side by side." },
  { phrase: "Check application readiness.", name: "Application readiness", meta: "8 of 10 items complete", result: "Atlas checks every requirement against the course and deadline you selected." },
  { phrase: "Build a funding plan.", name: "Funding planner", meta: "Tuition · living cost · loan", result: "See the real cost of your route and the funding options that can close the gap." },
  { phrase: "Prepare visa documents.", name: "Visa document check", meta: "CAS · finances · identity", result: "Know what is ready, what is missing, and what needs attention before submission." },
  { phrase: "Find student housing.", name: "Housing shortlist", meta: "6 verified options", result: "Compare commute, contract length, bills, and deposit terms without losing the details." },
  { phrase: "Plan your arrival.", name: "Arrival planner", meta: "12 tasks · one timeline", result: "Banking, travel, SIM, registration, and your first week arrive in the right order." },
] as const;

export function Landing3KnowledgeToolsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = tools[activeIndex];

  return (
    <section
      className="relative isolate overflow-hidden bg-[#050506] px-5 py-24 text-white sm:px-8 sm:py-36"
      data-landing-3-knowledge-tools
      id="knowledge-tools"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.025)_1px,transparent_1px)] [background-size:64px_64px]" />
        <div className="absolute left-[42%] top-[18%] h-[620px] w-[620px] rounded-full bg-[#f35a02]/9 blur-[140px]" />
      </div>

      <div className="relative mx-auto grid max-w-[1240px] gap-16 lg:grid-cols-[.83fr_1.17fr] lg:items-center">
        <div>
          <Landing3AnimatedTitle
            as="h2"
            className="max-w-[620px] text-[clamp(3rem,5vw,5.5rem)] font-semibold leading-[.92] tracking-[-.07em]"
          >
            Knowledge and tools for every next question.
          </Landing3AnimatedTitle>
          <div className="mt-7 max-w-[590px] text-[clamp(1.35rem,2.2vw,2rem)] font-medium leading-[1.45] tracking-[-.04em] text-white/18">
            {tools.map((tool, index) => (
              <button
                aria-pressed={index === activeIndex}
                className={"mr-2 inline text-left transition-colors focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white " + (index === activeIndex ? "text-white" : "hover:text-white/45")}
                key={tool.phrase}
                onClick={() => setActiveIndex(index)}
                type="button"
              >
                {tool.phrase}
              </button>
            ))}
          </div>
        </div>

        <div className="relative min-h-[560px]">
          <div className="absolute -right-[30%] -top-[15%] size-[520px] rounded-full bg-[#f35a02]/16 blur-[110px]" />
          <div
            className="relative h-full min-h-[560px] overflow-hidden rounded-[20px] border border-white/10 bg-[#0d0f14] shadow-[0_40px_120px_rgba(0,0,0,.55)]"
            data-knowledge-tools-window
            data-window-frame="mac-only"
            key={active.name}
          >
            <div className="flex h-12 items-center border-b border-white/8 px-4">
              <span className="size-2.5 rounded-full bg-[#f35a02]" />
              <span className="ml-3 text-xs font-medium text-white/45">Atlas tools</span>
              <span className="ml-auto text-[10px] uppercase tracking-[.14em] text-white/22">Live</span>
            </div>
            <div className="p-6 sm:p-9">
              <p className="text-[10px] font-medium uppercase tracking-[.18em] text-[#f35a02]">Active tool</p>
              <h3 className="mt-3 text-[clamp(2rem,3.5vw,3.8rem)] font-semibold leading-[.95] tracking-[-.06em]">
                {active.name}
              </h3>
              <p className="mt-4 text-sm text-white/38">{active.meta}</p>

              <div className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-[#090b0f]">
                <div className="border-b border-white/8 px-5 py-4 text-xs font-medium text-white/40">Your result</div>
                <div className="p-5 sm:p-7">
                  <p className="max-w-[520px] text-xl leading-[1.35] tracking-[-.035em] text-white/82">{active.result}</p>
                  <div className="mt-8 space-y-3">
                    {[82, 64, 46].map((width, index) => (
                      <div className="h-11 rounded-lg border border-white/[.07] bg-white/[.035] p-3" key={width}>
                        <span className="block h-2 rounded-full bg-white/10" style={{ width: (width - index * 4) + "%" }} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
