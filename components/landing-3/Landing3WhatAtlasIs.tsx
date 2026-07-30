"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import Landing3AnimatedTitle from "@/components/landing-3/Landing3AnimatedTitle";

const atlasStates = [
  {
    id: "plan",
    phrase: "One guided plan.",
    title: "Your route, in the right order",
  },
  {
    id: "transparent",
    phrase: "Free and transparent.",
    title: "Nothing shaping your shortlist",
  },
  {
    id: "people",
    phrase: "People when it matters.",
    title: "A person when the decision needs one",
  },
] as const;

function PlanVisual() {
  return (
    <div className="grid h-full grid-cols-[112px_1fr] sm:grid-cols-[150px_1fr]">
      <div className="border-r border-white/8 bg-black/25 p-3 sm:p-5">
        <p className="text-[9px] font-semibold uppercase tracking-[.16em] text-white/28">
          Your Atlas
        </p>
        <div className="mt-7 space-y-2">
          {["Discover", "Apply", "Prepare", "Arrive"].map((label, index) => (
            <div
              className={
                "flex items-center gap-2 rounded-lg px-2.5 py-2 text-[10px] sm:text-xs " +
                (index === 1 ? "bg-white/10 text-white" : "text-white/32")
              }
              key={label}
            >
              <span
                className={
                  "size-1.5 rounded-full " +
                  (index <= 1 ? "bg-[#f35a02]" : "bg-white/15")
                }
              />
              {label}
            </div>
          ))}
        </div>
      </div>
      <div className="p-4 sm:p-7">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium text-white/44">September 2027</p>
          <p className="text-[10px] text-[#f35a02]">32% complete</p>
        </div>
        <div className="mt-5 h-1 overflow-hidden rounded-full bg-white/8">
          <span className="block h-full w-[32%] rounded-full bg-[#f35a02]" />
        </div>
        <div className="mt-8 space-y-2.5">
          {[
            ["Shortlist approved", "Complete"],
            ["Personal statement", "Today"],
            ["Funding documents", "Next"],
            ["Visa preparation", "Later"],
          ].map(([label, status], index) => (
            <div
              className={
                "flex min-h-14 items-center justify-between rounded-xl border px-4 " +
                (index === 1
                  ? "border-[#f35a02]/45 bg-[#f35a02]/8"
                  : "border-white/[.07] bg-black/20")
              }
              key={label}
            >
              <span className="text-xs font-medium text-white/75 sm:text-sm">
                {label}
              </span>
              <span
                className={
                  "text-[9px] uppercase tracking-[.12em] " +
                  (index === 1 ? "text-[#f35a02]" : "text-white/24")
                }
              >
                {status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TransparencyVisual() {
  return (
    <div className="p-5 sm:p-8">
      <div className="flex items-end justify-between border-b border-white/8 pb-6">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[.16em] text-white/28">
            Student fee
          </p>
          <p className="mt-2 text-5xl font-semibold tracking-[-.07em] text-white">
            £0
          </p>
        </div>
        <span className="rounded-full border border-[#f35a02]/35 bg-[#f35a02]/10 px-3 py-1.5 text-[10px] font-medium text-[#ff8a49]">
          Always free
        </span>
      </div>
      <div className="mt-7">
        <div className="grid grid-cols-[1fr_auto] text-[10px] uppercase tracking-[.14em] text-white/25">
          <span>Why this appears</span>
          <span>Disclosed</span>
        </div>
        <div className="mt-3 space-y-2">
          {[
            ["Matches your grades and budget", "Profile"],
            ["Strong graduate outcomes", "Data"],
            ["Atlas partner relationship", "Partner"],
          ].map(([label, status], index) => (
            <div
              className="grid min-h-16 grid-cols-[1fr_auto] items-center rounded-xl border border-white/[.07] bg-black/25 px-4"
              key={label}
            >
              <span className="text-xs font-medium text-white/72 sm:text-sm">
                {label}
              </span>
              <span
                className={
                  "text-[10px] " +
                  (index === 2 ? "text-[#f35a02]" : "text-white/30")
                }
              >
                {status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PeopleVisual() {
  return (
    <div className="flex h-full flex-col p-5 sm:p-8">
      <div className="flex items-center gap-3 border-b border-white/8 pb-5">
        <span className="grid size-9 place-items-center rounded-full bg-[#f35a02] text-[10px] font-semibold text-white">
          AS
        </span>
        <div>
          <p className="text-sm font-medium">Atlas specialist</p>
          <p className="mt-0.5 text-[10px] text-white/30">Typically replies in 4 minutes</p>
        </div>
        <span className="ml-auto size-2 rounded-full bg-[#49c778]" />
      </div>
      <div className="flex flex-1 flex-col justify-end gap-3 py-7">
        <p className="max-w-[82%] self-end rounded-[20px] rounded-br-[5px] bg-[#f35a02] px-4 py-3 text-xs leading-5 text-white sm:text-sm">
          I have two offers. Can you help me understand the real difference?
        </p>
        <p className="max-w-[84%] rounded-[20px] rounded-bl-[5px] bg-white/10 px-4 py-3 text-xs leading-5 text-white/78 sm:text-sm">
          Yes. Let’s compare course fit, total cost, city, and what each option
          unlocks after graduation.
        </p>
      </div>
      <div className="rounded-xl border border-white/8 bg-black/25 px-4 py-3 text-xs text-white/24">
        Ask Atlas Concierge…
      </div>
    </div>
  );
}

export function Landing3WhatAtlasIs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [cycle, setCycle] = useState(0);
  const active = atlasStates[activeIndex];

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % atlasStates.length);
    }, 3600);

    return () => window.clearInterval(timer);
  }, [cycle]);

  const selectState = (index: number) => {
    setActiveIndex(index);
    setCycle((current) => current + 1);
  };

  return (
    <section
      className="relative isolate overflow-hidden bg-[#050607] px-5 py-20 text-white sm:px-8 sm:py-24 lg:h-[90svh] lg:py-0"
      data-atlas-definition-state={active.id}
      data-landing-3-what-atlas-is
      id="what-is-atlas"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.018)_1px,transparent_1px)] [background-size:72px_72px]"
      />

      <div className="relative mx-auto grid max-w-[1320px] gap-12 lg:h-full lg:grid-cols-[.82fr_1.18fr] lg:items-center lg:gap-20">
        <div
          className="flex flex-col py-4 lg:h-[78svh] lg:max-h-[700px] lg:justify-center lg:py-6"
          data-atlas-definition-copy
        >
          <Landing3AnimatedTitle
            as="h2"
            className="text-[clamp(2rem,3vw,3rem)] font-medium leading-none tracking-[-.045em]"
          >
            What Atlas is.
          </Landing3AnimatedTitle>

          <div className="mt-7 max-w-[590px] text-[clamp(1.7rem,2.7vw,2.65rem)] font-medium leading-[1.48] tracking-[-.045em] text-white/16">
            <button
              aria-pressed={activeIndex === 0}
              className={
                "transition-[color,text-shadow] duration-500 focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white " +
                (activeIndex === 0
                  ? "text-white [text-shadow:0_0_24px_rgba(255,255,255,.16)]"
                  : "hover:text-white/45")
              }
              onClick={() => selectState(0)}
              onMouseEnter={() => selectState(0)}
              type="button"
            >
              One guided plan.
            </button>{" "}
            Every stage stays connected.{" "}
            <button
              aria-pressed={activeIndex === 1}
              className={
                "transition-[color,text-shadow] duration-500 focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white " +
                (activeIndex === 1
                  ? "text-white [text-shadow:0_0_24px_rgba(255,255,255,.16)]"
                  : "hover:text-white/45")
              }
              onClick={() => selectState(1)}
              onMouseEnter={() => selectState(1)}
              type="button"
            >
              Free and transparent.
            </button>{" "}
            Your choices stay yours.{" "}
            <button
              aria-pressed={activeIndex === 2}
              className={
                "transition-[color,text-shadow] duration-500 focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white " +
                (activeIndex === 2
                  ? "text-white [text-shadow:0_0_24px_rgba(255,255,255,.16)]"
                  : "hover:text-white/45")
              }
              onClick={() => selectState(2)}
              onMouseEnter={() => selectState(2)}
              type="button"
            >
              People when it matters.
            </button>{" "}
            Real specialists step in when software is not enough.
          </div>

        </div>

        <div className="relative min-h-[540px] lg:h-[78svh] lg:max-h-[700px] lg:min-h-0">
          <div className="absolute inset-x-0 top-[5%] h-[90%] overflow-hidden rounded-[24px]">
            <Image
              alt=""
              className="h-full w-full object-cover opacity-45"
              fill
              sizes="(max-width: 1024px) 100vw, 760px"
              src="/images/atlas-departure.jpg"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,6,7,.22),rgba(5,6,7,.72)_72%,#050607),linear-gradient(180deg,rgba(243,90,2,.22),rgba(5,6,7,.88))]" />
          </div>

          <div
            className="absolute bottom-[14%] left-[7%] right-0 top-[12%] overflow-hidden rounded-[22px] border border-white/12 bg-[#090b0e]/94 shadow-[0_36px_100px_rgba(0,0,0,.62),0_0_60px_rgba(243,90,2,.1)] backdrop-blur-xl transition-[opacity,transform] duration-500 sm:left-[13%]"
            data-atlas-definition-visual
            key={active.id}
          >
            <div className="flex h-12 items-center border-b border-white/8 px-4">
              <span className="text-xs font-medium text-white/35">Atlas</span>
              <span className="ml-auto flex items-center gap-2 text-[9px] uppercase tracking-[.14em] text-white/24">
                <span className="size-1.5 rounded-full bg-[#f35a02]" />
                Live
              </span>
            </div>
            <div className="h-[calc(100%-3rem)]">
              {active.id === "plan" ? <PlanVisual /> : null}
              {active.id === "transparent" ? <TransparencyVisual /> : null}
              {active.id === "people" ? <PeopleVisual /> : null}
            </div>
          </div>

          <div
            aria-live="polite"
            className="absolute bottom-[2%] left-[13%] right-[8%]"
          >
            <p className="text-lg font-medium tracking-[-.035em] text-white/88">
              {active.title}
            </p>
            <div className="mt-5 grid grid-cols-3 gap-2">
              {atlasStates.map((state, index) => (
                <span
                  className="h-px bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                  key={state.id}
                >
                  <span
                    className={
                      "block h-full origin-left bg-[#f35a02] transition-transform duration-500 " +
                      (index === activeIndex ? "scale-x-100" : "scale-x-0")
                    }
                  />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
