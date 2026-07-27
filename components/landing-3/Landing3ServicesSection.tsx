"use client";

import {
  ArrowLeft,
  ArrowRight,
  BadgePoundSterling,
  Banknote,
  BookOpenCheck,
  BriefcaseBusiness,
  Building2,
  CircleCheckBig,
  FileCheck2,
  HeartHandshake,
  House,
  MapPinned,
  PlaneLanding,
  SearchCheck,
  ShieldCheck,
  Smartphone,
  Sparkles,
  UsersRound,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";

const servicesHref = "mailto:hello@atlas.study?subject=Atlas%20services";

const categories = ["Prepare", "Arrive", "Settle", "Thrive"] as const;
type Category = (typeof categories)[number];

type AtlasService = {
  description: string;
  Icon: LucideIcon;
  title: string;
  tone: string;
};

const services: Record<Category, AtlasService[]> = {
  Prepare: [
    {
      title: "University Shortlist",
      description: "Find the universities that fit your goals, profile, and budget.",
      Icon: SearchCheck,
      tone: "67, 55, 182",
    },
    {
      title: "Application Review",
      description: "Turn every document into a clear, confident application.",
      Icon: FileCheck2,
      tone: "37, 99, 235",
    },
    {
      title: "Visa Guidance",
      description: "Know what to prepare, when to apply, and what comes next.",
      Icon: ShieldCheck,
      tone: "11, 126, 107",
    },
    {
      title: "Education Loan",
      description: "Compare funding options and move forward without guesswork.",
      Icon: Banknote,
      tone: "154, 78, 29",
    },
    {
      title: "Scholarship Finder",
      description: "Surface funding opportunities matched to your study plan.",
      Icon: Sparkles,
      tone: "126, 34, 206",
    },
  ],
  Arrive: [
    {
      title: "Airport Pickup",
      description: "Step off the plane knowing your first ride is already sorted.",
      Icon: PlaneLanding,
      tone: "37, 99, 235",
    },
    {
      title: "Arrival Checklist",
      description: "Complete the right first-week tasks in the right order.",
      Icon: CircleCheckBig,
      tone: "13, 148, 136",
    },
    {
      title: "Temporary Stay",
      description: "Book a trusted place while you settle into your new city.",
      Icon: Building2,
      tone: "109, 40, 217",
    },
    {
      title: "Local Orientation",
      description: "Understand transport, essentials, and your neighborhood fast.",
      Icon: MapPinned,
      tone: "194, 65, 12",
    },
    {
      title: "Student Welcome",
      description: "Meet people who can help your new chapter feel familiar.",
      Icon: HeartHandshake,
      tone: "190, 24, 93",
    },
  ],
  Settle: [
    {
      title: "Verified Homes",
      description: "Choose student housing with fewer surprises and clearer terms.",
      Icon: House,
      tone: "13, 148, 136",
    },
    {
      title: "UK Bank Account",
      description: "Get set up to pay, save, and receive money locally.",
      Icon: Banknote,
      tone: "37, 99, 235",
    },
    {
      title: "Mobile SIM",
      description: "Be connected from day one with a plan that fits your needs.",
      Icon: Smartphone,
      tone: "101, 163, 13",
    },
    {
      title: "Health Cover",
      description: "Understand your cover and find help when you need it.",
      Icon: ShieldCheck,
      tone: "126, 34, 206",
    },
    {
      title: "Forex & Payments",
      description: "Move money internationally with costs made clear upfront.",
      Icon: BadgePoundSterling,
      tone: "202, 138, 4",
    },
  ],
  Thrive: [
    {
      title: "Part-time Jobs",
      description: "Find flexible roles that work around your course schedule.",
      Icon: BriefcaseBusiness,
      tone: "37, 99, 235",
    },
    {
      title: "Career Launchpad",
      description: "Build the skills, story, and network for your first big role.",
      Icon: BookOpenCheck,
      tone: "126, 34, 206",
    },
    {
      title: "Student Community",
      description: "Meet students building a life abroad right alongside you.",
      Icon: UsersRound,
      tone: "190, 24, 93",
    },
    {
      title: "Local Experiences",
      description: "Discover the places and moments that make a city feel yours.",
      Icon: MapPinned,
      tone: "13, 148, 136",
    },
    {
      title: "Alumni Network",
      description: "Stay connected to people who have already taken the next step.",
      Icon: HeartHandshake,
      tone: "194, 65, 12",
    },
  ],
};

function ServiceCard({ description, Icon, title, tone }: AtlasService) {
  return (
    <article
      className="group relative h-[286px] w-[82vw] max-w-[350px] shrink-0 overflow-hidden rounded-[19px] border border-white/[.11] bg-[#0b0c0f] p-6 shadow-[inset_0_1px_rgba(255,255,255,.045),0_24px_70px_rgba(0,0,0,.38)] transition-transform duration-300 hover:-translate-y-1 sm:h-[300px] sm:w-[350px]"
      data-atlas-service-card
      style={{
        backgroundImage: `radial-gradient(circle at 50% 115%, rgba(${tone}, .86), rgba(${tone}, .3) 39%, transparent 72%), linear-gradient(145deg, rgba(${tone}, .18), rgba(8, 9, 12, .98) 62%)`,
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-6 bottom-0 grid h-[78px] grid-cols-8 border-t border-white/[.06] opacity-35"
      >
        {Array.from({ length: 24 }).map((_, index) => (
          <span
            className="border-r border-t border-white/[.055]"
            key={index}
          />
        ))}
      </div>

      <div className="relative z-10 flex items-start justify-between">
        <div className="flex items-center gap-3.5">
          <span className="grid size-12 place-items-center rounded-[12px] border border-white/20 bg-black/25 shadow-[inset_0_1px_rgba(255,255,255,.08),0_8px_20px_rgba(0,0,0,.2)]">
            <Icon aria-hidden="true" className="size-6 text-white/88" />
          </span>
          <h3 className="text-[17px] font-medium tracking-[-.02em] text-white">
            {title}
          </h3>
        </div>
        <a
          aria-label={`Explore ${title}`}
          className="grid size-10 place-items-center rounded-[10px] border border-white/15 bg-white/[.045] text-white/68 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          href={servicesHref}
        >
          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
          />
        </a>
      </div>

      <p className="relative z-10 mt-8 max-w-[280px] text-[16px] leading-[1.48] tracking-[-.015em] text-white/88">
        {description}
      </p>
    </article>
  );
}

export function Landing3ServicesSection() {
  const [activeCategory, setActiveCategory] = useState<Category>("Prepare");
  const [canScrollBack, setCanScrollBack] = useState(false);
  const [canScrollForward, setCanScrollForward] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  const updateRailControls = () => {
    const rail = railRef.current;
    if (!rail) return;
    setCanScrollBack(rail.scrollLeft > 4);
    setCanScrollForward(
      rail.scrollLeft < rail.scrollWidth - rail.clientWidth - 4,
    );
  };

  useEffect(() => {
    const section = sectionRef.current;
    const rail = railRef.current;
    if (!section || !rail) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const intro = section.querySelectorAll<HTMLElement>(
      "[data-services-intro]",
    );
    const cards = section.querySelectorAll<HTMLElement>(
      "[data-atlas-service-card]",
    );

    if (reducedMotion || typeof IntersectionObserver === "undefined") {
      gsap.set([...intro, ...cards], { clearProps: "all" });
      updateRailControls();
      return;
    }

    const context = gsap.context(() => {
      gsap.set(intro, { opacity: 0, y: 18 });
      gsap.set(cards, { opacity: 0, y: 34 });
    }, section);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        context.add(() => {
          gsap
            .timeline({ defaults: { ease: "power3.out" } })
            .to(intro, { duration: 0.65, opacity: 1, stagger: 0.08, y: 0 })
            .to(
              cards,
              { duration: 0.72, opacity: 1, stagger: 0.08, y: 0 },
              "-=0.38",
            );
        });
        observer.disconnect();
      },
      { threshold: 0.12 },
    );

    observer.observe(section);
    const frame = requestAnimationFrame(updateRailControls);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      context.revert();
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const rail = railRef.current;
    if (!section || !rail) return;

    if (typeof rail.scrollTo === "function") {
      rail.scrollTo({ left: 0, behavior: "auto" });
    } else {
      rail.scrollLeft = 0;
    }
    updateRailControls();

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      typeof IntersectionObserver === "undefined"
    ) {
      return;
    }

    const cards = section.querySelectorAll<HTMLElement>(
      "[data-atlas-service-card]",
    );
    const animation = gsap.fromTo(
      cards,
      { opacity: 0, y: 18 },
      {
        duration: 0.52,
        ease: "power3.out",
        opacity: 1,
        stagger: 0.055,
        y: 0,
      },
    );

    return () => {
      animation.kill();
    };
  }, [activeCategory]);

  const moveRail = (direction: -1 | 1) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector<HTMLElement>("[data-atlas-service-card]");
    rail.scrollBy({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      left: direction * ((card?.offsetWidth ?? 350) + 56),
    });
  };

  return (
    <section
      className="relative isolate overflow-hidden bg-[#050506] py-24 text-white sm:py-32 lg:min-h-[760px] lg:py-[108px]"
      data-landing-3-services
      id="essentials"
      ref={sectionRef}
    >
      <div className="mx-auto flex w-full max-w-[1234px] flex-col gap-10 px-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
        <h2
          aria-label="There’s a service for that. Everything you need abroad, without opening ten different tabs."
          className="max-w-[360px] text-[clamp(1.2rem,1.45vw,1.3rem)] font-semibold leading-[1.25] tracking-[-.025em]"
          data-services-intro
        >
          <span className="block text-white">There’s a service for that.</span>
          <span className="block text-white/30">
            Everything you need abroad, without opening ten different tabs.
          </span>
        </h2>

        <div
          aria-label="Atlas service categories"
          className="flex w-fit rounded-full border border-white/[.09] bg-[#0b0c0e]/90 p-1.5 shadow-[inset_0_1px_rgba(255,255,255,.04),0_16px_42px_rgba(0,0,0,.35)]"
          data-services-intro
          role="tablist"
        >
          {categories.map((category) => {
            const selected = activeCategory === category;
            return (
              <button
                aria-controls="atlas-services-panel"
                aria-selected={selected}
                className={`min-h-10 rounded-full px-4 text-sm font-medium transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:px-5 ${
                  selected
                    ? "bg-[linear-gradient(180deg,#292a2d,#17181b)] text-white shadow-[inset_0_1px_rgba(255,255,255,.12),0_8px_18px_rgba(0,0,0,.3)]"
                    : "text-white/34 hover:text-white/68"
                }`}
                id={`atlas-services-tab-${category.toLowerCase()}`}
                key={category}
                onClick={() => setActiveCategory(category)}
                role="tab"
                type="button"
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      <div className="relative mt-[74px]">
        <div
          aria-labelledby={`atlas-services-tab-${activeCategory.toLowerCase()}`}
          className="flex snap-x snap-mandatory gap-14 overflow-x-auto overscroll-x-contain pb-4 [padding-left:max(1.25rem,calc((100vw-1170px)/2))] [padding-right:max(1.25rem,calc((100vw-1170px)/2))] [scroll-padding-left:max(1.25rem,calc((100vw-1170px)/2))] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:[padding-left:max(2rem,calc((100vw-1170px)/2))] sm:[padding-right:max(2rem,calc((100vw-1170px)/2))] sm:[scroll-padding-left:max(2rem,calc((100vw-1170px)/2))]"
          data-services-rail
          id="atlas-services-panel"
          onScroll={updateRailControls}
          ref={railRef}
          role="tabpanel"
        >
          {services[activeCategory].map((service) => (
            <div className="snap-start" key={service.title}>
              <ServiceCard {...service} />
            </div>
          ))}
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-[#050506] to-transparent sm:w-10"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[#050506] to-transparent sm:w-20"
        />
      </div>

      <div className="mx-auto mt-11 grid w-full max-w-[1234px] grid-cols-[1fr_auto] items-center gap-6 px-5 sm:grid-cols-[1fr_auto_1fr] sm:px-8">
        <span aria-hidden="true" className="hidden sm:block" />
        <a
          className="justify-self-start text-sm font-medium text-white/72 underline decoration-white/22 underline-offset-4 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:justify-self-center"
          data-services-intro
          href={servicesHref}
        >
          Explore every Atlas service
        </a>
        <div className="flex justify-self-end gap-2" data-services-intro>
          <button
            aria-label="Previous services"
            className="grid size-10 place-items-center rounded-full border border-white/10 bg-white/[.035] text-white/70 transition-colors hover:bg-white/[.075] disabled:cursor-default disabled:opacity-25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            disabled={!canScrollBack}
            onClick={() => moveRail(-1)}
            type="button"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
          </button>
          <button
            aria-label="Next services"
            className="grid size-10 place-items-center rounded-full border border-white/10 bg-white/[.035] text-white/70 transition-colors hover:bg-white/[.075] disabled:cursor-default disabled:opacity-25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            disabled={!canScrollForward}
            onClick={() => moveRail(1)}
            type="button"
          >
            <ArrowRight aria-hidden="true" className="size-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
