"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import type { CSSProperties } from "react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

import {
  Landing3ServiceArtwork,
  type ServiceVisualKey,
} from "@/components/landing-3/Landing3ServiceArtwork";

const servicesHref = "mailto:hello@atlas.study?subject=Atlas%20services";

const categories = ["Prepare", "Arrive", "Settle", "Thrive"] as const;
type Category = (typeof categories)[number];

type AtlasService = {
  description: string;
  title: string;
  tone: string;
  visual: ServiceVisualKey;
};

const services: Record<Category, AtlasService[]> = {
  Prepare: [
    {
      title: "University Shortlist",
      description:
        "Find the universities that fit your goals, profile, and budget.",
      tone: "67, 55, 182",
      visual: "shortlist",
    },
    {
      title: "Application Review",
      description: "Turn every document into a clear, confident application.",
      tone: "37, 99, 235",
      visual: "application",
    },
    {
      title: "Visa Guidance",
      description: "Know what to prepare, when to apply, and what comes next.",
      tone: "11, 126, 107",
      visual: "visa",
    },
    {
      title: "Education Loan",
      description:
        "Compare funding options and move forward without guesswork.",
      tone: "154, 78, 29",
      visual: "loan",
    },
    {
      title: "Scholarship Finder",
      description: "Surface funding opportunities matched to your study plan.",
      tone: "126, 34, 206",
      visual: "scholarship",
    },
  ],
  Arrive: [
    {
      title: "Airport Pickup",
      description:
        "Step off the plane knowing your first ride is already sorted.",
      tone: "37, 99, 235",
      visual: "airport",
    },
    {
      title: "Arrival Checklist",
      description: "Complete the right first-week tasks in the right order.",
      tone: "13, 148, 136",
      visual: "checklist",
    },
    {
      title: "Temporary Stay",
      description: "Book a trusted place while you settle into your new city.",
      tone: "109, 40, 217",
      visual: "stay",
    },
    {
      title: "Local Orientation",
      description:
        "Understand transport, essentials, and your neighborhood fast.",
      tone: "194, 65, 12",
      visual: "orientation",
    },
    {
      title: "Student Welcome",
      description: "Meet people who can help your new chapter feel familiar.",
      tone: "190, 24, 93",
      visual: "welcome",
    },
  ],
  Settle: [
    {
      title: "Verified Homes",
      description:
        "Choose student housing with fewer surprises and clearer terms.",
      tone: "13, 148, 136",
      visual: "homes",
    },
    {
      title: "UK Bank Account",
      description: "Get set up to pay, save, and receive money locally.",
      tone: "37, 99, 235",
      visual: "bank",
    },
    {
      title: "Mobile SIM",
      description:
        "Be connected from day one with a plan that fits your needs.",
      tone: "101, 163, 13",
      visual: "mobile",
    },
    {
      title: "Health Cover",
      description: "Understand your cover and find help when you need it.",
      tone: "126, 34, 206",
      visual: "health",
    },
    {
      title: "Forex & Payments",
      description: "Move money internationally with costs made clear upfront.",
      tone: "202, 138, 4",
      visual: "forex",
    },
  ],
  Thrive: [
    {
      title: "Part-time Jobs",
      description: "Find flexible roles that work around your course schedule.",
      tone: "37, 99, 235",
      visual: "jobs",
    },
    {
      title: "Career Launchpad",
      description:
        "Build the skills, story, and network for your first big role.",
      tone: "126, 34, 206",
      visual: "career",
    },
    {
      title: "Student Community",
      description: "Meet students building a life abroad right alongside you.",
      tone: "190, 24, 93",
      visual: "community",
    },
    {
      title: "Local Experiences",
      description:
        "Discover the places and moments that make a city feel yours.",
      tone: "13, 148, 136",
      visual: "experiences",
    },
    {
      title: "Alumni Network",
      description:
        "Stay connected to people who have already taken the next step.",
      tone: "194, 65, 12",
      visual: "alumni",
    },
  ],
};

const cardEase = "cubic-bezier(0.215, 0.61, 0.355, 1)";

