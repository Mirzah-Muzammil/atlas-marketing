"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

import Landing3AnimatedTitle from "@/components/landing-3/Landing3AnimatedTitle";

const dashboardAlt =
  "Atlas dashboard showing a student’s application journey, next steps, and services.";

const demoSteps = [
  {
    cursor: { x: 9.5, y: 32.6 },
    detail: "Turn your profile into a focused shortlist without opening another tab.",
    focus: { height: 6.3, left: 1.3, top: 27.4, width: 17 },
    id: "matcher",
    status: "8 strong-fit universities ready",
    title: "Discover your best-fit universities.",
  },
  {
    cursor: { x: 34.2, y: 55.6 },
    detail: "Open the next task and keep every document tied to its deadline.",
    focus: { height: 21.8, left: 22, top: 45.7, width: 24.5 },
    id: "documents",
    status: "Transcript checklist opened",
    title: "Know exactly what to do next.",
  },
  {
    cursor: { x: 59.5, y: 55.6 },
    detail: "See visa progress and the next milestone without chasing updates.",
    focus: { height: 21.8, left: 47.3, top: 45.7, width: 24.6 },
    id: "visa",
    status: "Visa timeline is on track",
    title: "Keep the important work in motion.",
  },
  {
    cursor: { x: 8.8, y: 44.8 },
    detail: "Move from application support into the services needed for arrival.",
    focus: { height: 6.8, left: 1.3, top: 41.1, width: 17 },
    id: "services",
    status: "Arrival services are ready",
    title: "Carry the same plan beyond admission.",
  },
] as const;

type DemoPosition = CSSProperties & {
  "--demo-height"?: string;
  "--demo-left"?: string;
  "--demo-top"?: string;
  "--demo-width"?: string;
};

