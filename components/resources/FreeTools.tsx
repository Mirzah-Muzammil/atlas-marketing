"use client";

import { useState } from "react";

import HomepageAnimatedTitle from "@/components/homepage/HomepageAnimatedTitle";

const checklistItems = [
  ["Apply for student visa", "90d"],
  ["Pay tuition deposit", "75d"],
  ["Confirm CAS letter", "60d"],
  ["Book accommodation", "45d"],
  ["Pre-activate UK SIM", "30d"],
  ["Open UK bank account", "21d"],
  ["Buy flights, plan arrival", "14d"],
] as const;

const budgetRows = [
  ["Tuition", "£24,000"],
  ["Rent · 12 mo", "£10,800"],
  ["Food & groceries", "£3,600"],
  ["Transport", "£1,200"],
  ["Visa + IHS", "£1,300"],
  ["Forex spread", "£480"],
] as const;

export function FreeTools() {
  const [checkedItems, setCheckedItems] = useState(() => new Set([0, 1, 2]));

  const toggleChecklistItem = (index: number) => {
    setCheckedItems((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <section className="relative overflow-hidden px-5 py-24 sm:px-8 sm:py-32" id="free-tools">
      <div className="mx-auto max-w-[1320px]">
        <header className="grid gap-7 border-b border-white/[.1] pb-10 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
          <HomepageAnimatedTitle
            as="h2"
            className="max-w-[720px] text-balance text-[clamp(3rem,5vw,5.35rem)] font-semibold leading-[.9] tracking-[-.07em]"
          >
            Four tools that <span className="text-[#f35a02]">do real work.</span>
          </HomepageAnimatedTitle>
          <p className="max-w-[520px] text-pretty text-base leading-7 text-white/62 lg:justify-self-end">
            The ones you would actually open at 11pm on a Tuesday. No email gate, no nag screens, no upgrade wall. They run in your browser, and your data stays on your device.
          </p>
        </header>

        <div className="mt-6 grid gap-4 lg:grid-cols-12">
          <article className="group relative overflow-hidden rounded-[18px] border border-white/[.16] bg-[#0c0d10]/95 transition-colors duration-300 hover:border-white/[.28] lg:col-span-7 lg:min-h-[500px]" data-tool-window="true">
            <MacWindowBar title="Atlas Budget" />
            <div className="p-6 sm:p-7">
              <ToolHeader
              description="How much does your year actually cost? Tuition, rent, food, transport, the visa, the forex spread, all of it, in your home currency."
              index="01"
              title="Budget calculator."
              />
              <div className="mt-8 border-y border-white/[.1]">
              {budgetRows.map(([label, value]) => (
                <div className="flex items-center justify-between border-b border-white/[.07] py-3.5 last:border-0" key={label}>
                  <span className="text-sm text-white/52">{label}</span>
                  <span className="font-mono text-sm text-white/86">{value}</span>
                </div>
              ))}
            </div>
              <div className="mt-6 flex items-end justify-between gap-6">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[.15em] text-white/35">Year-1 total</p>
                  <p className="mt-2 text-[clamp(2.5rem,4vw,4.4rem)] font-medium leading-none tracking-[-.07em] text-white">£41,380</p>
                </div>
                <ToolLink label="Open calculator" />
              </div>
            </div>
          </article>

          <article className="group overflow-hidden rounded-[18px] border border-white/[.16] bg-[#0c0d10]/95 transition-colors duration-300 hover:border-white/[.28] lg:col-span-5 lg:min-h-[500px]" data-tool-window="true">
            <MacWindowBar title="Atlas Checklist" />
            <div className="p-6 sm:p-7">
              <ToolHeader
              description="47 things to do across the 90 days before you fly. Sorted by deadline pressure, not alphabet."
              index="02"
              title="Pre-departure checklist."
              />
              <div className="mt-6">
              {checklistItems.map(([label, timing], index) => {
                const isChecked = checkedItems.has(index);
                return (
                  <button
                    aria-pressed={isChecked}
                    className="grid w-full grid-cols-[24px_1fr_auto] items-center gap-3 border-t border-white/[.09] py-3 text-left transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f35a02]"
                    key={label}
                    onClick={() => toggleChecklistItem(index)}
                    type="button"
                  >
                    <span className={`grid h-5 w-5 place-items-center border text-[11px] transition-colors ${isChecked ? "border-[#f35a02] bg-[#f35a02] text-white" : "border-white/25 text-transparent"}`}>✓</span>
                    <span className={`text-sm transition-colors ${isChecked ? "text-white/38 line-through" : "text-white/78"}`}>{label}</span>
                    <span className="font-mono text-[10px] text-white/32">{timing}</span>
                  </button>
                );
              })}
            </div>
              <div className="mt-6 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[.14em] text-white/36">{checkedItems.size} of 47 checked</span>
                <ToolLink label="Open checklist" />
              </div>
            </div>
          </article>

          <article className="group overflow-hidden rounded-[18px] border border-white/[.16] bg-[#0c0d10]/95 transition-colors duration-300 hover:border-white/[.28] lg:col-span-5 lg:min-h-[440px]" data-tool-window="true">
            <MacWindowBar title="Atlas Forex" />
            <div className="p-6 sm:p-7">
              <ToolHeader
              description="INR to GBP, EUR, AUD, CAD, USD. Live mid-market rate, 30-day trend, and an alert when the rate crosses your target."
              index="03"
              title="Forex rate tracker."
              />
              <div className="mt-8 flex items-end justify-between border-b border-white/[.1] pb-6">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[.14em] text-white/34">INR → GBP</p>
                <p className="mt-2 text-4xl font-medium tracking-[-.06em] text-white">₹107.42</p>
              </div>
              <p className="pb-1 font-mono text-xs text-[#f35a02]">+0.8% · 7d</p>
            </div>
            <svg aria-label="30 day INR to GBP rate trend" className="mt-7 h-32 w-full" role="img" viewBox="0 0 440 130">
              <path d="M0 105H440M0 65H440M0 25H440" stroke="rgba(255,255,255,.07)" />
              <path d="M0 104 C32 98 44 76 75 83 C110 91 120 48 158 56 C196 65 205 38 242 46 C278 55 302 18 334 32 C368 47 392 25 440 12" fill="none" stroke="#f35a02" strokeLinecap="round" strokeWidth="3" />
              <path d="M0 104 C32 98 44 76 75 83 C110 91 120 48 158 56 C196 65 205 38 242 46 C278 55 302 18 334 32 C368 47 392 25 440 12 L440 130 L0 130Z" fill="rgba(243,90,2,.08)" />
            </svg>
              <div className="mt-5 flex items-center justify-between">
                <p className="text-xs text-white/38">30-day low <span className="ml-2 text-white/72">₹104.91</span></p>
                <ToolLink label="Open tracker" />
              </div>
            </div>
          </article>

          <article className="group relative overflow-hidden rounded-[18px] border border-white/[.16] bg-[#0c0d10]/95 transition-colors duration-300 hover:border-white/[.28] lg:col-span-7 lg:min-h-[440px]" data-tool-window="true">
            <MacWindowBar title="Atlas Time" />
            <div className="p-6 sm:p-7">
              <ToolHeader
              description="Convert between home and the UK, see where the working-hour overlap actually is, and find the right window for the family call before bed."
              index="04"
              title="Timezone planner."
              />
              <div className="mt-8 grid border-y border-white/[.1] sm:grid-cols-2">
              <div className="border-b border-white/[.1] py-6 sm:border-b-0 sm:border-r sm:pr-8">
                <p className="font-mono text-[10px] uppercase tracking-[.14em] text-white/34">Home · IST</p>
                <p className="mt-3 text-[clamp(2.8rem,5vw,4.8rem)] font-medium leading-none tracking-[-.075em] text-white">14:32</p>
                <p className="mt-3 text-sm text-white/38">Wed, 4 May · +5:30</p>
              </div>
              <div className="py-6 sm:pl-8">
                <p className="font-mono text-[10px] uppercase tracking-[.14em] text-white/34">UK · BST</p>
                <p className="mt-3 text-[clamp(2.8rem,5vw,4.8rem)] font-medium leading-none tracking-[-.075em] text-white">10:02</p>
                <p className="mt-3 text-sm text-white/38">Wed, 4 May · +1:00</p>
              </div>
            </div>
              <div className="mt-6 flex flex-wrap items-end justify-between gap-5">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[.14em] text-white/34">Best call window today</p>
                  <p className="mt-2 text-2xl font-medium tracking-[-.035em] text-[#f35a02]">19:30 → 21:00</p>
                </div>
                <ToolLink label="Open planner" />
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function ToolHeader({ description, index, title }: { description: string; index: string; title: string }) {
  return (
    <header>
      <p className="font-mono text-[10px] uppercase tracking-[.16em] text-[#f35a02]">Tool {index}</p>
      <h3 className="mt-4 text-[clamp(1.7rem,2.5vw,2.75rem)] font-medium leading-[.96] tracking-[-.055em] text-white">{title}</h3>
      <p className="mt-4 max-w-[560px] text-sm leading-6 text-white/52">{description}</p>
    </header>
  );
}

function MacWindowBar({ title }: { title: string }) {
  return (
    <div className="grid h-11 grid-cols-[1fr_auto_1fr] items-center border-b border-black/70 bg-[#1b1c1f] px-4 shadow-[inset_0_1px_rgba(255,255,255,.08)]">
      <div aria-hidden="true" className="flex gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
      </div>
      <span className="text-[10px] font-medium text-white/42">{title}</span>
      <span className="justify-self-end text-[9px] text-white/24">atlas.app</span>
    </div>
  );
}

function ToolLink({ label }: { label: string }) {
  return (
    <a className="group/link inline-flex items-center gap-3 border-b border-white/24 pb-1 text-xs font-medium uppercase tracking-[.08em] text-white/72 transition-colors hover:border-[#f35a02] hover:text-white" href="#free-tools">
      {label}<span className="text-[#f35a02] transition-transform group-hover/link:translate-x-1">→</span>
    </a>
  );
}