function animateServiceCards(cards: NodeListOf<HTMLElement>) {
  return Array.from(cards).map((card, index) =>
    card.animate(
      [
        {
          opacity: 0,
          transform: "translate(10px, 50px) scale(0.98)",
        },
        {
          opacity: 1,
          transform: "translate(0px, 0px) scale(1)",
        },
      ],
      {
        delay: 100 + index * 80,
        duration: 700,
        easing: cardEase,
        fill: "both",
      },
    ),
  );
}
function ServiceCard({
  description,
  title,
  tone,
  visual,
  index,
}: AtlasService & { index: number }) {
  return (
    <article
      className="group relative h-[410px] w-[80vw] max-w-[305px] shrink-0 overflow-hidden rounded-[18px] border border-white/[.12] bg-[#090a0d] p-5 shadow-[inset_0_1px_rgba(255,255,255,.055),0_22px_60px_rgba(0,0,0,.36)] transition-[transform,border-color,box-shadow] duration-500 ease-out hover:-translate-y-2 hover:border-white/25 hover:shadow-[inset_0_1px_rgba(255,255,255,.1),0_30px_80px_rgba(0,0,0,.52),0_0_48px_rgba(var(--service-tone),.14)] focus-within:-translate-y-2 focus-within:border-white/25 motion-reduce:hover:translate-y-0 motion-reduce:focus-within:translate-y-0 sm:h-[430px] sm:w-[305px]"
      data-atlas-service-card
      data-service-card-style="illustrated"
      data-service-visual-key={visual}
      style={
        {
          "--service-accent": `rgb(${tone})`,
          "--service-tone": tone,
          backgroundImage: `radial-gradient(105% 68% at 50% 108%, rgba(${tone}, .72) 0%, rgba(${tone}, .32) 37%, rgba(${tone}, .08) 64%, transparent 78%), linear-gradient(155deg, rgba(${tone}, .24), rgba(8, 9, 12, .98) 58%)`,
        } as CSSProperties
      }
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(255,255,255,.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.018)_1px,transparent_1px)] [background-size:22px_22px]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100"
        style={{
          background: `radial-gradient(80% 58% at 50% 92%, rgba(${tone}, .34), transparent 72%)`,
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-[58%] overflow-hidden border-t border-white/[.055] bg-black/[.08]">
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#090a0d]/72 to-transparent" />
        <Landing3ServiceArtwork index={index} visual={visual} />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      <div className="relative z-10 flex items-start justify-between">
        <div className="flex items-center gap-3.5">
          <span className="grid size-10 place-items-center overflow-hidden rounded-[10px] border border-white/18 bg-black/25 shadow-[inset_0_1px_rgba(255,255,255,.08),0_8px_24px_rgba(0,0,0,.25)]">
            <svg aria-hidden="true" className="size-6 text-white/88" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" opacity=".45" />
              <path d="m7.5 13 3 3 6-8" fill="none" stroke="var(--service-accent)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </span>
          <h3 className="max-w-[165px] text-[16px] font-medium leading-tight tracking-[-.025em] text-white">
            {title}
          </h3>
        </div>
        <a
          aria-label={`Explore ${title}`}
          className="grid size-9 place-items-center rounded-[9px] border border-white/15 bg-white/[.045] text-white/68 transition-[color,background-color,border-color] hover:border-white/28 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          href={servicesHref}
        >
          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
          />
        </a>
      </div>

      <p className="relative z-10 mt-6 max-w-[255px] text-[14px] leading-[1.48] tracking-[-.012em] text-white/76">
        {description}
      </p>
    </article>
  );
}

