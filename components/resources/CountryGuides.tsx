"use client";

import { useState } from "react";

import HomepageAnimatedTitle from "@/components/homepage/HomepageAnimatedTitle";

const countries = [
  {
    code: "GB",
    name: "United Kingdom",
    status: "Complete",
    description: "The flagship guide. 12 chapters, 34-min read. Covers admissions, visa, settling, jobs, Graduate Route. Our most-loved page.",
    meta: ["12 chapters", "~34 min read", "Updated Apr 2026"],
  },
  {
    code: "IE",
    name: "Ireland",
    status: "In progress",
    description: "The fast-rising option for Indian students. English-medium, EU-adjacent, sharper than people realise on STEM and tech roles.",
    meta: ["9 chapters", "~26 min read", "Updated Apr 2026"],
  },
  {
    code: "CA",
    name: "Canada",
    status: "In progress",
    description: "Covers PGWP changes, the post-2024 cap and what it really means, and the cities that actually deliver on the immigration narrative.",
    meta: ["10 chapters", "~30 min read", "Updated Mar 2026"],
  },
  {
    code: "AU",
    name: "Australia",
    status: "Coming soon",
    description: "Skilled migration, post-study work, and the realistic picture on cost of living after the 2024 student visa fee changes.",
    meta: ["ETA Jul 2026", "Researched", "Drafting"],
  },
  {
    code: "US",
    name: "United States",
    status: "Coming soon",
    description: "F-1, OPT, STEM extension, and an honest read on whether the maths still works for an Indian student in 2026.",
    meta: ["ETA Aug 2026", "In research", "Atlas field notes"],
  },
  {
    code: "DE",
    name: "Germany",
    status: "Coming soon",
    description: "Public-uni tuition, Blue Card, and the parts about studying in Germany no English-language source ever explains properly.",
    meta: ["ETA Sep 2026", "In research", "Atlas field notes"],
  },
] as const;

export function CountryGuides() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "previous">("next");
  const activeCountry = countries[activeIndex];

  const selectCountry = (index: number) => {
    if (index === activeIndex) return;
    setDirection(index > activeIndex ? "next" : "previous");
    setActiveIndex(index);
  };

  return (
    <section className="border-y border-white/[.1] bg-[#09090b]/72 px-5 py-24 sm:px-8 sm:py-32" id="country-guides">
      <div className="mx-auto max-w-[1320px]">
        <header className="grid gap-8 lg:grid-cols-[1fr_.7fr] lg:items-end">
          <HomepageAnimatedTitle as="h2" className="max-w-[760px] text-balance text-[clamp(3rem,5vw,5.35rem)] font-semibold leading-[.9] tracking-[-.07em]">
            Where do you <span className="text-[#f35a02]">actually want</span> to go?
          </HomepageAnimatedTitle>
          <p className="max-w-[520px] text-pretty text-base leading-7 text-white/60 lg:justify-self-end">
            Each country deep-dive is its own complete guide. Costs, visas, lifestyle, post-study options, the lot. We are being honest about which ones we have finished.
          </p>
        </header>

        <div className="mt-12 border border-white/[.12] bg-[#0b0c0e]/94">
          <div className="overflow-x-auto border-b border-white/[.1] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div
              className="relative grid min-w-[768px] grid-cols-6"
              data-country-guide-flow="true"
            >
              <span
                aria-hidden="true"
                className="absolute inset-y-0 left-0 w-1/6 bg-[#f35a02] shadow-[0_0_30px_rgba(243,90,2,.18)] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)]"
                style={{ transform: `translateX(${activeIndex * 100}%)` }}
              />
              {countries.map((country, index) => {
                const isActive = activeIndex === index;
                return (
                  <button
                    aria-label={`${country.name} guide`}
                    aria-pressed={isActive}
                    className={`relative z-10 border-r border-white/[.1] px-4 py-3 text-left transition-colors duration-300 last:border-r-0 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white ${isActive ? "text-white" : "text-white/46 hover:bg-white/[.04] hover:text-white"}`}
                    key={country.name}
                    onClick={() => selectCountry(index)}
                    type="button"
                  >
                    <span className="font-mono text-[9px] tracking-[.16em] opacity-55">{country.code}</span>
                    <span className="ml-2 text-xs font-medium">{country.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div
            className="atlas-country-panel grid min-h-[390px] lg:grid-cols-[.85fr_1.15fr]"
            data-direction={direction}
            data-testid="country-guide-content"
            key={activeCountry.code}
          >
            <div className="flex flex-col justify-between border-b border-white/[.1] p-7 sm:p-10 lg:border-b-0 lg:border-r">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[.16em] text-[#f35a02]">{activeCountry.status}</p>
                <h3 className="mt-6 text-[clamp(2.6rem,5vw,5.5rem)] font-medium leading-[.9] tracking-[-.075em] text-white">{activeCountry.name}</h3>
                <p className="mt-7 max-w-[480px] text-base leading-7 text-white/56">{activeCountry.description}</p>
              </div>
              <a className="mt-10 inline-flex w-fit items-center gap-3 border-b border-white/25 pb-1 text-xs font-medium uppercase tracking-[.08em] text-white/74 transition-colors hover:border-[#f35a02] hover:text-white" href="#country-guides">
                Read the guide <span className="text-[#f35a02]">→</span>
              </a>
            </div>

            <div className="relative flex min-h-[350px] items-center overflow-hidden p-7 sm:p-10">
              <div aria-hidden="true" className="absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] [background-size:44px_44px]" />
              <div className="relative grid w-full gap-px border border-white/[.1] bg-white/[.1] sm:grid-cols-3">
                {activeCountry.meta.map((item, index) => (
                  <div className="bg-[#0d0e11] p-6 sm:min-h-[150px]" key={item}>
                    <p className="font-mono text-[10px] uppercase tracking-[.14em] text-white/30">0{index + 1}</p>
                    <p className="mt-8 text-xl font-medium leading-tight tracking-[-.035em] text-white/82">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes atlasCountryNext {
          from { opacity: 0; transform: translate3d(24px, 0, 0); }
          to { opacity: 1; transform: translate3d(0, 0, 0); }
        }
        @keyframes atlasCountryPrevious {
          from { opacity: 0; transform: translate3d(-24px, 0, 0); }
          to { opacity: 1; transform: translate3d(0, 0, 0); }
        }
        .atlas-country-panel[data-direction="next"] { animation: atlasCountryNext .42s cubic-bezier(.22,1,.36,1) both; }
        .atlas-country-panel[data-direction="previous"] { animation: atlasCountryPrevious .42s cubic-bezier(.22,1,.36,1) both; }
        @media (prefers-reduced-motion: reduce) {
          .atlas-country-panel { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
