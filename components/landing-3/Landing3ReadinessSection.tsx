"use client";

import {
  ArrowRight,
  CircleUserRound,
  Compass,
  Link2,
  ShieldCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

import Landing3AnimatedTitle from "@/components/landing-3/Landing3AnimatedTitle";

const getStartedHref =
  "mailto:hello@atlas.study?subject=Atlas%20early%20access";

type ReadinessFeature = {
  copy: string;
  Icon: LucideIcon;
  position: string;
  title: string;
  tone: string;
};

const readinessFeatures: ReadinessFeature[] = [
  {
    title: "Clear.",
    copy: "Every next step.",
    Icon: Compass,
    position: "lg:left-[28%] lg:top-[30%] lg:w-[28%]",
    tone: "border-white/15 text-white",
  },
  {
    title: "Personal.",
    copy: "Built around you.",
    Icon: CircleUserRound,
    position: "lg:left-[57.5%] lg:top-[30%] lg:w-[31%]",
    tone: "border-white/[.075] text-white/48",
  },
  {
    title: "Connected.",
    copy: "Application to arrival.",
    Icon: Link2,
    position: "lg:left-[1%] lg:top-[49.5%] lg:w-[32%]",
    tone: "border-white/15 text-white",
  },
  {
    title: "Reliable.",
    copy: "Guidance you can trust.",
    Icon: ShieldCheck,
    position: "lg:left-[34.5%] lg:top-[49.5%] lg:w-[27%]",
    tone: "border-white/10 text-white/72",
  },
];

const journeyKeys = [
  "esc",
  "F1",
  "✦",
  "F3",
  "F4",
  "↹",
  "Apply",
  "Visa",
  "Bank",
  "Home",
  "→",
  "Uni",
  "CAS",
  "SIM",
  "Jobs",
  "⇧",
  "Docs",
  "£",
  "City",
  "Life",
  "fn",
  "⌃",
  "⌥",
  "⌘",
  "return",
];

export function Landing3ReadinessSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const copy = section?.querySelector<HTMLElement>("[data-readiness-copy]");
    const grid = section?.querySelector<HTMLElement>("[data-readiness-grid]");
    const features = section?.querySelectorAll<HTMLElement>(
      "[data-readiness-feature]",
    );

    if (!section || !copy || !grid || !features?.length) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion || typeof IntersectionObserver === "undefined") {
      gsap.set([copy, grid, ...features], { clearProps: "all" });
      return;
    }

    const context = gsap.context(() => {
      gsap.set(copy, { opacity: 0, y: 18 });
      gsap.set(grid, { opacity: 0, scale: 0.97 });
      gsap.set(features, { opacity: 0, y: 30 });
    }, section);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;

        context.add(() => {
          gsap
            .timeline({ defaults: { ease: "power3.out" } })
            .to(copy, { duration: 0.65, opacity: 1, y: 0 })
            .to(grid, { duration: 0.9, opacity: 1, scale: 1 }, "-=0.38")
            .to(
              features,
              {
                clearProps: "transform",
                duration: 0.72,
                opacity: 1,
                stagger: 0.09,
                y: 0,
              },
              "-=0.52",
            );
        });
        observer.disconnect();
      },
      { threshold: 0.18 },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      context.revert();
    };
  }, []);

  return (
    <section
      className="relative isolate overflow-hidden bg-[#050506] px-5 py-4 text-white sm:px-8  lg:py-0"
      data-landing-3-readiness
      id="journey"
      ref={sectionRef}
    >
      <div className="relative mx-auto grid w-full max-w-[1170px] items-center gap-16  lg:grid-cols-[.45fr_.55fr] lg:gap-0">
        <div
          className="relative z-20 max-w-[330px] lg:pl-6"
          data-readiness-copy
        >
          <Landing3AnimatedTitle
            aria-label="It’s not just about getting in. It’s about being ready for everything after."
            as="h2"
            className="text-[clamp(1.2rem,1.45vw,1.3rem)] font-semibold leading-[1.24] tracking-[-.025em]"
          >
            <span className="block text-white">
              It’s not just about getting in.
            </span>
            <span className="block text-white/28">
              It’s about being ready for everything after.
            </span>
          </Landing3AnimatedTitle>

          <a
            className="mt-12 inline-flex min-h-10 items-center gap-2 rounded-lg border border-white/20 bg-white px-3.5 text-sm font-medium text-black shadow-[0_8px_24px_rgba(0,0,0,.32)] transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            href={getStartedHref}
          >
            <Compass aria-hidden="true" className="size-4" />
            Start your Atlas
            <ArrowRight aria-hidden="true" className="size-3.5" />
          </a>
        </div>

        <div
          className="relative min-h-[470px] w-full sm:min-h-[540px] lg:h-[620px] lg:min-h-0"
          data-readiness-visual
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 grid grid-cols-5 gap-2 opacity-70 sm:gap-3"
            data-readiness-grid
            style={{
              maskImage:
                "radial-gradient(ellipse 69% 67% at 49% 49%, black 35%, rgba(0,0,0,.72) 58%, transparent 100%)",
            }}
          >
            {journeyKeys.map((key, index) => (
              <span
                className="grid min-h-20 place-items-center rounded-xl border border-white/[.035] bg-[linear-gradient(145deg,rgba(15,17,20,.68),rgba(7,8,10,.38))] text-[clamp(.75rem,1.55vw,1.65rem)] font-medium text-white/[.075] shadow-[inset_0_1px_rgba(255,255,255,.018)] sm:min-h-24"
                key={`${key}-${index}`}
              >
                {key}
              </span>
            ))}
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-[8%_2%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(22,36,58,.16),transparent_68%)] blur-2xl"
          />

          <ul className="relative z-10 grid grid-cols-2 gap-2 pt-24 sm:gap-3 sm:px-5 sm:pt-32 lg:block lg:h-full lg:p-0">
            {readinessFeatures.map(({ title, copy, Icon, position, tone }) => (
              <li
                className={`group min-h-[104px] rounded-[14px] border bg-[linear-gradient(145deg,rgba(22,24,28,.96),rgba(9,10,12,.96))] p-3 shadow-[inset_0_1px_rgba(255,255,255,.035),0_14px_34px_rgba(0,0,0,.35)] transition-[transform,border-color,background] duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-[linear-gradient(145deg,rgba(31,34,40,.98),rgba(12,13,16,.98))] focus-within:-translate-y-1 focus-within:border-white/25 motion-reduce:hover:translate-y-0 motion-reduce:focus-within:translate-y-0 sm:p-4 lg:absolute ${position} ${tone}`}
                data-readiness-feature
                key={title}
              >
                <Icon
                  aria-hidden="true"
                  className="mb-4 size-5 opacity-55 transition-[opacity,filter] duration-300 group-hover:opacity-90 group-hover:brightness-125 group-focus-within:opacity-90"
                />
                <p className="text-[clamp(.8rem,1.18vw,1rem)] leading-[1.12] tracking-[-.02em]">
                  <strong className="font-semibold text-current">
                    {title}
                  </strong>{" "}
                  <span className="font-normal text-white/32">{copy}</span>
                </p>
              </li>
            ))}
          </ul>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-30 bg-[linear-gradient(90deg,#050506_0%,transparent_13%,transparent_84%,#050506_100%)]"
          />
        </div>
      </div>
    </section>
  );
}