export function Landing3ServiceCatalogSection() {
  const [activeCategory, setActiveCategory] = useState<Category>("Prepare");
  const [activeBackdrop, setActiveBackdrop] = useState({ width: 0, x: 0 });
  const [canScrollBack, setCanScrollBack] = useState(false);
  const [canScrollForward, setCanScrollForward] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const tabListRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Partial<Record<Category, HTMLButtonElement>>>({});
  const cardAnimationsRef = useRef<Animation[]>([]);
  const categoryMountedRef = useRef(false);

  const updateRailControls = () => {
    const rail = railRef.current;
    if (!rail) return;
    setCanScrollBack(rail.scrollLeft > 4);
    setCanScrollForward(
      rail.scrollLeft < rail.scrollWidth - rail.clientWidth - 4,
    );
  };

  useLayoutEffect(() => {
    const activeTab = tabRefs.current[activeCategory];
    if (!activeTab || !tabListRef.current) return;

    const updateBackdrop = () => {
      setActiveBackdrop({
        width: activeTab.offsetWidth,
        x: activeTab.offsetLeft,
      });
    };

    updateBackdrop();
    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", updateBackdrop);
      return () => window.removeEventListener("resize", updateBackdrop);
    }

    const observer = new ResizeObserver(updateBackdrop);
    observer.observe(tabListRef.current);

    return () => observer.disconnect();
  }, [activeCategory]);

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
      gsap.set(cards, { opacity: 0 });
    }, section);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        context.add(() => {
          gsap.to(intro, {
            duration: 0.65,
            ease: "power3.out",
            opacity: 1,
            stagger: 0.08,
            y: 0,
          });
        });
        const currentCards = rail.querySelectorAll<HTMLElement>(
          "[data-atlas-service-card]",
        );
        cardAnimationsRef.current.forEach((animation) => animation.cancel());
        cardAnimationsRef.current = animateServiceCards(currentCards);
        observer.disconnect();
      },
      { threshold: 0.12 },
    );

    observer.observe(section);
    const frame = requestAnimationFrame(updateRailControls);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      cardAnimationsRef.current.forEach((animation) => animation.cancel());
      context.revert();
    };
  }, []);

  useLayoutEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    if (typeof rail.scrollTo === "function") {
      rail.scrollTo({ left: 0, behavior: "auto" });
    } else {
      rail.scrollLeft = 0;
    }
    updateRailControls();

    if (!categoryMountedRef.current) {
      categoryMountedRef.current = true;
      return;
    }

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      typeof IntersectionObserver === "undefined"
    ) {
      return;
    }

    const cards = rail.querySelectorAll<HTMLElement>(
      "[data-atlas-service-card]",
    );
    cardAnimationsRef.current.forEach((animation) => animation.cancel());
    const animations = animateServiceCards(cards);
    cardAnimationsRef.current = animations;

    return () => {
      animations.forEach((animation) => animation.cancel());
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
      left: direction * ((card?.offsetWidth ?? 305) + 32),
    });
  };

  return (
    <section
      className="relative isolate overflow-hidden bg-[#050506] py-16 text-white"
      data-landing-3-service-catalog
      id="service-catalog"
      ref={sectionRef}
    >
      <div className="mx-auto flex w-full max-w-[1234px] flex-col items-start gap-10 px-5 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
        <h2
          aria-label="There’s a service for that. Everything you need abroad, without opening ten different tabs."
          className="max-w-[720px] text-balance font-semibold"
          data-services-intro
        >
          <span
            className="block text-[clamp(2.35rem,3.8vw,3.75rem)] leading-[.94] tracking-[-.06em] text-white"
            data-service-catalog-title-primary
          >
            There’s a service for that.
          </span>
          <span
            className="mt-2 block max-w-[620px] text-[clamp(1.3rem,1.7vw,1.65rem)] leading-[1.12] tracking-[-.035em] text-white/30"
            data-service-catalog-title-secondary
          >
            Everything you need abroad, without opening ten different tabs.
          </span>
        </h2>

        <div
          aria-label="Atlas service categories"
          className="relative flex w-fit shrink-0 rounded-full border border-white/[.09] bg-[#0b0c0e]/90 p-1.5 shadow-[inset_0_1px_rgba(255,255,255,.04),0_16px_42px_rgba(0,0,0,.35)]"
          data-services-intro
          ref={tabListRef}
          role="tablist"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-1.5 left-0 rounded-full bg-[radial-gradient(51.07%_92.4%_at_51%_7.61%,#5a5a5a_0%,#1a1a1a_100%)] transition-[transform,width] duration-300 ease-[cubic-bezier(.25,.1,.25,1)]"
            data-services-active-backdrop
            style={{
              transform: `translate3d(${activeBackdrop.x}px, 0, 0)`,
              width: activeBackdrop.width,
            }}
          />
          {categories.map((category) => {
            const selected = activeCategory === category;
            return (
              <button
                aria-controls="atlas-services-panel"
                aria-selected={selected}
                className={`relative z-10 min-h-11 rounded-full px-3 text-base font-medium tracking-[-.02em] transition-colors duration-300 ease-[cubic-bezier(.25,.1,.25,1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:min-h-12 sm:px-6 sm:text-lg ${
                  selected ? "text-white" : "text-[#6a6b6c] hover:text-white/68"
                }`}
                id={`atlas-services-tab-${category.toLowerCase()}`}
                key={category}
                onClick={() => setActiveCategory(category)}
                ref={(element) => {
                  if (element) tabRefs.current[category] = element;
                }}
                role="tab"
                type="button"
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      <div className="relative mt-14">
        <div
          aria-labelledby={`atlas-services-tab-${activeCategory.toLowerCase()}`}
          className="flex snap-x snap-mandatory gap-8 overflow-x-auto overscroll-x-contain pb-6 pt-2 [padding-left:max(1.25rem,calc((100vw-1170px)/2))] [padding-right:max(1.25rem,calc((100vw-1170px)/2))] [scroll-padding-left:max(1.25rem,calc((100vw-1170px)/2))] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:[padding-left:max(2rem,calc((100vw-1170px)/2))] sm:[padding-right:max(2rem,calc((100vw-1170px)/2))] sm:[scroll-padding-left:max(2rem,calc((100vw-1170px)/2))]"
          data-services-rail
          id="atlas-services-panel"
          onScroll={updateRailControls}
          ref={railRef}
          role="tabpanel"
        >
          {services[activeCategory].map((service, index) => (
            <div className="snap-start" key={service.title}>
              <ServiceCard {...service} index={index} />
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
