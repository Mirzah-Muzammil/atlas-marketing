"use client";

import {
  ArrowRight,
  ChevronDown,
  CircleUserRound,
  Compass,
  Globe2,
  GraduationCap,
  Link2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { type FormEvent, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

import Landing3AnimatedTitle from "@/components/landing-3/Landing3AnimatedTitle";

const levels = ["Master's", "Undergraduate", "Foundation", "PhD"];
const fields = [
  "Computer Science",
  "Business",
  "Engineering",
  "Law",
  "Health Sciences",
];

type ReadinessFeature = {
  copy: string;
  Icon: LucideIcon;
  position: string;
  side: "left" | "right";
  slot: string;
  title: string;
  tone: string;
};

const readinessFeatures: ReadinessFeature[] = [
  {
    title: "Clear.",
    copy: "Every next step.",
    Icon: Compass,
    position: "lg:left-[1%] lg:top-[25%] lg:w-[20%]",
    side: "left",
    slot: "clear",
    tone: "border-white/15 text-white",
  },
  {
    title: "Personal.",
    copy: "Built around you.",
    Icon: CircleUserRound,
    position: "lg:right-[1%] lg:top-[25%] lg:w-[20%]",
    side: "right",
    slot: "personal",
    tone: "border-white/15 text-white",
  },
  {
    title: "Connected.",
    copy: "Application to arrival.",
    Icon: Link2,
    position: "lg:left-[4%] lg:top-[57%] lg:w-[20%]",
    side: "left",
    slot: "connected",
    tone: "border-white/15 text-white",
  },
  {
    title: "Transparent.",
    copy: "No hidden commissions.",
    Icon: ShieldCheck,
    position: "lg:right-[4%] lg:top-[57%] lg:w-[21%]",
    side: "right",
    slot: "transparent",
    tone: "border-white/15 text-white",
  },
];

type AtlasSelection = {
  field: string;
  level: string;
};

export function Landing3ReadinessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [level, setLevel] = useState("Master's");
  const [field, setField] = useState("Computer Science");
  const [preview, setPreview] = useState<AtlasSelection | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const windowFrame = section?.querySelector<HTMLElement>(
      "[data-atlas-preview-window]",
    );
    const features = section?.querySelectorAll<HTMLElement>(
      "[data-readiness-feature]",
    );
    if (!section || !windowFrame || !features?.length) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion || typeof IntersectionObserver === "undefined") {
      gsap.set(windowFrame, { clearProps: "all" });
      gsap.set(features, { opacity: 1 });
      return;
    }

    const context = gsap.context(() => {
      gsap.set(windowFrame, { opacity: 0, scale: 0.975, y: 30 });
      gsap.set(features, { opacity: 0, y: 30 });
    }, section);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        context.add(() => {
          gsap
            .timeline({ defaults: { ease: "power3.out" } })
            .to(windowFrame, {
              duration: 0.8,
              opacity: 1,
              scale: 1,
              y: 0,
            })
            .to(
              features,
              {
                duration: 0.72,
                opacity: 1,
                stagger: 0.09,
                y: 0,
              },
              "-=0.48",
            );
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

  const showAtlas = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPreview({ field, level });
  };

  const previewSteps = preview
    ? [
        {
          label: "01 · Discover",
          title: `${preview.field} shortlist`,
          copy: `Courses matched to your ${preview.level.toLowerCase()} goals, profile, and budget.`,
        },
        {
          label: "02 · Apply",
          title: "Your application route",
          copy: "Documents, funding, deadlines, and visa milestones in the right order.",
        },
        {
          label: "03 · Arrive",
          title: "Everything after the offer",
          copy: "Housing, banking, travel, and community ready before you land.",
        },
      ]
    : [];

  return (
    <section
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-[#050506] px-4 py-20 text-white sm:px-8 sm:py-28 lg:py-12"
      data-landing-3-readiness
      id="journey"
      ref={sectionRef}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
        data-readiness-cinematic-depth
      >
        <div
          className="absolute inset-0 opacity-75 [background-image:linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] [background-size:68px_68px]"
          data-readiness-depth-grid
        />
        <div
          className="absolute -inset-[12%] bg-[radial-gradient(circle_at_26%_55%,rgba(243,90,2,.55),transparent_38%),radial-gradient(circle_at_78%_92%,rgba(243,90,2,.2),transparent_28%),radial-gradient(ellipse_at_center,transparent_24%,rgba(5,5,6,.38)_62%,#050506_88%)] blur-[22px]"
          data-readiness-depth-glow
        />
        <div
          className="absolute inset-0 opacity-[.11] mix-blend-soft-light"
          data-readiness-depth-grain
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.82' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='.7'/%3E%3C/svg%3E\")",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_28%,rgba(5,5,6,.12)_58%,#050506_96%)]" />
      </div>

      <div
        className="relative mx-auto w-full max-w-[1400px] lg:flex lg:min-h-[760px] lg:items-center lg:justify-center"
        data-readiness-center-stage
      >
        <div
          className="relative z-20 mx-auto w-full max-w-[570px] overflow-hidden rounded-[26px] border border-white/[.12] bg-[#090b10] shadow-[0_36px_100px_rgba(0,0,0,.56),inset_0_1px_rgba(255,255,255,.045)] sm:rounded-[30px]"
          data-atlas-preview-window
        >
          <div className="relative flex h-12 items-center border-b border-white/[.08] bg-[#0d0f14] px-4 sm:h-14 sm:px-5">
            <div aria-hidden="true" className="flex items-center gap-2">
              <span className="size-3 rounded-full border border-black/15 bg-[#ff5f57] shadow-[inset_0_1px_rgba(255,255,255,.28)]" data-macos-control="close" />
              <span className="size-3 rounded-full border border-black/15 bg-[#febc2e] shadow-[inset_0_1px_rgba(255,255,255,.28)]" data-macos-control="minimize" />
              <span className="size-3 rounded-full border border-black/15 bg-[#28c840] shadow-[inset_0_1px_rgba(255,255,255,.28)]" data-macos-control="expand" />
            </div>
            <div className="pointer-events-none absolute inset-x-20 text-center text-[11px] font-medium text-white/42 sm:text-xs">
              Atlas Preview
            </div>
            <div className="ml-auto flex items-center gap-1.5 text-[10px] text-white/28 sm:text-[11px]">
              <span className="size-1.5 rounded-full bg-[#f35a02]" />
              Live
            </div>
          </div>

          <div className="px-5 py-8 sm:px-8 sm:py-10 lg:px-9" data-atlas-preview-form>
            <div className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/[.11] bg-white/[.025] px-4 text-sm font-medium text-white/58 sm:min-h-11 sm:px-5 sm:text-base">
              <Globe2 aria-hidden="true" className="size-4 text-[#f35a02]" />
              UK universities
            </div>

            <Landing3AnimatedTitle
              as="h2"
              className="mt-6 max-w-[500px] text-balance text-[clamp(2.4rem,4vw,3.8rem)] font-semibold leading-[.95] tracking-[-.065em]"
            >
              Studying in the UK? See your Atlas.
            </Landing3AnimatedTitle>
            <p className="mt-4 max-w-xl text-sm leading-6 text-white/48 sm:text-base">
              Pick your level and field to preview the journey Atlas builds around
              you.
            </p>

            <form className="mt-7" onSubmit={showAtlas}>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-white/42">Level</span>
                  <span className="relative block">
                    <select
                      className="min-h-14 w-full appearance-none rounded-xl border border-white/[.11] bg-[#11141c] px-4 pr-10 text-sm text-white outline-none transition-colors hover:bg-[#151923] focus:border-[#f35a02]/70 focus:ring-4 focus:ring-[#f35a02]/10 sm:text-base"
                      onChange={(event) => setLevel(event.target.value)}
                      value={level}
                    >
                      {levels.map((option) => <option key={option} value={option}>{option}</option>)}
                    </select>
                    <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-white/48" />
                  </span>
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-white/42">Field</span>
                  <span className="relative block">
                    <select
                      className="min-h-14 w-full appearance-none rounded-xl border border-white/[.11] bg-[#11141c] px-4 pr-10 text-sm text-white outline-none transition-colors hover:bg-[#151923] focus:border-[#f35a02]/70 focus:ring-4 focus:ring-[#f35a02]/10 sm:text-base"
                      onChange={(event) => setField(event.target.value)}
                      value={field}
                    >
                      {fields.map((option) => <option key={option} value={option}>{option}</option>)}
                    </select>
                    <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-white/48" />
                  </span>
                </label>
              </div>

              <button
                className="group mt-5 flex min-h-14 w-full items-center justify-center gap-3 rounded-xl border border-[#ff7a2f] bg-[#f35a02] px-6 text-base font-semibold text-white shadow-[0_18px_42px_rgba(243,90,2,.2)] transition-[transform,background-color,box-shadow] hover:-translate-y-0.5 hover:bg-[#ff6812] hover:shadow-[0_22px_48px_rgba(243,90,2,.3)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f35a02] motion-reduce:hover:translate-y-0"
                type="submit"
              >
                Show my Atlas
                <ArrowRight aria-hidden="true" className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </form>
          </div>

          {preview ? (
            <div
              aria-live="polite"
              className="border-t border-white/[.09] bg-[#0c0f15] px-5 py-6 motion-safe:animate-[atlas-preview-in_.55s_cubic-bezier(.22,1,.36,1)_both] sm:px-8"
              data-atlas-preview-result
              key={`${preview.level}-${preview.field}`}
            >
              <p className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[.16em] text-[#f35a02]">
                <Sparkles aria-hidden="true" className="size-3.5" />
                Preview ready
              </p>
              <h3 className="mt-2 text-xl font-semibold tracking-[-.04em]">
                Your {preview.level} {preview.field} Atlas
              </h3>
              <ol className="mt-4 grid gap-px overflow-hidden rounded-xl border border-white/[.08] bg-white/[.08] sm:grid-cols-3">
                {previewSteps.map((step) => (
                  <li className="bg-[#10131a] p-3" key={step.label}>
                    <p className="text-[9px] font-medium uppercase tracking-[.14em] text-[#f35a02]">{step.label}</p>
                    <p className="mt-2 text-xs font-medium text-white">{step.title}</p>
                  </li>
                ))}
              </ol>
              <div className="mt-4 flex items-center gap-2 text-[11px] text-white/36">
                <GraduationCap aria-hidden="true" className="size-4" />
                Your full route unlocks when you create your Atlas.
              </div>
            </div>
          ) : null}
        </div>

          <div
            className="relative z-0 mt-10 min-h-[500px] w-full sm:min-h-[540px] lg:absolute lg:inset-0 lg:mt-0 lg:h-full lg:min-h-0"
            data-readiness-visual
          >
            <ul className="relative z-10 grid grid-cols-2 gap-2 pt-24 sm:gap-3 sm:px-5 sm:pt-32 lg:block lg:h-full lg:p-0">
                {readinessFeatures.map(({ title, copy, Icon, position, side, slot, tone }) => (
                  <li
                    className={`group min-h-[104px] rounded-[14px] border bg-[linear-gradient(145deg,rgba(22,24,28,.96),rgba(9,10,12,.96))] p-3 shadow-[inset_0_1px_rgba(255,255,255,.035),0_14px_34px_rgba(0,0,0,.35)] transition-[transform,border-color,background] duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-[linear-gradient(145deg,rgba(31,34,40,.98),rgba(12,13,16,.98))] motion-reduce:hover:translate-y-0 sm:p-4 lg:absolute ${position} ${tone}`}
                    data-readiness-feature
                    data-readiness-side={side}
                    data-readiness-slot={slot}
                    key={title}
                  >
                    <Icon aria-hidden="true" className="mb-4 size-5 opacity-55 transition-opacity duration-300 group-hover:opacity-90" />
                    <p className="text-[clamp(.8rem,1.18vw,1rem)] leading-[1.12] tracking-[-.02em]">
                      {`${title} ${copy}`}
                    </p>
                  </li>
                ))}
            </ul>

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-[5] bg-[linear-gradient(90deg,#050506_0%,transparent_8%,transparent_92%,#050506_100%)]"
            />
          </div>
      </div>
    </section>
  );
}
