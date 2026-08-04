import type { Metadata } from "next";

import { ConciergeFinalCta } from "@/components/concierge/ConciergeFinalCta";
import { JourneyMap } from "@/components/how-it-works/JourneyMap";
import { JourneyPhases } from "@/components/how-it-works/JourneyPhases";
import {
  AgentComparison,
  type AgentComparisonContent,
} from "@/components/homepage/AgentComparison";
import { FaqSection, type FaqItem } from "@/components/homepage/FaqSection";
import HomepageAnimatedTitle from "@/components/homepage/HomepageAnimatedTitle";

export const metadata: Metadata = {
  title: "How Atlas works",
  description:
    "From the day you decide to study abroad to the day you graduate, Atlas keeps every next step in one place.",
  alternates: { canonical: "/how-it-works" },
};

const journeyFaqs: readonly FaqItem[] = [
  {
    question: "How long does the whole journey actually take?",
    answer:
      "From still deciding to graduated and working is typically four years for an undergraduate and two for a Master's. The intense period from choosing a course to landing is usually six to nine months.",
  },
  {
    question: "What if I'm a year out from applying?",
    answer:
      "It is not too early. Start with the country, course, cost, and career outcomes you want to compare, then use Atlas to build a realistic shortlist before applications open.",
  },
  {
    question: "What if I have already applied through an agent?",
    answer:
      "You can still use Atlas to track the rest of your move, including funding, visa preparation, pre-departure services, arrival, jobs, and community.",
  },
  {
    question: "What if I change my target country mid-journey?",
    answer:
      "Atlas keeps your profile, goals, and documents together so you can compare a new route without starting your planning from scratch.",
  },
  {
    question: "Do I need to use Atlas partners?",
    answer:
      "No. Every relationship is labelled clearly. You can use an Atlas recommendation, bring your own provider, or choose a direct purchase.",
  },
  {
    question: "What happens to my account after I graduate?",
    answer:
      "Atlas stays useful for career moves, tax-season questions, second-year housing, PSW visa planning, mentor introductions, and the wider alumni community.",
  },
];

const journeyStages = [
  {
    number: "01",
    title: "Plan & apply",
    copy: "Shortlist, funding, applications.",
  },
  {
    number: "02",
    title: "Arrive & settle",
    copy: "Visa, housing, banking, arrival.",
  },
  {
    number: "03",
    title: "Build & thrive",
    copy: "Jobs, community, and support.",
  },
] as const;

const comparisonContent: AgentComparisonContent = {
  id: "atlas-vs-typical-agent",
  heading: (
    <>
      Atlas vs the <span className="text-[#f35a02]">typical agent.</span>
    </>
  ),
  summary: {
    prefix: "Most students choose between using Atlas free or paying an agent to do their applications.",
    accent: "Here is what is actually different.",
  },
  animateSummary: true,
  atlasEyebrow: "Atlas OS",
  atlasTitle: "Free, end to end",
  atlasBadge: "£0",
  atlasBenefits: [
    { title: "Transparency on fees", copy: "Every direct, partner, or coupon relationship is labelled." },
    { title: "University matching", copy: "Match by admit probability, ROI, and visa success." },
    { title: "Settlement and arrival", copy: "Sequence banking, SIM, insurance, housing, and forex." },
    { title: "Jobs and community", copy: "Keep sponsorship-friendly roles, events, and people close." },
    { title: "Year-round support", copy: "Stay connected through graduation and beyond." },
  ],
  agentEyebrow: "Typical agent",
  agentTitle: "One-time support",
  agentTradeoffs: [
    { title: "Transparency on fees", copy: "University kickbacks are rarely disclosed." },
    { title: "University matching", copy: "Options can be limited to universities that pay commission." },
    { title: "Settlement and arrival", copy: "Often a separate fee or an upsell." },
    { title: "Jobs and community", copy: "Usually ends when you land." },
    { title: "Year-round support", copy: "You are on your own after the offer." },
  ],
  ctaLabel: "Get started",
  ctaHref: "/get-started",
};

export default function HowItWorksPage() {
  return (
    <main
      className="min-h-screen bg-[#050506] text-white [background-image:linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.025)_1px,transparent_1px)] [background-size:72px_72px]"
      id="main-content"
    >
      <section
        className="relative isolate mx-auto grid min-h-[calc(100svh-5rem)] max-w-[1240px] items-center gap-12 overflow-hidden px-5 py-16 sm:px-8 lg:grid-cols-[.9fr_1.1fr] lg:gap-16 lg:py-20"
        data-how-it-works-secondary-hero
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_52%_62%_at_74%_45%,rgba(243,90,2,.16),transparent_72%)]"
        />
        <div className="max-w-[680px] text-center lg:text-left" data-how-it-works-hero-copy>
          <HomepageAnimatedTitle
            as="h1"
            className="text-balance text-[clamp(3.4rem,6.4vw,6.4rem)] font-semibold leading-[.91] tracking-[-.07em]"
          >
            What using <span className="text-[#f35a02]">Atlas</span> actually
            looks like.
          </HomepageAnimatedTitle>
          <HomepageAnimatedTitle
            as="p"
            className="atlas-homepage-title-3d mx-auto mt-7 max-w-[38rem] text-pretty text-base leading-7 text-white/64 sm:text-lg lg:mx-0"
          >
            From the day you decide to study abroad to the day you graduate.
            Then well beyond. This is the journey we’re built for, end to end.
          </HomepageAnimatedTitle>
        </div>

        <ol
          aria-label="The three stages of an Atlas journey"
          className="mt-12 grid w-full max-w-[960px] gap-3 text-left sm:grid-cols-3 lg:mt-0 lg:max-w-[560px] lg:grid-cols-1 lg:justify-self-end"
        >
          {journeyStages.map((stage) => (
            <li
              className="rounded-2xl border border-white/[.1] bg-white/[.035] p-5 shadow-[inset_0_1px_rgba(255,255,255,.04)]"
              key={stage.number}
            >
              <span className="font-mono text-xs tracking-[.15em] text-white/36">
                {stage.number}
              </span>
              <h2 className="mt-7 text-xl font-semibold tracking-[-.04em] text-white">
                {stage.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-white/56">{stage.copy}</p>
            </li>
          ))}
        </ol>
      </section>

      <JourneyMap />
      <JourneyPhases />
      <AgentComparison content={comparisonContent} variant="concierge" />
      <FaqSection
        faqs={journeyFaqs}
        heading={
          <>
            <span className="block">Real timing</span>
            <span className="block text-[#f35a02]">questions.</span>
          </>
        }
        headingLabel="Real timing questions."
        id="journey-faq"
        moreLink={null}
        variant="how-it-works"
      />
      <ConciergeFinalCta
        ctaHref="/get-started"
        ctaLabel="Get started"
        description="Three minutes. No card. The whole journey, sorted."
        id="get-started"
        summary={{
          title: "Three minutes. No card.",
          description: "The whole journey, sorted.",
        }}
        title={
          <>
            Ready to <span className="text-[#f35a02]">start?</span>
          </>
        }
      />
    </main>
  );
}
