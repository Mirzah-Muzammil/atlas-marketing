"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

import HomepageAnimatedTitle from "@/components/homepage/HomepageAnimatedTitle";

const questions = [
  {
    question: "Who exactly does the work?",
    answer:
      "A dedicated specialist is assigned to your case from the first message to the final document. You always know who is working with you.",
  },
  {
    question: "Do I lose control of my application?",
    answer:
      "No. Everything prepared for you appears in Atlas for review. Nothing is submitted without your explicit sign-off.",
  },
  {
    question: "What does it cost?",
    answer:
      "Every task has a fixed fee, agreed before work begins. No hourly billing, percentage cuts, or university commissions.",
  },
  {
    question: "What happens if my visa is refused?",
    answer:
      "Your exact support policy is shared with your quote before you commit, including the support available if a refusal happens.",
  },
  {
    question: "Is my data safe?",
    answer:
      "Your documents stay in Atlas and are visible only to you and your assigned specialist. They are never sold or passed to third parties.",
  },
  {
    question: "Do I need Concierge to use Atlas?",
    answer:
      "No. Atlas stays free. Concierge is an optional layer for the steps you would rather hand to an expert.",
  },
] as const;

export function ConciergeFaqSection() {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const railRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const selectQuestion = (index: number) => setActiveQuestion(index);

  useEffect(() => {
    const rail = railRef.current;
    const activeCard = cardRefs.current[activeQuestion];

    if (!rail || !activeCard) return;

    const frame = window.requestAnimationFrame(() => {
      const cardStart = activeCard.offsetLeft;
      const cardEnd = cardStart + activeCard.offsetWidth;
      const visibleStart = rail.scrollLeft;
      const visibleEnd = visibleStart + rail.clientWidth;

      if (cardStart >= visibleStart && cardEnd <= visibleEnd) return;

      const target = Math.max(
        0,
        Math.min(cardStart - 16, rail.scrollWidth - rail.clientWidth),
      );
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reducedMotion) {
        rail.scrollLeft = target;
        return;
      }

      gsap.killTweensOf(rail);
      gsap.to(rail, {
        duration: 0.7,
        ease: "power3.inOut",
        overwrite: "auto",
        scrollLeft: target,
      });
    });

    return () => {
      window.cancelAnimationFrame(frame);
      if (rail) gsap.killTweensOf(rail);
    };
  }, [activeQuestion]);

  const previousQuestion = () =>
    selectQuestion((activeQuestion - 1 + questions.length) % questions.length);
  const nextQuestion = () => selectQuestion((activeQuestion + 1) % questions.length);

  return (
    <section
      className="relative isolate overflow-hidden px-5 py-24 text-white sm:px-8 sm:py-32"
      data-concierge-faq
      id="faq"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_48%_38%_at_10%_90%,rgba(243,90,2,.12),transparent_72%)]"
      />
      <div className="mx-auto max-w-[1240px]">
        <header className="grid gap-10 lg:grid-cols-[1.2fr_.55fr] lg:items-end lg:gap-20">
          <HomepageAnimatedTitle
            aria-label="Frequently Asked Questions"
            as="h2"
            className="max-w-[780px] text-[clamp(3.4rem,6.5vw,6.9rem)] font-medium leading-[.86] tracking-[-.075em]"
          >
            <span className="block">Frequently Asked</span>
            <span className="block text-[#f35a02]">Questions</span>
          </HomepageAnimatedTitle>
          <div className="lg:pb-2">
            <HomepageAnimatedTitle
              as="p"
              className="atlas-homepage-title-3d max-w-[26rem] text-base leading-6 text-white/58 sm:text-lg sm:leading-7"
            >
              Clear answers before you hand a step to Concierge.
            </HomepageAnimatedTitle>
            <div className="mt-6 flex items-center gap-3">
              <button
                aria-label="Previous question"
                className="grid size-11 place-items-center rounded-full border border-white/16 text-white/72 transition-colors hover:border-[#f35a02] hover:bg-[#f35a02] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f35a02]"
                onClick={previousQuestion}
                type="button"
              >
                <ArrowLeft aria-hidden="true" className="size-4" />
              </button>
              <button
                aria-label="Next question"
                className="grid size-11 place-items-center rounded-full bg-[#f35a02] text-white transition-colors hover:bg-[#ff7026] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f35a02]"
                onClick={nextQuestion}
                type="button"
              >
                <ArrowRight aria-hidden="true" className="size-4" />
              </button>
            </div>
          </div>
        </header>

        <div
          aria-label="Concierge frequently asked questions"
          className="mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          data-concierge-faq-rail
          ref={railRef}
        >
          {questions.map((item, index) => {
            const isActive = activeQuestion === index;

            return (
              <button
                aria-pressed={isActive}
                className={`flex min-h-[31rem] w-[min(82vw,31rem)] shrink-0 snap-start flex-col overflow-hidden rounded-[26px] border p-7 text-left transition-[flex-basis,background-color,border-color,box-shadow] duration-700 ease-[cubic-bezier(.22,1,.36,1)] sm:p-9 lg:w-auto lg:basis-[13rem] ${
                  isActive
                    ? "concierge-faq-card-active lg:basis-[31rem] border-[#f35a02] bg-[#f35a02] text-white shadow-[0_26px_80px_rgba(243,90,2,.22)]"
                    : "concierge-faq-card-inactive border-white/[0.08] bg-white/[0.045] text-white/45 hover:border-white/[0.16] hover:bg-white/[0.065] hover:text-white/72"
                }`}
                data-concierge-faq-card
                key={item.question}
                onClick={() => selectQuestion(index)}
                ref={(element) => {
                  cardRefs.current[index] = element;
                }}
                type="button"
              >
                <span
                  className={`text-[11px] font-medium tracking-[.18em] ${
                    isActive ? "text-white/70" : "text-white/28"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className={`mt-auto block origin-bottom-left text-balance font-medium leading-[.98] tracking-[-.055em] transition-[font-size,opacity,transform] duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
                    isActive
                      ? "text-[clamp(2rem,3vw,3rem)]"
                      : "text-[clamp(1.45rem,2vw,1.9rem)] opacity-80"
                  }`}
                >
                  {item.question}
                </span>
                <span
                  className={`block max-w-[31ch] overflow-hidden text-sm leading-6 transition-[max-height,margin-top,opacity,transform] duration-500 ease-[cubic-bezier(.22,1,.36,1)] sm:text-base sm:leading-7 ${
                    isActive
                      ? "mt-7 max-h-40 translate-y-0 text-white/76 opacity-100"
                      : "mt-0 max-h-0 translate-y-3 text-white/0 opacity-0"
                  }`}
                >
                  {item.answer}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