export function Landing3DashboardShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const [demoCycle, setDemoCycle] = useState(0);
  const [demoStep, setDemoStep] = useState(0);
  const activeDemo = demoSteps[demoStep];

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      setDemoStep((current) => (current + 1) % demoSteps.length);
    }, 2900);

    return () => window.clearInterval(timer);
  }, [demoCycle]);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = section?.querySelector<HTMLElement>(
      "[data-showcase-heading]",
    );
    const frame = section?.querySelector<HTMLElement>("[data-showcase-frame]");

    if (!section || !heading || !frame) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion || typeof IntersectionObserver === "undefined") {
      gsap.set([heading, frame], { clearProps: "all" });
      return;
    }

    const context = gsap.context(() => {
      gsap.set(heading, { opacity: 0, y: 24 });
      gsap.set(frame, {
        opacity: 0,
        scale: 0.96,
        transformOrigin: "50% 100%",
        y: 64,
      });
    }, section);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;

        context.add(() => {
          gsap
            .timeline({ defaults: { ease: "power3.out" } })
            .to(heading, { duration: 0.7, opacity: 1, y: 0 })
            .to(
              frame,
              { duration: 1.15, opacity: 1, scale: 1, y: 0 },
              "-=0.35",
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

  const selectDemoStep = (index: number) => {
    setDemoStep(index);
    setDemoCycle((cycle) => cycle + 1);
  };

  const replayDemo = () => selectDemoStep(0);

  return (
    <section
      className="relative isolate  overflow-hidden bg-[#050506] px-5 pb-8 pt-20 text-white sm:px-8  "
      data-landing-3-showcase
      id="platform"
      ref={sectionRef}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-[30%] h-[68%] bg-[radial-gradient(ellipse_at_center,rgba(27,56,101,.34)_0%,rgba(12,26,51,.17)_36%,transparent_72%)] blur-2xl" />
        <div
          className="absolute inset-x-0 top-[27%] h-[64%] opacity-55"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(159,198,255,.65) 0 1px, transparent 1.4px), radial-gradient(circle, rgba(255,255,255,.35) 0 .8px, transparent 1.2px)",
            backgroundPosition: "0 0, 47px 29px",
            backgroundSize: "83px 83px, 113px 113px",
            maskImage:
              "linear-gradient(to bottom, transparent, black 18%, black 72%, transparent)",
          }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-[1400px]">
        <Landing3AnimatedTitle
          aria-label="From application to arrival. One Atlas, every next step."
          as="h2"
          className="mx-auto text-center text-[clamp(1.25rem,1.65vw,1.5rem)] font-medium leading-[1.25] tracking-[-.025em] text-white"
          data-showcase-heading
        >
          <span className="block" data-showcase-line="primary">
            From application to arrival.
          </span>
          <span className="block" data-showcase-line="secondary">
            One Atlas, every next step.
          </span>
        </Landing3AnimatedTitle>

        <div
          className="relative mx-auto mt-16 w-full max-w-[1180px] sm:mt-20"
          data-showcase-frame
        >
          <div className="absolute inset-x-[7%] -bottom-[8%] top-[12%] -z-10 rounded-[45%] bg-[#1f4d9d]/20 blur-[80px]" />
          <div className="rounded-[18px] border border-white/[.14] bg-white/[.035] p-[5px] shadow-[0_0_0_1px_rgba(255,255,255,.035),0_38px_110px_rgba(0,0,0,.78),0_0_90px_rgba(42,89,165,.12)] sm:rounded-[22px] sm:p-[7px]">
            <div
              className="relative overflow-hidden rounded-[12px] border border-white/10 bg-[#090a0d] sm:rounded-[15px]"
              data-atlas-dashboard-demo
              data-demo-step={activeDemo.id}
              data-showcase-media
            >
              <Image
                alt={dashboardAlt}
                className="atlas-dashboard-media block h-auto w-full will-change-transform"
                height={575}
                priority
                sizes="(max-width: 1280px) calc(100vw - 40px), 1180px"
                src="/images/crm.png"
                width={1144}
              />
              <div aria-label="Atlas dashboard walkthrough">
                {demoSteps.map((step, index) => {
                  const active = index === demoStep;
                  const position = {
                    "--demo-height": `${step.focus.height}%`,
                    "--demo-left": `${step.focus.left}%`,
                    "--demo-top": `${step.focus.top}%`,
                    "--demo-width": `${step.focus.width}%`,
                  } as DemoPosition;

                  return (
                    <button
                      aria-label={`Show demo: ${step.title}`}
                      aria-pressed={active}
                      className={`absolute z-10 rounded-[7px] border transition-[border-color,background-color,box-shadow] duration-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:rounded-[10px] ${
                        active
                          ? "border-[#f35a02]/75 bg-[#f35a02]/[.045] shadow-[0_0_0_1px_rgba(243,90,2,.12),0_0_30px_rgba(243,90,2,.12)]"
                          : "border-transparent bg-transparent hover:border-white/25"
                      }`}
                      data-demo-hotspot={step.id}
                      key={step.id}
                      onClick={() => selectDemoStep(index)}
                      style={{
                        height: "var(--demo-height)",
                        left: "var(--demo-left)",
                        top: "var(--demo-top)",
                        width: "var(--demo-width)",
                        ...position,
                      }}
                      type="button"
                    />
                  );
                })}
              </div>

              <div
                aria-hidden="true"
                className="pointer-events-none absolute z-20 size-6 -translate-x-[18%] -translate-y-[12%] transition-[left,top] duration-1000 ease-[cubic-bezier(.22,1,.36,1)] sm:size-8"
                data-demo-cursor
                style={{
                  left: `${activeDemo.cursor.x}%`,
                  top: `${activeDemo.cursor.y}%`,
                }}
              >
                <span
                  className="atlas-demo-click absolute left-[28%] top-[28%] size-3 rounded-full border border-[#f35a02]/80"
                  key={`${demoCycle}-${activeDemo.id}`}
                />
                <svg
                  className="relative h-full w-full drop-shadow-[0_4px_8px_rgba(0,0,0,.8)]"
                  fill="none"
                  viewBox="0 0 32 38"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.9 2.8 27.5 24l-10.9 1.1-5.8 9.7L3.9 2.8Z"
                    fill="#F9FAFB"
                    stroke="#07090D"
                    strokeLinejoin="round"
                    strokeWidth="2.4"
                  />
                </svg>
              </div>

              <div
                aria-hidden="true"
                className="atlas-demo-status pointer-events-none absolute right-[2.4%] top-[7%] z-20 flex items-center gap-2 rounded-full border border-white/10 bg-[#111319]/90 px-3 py-2 text-[9px] font-medium text-white shadow-[0_12px_35px_rgba(0,0,0,.5)] backdrop-blur-md sm:px-4 sm:text-xs"
                data-demo-status
                key={`${demoCycle}-${activeDemo.id}-status`}
              >
                <span className="size-1.5 rounded-full bg-[#f35a02] shadow-[0_0_12px_rgba(243,90,2,.8)]" />
                {activeDemo.status}
              </div>
              <span
                aria-hidden="true"
                className="atlas-dashboard-sweep pointer-events-none absolute -inset-y-1/2 left-[-45%] w-[34%] rotate-[18deg] bg-gradient-to-r from-transparent via-white/[.09] to-transparent blur-md"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(180deg,rgba(255,255,255,.035),transparent_16%,transparent_82%,rgba(0,0,0,.16))]"
              />
            </div>

            <div
              aria-live="polite"
              className="grid gap-4 border-t border-white/[.08] px-4 py-4 sm:grid-cols-[1fr_auto] sm:items-center sm:px-6 sm:py-5"
              data-demo-caption
            >
              <div key={`${demoCycle}-${activeDemo.id}-caption`}>
                <p className="text-sm font-medium tracking-[-.02em] text-white sm:text-base">
                  {activeDemo.title}
                </p>
                <p className="mt-1 hidden text-sm text-white/65 sm:block">
                  {activeDemo.detail}
                </p>
              </div>
              <div className="flex items-center justify-between gap-5 sm:justify-end">
                <div aria-hidden="true" className="flex items-center gap-1.5">
                  {demoSteps.map((step, index) => (
                    <span
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        index === demoStep
                          ? "w-5 bg-[#f35a02]"
                          : "w-1.5 bg-white/20"
                      }`}
                      key={step.id}
                    />
                  ))}
                </div>
                <button
                  className="inline-flex items-center gap-2 rounded-full border border-white/12 px-3 py-2 text-xs font-medium text-white/75 transition-colors hover:border-white/25 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  onClick={replayDemo}
                  type="button"
                >
                  <svg
                    aria-hidden="true"
                    className="size-3.5"
                    fill="none"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M13 6.2A5.4 5.4 0 1 1 11.9 3M11.8 1.6v2.7H9.1"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.4"
                    />
                  </svg>
                  Replay demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes atlasDashboardDrift {
          from {
            transform: scale(1.01) translate3d(0, 0, 0);
          }
          to {
            transform: scale(1.035) translate3d(0, -0.45%, 0);
          }
        }

        @keyframes atlasDashboardSweep {
          0%,
          18% {
            opacity: 0;
            transform: translate3d(0, 0, 0) rotate(18deg);
          }
          42% {
            opacity: 1;
          }
          68%,
          100% {
            opacity: 0;
            transform: translate3d(440%, 0, 0) rotate(18deg);
          }
        }

        @keyframes atlasDemoClick {
          0%, 48% {
            opacity: 0;
            transform: scale(.35);
          }
          58% {
            opacity: 1;
          }
          88%, 100% {
            opacity: 0;
            transform: scale(3.4);
          }
        }

        @keyframes atlasDemoStatus {
          from {
            opacity: 0;
            transform: translate3d(0, -8px, 0) scale(.97);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
          }
        }

        .atlas-dashboard-media {
          animation: atlasDashboardDrift 14s ease-in-out infinite alternate;
        }

        .atlas-dashboard-sweep {
          animation: atlasDashboardSweep 8s ease-in-out infinite;
        }

        .atlas-demo-click {
          animation: atlasDemoClick 1.8s ease-out both;
        }

        .atlas-demo-status {
          animation: atlasDemoStatus .55s cubic-bezier(.22, 1, .36, 1) both;
        }

        @media (prefers-reduced-motion: reduce) {
          .atlas-dashboard-media,
          .atlas-dashboard-sweep,
          .atlas-demo-click,
          .atlas-demo-status {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
