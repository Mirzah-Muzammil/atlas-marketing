"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";

import Landing3AnimatedTitle from "@/components/landing-3/Landing3AnimatedTitle";

const servicesHref = "mailto:hello@atlas.study?subject=Atlas%20services";
const completedColor = "#45e38f";
const pendingColor = "#34383f";

const journeyStages = [
  {
    atlas:
      "Shortlists universities that will realistically take you, then builds the application with you.",
    label: "Prepare",
    image: "/images/landing-3/journey-photos/application.jpg",
    imageName: "application",
    number: "01",
    services: [
      "University shortlist",
      "Application review",
      "Scholarship finder",
      "Education loan",
      "Funding",
    ],
    slug: "prepare",
    timing: "13 months out",
    you: "Tell Atlas your grades, budget and the course you want.",
  },
  {
    atlas:
      "Sequences your visa steps and travel preparation so nothing arrives late.",
    label: "Arrive",
    image: "/images/landing-3/journey-photos/passport.jpg",
    imageName: "passport",
    number: "02",
    services: ["Visa guidance", "Travel planning", "Student insurance"],
    slug: "arrive",
    timing: "6 months out",
    you: "Upload your documents once. Atlas keeps every deadline connected.",
  },
  {
    atlas:
      "Lines up verified housing, banking and connectivity before you fly.",
    label: "Settle",
    image: "/images/landing-3/journey-photos/home.jpg",
    imageName: "home",
    number: "03",
    services: ["Verified housing", "UK banking", "Mobile SIM", "Forex"],
    slug: "settle",
    timing: "3 months out",
    you: "Choose from verified options instead of scrolling endless listings.",
  },
  {
    atlas:
      "Connects you to other students, local opportunities and the city around you.",
    label: "Thrive",
    image: "/images/landing-3/journey-photos/community.jpg",
    imageName: "community",
    number: "04",
    services: [
      "Student community",
      "Part-time jobs",
      "Career launchpad",
      "Local experiences",
    ],
    slug: "thrive",
    timing: "Day one onward",
    you: "Show up, find your people and start building a life—not just a timetable.",
  },
] as const;

type JourneyStyle = CSSProperties & { "--stage-color": string };

const clamp = (value: number) => Math.min(1, Math.max(0, value));

