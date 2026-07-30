"use client";

import { useEffect, useState } from "react";

import Landing3AnimatedTitle from "@/components/landing-3/Landing3AnimatedTitle";
import { Landing3FaqSection } from "@/components/landing-3/Landing3FaqSection";

const resources = [
  {
    id: "timeline",
    label: "Application timeline",
    copy: "Know what to do now and what comes next.",
  },
  {
    id: "budget",
    label: "Budget planner",
    copy: "See the real cost before you commit.",
  },
  {
    id: "arrival",
    label: "Arrival checklist",
    copy: "Land with every first-month task in order.",
  },
] as const;

function DemoCursor({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute z-30 block size-6 drop-shadow-[0_3px_5px_rgba(0,0,0,.7)] transition-all duration-500 ease-out ${className}`}
      data-resource-demo-cursor
    >
      <svg className="h-full w-full" viewBox="0 0 24 24">
        <path
          d="M4.1 2.8 19 13.1l-7.2 1.15-3.92 6.1L4.1 2.8Z"
          fill="white"
          stroke="#08090b"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
      </svg>
    </span>
  );
}

function ResourceSidebar({ active }: { active: string }) {
  return (
    <aside className="border-r border-white/[.07] bg-black/30 p-3 sm:p-5">
      <p className="text-[8px] font-semibold uppercase tracking-[.18em] text-white/24 sm:text-[10px]">
        Atlas tools
      </p>
      <div className="mt-4 space-y-1.5 sm:mt-6">
        {resources.map((resource) => (
          <div
            className={
              "flex items-center gap-2 rounded-lg px-2 py-2 text-[9px] transition-colors sm:px-3 sm:text-xs " +
              (resource.id === active
                ? "bg-white/10 text-white"
                : "text-white/24")
            }
            key={resource.id}
          >
            <span
              className={
                "size-1.5 shrink-0 rounded-full " +
                (resource.id === active ? "bg-[#f35a02]" : "bg-white/12")
              }
            />
            <span className="truncate">{resource.label}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}

function TimelineDemo({ step }: { step: number }) {
  const reviewComplete = step >= 3;

  return (
    <div className="relative grid h-full grid-cols-[78px_1fr] sm:grid-cols-[170px_1fr]">
      <ResourceSidebar active="timeline" />
      <div className="p-4 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[8px] font-semibold uppercase tracking-[.16em] text-[#ff8a49] sm:text-[10px]">
              September 2027 intake
            </p>
            <h3 className="mt-2 text-base font-medium tracking-[-.035em] sm:text-2xl">
              Your application timeline
            </h3>
          </div>
          <span className="whitespace-nowrap rounded-full border border-white/10 bg-white/[.04] px-2 py-1 text-[8px] text-white/40 sm:px-3 sm:text-[10px]">
            {reviewComplete ? "5" : "4"} of 11 complete
          </span>
        </div>
        <div className="mt-5 h-1 overflow-hidden rounded-full bg-white/8 sm:mt-7">
          <span
            className="block h-full rounded-full bg-[#f35a02] transition-[width] duration-700 ease-out"
            style={{ width: reviewComplete ? "46%" : "38%" }}
          />
        </div>
        <div className="mt-5 space-y-2 sm:mt-7 sm:space-y-2.5">
          {[
            ["Shortlist your best-fit courses", "Complete", true],
            ["Review your personal statement", "Today", false],
            ["Prepare funding evidence", "Next", false],
            ["Submit before your priority date", "12 Oct", false],
          ].map(([title, status, complete], index) => {
            const isReview = index === 1;
            const isComplete = Boolean(complete) || (isReview && reviewComplete);
            return (
            <div
              className={
                "flex min-h-10 items-center gap-3 rounded-lg border px-3 transition-all duration-500 sm:min-h-12 sm:px-4 " +
                (isReview && step >= 1 && !reviewComplete
                  ? "border-[#f35a02]/45 bg-[#f35a02]/10"
                  : "border-white/[.07] bg-black/20")
              }
              key={String(title)}
            >
              <span
                className={
                  "grid size-4 shrink-0 place-items-center rounded-full border text-[8px] transition-all duration-500 sm:size-5 " +
                  (isComplete
                    ? "border-[#f35a02] bg-[#f35a02] text-white"
                    : "border-white/16 text-transparent")
                }
              >
                ✓
              </span>
              <span className="truncate text-[9px] text-white/72 sm:text-xs">
                {title}
              </span>
              <span className="ml-auto text-[7px] uppercase tracking-[.1em] text-white/24 sm:text-[9px]">
                {isReview && reviewComplete ? "Complete" : status}
              </span>
            </div>
          )})}
        </div>
      </div>
      <div
        className={`absolute bottom-16 right-6 rounded-full border px-3 py-1.5 text-[8px] font-medium shadow-xl transition-all duration-300 sm:bottom-20 sm:right-10 sm:text-[10px] ${
          step === 1 || step === 2
            ? "translate-y-0 border-[#f35a02]/30 bg-[#27140c] text-[#ffad7e] opacity-100"
            : step >= 3
              ? "translate-y-0 border-white/10 bg-[#151619] text-white/70 opacity-100"
              : "translate-y-2 border-transparent opacity-0"
        }`}
      >
        {reviewComplete ? "Review saved to your application" : "Opening your personal statement"}
      </div>
      <DemoCursor
        className={
          step === 0
            ? "left-[30%] top-[42%] opacity-0"
            : step === 1
              ? "left-[51%] top-[55%] opacity-100"
              : step === 2
                ? "left-[48%] top-[55%] scale-90 opacity-100"
                : "left-[48%] top-[55%] opacity-0"
        }
      />
    </div>
  );
}

function BudgetDemo({ step }: { step: number }) {
  const adjusted = step >= 3;
  const costs = [
    ["Tuition", "£24,500", "58%"],
    ["Housing", adjusted ? "£8,600" : "£10,800", adjusted ? "21%" : "26%"],
    ["Living costs", "£5,950", "14%"],
    ["Arrival", "£1,100", "3%"],
  ] as const;

  return (
    <div className="relative grid h-full grid-cols-[78px_1fr] sm:grid-cols-[170px_1fr]">
      <ResourceSidebar active="budget" />
      <div className="p-4 sm:p-7">
        <p className="text-[8px] font-semibold uppercase tracking-[.16em] text-[#ff8a49] sm:text-[10px]">
          Your real first-year cost
        </p>
        <div className="mt-2 flex items-end justify-between gap-4 border-b border-white/[.08] pb-4 sm:mt-3 sm:pb-6">
          <div>
            <p className="text-2xl font-medium tracking-[-.055em] sm:text-5xl">
              {adjusted ? "£40,150" : "£42,350"}
            </p>
            <p className="mt-1 text-[8px] text-white/28 sm:mt-2 sm:text-[10px]">
              MSc Computer Science · London
            </p>
          </div>
          <div className="relative hidden size-20 place-items-center rounded-full sm:grid">
            <svg aria-hidden="true" className="absolute inset-0 -rotate-90" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="33" fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="7" />
              <circle cx="40" cy="40" r="33" fill="none" stroke="#f35a02" strokeDasharray="207" strokeDashoffset="70" strokeLinecap="round" strokeWidth="7" />
            </svg>
            <span className="text-[9px] text-white/42">Year 1</span>
          </div>
        </div>
        <div className="mt-4 space-y-3 sm:mt-6 sm:space-y-4">
          {costs.map(([label, amount, width]) => (
            <div
              className={`rounded-lg transition-all duration-500 ${
                label === "Housing" && step >= 1 && !adjusted
                  ? "-mx-3 bg-[#f35a02]/8 px-3 py-2"
                  : ""
              }`}
              key={label}
            >
              <div className="flex justify-between text-[9px] sm:text-xs">
                <span className="text-white/48">{label}</span>
                <span className="font-medium text-white/78">{amount}</span>
              </div>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/[.06] sm:mt-2">
                <span className="relative block h-full rounded-full bg-[#f35a02] transition-[width] duration-700 ease-out" style={{ width }}>
                  {label === "Housing" ? (
                    <span className="absolute -right-1.5 -top-1 size-3 rounded-full border-2 border-white bg-[#f35a02] shadow-[0_0_0_4px_rgba(243,90,2,.16)]" />
                  ) : null}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        className={`absolute bottom-16 right-6 rounded-full border px-3 py-1.5 text-[8px] font-medium shadow-xl transition-all duration-300 sm:bottom-20 sm:right-10 sm:text-[10px] ${
          step >= 1
            ? "translate-y-0 border-[#f35a02]/30 bg-[#27140c] text-[#ffad7e] opacity-100"
            : "translate-y-2 border-transparent opacity-0"
        }`}
      >
        {adjusted ? "£2,200 saved from your first-year plan" : "Adjusting your housing budget"}
      </div>
      <DemoCursor
        className={
          step === 0
            ? "left-[38%] top-[44%] opacity-0"
            : step === 1
              ? "left-[70%] top-[61%] opacity-100"
              : step === 2
                ? "left-[61%] top-[61%] scale-90 opacity-100"
                : "left-[58%] top-[61%] opacity-0"
        }
      />
    </div>
  );
}

function ArrivalDemo({ step }: { step: number }) {
  const simComplete = step >= 3;
  const tasks = [
    ["Open your UK bank account", "Day 1", true],
    ["Activate your SIM", "Day 1", simComplete],
    ["Collect your BRP or eVisa", "Day 3", false],
    ["Register with a GP", "Week 1", false],
    ["Join your first Atlas event", "Week 2", false],
  ] as const;

  return (
    <div className="relative grid h-full grid-cols-[78px_1fr] sm:grid-cols-[170px_1fr]">
      <ResourceSidebar active="arrival" />
      <div className="p-4 sm:p-7">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[8px] font-semibold uppercase tracking-[.16em] text-[#ff8a49] sm:text-[10px]">
              First 30 days
            </p>
            <h3 className="mt-2 text-base font-medium tracking-[-.035em] sm:text-2xl">
              Start settled, not scrambling
            </h3>
          </div>
          <div className="grid size-11 place-items-center rounded-full border border-[#f35a02]/35 bg-[#f35a02]/10 text-xs font-medium text-[#ff8a49] sm:size-16 sm:text-base">
            {simComplete ? "2/5" : "1/5"}
          </div>
        </div>
        <div className="mt-5 grid gap-2 sm:mt-7 sm:grid-cols-[1fr_150px] sm:gap-5">
          <div className="space-y-2">
            {tasks.map(([task, day, complete], index) => (
              <div
                className={`flex min-h-9 items-center gap-2 rounded-lg border px-3 transition-all duration-500 sm:min-h-11 ${
                  index === 1 && step >= 1 && !simComplete
                    ? "border-[#f35a02]/45 bg-[#f35a02]/10"
                    : "border-white/[.07] bg-black/20"
                }`}
                key={task}
              >
                <span
                  className={
                    "grid size-4 shrink-0 place-items-center rounded-full text-[8px] " +
                    (complete
                      ? "bg-[#f35a02] text-white"
                      : "border border-white/15 text-transparent")
                  }
                >
                  ✓
                </span>
                <span className="truncate text-[8px] text-white/68 sm:text-[11px]">
                  {task}
                </span>
                <span className="ml-auto text-[7px] text-white/22 sm:text-[8px]">
                  {day}
                </span>
              </div>
            ))}
          </div>
          <div className="relative hidden overflow-hidden rounded-xl border border-white/[.07] bg-[#0c0d10] sm:block">
            <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(30deg,transparent_48%,rgba(255,255,255,.07)_49%,rgba(255,255,255,.07)_51%,transparent_52%),linear-gradient(150deg,transparent_48%,rgba(255,255,255,.05)_49%,rgba(255,255,255,.05)_51%,transparent_52%)] [background-size:42px_42px]" />
            <svg aria-hidden="true" className="absolute inset-0 h-full w-full" viewBox="0 0 150 210">
              <path d="M20 181c17-51 42-45 48-87s41-56 67-68" fill="none" stroke="rgba(255,255,255,.22)" strokeDasharray="5 7" strokeWidth="2" />
              <path d="M94 75c0 19-21 38-21 38S52 94 52 75a21 21 0 1 1 42 0Z" fill="#f35a02" />
              <circle cx="73" cy="75" r="7" fill="white" />
            </svg>
          </div>
        </div>
      </div>
      <div
        className={`absolute bottom-16 right-6 rounded-full border px-3 py-1.5 text-[8px] font-medium shadow-xl transition-all duration-300 sm:bottom-20 sm:right-48 sm:text-[10px] ${
          step >= 1
            ? "translate-y-0 border-[#f35a02]/30 bg-[#27140c] text-[#ffad7e] opacity-100"
            : "translate-y-2 border-transparent opacity-0"
        }`}
      >
        {simComplete ? "SIM added to your arrival plan" : "Marking your SIM as ready"}
      </div>
      <DemoCursor
        className={
          step === 0
            ? "left-[35%] top-[42%] opacity-0"
            : step === 1
              ? "left-[52%] top-[47%] opacity-100"
              : step === 2
                ? "left-[47%] top-[47%] scale-90 opacity-100"
                : "left-[47%] top-[47%] opacity-0"
        }
      />
    </div>
  );
}

export function Landing3ResourcesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [demoStep, setDemoStep] = useState(0);
  const active = resources[activeIndex];

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      setActiveIndex((activeIndex + 1) % resources.length);
    }, 4800);

    return () => window.clearInterval(timer);
  }, [activeIndex]);

  useEffect(() => {
    setDemoStep(0);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      setDemoStep((current) => Math.min(current + 1, 3));
    }, 1050);

    return () => window.clearInterval(timer);
  }, [activeIndex]);

  const selectDemo = (index: number) => {
    setDemoStep(0);
    setActiveIndex(index);
  };

  return (
    <section
      className="relative overflow-hidden bg-[#070709] text-white"
      data-landing-3-resources
      data-resource-demo-state={active.id}
      data-resource-demo-step={demoStep}
      id="resources"
    >
      <div className="relative isolate overflow-hidden px-5 pb-20 pt-20 sm:px-8 sm:pb-24 sm:pt-24">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-[24%] h-[520px] w-[820px] -translate-x-1/2 bg-[#f35a02]/8 blur-[150px]" />
          <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.025)_1px,transparent_1px)] [background-size:76px_76px]" />
        </div>

        <div className="relative mx-auto max-w-[1160px]">
          <div className="text-center">
            <Landing3AnimatedTitle
              as="h2"
              className="mx-auto max-w-[860px] text-[clamp(2.8rem,5vw,5.5rem)] font-semibold leading-[.91] tracking-[-.07em]"
            >
              Resources for the decisions ahead.
            </Landing3AnimatedTitle>
            <p className="mx-auto mt-5 max-w-[600px] text-base leading-7 text-white/42 sm:text-lg">
              Clear guides and practical tools for the moments students actually face.
            </p>
          </div>

          <div className="relative mx-auto mt-10 max-w-[900px] sm:mt-12">
            <div
              aria-hidden="true"
              className="absolute -inset-x-12 -top-20 h-[78%] overflow-hidden opacity-60"
            >
              <span className="absolute left-[48%] top-0 h-[150%] w-20 rotate-45 bg-[#f35a02]/18 blur-sm" />
              <span className="absolute left-[58%] top-[-8%] h-[150%] w-24 rotate-45 bg-[#f35a02]/12 blur-md" />
              <span className="absolute left-[69%] top-[-16%] h-[150%] w-28 rotate-45 bg-[#f35a02]/8 blur-lg" />
            </div>

            <div
              className="relative rounded-[18px] border border-white/[.16] bg-[#111216] p-1.5 shadow-[0_42px_110px_rgba(0,0,0,.68),0_0_70px_rgba(243,90,2,.08)] sm:rounded-[24px] sm:p-2"
              data-resource-laptop
            >
              <div className="relative min-h-[390px] overflow-hidden rounded-[13px] border border-black bg-[#090a0d] sm:aspect-[16/8.55] sm:min-h-0 sm:rounded-[18px]">
                <div className="flex h-10 items-center border-b border-white/[.07] bg-black/30 px-3 sm:h-12 sm:px-4">
                  <div className="flex gap-1.5">
                    <span className="size-2 rounded-full bg-[#ff5f57] sm:size-2.5" />
                    <span className="size-2 rounded-full bg-[#febc2e] sm:size-2.5" />
                    <span className="size-2 rounded-full bg-[#28c840] sm:size-2.5" />
                  </div>
                  <span className="absolute left-1/2 -translate-x-1/2 text-[8px] font-medium text-white/28 sm:text-[10px]">
                    Atlas Resources
                  </span>
                  <span className="ml-auto flex items-center gap-1.5 text-[7px] uppercase tracking-[.14em] text-white/20 sm:text-[9px]">
                    <span className="size-1.5 rounded-full bg-[#f35a02]" />
                    Live
                  </span>
                </div>

                <div
                  className="resource-demo-scene h-[calc(100%-4.5rem)] sm:h-[calc(100%-5.25rem)]"
                  data-resource-visual={active.id}
                  key={active.id}
                >
                  {active.id === "timeline" ? <TimelineDemo step={demoStep} /> : null}
                  {active.id === "budget" ? <BudgetDemo step={demoStep} /> : null}
                  {active.id === "arrival" ? <ArrivalDemo step={demoStep} /> : null}
                </div>

                <div className="absolute inset-x-5 bottom-3 grid grid-cols-3 gap-2 sm:inset-x-8 sm:bottom-4">
                  {resources.map((resource, index) => (
                    <span
                      className="h-px overflow-hidden bg-white/12"
                      data-resource-progress-segment
                      key={resource.id}
                    >
                      <span
                        className={
                          "block h-full origin-left bg-[#f35a02] " +
                          (index === activeIndex
                            ? "resource-demo-progress"
                            : "scale-x-0")
                        }
                      />
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div aria-hidden="true" className="mx-auto h-3 w-[94%] rounded-b-[100%] bg-[linear-gradient(180deg,#26272c,#090a0d)] shadow-[0_15px_30px_rgba(0,0,0,.45)]" />
            <div aria-hidden="true" className="mx-auto h-1.5 w-28 rounded-b-xl bg-white/10" />
          </div>

          <div className="mt-9 grid gap-7 border-t border-white/[.07] pt-6 sm:grid-cols-3 sm:gap-9">
            {resources.map((resource, index) => {
              const selected = index === activeIndex;
              return (
                <article
                  aria-current={selected ? "true" : undefined}
                  className={
                    "transition-colors duration-500 " +
                    (selected ? "text-white" : "text-white/22")
                  }
                  data-resource-demo-caption
                  key={resource.id}
                >
                  <button
                    aria-label={`${resource.label}: ${resource.copy}`}
                    className="block w-full text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                    onClick={() => selectDemo(index)}
                    type="button"
                  >
                    <h3 className="text-base font-medium tracking-[-.025em] sm:text-lg">
                      {resource.label}
                    </h3>
                    <p className="mt-2 max-w-[300px] text-sm leading-6 opacity-65">
                      {resource.copy}
                    </p>
                  </button>
                </article>
              );
            })}
          </div>
        </div>

        <style>{`
          @keyframes resourceDemoEnter {
            from { opacity: 0; transform: translate3d(0, 10px, 0) scale(.992); filter: blur(5px); }
            to { opacity: 1; transform: translate3d(0, 0, 0) scale(1); filter: blur(0); }
          }

          @keyframes resourceDemoProgress {
            from { transform: scaleX(0); }
            to { transform: scaleX(1); }
          }

          .resource-demo-scene {
            animation: resourceDemoEnter .65s cubic-bezier(.22, 1, .36, 1) both;
          }

          .resource-demo-progress {
            animation: resourceDemoProgress 4.8s linear both;
          }

          @media (prefers-reduced-motion: reduce) {
            .resource-demo-scene,
            .resource-demo-progress {
              animation: none;
            }
            .resource-demo-progress { transform: scaleX(1); }
          }
        `}</style>
      </div>

      <Landing3FaqSection />
    </section>
  );
}
