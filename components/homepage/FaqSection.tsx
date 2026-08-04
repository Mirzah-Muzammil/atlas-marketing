"use client";

import { ArrowRight, Plus } from "lucide-react";
import { type ReactNode, useState } from "react";

import HomepageAnimatedTitle from "@/components/homepage/HomepageAnimatedTitle";

export type FaqItem = {
  question: string;
  answer: string;
};

const defaultFaqs = [
  {
    question: "Is Atlas really free?",
    answer:
      "The core Atlas platform is free to use-from university matching and application tracking to arrival planning, services, community, and careers. Concierge is optional and priced separately.",
  },
  {
    question: "What happens after I land?",
    answer:
      "Atlas stays with you after arrival. Your dashboard continues with banking, housing, SIM, community, events, internships, jobs, and the practical milestones that follow throughout your degree.",
  },
  {
    question: "How does Atlas choose its service partners?",
    answer:
      "We choose partners for student value, transparent pricing, reliability, and real usefulness. Any referral relationship is disclosed, and a partner is removed if it stops being a strong option for students.",
  },
] as const satisfies readonly FaqItem[];

type FaqSectionProps = {
  faqs?: readonly FaqItem[];
  heading?: ReactNode;
  headingLabel?: string;
  id?: string;
  moreLink?: { label: string; href: string } | null;
  variant?: "homepage" | "how-it-works";
};

export function FaqSection({
  faqs = defaultFaqs,
  heading = (
    <>
      <span className="block">Frequently</span>
      <span className="block">Asked</span>
      <span className="block">Questions</span>
    </>
  ),
  headingLabel = "Frequently Asked Questions",
  id = "faq",
  moreLink = {
    label: "See more FAQs",
    href: "mailto:hello@atlas.study?subject=Atlas%20FAQs",
  },
  variant = "homepage",
}: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      className="bg-transparent px-5 py-24 text-white sm:px-8 sm:py-32"
      data-atlas-homepage-faq
      data-how-it-works-faq={variant === "how-it-works" ? "" : undefined}
      id={id}
    >
      <div className="mx-auto grid w-full max-w-[1320px] gap-14 lg:grid-cols-[.48fr_.52fr] lg:gap-20">
        <HomepageAnimatedTitle
          aria-label={headingLabel}
          as="h2"
          className="max-w-[560px] text-[clamp(4rem,7vw,7.25rem)] font-semibold leading-[.86] tracking-[-.075em]"
        >
          {heading}
        </HomepageAnimatedTitle>

        <div className="self-center">
          <div className="border-b border-white/10">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              const answerId = `atlas-homepage-faq-answer-${index}`;

              return (
                <div className="border-t border-white/10" key={faq.question}>
                  <button
                    aria-controls={answerId}
                    aria-expanded={isOpen}
                    className="group flex min-h-[92px] w-full items-center gap-6 py-6 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    type="button"
                  >
                    <Plus
                      aria-hidden="true"
                      className={`size-5 shrink-0 text-white/30 transition-transform duration-300 ${isOpen ? "rotate-45 text-white" : "group-hover:text-white/70"}`}
                    />
                    <span className="text-[clamp(1.15rem,1.65vw,1.5rem)] font-semibold tracking-[-.035em]">
                      {faq.question}
                    </span>
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                    id={answerId}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-[650px] pb-7 pl-11 text-base leading-7 text-white/58">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {moreLink ? (
            <a
              className="mt-7 inline-flex items-center gap-2 text-[clamp(1.1rem,1.5vw,1.4rem)] font-semibold tracking-[-.03em] text-white transition-colors hover:text-white/65 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              href={moreLink.href}
            >
              {moreLink.label}
              <ArrowRight aria-hidden="true" className="size-5" />
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
