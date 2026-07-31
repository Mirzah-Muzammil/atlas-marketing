"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import Landing3AnimatedTitle from "@/components/landing-3/Landing3AnimatedTitle";

const atlasStates = [
  {
    id: "in",
    phrase: "Get in.",
    title: "Your offer, connected to everything after it",
  },
  {
    id: "there",
    phrase: "Get there.",
    title: "Every arrival task, in the right order",
  },
  {
    id: "hired",
    phrase: "Get hired.",
    title: "A career plan that starts before graduation",
  },
] as const;

function GetInVisual() {
  return (
    <div className="flex h-full flex-col p-5 sm:p-8">
      <div className="flex items-center justify-between border-b border-white/[.08] pb-5">
        <p className="font-mono text-[9px] uppercase tracking-[.16em] text-white/28">
          Application · offer
        </p>
        <span className="text-[10px] text-white/28">01 / 03</span>
      </div>

      <div className="flex flex-1 flex-col justify-center">
        <div className="flex items-center gap-4">
          <span className="grid size-12 shrink-0 place-items-center rounded-[14px] border border-white/10 bg-white/[.06] text-lg font-semibold text-white">
            L
          </span>
          <div>
            <p className="text-xl font-medium tracking-[-.035em] text-white sm:text-2xl">
              University of Leeds
            </p>
            <p className="mt-1.5 text-xs text-white/38 sm:text-sm">
              MSc Computer Science · Sep 2026
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-2.5">
          {[
            ["Shortlist", "Matched"],
            ["Application", "Submitted"],
            ["Decision", "Approved"],
          ].map(([label, status], index) => (
            <div
              className={
                "grid min-h-14 grid-cols-[22px_1fr_auto] items-center gap-3 border-b px-1 " +
                (index === 2
                  ? "border-[#f35a02]/35 text-white"
                  : "border-white/[.07] text-white/45")
              }
              key={label}
            >
              <span
                aria-hidden="true"
                className={
                  "size-1.5 rounded-full " +
                  (index === 2 ? "bg-[#f35a02]" : "bg-[#5ad38c]")
                }
              />
              <span className="text-xs sm:text-sm">{label}</span>
              <span
                className={
                  "text-[10px] " +
                  (index === 2 ? "text-[#ff8a49]" : "text-white/30")
                }
              >
                {status}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 border-t border-white/[.08] pt-5 text-xs font-medium text-[#ff8a49]">
        <span className="size-1.5 rounded-full bg-[#f35a02] shadow-[0_0_12px_rgba(243,90,2,.55)]" />
        Offer received
      </div>
    </div>
  );
}

function GetThereVisual() {
  return (
    <div className="flex h-full flex-col p-5 sm:p-8">
      <div className="flex items-center justify-between border-b border-white/[.08] pb-5">
        <p className="font-mono text-[9px] uppercase tracking-[.16em] text-white/28">
          Arrival plan
        </p>
        <span className="text-[10px] text-white/28">02 / 03</span>
      </div>

      <div className="flex flex-1 flex-col justify-center">
        <div className="flex items-end justify-between gap-5">
          <div>
            <p className="text-xl font-medium tracking-[-.035em] text-white sm:text-2xl">
              Visa · housing · arrival
            </p>
            <p className="mt-2 text-xs text-white/38 sm:text-sm">
              64% ready — next: final transcripts
            </p>
          </div>
          <span className="text-3xl font-semibold tracking-[-.06em] text-white sm:text-4xl">
            64%
          </span>
        </div>

        <div className="mt-7 h-px bg-white/[.09]">
          <span className="block h-px w-[64%] bg-[#f35a02] shadow-[0_0_16px_rgba(243,90,2,.45)]" />
        </div>

        <div className="mt-8 space-y-2.5">
          {[
            ["CAS received", "Complete", "complete"],
            ["Final transcripts", "Next", "active"],
            ["Housing shortlist", "Saved", "upcoming"],
          ].map(([label, status, state]) => (
            <div
              className={
                "flex min-h-14 items-center justify-between rounded-xl border px-4 " +
                (state === "active"
                  ? "border-[#f35a02]/40 bg-[#f35a02]/[.07]"
                  : "border-white/[.07] bg-black/20")
              }
              key={label}
            >
              <span className="text-xs font-medium text-white/70 sm:text-sm">
                {label}
              </span>
              <span
                className={
                  "text-[9px] uppercase tracking-[.12em] " +
                  (state === "active" ? "text-[#ff8a49]" : "text-white/25")
                }
              >
                {status}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 border-t border-white/[.08] pt-5 text-xs font-medium text-[#83e4aa]">
        <span className="size-1.5 rounded-full bg-[#5ad38c]" />
        On track
      </div>
    </div>
  );
}

function GetHiredVisual() {
  return (
    <div className="flex h-full flex-col p-5 sm:p-8">
      <div className="flex items-center justify-between border-b border-white/[.08] pb-5">
        <p className="font-mono text-[9px] uppercase tracking-[.16em] text-white/28">
          Atlas Jobs · matched role
        </p>
        <span className="text-[10px] text-white/28">03 / 03</span>
      </div>

      <div className="flex flex-1 flex-col justify-center">
        <div className="rounded-[20px] border border-[#f35a02]/30 bg-[#f35a02]/[.055] p-5 shadow-[0_28px_80px_rgba(0,0,0,.32),0_0_50px_rgba(243,90,2,.07)] sm:p-6">
          <div className="flex items-start gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-[14px] bg-[#f35a02] text-base font-semibold text-white shadow-[0_12px_30px_rgba(243,90,2,.22)]">
              D
            </span>
            <div className="min-w-0">
              <p className="text-lg font-medium tracking-[-.035em] text-white sm:text-xl">
                Graduate Software Engineer
              </p>
              <p className="mt-2 text-xs leading-5 text-white/40 sm:text-sm">
                London · £38–45k · via Atlas Jobs
              </p>
            </div>
          </div>

          <div className="mt-7 grid grid-cols-3 divide-x divide-white/[.08] border-y border-white/[.08] py-4">
            {[
              ["Route", "Graduate"],
              ["Match", "94%"],
              ["Closing", "12 days"],
            ].map(([label, value]) => (
              <div className="px-3 first:pl-0 last:pr-0" key={label}>
                <p className="text-[9px] uppercase tracking-[.12em] text-white/25">
                  {label}
                </p>
                <p className="mt-1.5 text-xs font-medium text-white/70 sm:text-sm">
                  {value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-between gap-4">
            <p className="text-xs text-white/35">Eligible for your visa route</p>
            <span className="rounded-full border border-[#5ad38c]/25 bg-[#5ad38c]/[.08] px-3 py-1.5 text-[10px] font-medium text-[#83e4aa]">
              Sponsors visa
            </span>
          </div>
        </div>
      </div>

      <p className="border-t border-white/[.08] pt-5 text-xs leading-5 text-white/34">
        Shortlisted from roles matched to your course, experience, and visa
        route.
      </p>
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
            What is Atlas?
          </Landing3AnimatedTitle>

          <div className="mt-8 flex flex-wrap gap-x-3 gap-y-1 text-[clamp(2.5rem,4.8vw,5rem)] font-medium leading-[1.02] tracking-[-.06em] text-white/16">
            {atlasStates.map((state, index) => (
              <button
                aria-pressed={activeIndex === index}
                className={
                  "transition-[color,text-shadow] duration-500 focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white " +
                  (activeIndex === index
                    ? "text-white [text-shadow:0_0_24px_rgba(255,255,255,.14)]"
                    : "hover:text-white/44")
                }
                key={state.id}
                onClick={() => selectState(index)}
                onMouseEnter={() => selectState(index)}
                type="button"
              >
                {state.phrase}
              </button>
            ))}
          </div>

          <p className="mt-9 max-w-[570px] text-base leading-7 text-white/48 sm:text-lg">
            One system for your whole UK move — university, visa, housing, and
            the job after.{" "}
            <strong className="font-medium text-white/82">
              Most platforms stop at your offer letter. Atlas is built for what
              comes next.
            </strong>
          </p>
        </div>

        <div className="relative min-h-[540px] lg:h-[78svh] lg:max-h-[700px] lg:min-h-0">
          <div className="absolute inset-x-0 top-[5%] h-[90%] overflow-hidden rounded-[24px]">
            <Image
              alt=""
              className="h-full w-full object-cover opacity-40"
              fill
              sizes="(max-width: 1024px) 100vw, 760px"
              src="/images/atlas-departure.jpg"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,6,7,.22),rgba(5,6,7,.72)_72%,#050607),linear-gradient(180deg,rgba(243,90,2,.2),rgba(5,6,7,.9))]" />
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
              {active.id === "in" ? <GetInVisual /> : null}
              {active.id === "there" ? <GetThereVisual /> : null}
              {active.id === "hired" ? <GetHiredVisual /> : null}
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
                <span className="h-px bg-white/10" key={state.id}>
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
