import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

import HomepageAnimatedTitle from "@/components/homepage/HomepageAnimatedTitle";

const quoteHref = "mailto:hello@atlas.study?subject=Atlas%20Concierge%20quote";

type CtaSummary = {
  eyebrow?: string;
  title: string;
  description: string;
};

type ConciergeFinalCtaProps = {
  title?: ReactNode;
  description?: ReactNode;
  ctaLabel?: string;
  ctaHref?: string;
  id?: string;
  summary?: CtaSummary;
  visual?: ReactNode;
};

export function ConciergeFinalCta({
  title = (
    <>
      Start with your <span className="text-[#f35a02]">hardest step.</span>
    </>
  ),
  description = "Get a fixed quote in under 24 hours. Decide with the full picture in front of you.",
  ctaLabel = "Get my quote",
  ctaHref = quoteHref,
  id = "quote",
  summary,
  visual,
}: ConciergeFinalCtaProps) {
  return (
    <section
      className="relative isolate overflow-hidden px-5 pb-24 pt-10 text-white sm:px-8 sm:pb-32 sm:pt-16"
      data-concierge-final-cta
      id={id}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 top-[8%] -z-10 bg-[radial-gradient(ellipse_52%_64%_at_47%_100%,rgba(243,90,2,.23),transparent_66%),linear-gradient(180deg,rgba(255,255,255,.025),transparent_32%)]"
      />
      <div className="relative mx-auto grid max-w-[1120px] gap-8 rounded-[28px] border border-white/[0.1] bg-[#0c0c0e]/86 p-7 shadow-[0_32px_110px_rgba(0,0,0,.45)] sm:p-9 lg:grid-cols-[.92fr_.98fr] lg:items-center lg:gap-12 lg:p-11">
        <div>
          <HomepageAnimatedTitle
            as="h2"
            className="max-w-[510px] text-balance text-[clamp(2.45rem,3.7vw,4rem)] font-medium leading-[.92] tracking-[-.065em]"
          >
            {title}
          </HomepageAnimatedTitle>
          <HomepageAnimatedTitle
            as="p"
            className="atlas-homepage-title-3d mt-5 max-w-[30rem] text-sm leading-6 text-white/62 sm:text-base"
          >
            {description}
          </HomepageAnimatedTitle>
          <a
            className="group mt-7 inline-flex min-h-11 items-center gap-2.5 rounded-full bg-[#f35a02] px-5 text-sm font-semibold text-white shadow-[0_18px_42px_rgba(243,90,2,.28)] transition-[transform,background-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:bg-[#ff7026] hover:shadow-[0_24px_54px_rgba(243,90,2,.36)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f35a02] motion-reduce:hover:translate-y-0"
            href={ctaHref}
          >
            {ctaLabel}
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform duration-200 group-hover:translate-x-1"
            />
          </a>
        </div>

        <aside
          className="relative overflow-hidden rounded-[22px] border border-white/[0.1] bg-[radial-gradient(ellipse_56%_40%_at_42%_100%,rgba(243,90,2,.32),transparent_78%),linear-gradient(145deg,rgba(255,255,255,.055),rgba(255,255,255,.018))] p-5 shadow-[inset_0_1px_rgba(255,255,255,.05)] sm:p-6"
          data-concierge-review
        >
          {visual ? (
            visual
          ) : summary ? (
            <div className="flex min-h-full flex-col justify-between">
              {summary.eyebrow ? (
                <p className="font-mono text-[10px] uppercase tracking-[.17em] text-white/42">
                  {summary.eyebrow}
                </p>
              ) : null}
              <p className={`${summary.eyebrow ? "mt-10" : ""} max-w-[24rem] text-[clamp(1.45rem,2.5vw,2.15rem)] font-medium leading-[1.04] tracking-[-.05em] text-white/92`}>
                {summary.title}
              </p>
              <p className="mt-5 max-w-[24rem] border-t border-white/[.1] pt-4 text-sm leading-6 text-white/56">
                {summary.description}
              </p>
            </div>
          ) : (
            <>
              <div aria-label="5 out of 5 stars" className="flex gap-2 text-[#ff7c36]">
                {Array.from({ length: 5 }, (_, index) => (
                  <span aria-hidden="true" data-concierge-review-star key={index}>
                    ★
                  </span>
                ))}
              </div>
              <blockquote className="mt-5 max-w-[30rem] text-[clamp(1.2rem,1.8vw,1.55rem)] font-medium leading-[1.18] tracking-[-.03em] text-white/90">
                “The fastest, most thoughtful support throughout my move.”
              </blockquote>
              <footer className="mt-7 flex items-center gap-3 border-t border-white/[0.1] pt-4">
                <span
                  aria-hidden="true"
                  className="grid size-10 place-items-center rounded-full bg-[linear-gradient(145deg,#ffc8ef,#e74fd1)] text-[11px] font-semibold text-white"
                >
                  SC
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">Sofia Chen</p>
                  <p className="mt-0.5 text-xs text-white/48">Atlas Concierge student</p>
                </div>
              </footer>
            </>
          )}
        </aside>
      </div>
    </section>
  );
}
