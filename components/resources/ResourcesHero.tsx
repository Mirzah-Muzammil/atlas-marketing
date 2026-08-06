"use client";

import { ArrowRight, Search } from "lucide-react";
import { useLayoutEffect, useState } from "react";

import HomepageAnimatedTitle from "@/components/homepage/HomepageAnimatedTitle";

const quickSearches = ["UK student visa", "Scholarships", "Cost of living"] as const;
type ResourceCategory = {
  label: string;
  count?: string;
};

const categories: ResourceCategory[] = [
  { label: "All", count: "47" },
  { label: "Visa", count: "9" },
  { label: "Applications", count: "11" },
  { label: "Financial aid", count: "7" },
  { label: "Pre-departure", count: "6" },
  { label: "Settlement", count: "8" },
  { label: "Career & jobs", count: "5" },
  { label: "Country guides" },
  { label: "Free tools" },
];

export function ResourcesHero() {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]["label"]>("All");

  useLayoutEffect(() => {
    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    return () => {
      window.history.scrollRestoration = previousRestoration;
    };
  }, []);

  return (
    <>
      <section
        className="relative isolate mx-auto flex min-h-[calc(100svh-5rem)] max-w-[1240px] items-center overflow-hidden px-5 py-16 text-white sm:px-8 lg:py-20"
        data-resources-hero
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_52%_58%_at_50%_36%,rgba(243,90,2,.18),transparent_74%)]"
        />

      <div className="mx-auto w-full max-w-[900px] text-center">
        <HomepageAnimatedTitle
          as="h1"
          className="text-balance text-[clamp(3.4rem,6.4vw,6.4rem)] font-semibold leading-[.91] tracking-[-.07em]"
        >
          Knowledge &amp; <span className="text-[#f35a02]">tools.</span>
        </HomepageAnimatedTitle>
        <HomepageAnimatedTitle
          as="p"
          className="atlas-homepage-title-3d mx-auto mt-7 max-w-[39rem] text-pretty text-base leading-7 text-white/64 sm:text-lg"
        >
          Free guides, practical tools, and country research for the decisions that
          shape your move.
        </HomepageAnimatedTitle>

        <form
          aria-label="Search Atlas resources"
          className="group relative mx-auto mt-10 grid max-w-[650px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 rounded-2xl border border-white/[.14] bg-[#101013]/90 p-2 pl-4 shadow-[0_24px_70px_rgba(0,0,0,.28)] transition-[border-color,box-shadow] duration-200 focus-within:border-[#f35a02]/70 focus-within:shadow-[0_0_0_4px_rgba(243,90,2,.12),0_24px_70px_rgba(0,0,0,.28)] sm:gap-3 sm:p-2.5 sm:pl-5"
          method="get"
          role="search"
        >
          <Search aria-hidden="true" className="size-5 text-white/35" strokeWidth={1.75} />
          <input
            aria-label="Search guides, tools, and checklists"
            className="min-w-0 bg-transparent py-3 text-base text-white outline-none placeholder:text-white/32 sm:text-[1.05rem]"
            name="q"
            placeholder="What are you trying to figure out?"
            type="search"
          />
          <button
            aria-label="Search resources"
            className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#f35a02] px-4 text-sm font-semibold text-white transition-[background-color,transform] duration-200 hover:bg-[#ff7026] active:scale-[.97] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#f35a02] sm:px-5"
            type="submit"
          >
            <span className="hidden sm:inline">Search</span>
            <Search aria-hidden="true" className="size-4 sm:hidden" />
            <ArrowRight aria-hidden="true" className="hidden size-4 sm:block" />
          </button>
        </form>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-sm text-white/45">
          <span className="mr-1 text-xs text-white/32">Try</span>
          {quickSearches.map((term) => (
            <a
              className="rounded-full border border-white/[.1] px-3 py-1.5 text-xs text-white/62 transition-colors duration-200 hover:border-white/[.24] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#f35a02]"
              href={`?q=${encodeURIComponent(term)}`}
              key={term}
            >
              {term}
            </a>
          ))}
        </div>

      </div>
      </section>

      <section className="sticky top-0 z-10 border-y border-white/[.1] bg-[#09090b]/88 py-4 backdrop-blur-xl sm:py-5">
        <div
          aria-label="Filter resources by category"
          className="mx-auto flex max-w-[1320px] items-center gap-2 overflow-x-auto px-5 [scrollbar-width:none] sm:px-8 [&::-webkit-scrollbar]:hidden"
          role="group"
        >
          {categories.map((category, index) => {
            const isActive = category.label === activeCategory;
            const showDivider = index === 1 || index === 7;

            return (
              <span className="flex shrink-0 items-center gap-2" key={category.label}>
                {showDivider ? <span aria-hidden="true" className="mx-1 h-6 w-px bg-white/[.14]" /> : null}
                <button
                  aria-label={category.label === "All" ? "All resources" : `${category.label}${category.count ? ` ${category.count}` : ""}`}
                  aria-pressed={isActive}
                  className={`inline-flex min-h-10 items-center gap-2 rounded-full border px-4 text-xs font-medium tracking-[-.015em] transition-[background-color,border-color,color,transform] duration-200 active:scale-[.97] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#f35a02] ${
                    isActive
                      ? "border-[#f35a02] bg-[#f35a02] text-white"
                      : "border-white/[.12] bg-white/[.025] text-white/58 hover:border-white/[.26] hover:text-white"
                  }`}
                  onClick={() => setActiveCategory(category.label)}
                  type="button"
                >
                  {category.label}
                  {category.count ? <span className="font-mono text-[10px] opacity-60">{category.count}</span> : null}
                </button>
              </span>
            );
          })}
        </div>
      </section>
    </>
  );
}