export function Landing3ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [journeyComplete, setJourneyComplete] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const routePathRef = useRef<SVGPathElement>(null);
  const progressPathRef = useRef<SVGPathElement>(null);
  const progressMaskRef = useRef<SVGPathElement>(null);
  const flightRef = useRef<SVGGElement>(null);
  const activeStage = journeyStages[activeIndex];

  useEffect(() => {
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    const routePath = routePathRef.current;
    const progressPath = progressPathRef.current;
    const progressMask = progressMaskRef.current;
    const flight = flightRef.current;
    if (
      !section ||
      !sticky ||
      !routePath ||
      !progressPath ||
      !progressMask ||
      !flight
    )
      return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let frame = 0;

    const positionFlight = (progress: number) => {
      if (
        typeof routePath.getTotalLength !== "function" ||
        typeof routePath.getPointAtLength !== "function"
      ) {
        return;
      }
      const length = routePath.getTotalLength();
      const distance = length * progress;
      const point = routePath.getPointAtLength(distance);
      const nextPoint = routePath.getPointAtLength(
        Math.min(length, distance + 1),
      );
      const angle =
        (Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * 180) /
        Math.PI;
      flight.setAttribute(
        "transform",
        `translate(${point.x} ${point.y}) rotate(${angle})`,
      );
    };

    const updateJourney = () => {
      frame = 0;
      if (window.innerWidth < 1024) {
        progressMask.style.strokeDashoffset = "0";
        section.style.setProperty("--journey-progress", "1");
        positionFlight(1);
        return;
      }
      const sectionRect = section.getBoundingClientRect();
      const scrollableDistance = Math.max(
        1,
        section.offsetHeight - sticky.offsetHeight,
      );
      const progress = reducedMotion
        ? 1
        : clamp(-sectionRect.top / scrollableDistance);
      const nextIndex = reducedMotion
        ? journeyStages.length - 1
        : Math.min(
            journeyStages.length - 1,
            Math.floor(progress * journeyStages.length),
          );
      progressMask.style.strokeDashoffset = String(1 - progress);
      progressPath.style.setProperty("--journey-progress", String(progress));
      section.style.setProperty("--journey-progress", String(progress));
      positionFlight(progress);
      setJourneyComplete(nextIndex === journeyStages.length - 1);

      if (!reducedMotion) {
        setActiveIndex((current) =>
          current === nextIndex ? current : nextIndex,
        );
      }
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = requestAnimationFrame(updateJourney);
    };

    updateJourney();
    window.addEventListener("resize", requestUpdate);
    window.addEventListener("scroll", requestUpdate, { passive: true });

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("resize", requestUpdate);
      window.removeEventListener("scroll", requestUpdate);
    };
  }, []);

  const chooseStage = (index: number) => {
    setActiveIndex(index);
    setJourneyComplete(index === journeyStages.length - 1);
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    if (!section || !sticky) return;

    const scrollableDistance = section.offsetHeight - sticky.offsetHeight;
    if (scrollableDistance <= 1) return;
    const sectionTop = window.scrollY + section.getBoundingClientRect().top;
    window.scrollTo({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      top:
        sectionTop + scrollableDistance * (index / (journeyStages.length - 1)),
    });
  };

  return (
    <section
      className="relative isolate bg-[#050506] text-white lg:min-h-[220svh]"
      data-landing-3-services
      data-journey-scroll-mode="continuous"
      data-journey-scroll-steps="4"
      id="essentials"
      ref={sectionRef}
    >
      <div
        className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-5 py-20 sm:px-8 lg:sticky lg:top-0 lg:h-[100svh] lg:min-h-0 lg:py-6"
        data-journey-sticky
        ref={stickyRef}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-80 [background-image:linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.025)_1px,transparent_1px)] [background-size:72px_72px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[48%] h-[420px] w-[72vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(75,132,255,.14),rgba(123,82,255,.06)_46%,transparent_72%)] blur-3xl"
        />

        <div className="relative mx-auto w-full max-w-[1240px]">
          <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <Landing3AnimatedTitle
                as="h2"
                className="max-w-[700px] text-balance text-[clamp(2.65rem,4.6vw,4.75rem)] font-semibold leading-[.92] tracking-[-.065em]"
              >
                How Atlas works
              </Landing3AnimatedTitle>
              <p className="mt-3 max-w-[520px] text-sm leading-6 text-white/90 sm:text-base">
                There’s a service for every stage.
              </p>
            </div>
            <div className="hidden text-right lg:block">
              <p className="font-mono text-[11px] uppercase tracking-[.16em] text-white/90">
                Target intake
              </p>
              <p className="mt-2 text-xl font-medium tracking-[-.03em]">
                September 2027
              </p>
            </div>
          </div>

          <div className="relative mt-12 lg:mt-8" data-journey-rail>
            <svg
              aria-hidden="true"
              className="absolute inset-x-0 top-0 z-20 hidden h-[132px] w-full overflow-visible lg:block"
              data-journey-path
              preserveAspectRatio="none"
              viewBox="0 0 1000 132"
            >
              <defs>
                <filter id="atlas-journey-glow" x="-20%" width="140%">
                  <feGaussianBlur result="blur" stdDeviation="5" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <mask id="atlas-journey-progress-mask">
                  <path
                    d="M125 72C220 72 280 30 375 30S530 100 625 100S780 52 875 52"
                    data-journey-progress-mask
                    fill="none"
                    pathLength="1"
                    ref={progressMaskRef}
                    stroke="white"
                    strokeDasharray="1"
                    strokeDashoffset="1"
                    strokeLinecap="round"
                    strokeWidth="12"
                  />
                </mask>
              </defs>
              <path
                data-journey-path-pending
                d="M125 72C220 72 280 30 375 30S530 100 625 100S780 52 875 52"
                fill="none"
                ref={routePathRef}
                stroke={pendingColor}
                strokeDasharray="1 13"
                strokeLinecap="round"
                strokeWidth="4"
              />
              <path
                d="M125 72C220 72 280 30 375 30S530 100 625 100S780 52 875 52"
                data-journey-path-progress
                fill="none"
                filter="url(#atlas-journey-glow)"
                mask="url(#atlas-journey-progress-mask)"
                ref={progressPathRef}
                stroke={completedColor}
                strokeDasharray="1 13"
                strokeLinecap="round"
                strokeWidth="5"
              />
              <g aria-hidden="true" data-journey-flight ref={flightRef}>
                <g
                  className="landing-3-journey-flight"
                  data-journey-flight-shape
                  transform="translate(-28 -21) scale(.95)"
                >
                  <path
                    d="M22 16 18 5c-.8-2.4.8-3.8 3.2-3l6.2 2.1L36 16"
                    fill="#e4717b"
                    stroke="#20242a"
                    strokeLinejoin="round"
                    strokeWidth="2.6"
                  />
                  <path
                    d="m13 18-4.8-8.2c-1.2-2 .3-3.7 2.7-3l4.7 1.5 3.1 9.1"
                    fill="#e4717b"
                    stroke="#20242a"
                    strokeLinejoin="round"
                    strokeWidth="2.6"
                  />
                  <path
                    d="M7 19.5c7.4-3.6 18.7-5.3 31.6-4.5 8.3.5 13.4 3.4 16.1 7.5-2.2 5.4-7.4 8.1-15.6 8.6l-25.5.3c-6.1-.1-9.5-2.4-10.7-5.8 0-2.2 1.4-4.3 4.1-6.1Z"
                    data-journey-flight-original
                    fill="#f8e7c9"
                    stroke="#20242a"
                    strokeLinejoin="round"
                    strokeWidth="2.6"
                  />
                  <path
                    d="M41 17.2c5.8.7 9.7 2.8 12 5.8H42.4c-2.4 0-3.2-1.7-2.4-3.4.4-.9.7-1.6 1-2.4Z"
                    fill="#83c6e6"
                    stroke="#20242a"
                    strokeLinejoin="round"
                    strokeWidth="2.4"
                  />
                  <path
                    d="m34 29-8.2 12.2c-1 1.5-3.1 1.8-4.6.7l-2.3-1.7 5.3-10.9"
                    fill="#e4717b"
                    stroke="#20242a"
                    strokeLinejoin="round"
                    strokeWidth="2.6"
                  />
                  <path
                    d="m22.7 32.2-3.5 1.6m2 2.8-3.5 1.5"
                    fill="none"
                    stroke="#d9e85d"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3.2"
                  />
                </g>
              </g>
            </svg>

            <div className="absolute bottom-4 left-5 top-4 w-px bg-white/10 lg:hidden" />
            <div className="grid gap-4 lg:grid-cols-4 lg:gap-6">
              {journeyStages.map((stage, index) => {
                const selected = activeIndex === index;
                const completed =
                  index < activeIndex ||
                  (journeyComplete && index === journeyStages.length - 1);
                const stageColor =
                  completed || selected ? completedColor : pendingColor;

                return (
                  <article
                    className={`relative z-30 pl-14 opacity-100 lg:pl-0 ${
                      [
                        "lg:translate-y-[48px]",
                        "lg:translate-y-[6px]",
                        "lg:translate-y-[76px]",
                        "lg:translate-y-[28px]",
                      ][index]
                    }`}
                    data-journey-stage
                    data-stage-state={
                      completed ? "complete" : selected ? "active" : "upcoming"
                    }
                    key={stage.slug}
                    style={{ "--stage-color": stageColor } as JourneyStyle}
                  >
                    <button
                      aria-pressed={selected}
                      aria-label={`Explore ${stage.label}`}
                      className="group w-full text-left focus-visible:outline-none lg:flex lg:flex-col lg:items-center lg:text-center"
                      onClick={() => chooseStage(index)}
                      type="button"
                    >
                      <span
                        aria-hidden="true"
                        className={`absolute left-0 top-1 block size-10 overflow-hidden rounded-[14px] bg-[var(--stage-color)] p-[3px] shadow-[0_8px_22px_rgba(0,0,0,.28)] transition-all duration-300 lg:relative lg:left-auto lg:top-auto lg:size-12 ${
                          selected
                            ? "scale-110 drop-shadow-[0_0_10px_rgba(69,227,143,.4)]"
                            : completed
                              ? "drop-shadow-[0_0_8px_rgba(69,227,143,.25)]"
                              : "group-hover:scale-105 group-hover:bg-[#434850]"
                        }`}
                        data-journey-node
                      >
                        <img
                          alt=""
                          className={`size-full rounded-[11px] object-cover transition-[filter,opacity] duration-300 ${
                            completed || selected
                              ? "opacity-100"
                              : "grayscale opacity-55 group-hover:grayscale-0 group-hover:opacity-85"
                          }`}
                          data-journey-image={stage.imageName}
                          src={stage.image}
                        />
                      </span>
                      <span className="mt-4 block font-mono text-[10px] uppercase tracking-[.16em] text-white/90 lg:mt-3">
                        {stage.timing}
                      </span>
                      <span className="mt-1 block text-[clamp(1.45rem,2.2vw,2rem)] font-medium tracking-[-.04em]">
                        {stage.label}
                      </span>
                    </button>
                  </article>
                );
              })}
            </div>
          </div>

          <div
            className="landing-3-journey-panel relative mt-10 border-y border-white/10 lg:mt-[124px]"
            data-active-journey-panel
            data-active-stage={activeStage.slug}
            data-journey-detail-rail
            key={activeStage.slug}
            style={{ "--stage-color": pendingColor } as JourneyStyle}
          >
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--stage-color)] to-transparent opacity-80"
            />
            <div className="relative grid lg:grid-cols-[1.08fr_.92fr]">
              <div className="grid gap-7 py-6 lg:grid-cols-2 lg:py-7 lg:pr-10">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[.18em] text-white">
                    What you do
                  </p>
                  <p className="mt-3 max-w-[360px] text-[15px] leading-6 tracking-[-.02em] text-white/90">
                    {activeStage.you}
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[.18em] text-white">
                    What Atlas does
                  </p>
                  <p className="mt-3 max-w-[360px] text-[15px] leading-6 tracking-[-.02em] text-white/90">
                    {activeStage.atlas}
                  </p>
                </div>
              </div>

              <div className="border-t border-white/[.08] py-6 lg:border-l lg:border-t-0 lg:py-7 lg:pl-10">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-mono text-[10px] uppercase tracking-[.18em] text-white">
                    Services on this stretch
                  </p>
                  <span className="font-mono text-[10px] text-white/90">
                    {activeStage.number} / 04
                  </span>
                </div>
                <ol className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
                  {activeStage.services.map((service, index) => (
                    <li
                      className="group flex items-center gap-2 text-sm text-white/90 transition-colors hover:text-white"
                      key={service}
                    >
                      <span className="font-mono text-[10px] text-white/90">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {service}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between gap-6">
            <p className="hidden font-mono text-[10px] uppercase tracking-[.15em] text-white/90 sm:block">
              Scroll to move through the route
            </p>
            <a
              className="ml-auto text-sm font-medium text-white/90 underline decoration-white/60 underline-offset-4 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              href={servicesHref}
            >
              Explore every Atlas service
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
