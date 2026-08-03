"use client";

import {
  ArrowRight,
  Check,
  ChevronsLeftRight,
  X,
} from "lucide-react";
import { type ChangeEvent, type ReactNode, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

import HomepageAnimatedTitle from "@/components/homepage/HomepageAnimatedTitle";

const getStartedHref =
  "mailto:hello@atlas.study?subject=Atlas%20early%20access";

const atlasBenefits = [
  {
    title: "Because its free & totally transparent",
    copy: "No student fee. Every referral relationship is disclosed.",
  },
  {
    title: "Shortlist what fits you",
    copy: "Courses matched to your grades, budget, and goals.",
  },
  {
    title: "With you long after the offer",
    copy: "Visa, housing, banking, arrival, community, and careers.",
  },
  {
    title: "A platform, plus real people",
    copy: "A clear system backed by specialists and students who have done it.",
  },
] as const;

const agentTradeoffs = [
  {
    title: "Recommends their partner universities",
    copy: "Commission can shape what appears on your shortlist.",
  },
  {
    title: "Fees and incentives stay unclear",
    copy: "You rarely see who pays whom or why a service is suggested.",
  },
  {
    title: "Support stops at the offer",
    copy: "Visa, housing, banking, and arrival become your problem.",
  },
  {
    title: "One counsellor's point of view",
    copy: "Your options depend on what one person happens to know.",
  },
] as const;

type ComparisonItem = {
  title: string;
  copy: string;
};

export type AgentComparisonContent = {
  id: string;
  heading: ReactNode;
  summary: {
    prefix: string;
    accent: string;
    suffix?: string;
  };
  instruction?: string;
  animateSummary?: boolean;
  atlasEyebrow: string;
  atlasTitle: string;
  atlasBadge: string;
  atlasBenefits: readonly ComparisonItem[];
  agentEyebrow: string;
  agentTitle: string;
  agentTradeoffs: readonly ComparisonItem[];
  ctaLabel: string;
  ctaHref: string;
};

const defaultContent: AgentComparisonContent = {
  id: "why-atlas",
  heading: "Why students switch",
  summary: {
    prefix: "You don't need an agent.",
    accent: "You need an operating system.",
  },
  instruction: "Drag to compare the traditional route with the Atlas way.",
  atlasEyebrow: "The Atlas way",
  atlasTitle: "Built around you",
  atlasBadge: "£0",
  atlasBenefits,
  agentEyebrow: "The old way",
  agentTitle: "A traditional agent",
  agentTradeoffs,
  ctaLabel: "Start free",
  ctaHref: getStartedHref,
};

type AgentComparisonProps = {
  content?: AgentComparisonContent;
  variant?: "homepage" | "concierge";
};

export function AgentComparison({
  content = defaultContent,
  variant = "homepage",
}: AgentComparisonProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [split, setSplit] = useState(52);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = section?.querySelector<HTMLElement>(
      "[data-comparison-slider-stage]",
    );
    if (!section || !stage) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion || typeof IntersectionObserver === "undefined") {
      gsap.set(stage, { clearProps: "all" });
      return;
    }

    const context = gsap.context(() => {
      gsap.set(stage, { opacity: 0, scale: 0.975, y: 34 });
    }, section);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        context.add(() => {
          gsap.to(stage, {
            duration: 0.9,
            ease: "power3.out",
            opacity: 1,
            scale: 1,
            y: 0,
          });
        });
        observer.disconnect();
      },
      { threshold: 0.12 },
    );
    observer.observe(section);

    return () => {
      observer.disconnect();
      context.revert();
    };
  }, []);

  const updateSplit = (event: ChangeEvent<HTMLInputElement>) => {
    setSplit(Number(event.target.value));
  };

  return (
    <section
      className="relative isolate overflow-hidden bg-transparent px-5 py-24 text-white sm:px-8 sm:py-32"
      data-atlas-homepage-agent-comparison
      data-concierge-agent-comparison={variant === "concierge" ? "" : undefined}
      id={content.id}
      ref={sectionRef}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[34%] h-[42rem] w-[72rem] -translate-x-1/2 rounded-full bg-[#f35a02]/[.045] blur-[140px]"
      />

      <div className="relative mx-auto w-full max-w-[1180px]">
        <header className="mx-auto max-w-[900px]">
          <HomepageAnimatedTitle
            as="h2"
            className="relative z-40 mx-auto max-w-[650px] text-left text-[46px] font-semibold leading-[1.06] tracking-[-.04em] text-white min-[810px]:text-center min-[1200px]:text-[56px]"
          >
            {content.heading}
          </HomepageAnimatedTitle>
          {content.animateSummary ? (
            <HomepageAnimatedTitle
              as="p"
              className="atlas-homepage-title-3d mx-auto mt-5 max-w-[740px] text-left text-balance text-[clamp(1.45rem,2.5vw,2.25rem)] font-medium leading-[1.05] tracking-[-.04em] text-white/58 min-[810px]:text-center"
            >
              {content.summary.prefix}{" "}
              <span className="text-[#f35a02]">{content.summary.accent}</span>
              {content.summary.suffix ? ` ${content.summary.suffix}` : null}
            </HomepageAnimatedTitle>
          ) : (
            <p className="mx-auto mt-5 max-w-[740px] text-left text-balance text-[clamp(1.45rem,2.5vw,2.25rem)] font-medium leading-[1.05] tracking-[-.04em] text-white/58 min-[810px]:text-center">
              {content.summary.prefix}{" "}
              <span className="text-[#f35a02]">{content.summary.accent}</span>
              {content.summary.suffix ? ` ${content.summary.suffix}` : null}
            </p>
          )}
          {content.instruction ? (
            <p className="mt-5 text-left text-sm text-white/42 min-[810px]:text-center sm:text-base">
              {content.instruction}
            </p>
          ) : null}
        </header>

        <div
          className="relative mx-auto mt-10 max-w-[980px] overflow-hidden rounded-[22px] border border-white/[.12] bg-[#0b0c0f] text-white shadow-[0_34px_90px_rgba(0,0,0,.46),inset_0_1px_rgba(255,255,255,.04)] sm:mt-12 sm:rounded-[26px]"
          data-comparison-slider-stage
        >
          <div className="flex min-h-[500px] flex-col md:flex-row">
            <section
              className="max-md:!w-full border-white/[.09] bg-[#111216] p-5 sm:p-7 md:border-r md:p-8"
              data-comparison-atlas
              style={{ width: split + "%" }}
            >
              <div className="flex items-end justify-between gap-5 border-b border-white/[.09] pb-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[.18em] text-[#f35a02]">
                    {content.atlasEyebrow}
                  </p>
                  <h3 className="mt-1.5 text-2xl font-semibold tracking-[-.045em] sm:text-3xl">
                    {content.atlasTitle}
                  </h3>
                </div>
                <span className="rounded-full bg-[#f35a02] px-3 py-1.5 text-xs font-bold text-white">
                  {content.atlasBadge}
                </span>
              </div>

              <ul className="mt-4 grid gap-2.5">
                {content.atlasBenefits.map((benefit) => (
                  <li
                    className="grid grid-cols-[30px_1fr] gap-3 rounded-xl border border-[#f35a02]/15 bg-[#f35a02]/[.045] p-3.5"
                    data-comparison-atlas-item
                    key={benefit.title}
                  >
                    <span className="grid size-[30px] place-items-center rounded-full bg-[#f35a02]/15 text-[#f35a02]">
                      <Check aria-hidden="true" className="size-4" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold leading-5 tracking-[-.02em] text-white">
                        {benefit.title}
                      </p>
                      <p className="mt-1 text-xs leading-[1.45] text-white/40 sm:text-[13px]">
                        {benefit.copy}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section
              className="max-md:!w-full border-t border-white/[.09] bg-[#090a0d] p-5 sm:p-7 md:border-t-0 md:p-8"
              data-comparison-agent
              style={{ width: 100 - split + "%" }}
            >
              <div className="border-b border-white/[.09] pb-4">
                  <p className="text-xs font-bold uppercase tracking-[.18em] text-white/30">
                  {content.agentEyebrow}
                </p>
                <h3 className="mt-1.5 text-2xl font-semibold tracking-[-.045em] text-white/62 sm:text-3xl">
                  {content.agentTitle}
                </h3>
              </div>

              <ul className="mt-4 grid gap-2.5">
                {content.agentTradeoffs.map((tradeoff) => (
                  <li
                    className="grid grid-cols-[30px_1fr] gap-3 rounded-xl border border-white/[.07] bg-white/[.035] p-3.5"
                    data-comparison-agent-item
                    key={tradeoff.title}
                  >
                    <span className="grid size-[30px] place-items-center rounded-full bg-white/[.055] text-white/28">
                      <X aria-hidden="true" className="size-4" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold leading-5 tracking-[-.02em] text-white/60">
                        {tradeoff.title}
                      </p>
                      <p className="mt-1 text-xs leading-[1.45] text-white/30 sm:text-[13px]">
                        {tradeoff.copy}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 top-0 z-20 hidden w-1 -translate-x-1/2 bg-[#f35a02] md:block"
            data-comparison-divider
            style={{ left: split + "%" }}
          >
            <span className="absolute left-1/2 top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-4 border-[#0b0c0f] bg-[#f35a02] text-white shadow-[0_10px_28px_rgba(0,0,0,.38)]">
              <ChevronsLeftRight aria-hidden="true" className="size-5" />
            </span>
          </div>

          <input
            aria-label="Compare Atlas with a traditional agent"
            className="absolute inset-0 z-30 hidden h-full w-full cursor-ew-resize opacity-0 md:block"
            max="68"
            min="32"
            onChange={updateSplit}
            type="range"
            value={split}
          />
        </div>

        <div className="mt-9 flex justify-center">
          <a
            className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#f35a02] px-7 text-sm font-semibold text-white shadow-[0_14px_34px_rgba(243,90,2,.18)] transition-[transform,background-color,box-shadow] hover:-translate-y-0.5 hover:bg-[#ff6812] hover:shadow-[0_18px_42px_rgba(243,90,2,.28)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f35a02] motion-reduce:hover:translate-y-0"
            href={content.ctaHref}
          >
            {content.ctaLabel}
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
