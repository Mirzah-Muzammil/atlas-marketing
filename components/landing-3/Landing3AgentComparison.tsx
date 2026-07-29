"use client";

import { ArrowRight, Check, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

import Landing3AnimatedTitle from "@/components/landing-3/Landing3AnimatedTitle";

const getStartedHref =
  "mailto:hello@atlas.study?subject=Atlas%20early%20access";

const comparisons = [
  {
    agentTitle: "Recommends their partner universities",
    agentCopy:
      "You see the shortlist that pays them the best commission — not the one that fits you best.",
    atlasTitle: "Shortlists what fits you",
    atlasCopy:
      "Built from your grades, budget, and goals — across UK universities, not a partner list.",
  },
  {
    agentTitle: "Charges fees, keeps commissions quiet",
    agentCopy:
      "Service fees up front, undisclosed cuts behind the scenes. You rarely know who's paying whom.",
    atlasTitle: "Free, with every referral disclosed",
    atlasCopy:
      "Our partners pay us, never you. If we earn from a referral, it says so — in writing, on the page.",
  },
  {
    agentTitle: "Done at the offer letter",
    agentCopy:
      "Visa, housing, banking, arrival — that's your problem now. The relationship ends when the commission clears.",
    atlasTitle: "With you long after the offer",
    atlasCopy:
      "Visa, housing, bank account, arrival plan, community, first job. The offer letter is where Atlas starts, not stops.",
  },
  {
    agentTitle: "One person's opinion",
    agentCopy:
      "Your future filtered through whatever one counsellor happens to know this year.",
    atlasTitle: "A platform, plus real people",
    atlasCopy:
      "Structured guidance for every step — and students who made the same move, one message away.",
  },
] as const;

export function Landing3AgentComparison() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const rows = section?.querySelectorAll<HTMLElement>(
      "[data-agent-comparison-row]",
    );
    if (!section || !rows?.length) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion || typeof IntersectionObserver === "undefined") {
      gsap.set(rows, { clearProps: "all" });
      return;
    }

    const context = gsap.context(() => {
      gsap.set(rows, { opacity: 0, y: 24 });
    }, section);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        context.add(() => {
          gsap.to(rows, {
            duration: 0.7,
            ease: "power3.out",
            opacity: 1,
            stagger: 0.1,
            y: 0,
          });
        });
        observer.disconnect();
      },
      { threshold: 0.14 },
    );
    observer.observe(section);

    return () => {
      observer.disconnect();
      context.revert();
    };
  }, []);

  return (
    <section
      className="relative isolate overflow-hidden bg-[#050506] px-5 py-24 text-white sm:px-8 sm:py-32"
      data-landing-3-agent-comparison
      id="why-atlas"
      ref={sectionRef}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-14rem] top-[-8rem] size-[34rem] rounded-full bg-[#f35a02]/[.045] blur-[120px]"
      />

      <div className="relative mx-auto w-full max-w-[1180px]">
        <div className="max-w-[900px]">
          <p className="text-xs font-medium uppercase tracking-[.2em] text-[#f35a02]">
            Why students switch
          </p>
          <Landing3AnimatedTitle
            as="h2"
            className="mt-5 text-balance text-[clamp(2.75rem,6vw,6rem)] font-semibold leading-[.9] tracking-[-.07em]"
          >
            You don’t need an agent. You need an operating system.
          </Landing3AnimatedTitle>
          <p className="mt-7 max-w-[720px] text-base leading-7 text-white/46 sm:text-lg">
            Most students still go through a local consultant. Here&apos;s what
            that costs you — and what changes with Atlas.
          </p>
        </div>

        <div className="relative mt-16 sm:mt-20">
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-1/2 top-0 hidden w-px -translate-x-1/2 bg-white/[.08] lg:block"
          />

          <div className="hidden grid-cols-[1fr_64px_1fr] items-end border-b border-white/[.1] pb-5 lg:grid">
            <div>
              <p className="text-xs font-medium uppercase tracking-[.17em] text-white/28">
                The old way
              </p>
              <p className="mt-2 text-xl font-medium tracking-[-.035em] text-white/62">
                A traditional agent
              </p>
              <p className="mt-1 text-sm text-white/28">
                The consultancy near you
              </p>
            </div>
            <span />
            <div>
              <p className="text-xs font-medium uppercase tracking-[.17em] text-[#f35a02]">
                The Atlas way
              </p>
              <p className="mt-2 text-xl font-medium tracking-[-.035em]">
                GGI Atlas
              </p>
              <p className="mt-1 text-sm text-white/38">
                Free · UK specialists · end to end
              </p>
            </div>
          </div>

          <div>
            {comparisons.map((comparison, index) => (
              <article
                className="group relative grid gap-5 border-b border-white/[.085] py-8 outline-none transition-[background-color] duration-300 hover:bg-white/[.018] focus-visible:bg-white/[.018] sm:py-10 lg:grid-cols-[1fr_64px_1fr] lg:gap-0 lg:px-3"
                data-agent-comparison-row
                key={comparison.agentTitle}
                tabIndex={0}
              >
                <div className="grid grid-cols-[28px_1fr] gap-3 transition-opacity duration-300 group-hover:opacity-55 group-focus-visible:opacity-55 lg:grid-cols-[32px_1fr] lg:pr-12" data-comparison-agent>
                  <span className="mt-0.5 grid size-7 place-items-center rounded-full border border-white/[.09] bg-white/[.035] text-white/30 lg:size-8">
                    <X aria-hidden="true" className="size-3.5" />
                  </span>
                  <div>
                    <p className="mb-3 text-[10px] font-medium uppercase tracking-[.16em] text-white/25 lg:hidden">
                      The old way
                    </p>
                    <h3 className="text-lg font-medium leading-6 tracking-[-.025em] text-white/68 sm:text-xl">
                      {comparison.agentTitle}
                    </h3>
                    <p className="mt-3 max-w-[460px] text-sm leading-6 text-white/34 sm:text-[15px]">
                      {comparison.agentCopy}
                    </p>
                  </div>
                </div>

                <div className="relative hidden place-items-start lg:grid">
                  <span className="relative z-10 grid size-8 place-items-center rounded-full border border-white/[.12] bg-[#090b0f] font-mono text-[10px] text-white/34 transition-[border-color,color,box-shadow] duration-300 group-hover:border-[#f35a02]/55 group-hover:text-[#f35a02] group-hover:shadow-[0_0_24px_rgba(243,90,2,.18)] group-focus-visible:border-[#f35a02]/55 group-focus-visible:text-[#f35a02]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="grid grid-cols-[28px_1fr] gap-3 lg:grid-cols-[32px_1fr] lg:pl-12" data-comparison-atlas>
                  <span className="mt-0.5 grid size-7 place-items-center rounded-full border border-[#f35a02]/25 bg-[#f35a02]/10 text-[#f35a02] transition-[background-color,box-shadow] duration-300 group-hover:bg-[#f35a02]/16 group-hover:shadow-[0_0_24px_rgba(243,90,2,.15)] group-focus-visible:bg-[#f35a02]/16 lg:size-8">
                    <Check aria-hidden="true" className="size-3.5" />
                  </span>
                  <div>
                    <p className="mb-3 text-[10px] font-medium uppercase tracking-[.16em] text-[#f35a02] lg:hidden">
                      The Atlas way
                    </p>
                    <h3 className="text-lg font-medium leading-6 tracking-[-.025em] text-white sm:text-xl">
                      {comparison.atlasTitle}
                    </h3>
                    <p className="mt-3 max-w-[460px] text-sm leading-6 text-white/48 sm:text-[15px]">
                      {comparison.atlasCopy}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-7 border-y border-white/[.09] py-7 sm:flex-row sm:items-center sm:justify-between sm:gap-12 sm:py-8">
          <p className="max-w-[760px] text-sm leading-6 text-white/44 sm:text-base sm:leading-7">
            <strong className="font-medium text-white">
              The honest version:
            </strong>{" "}
            agents aren&apos;t villains — the incentive model is. Atlas is built
            so the only way we win is if you land well.
          </p>
          <a
            className="group inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-[#f35a02] px-6 text-sm font-semibold text-white shadow-[0_14px_34px_rgba(243,90,2,.18)] transition-[transform,background-color,box-shadow] hover:-translate-y-0.5 hover:bg-[#ff6812] hover:shadow-[0_18px_42px_rgba(243,90,2,.28)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f35a02] motion-reduce:hover:translate-y-0"
            href={getStartedHref}
          >
            Start free
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
