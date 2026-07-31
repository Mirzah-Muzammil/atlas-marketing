"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import {
  ArrowRight,
  Bell,
  BookOpen,
  Briefcase,
  CalendarDays,
  Check,
  ChevronRight,
  Home,
  Landmark,
  LayoutDashboard,
  Map,
  Search,
  Sparkles,
  Star,
  Users,
  WalletCards,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import Landing3AnimatedTitle from "@/components/landing-3/Landing3AnimatedTitle";

type ViewId =
  | "dashboard"
  | "journey"
  | "my-type"
  | "essentials"
  | "career"
  | "jobs";

const interactiveNavigation: Array<{
  id: ViewId;
  icon: LucideIcon;
  label: string;
}> = [
  { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { id: "journey", icon: Map, label: "Journey" },
  { id: "my-type", icon: Sparkles, label: "My type" },
  { id: "essentials", icon: WalletCards, label: "Essentials" },
  { id: "career", icon: Home, label: "Career" },
  { id: "jobs", icon: Briefcase, label: "Jobs" },
];

const demoViews = interactiveNavigation.map(({ id }) => id);

type DemoPhase =
  | "sidebar"
  | "sidebar-click"
  | "target"
  | "target-click"
  | "hold";

const demoPhaseDuration: Record<DemoPhase, number> = {
  sidebar: 1100,
  "sidebar-click": 350,
  target: 1200,
  "target-click": 350,
  hold: 2800,
};

const secondaryNavigation: Array<{
  badge?: string;
  icon: LucideIcon;
  label: string;
}> = [
  { icon: CalendarDays, label: "Events" },
  { badge: "BETA", icon: Users, label: "Network" },
  { icon: BookOpen, label: "Resources" },
  { icon: Star, label: "Concierge" },
];

const dashboardTools = [
  { icon: Star, label: "Scholarships" },
  { icon: WalletCards, label: "Budget & visa funds" },
  { icon: Briefcase, label: "UK CV builder" },
  { icon: Users, label: "References" },
] as const;

function ProductSidebar({
  activeView,
  onNavigate,
}: {
  activeView: ViewId;
  onNavigate: (view: ViewId) => void;
}) {
  return (
    <aside
      className="flex h-full flex-col border-r border-white/[.07] bg-[#08090a]/95 p-2 sm:p-3"
      data-dashboard-sidebar
    >
      <div className="flex h-10 items-center gap-2 px-1 sm:px-2">
        <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-[#f35a02] text-[11px] font-bold text-black">
          A
        </span>
        <span className="hidden text-xs font-semibold text-white sm:inline">Atlas</span>
      </div>

      <nav aria-label="Atlas product navigation" className="mt-3 space-y-0.5 sm:mt-4">
        {interactiveNavigation.map(({ icon: Icon, id, label }) => {
          const selected = id === activeView;
          return (
            <button
              aria-current={selected ? "page" : undefined}
              aria-label={label}
              className={`flex min-h-8 w-full items-center gap-2 rounded-lg border px-1.5 text-left text-[9px] transition-[border-color,background-color,color] sm:min-h-9 sm:px-2.5 sm:text-[10px] ${
                selected
                  ? "border-white/10 bg-white/[.07] text-white"
                  : "border-transparent text-white/40 hover:bg-white/[.035] hover:text-white/72"
              }`}
              key={id}
              data-dashboard-nav-target={id}
              onClick={() => onNavigate(id)}
              type="button"
            >
              <Icon
                className={`size-3.5 shrink-0 ${selected ? "text-[#f35a02]" : ""}`}
                strokeWidth={1.7}
              />
              <span className="hidden truncate sm:inline">{label}</span>
            </button>
          );
        })}

        {secondaryNavigation.map(({ badge, icon: Icon, label }) => (
          <div
            className="flex min-h-8 items-center gap-2 px-1.5 text-[9px] text-white/25 sm:min-h-9 sm:px-2.5 sm:text-[10px]"
            key={label}
          >
            <Icon className="size-3.5 shrink-0" strokeWidth={1.7} />
            <span className="hidden truncate sm:inline">{label}</span>
            {badge ? (
              <span className="ml-auto hidden rounded border border-[#f35a02]/35 px-1 text-[6px] text-[#ff8d4d]/70 sm:inline">
                {badge}
              </span>
            ) : null}
          </div>
        ))}
      </nav>

      <div className="mt-auto hidden border-t border-white/[.07] pt-3 sm:block">
        <p className="font-mono text-[7px] uppercase tracking-[.2em] text-white/22">
          Demo · switch archetype
        </p>
        <div className="mt-2 flex items-center justify-between rounded-md border border-white/10 px-2.5 py-2 text-[8px] text-white/58">
          The Ambitious Achiever
          <ChevronRight className="size-3 rotate-90" />
        </div>
      </div>
    </aside>
  );
}

function ProductHeader() {
  return (
    <header className="flex h-11 items-center border-b border-white/[.06] px-3 sm:h-14 sm:px-5">
      <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-black/25 px-2 py-1 text-[7px] text-white/48 sm:px-3 sm:text-[9px]">
        <span className="size-1.5 rounded-full bg-[#f35a02]" />
        The Ambitious Achiever
      </div>
      <button
        aria-label="Notifications"
        className="ml-auto grid size-7 place-items-center rounded-lg border border-white/[.08] text-white/52 sm:size-8"
        type="button"
      >
        <Bell className="size-3.5" />
      </button>
      <span className="ml-2 hidden text-[8px] text-white/45 sm:inline">Aarav Sharma</span>
      <span className="ml-2 grid size-7 place-items-center rounded-full bg-[#f35a02] text-[9px] font-semibold text-black sm:size-8">
        A
      </span>
    </header>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[6px] uppercase tracking-[.2em] text-[#ff965b]/68 sm:text-[8px]">
      {children}
    </p>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-h-16 border-r border-white/[.07] px-2 py-2.5 last:border-r-0 sm:min-h-24 sm:px-4 sm:py-4">
      <p className="font-mono text-[5px] uppercase tracking-[.18em] text-white/28 sm:text-[7px]">
        {label}
      </p>
      <p className="mt-2 text-[11px] font-semibold leading-tight tracking-[-.04em] text-white sm:text-xl">
        {value}
      </p>
    </div>
  );
}

function DashboardView({ onOpenTool }: { onOpenTool: () => void }) {
  return (
    <div className="p-3 sm:p-5" data-dashboard-overview>
      <div className="relative overflow-hidden rounded-xl border border-[#f35a02]/20 bg-[#160d09] px-3 py-3 sm:px-5 sm:py-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_0%,rgba(243,90,2,.24),transparent_46%),linear-gradient(100deg,rgba(243,90,2,.08),transparent_72%)]" />
        <div className="relative">
          <Eyebrow>Your Atlas is tuned for you</Eyebrow>
          <h3 className="mt-1.5 text-base font-semibold tracking-[-.04em] sm:text-[22px]">
            Welcome back, Aarav
          </h3>
          <p className="mt-1 max-w-[650px] text-[7px] leading-relaxed text-white/42 sm:text-[10px]">
            You are The Ambitious Achiever. Build a standout application and shortlist a few reaches with real matches underneath.
          </p>
        </div>
      </div>

      <div className="mt-2 grid grid-cols-4 overflow-hidden rounded-xl border border-white/[.08] bg-white/[.018] sm:mt-3">
        <Metric label="Journey stage" value="Offers" />
        <Metric label="Universities" value="3" />
        <Metric label="Tasks for this stage" value="3" />
        <Metric label="Your type" value="Ambitious Achiever" />
      </div>

      <div
        className="dashboard-demo-highlight mt-2 rounded-xl border border-white/[.08] bg-white/[.018] p-2.5 sm:mt-3 sm:p-4"
        data-dashboard-demo-highlight
      >
        <div className="flex items-center justify-between">
          <p className="font-mono text-[6px] uppercase tracking-[.19em] text-white/28 sm:text-[8px]">
            Your tools
          </p>
          <p className="hidden text-[7px] text-white/28 sm:block">Every one opens inline, pre-filled</p>
        </div>
        <div className="mt-2 grid grid-cols-2 gap-1.5 sm:mt-3 sm:grid-cols-4 sm:gap-2">
          {dashboardTools.map(({ icon: Icon, label }) => (
            <button
              aria-label={`Open ${label}`}
              className="group flex min-h-12 items-center gap-2 rounded-lg border border-white/[.08] bg-white/[.025] px-2 text-left transition-colors hover:border-[#f35a02]/35 hover:bg-[#f35a02]/[.06] sm:min-h-[70px] sm:block sm:px-3 sm:py-2.5"
              key={label}
              data-dashboard-demo-target={
                label === "Scholarships" ? "dashboard" : undefined
              }
              onClick={label === "Scholarships" ? onOpenTool : undefined}
              type="button"
            >
              <Icon className="size-3.5 text-white/68 sm:size-4" strokeWidth={1.6} />
              <span className="text-[7px] text-white/70 sm:mt-2 sm:block sm:text-[9px]">{label}</span>
              <span className="mt-1 hidden items-center text-[7px] text-white/30 sm:flex">
                Open <ChevronRight className="size-2.5" />
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-2 grid grid-cols-[1.38fr_.62fr] gap-2 sm:mt-3 sm:gap-3">
        <div className="rounded-xl border border-white/[.08] px-3 py-2.5 sm:px-4 sm:py-3">
          <div className="flex items-center justify-between">
            <p className="text-[9px] font-medium sm:text-xs">Next steps</p>
            <span className="text-[6px] text-white/28 sm:text-[8px]">Stage: Offers</span>
          </div>
          <div className="mt-2 flex items-center gap-2 text-[7px] text-white/42 sm:text-[9px]">
            <span className="grid size-4 place-items-center rounded bg-[#f35a02]/15 text-[#ff8f50]">1</span>
            Compare and respond to your offers
            <ArrowRight className="ml-auto size-3" />
          </div>
        </div>
        <div className="rounded-xl border border-white/[.08] px-3 py-2.5 sm:px-4 sm:py-3">
          <p className="font-mono text-[5px] uppercase tracking-[.17em] text-white/28 sm:text-[7px]">
            Careers for your type
          </p>
          <p className="mt-2 text-[7px] text-white/55 sm:text-[9px]">Investment banking · Big Tech</p>
        </div>
      </div>
    </div>
  );
}

function JourneyView({ demoResponse }: { demoResponse: boolean }) {
  const stages = ["Explore", "Shortlist", "Applications", "Offers", "Visa", "Arrival"];

  return (
    <div className="p-3 sm:p-5">
      <div className="flex items-end justify-between">
        <div>
          <h3 className="text-lg font-semibold tracking-[-.04em] sm:text-2xl">Your Journey</h3>
          <p className="mt-1 max-w-[560px] text-[7px] leading-relaxed text-white/38 sm:text-[9px]">
            A guided map you drive yourself. Only the visa stage locks until you accept an offer.
          </p>
        </div>
        <button className="rounded-lg bg-[#f35a02] px-2.5 py-1.5 text-[7px] font-semibold text-black sm:px-3 sm:text-[9px]" type="button">
          Add university
        </button>
      </div>

      <div className="relative mt-4 rounded-xl border border-white/[.08] bg-white/[.018] px-2 py-4 sm:mt-5 sm:px-5 sm:py-5">
        <div className="absolute left-[8%] right-[8%] top-[31px] h-px bg-white/10 sm:top-[36px]" />
        <div className="absolute left-[8%] top-[31px] h-px w-[51%] bg-[#f35a02] sm:top-[36px]" />
        <div className="relative grid grid-cols-6 gap-1">
          {stages.map((stage, index) => (
            <div className="text-center" key={stage}>
              <span className={`mx-auto grid size-5 place-items-center rounded-full border text-[6px] sm:size-7 sm:text-[8px] ${index <= 3 ? "border-[#f35a02] bg-[#f35a02] text-black" : "border-white/15 bg-[#0c0d0f] text-white/30"}`}>
                {index <= 2 ? <Check className="size-2.5 sm:size-3" /> : index + 1}
              </span>
              <p className={`mt-2 text-[5px] sm:text-[7px] ${index === 3 ? "text-white" : "text-white/34"}`}>{stage}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 grid gap-2 sm:grid-cols-[1.28fr_.72fr] sm:gap-3">
        <div
          className="dashboard-demo-highlight rounded-xl border border-white/[.08] bg-white/[.018] p-3 sm:p-4"
          data-dashboard-demo-highlight
        >
          <div className="flex items-center justify-between">
            <div><Eyebrow>Offers</Eyebrow><p className="mt-1 text-[8px] text-white/38 sm:text-[9px]">Accepting one unlocks your visa stage</p></div>
            <span className="rounded-full border border-[#f35a02]/25 px-2 py-1 text-[6px] text-[#ff965b] sm:text-[8px]">1 offer received</span>
          </div>
          <div className="mt-3 space-y-2">
            <div
              className={`flex items-center rounded-lg border p-2.5 transition-colors ${
                demoResponse
                  ? "border-[#f35a02]/70 bg-[#f35a02]/[.12]"
                  : "border-[#f35a02]/30 bg-[#f35a02]/[.055]"
              }`}
              data-dashboard-demo-target="journey"
            >
              <span className="grid size-7 place-items-center rounded-lg bg-white/[.06] text-[8px] font-semibold">M</span>
              <div className="ml-2.5"><p className="text-[8px] font-medium sm:text-[10px]">University of Manchester</p><p className="mt-1 text-[6px] text-white/35 sm:text-[8px]">MSc Computer Science · Scholarship £3,100</p></div>
              {demoResponse ? (
                <span className="ml-auto rounded-md bg-[#f35a02] px-2 py-1 text-[6px] font-semibold text-black sm:text-[8px]">Selected for comparison</span>
              ) : (
                <button className="ml-auto rounded-md bg-[#f35a02] px-2 py-1 text-[6px] font-semibold text-black sm:text-[8px]" type="button">Accept</button>
              )}
            </div>
            <div className="flex items-center rounded-lg border border-white/[.07] p-2.5">
              <span className="grid size-7 place-items-center rounded-lg bg-white/[.04] text-[8px] font-semibold">E</span>
              <div className="ml-2.5"><p className="text-[8px] font-medium sm:text-[10px]">University of Edinburgh</p><p className="mt-1 text-[6px] text-white/35 sm:text-[8px]">MSc Data Science · Submitted</p></div>
              <button className="ml-auto text-[6px] text-white/35 sm:text-[8px]" type="button">Mark offer</button>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-white/[.08] bg-white/[.018] p-3 sm:p-4">
          <Eyebrow>Next steps here</Eyebrow>
          <div className="mt-3 space-y-2">
            {["Compare your offers", "Claim your scholarship", "Plan your deposit"].map((item, index) => (
              <button className="flex w-full items-center rounded-lg border border-white/[.07] px-2.5 py-2 text-left text-[7px] text-white/56 sm:text-[9px]" key={item} type="button">
                <span className="mr-2 text-[#f35a02]">0{index + 1}</span>{item}<ChevronRight className="ml-auto size-3" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MyTypeView({ demoResponse }: { demoResponse: boolean }) {
  return (
    <div className="p-3 sm:p-5">
      <h3 className="text-lg font-semibold tracking-[-.04em] sm:text-2xl">Your student type</h3>
      <p className="mt-1 text-[7px] text-white/38 sm:text-[9px]">This shapes what Atlas shows first. Retake it any time as your thinking changes.</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-[1.05fr_.95fr]">
        <div
          className="dashboard-demo-highlight relative overflow-hidden rounded-xl border border-[#f35a02]/24 bg-[#160d09] p-4 sm:p-5"
          data-dashboard-demo-highlight
          data-dashboard-demo-target="my-type"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(243,90,2,.25),transparent_48%)]" />
          <div className="relative flex items-start gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#f35a02] text-lg font-semibold text-black sm:size-12">A</span>
            <div><Eyebrow>Your type</Eyebrow><h4 className="mt-1 text-base font-semibold sm:text-xl">The Ambitious Achiever</h4><p className="mt-1 text-[8px] text-[#ffad7e]/72 sm:text-[10px]">Aim high, build the evidence.</p></div>
          </div>
          <p className="relative mt-4 text-[7px] leading-relaxed text-white/48 sm:text-[10px]">You want a standout application with a few genuine reaches and strong matches underneath. Atlas puts evidence, deadlines, and funding in the right order.</p>
          <div className="relative mt-4 rounded-lg border border-white/[.08] bg-black/20 p-3 text-[7px] text-white/52 sm:text-[9px]"><strong className="text-white/78">Your superpower.</strong> You turn ambition into a practical plan.</div>
          {demoResponse ? <span className="relative mt-3 inline-flex rounded-full border border-[#f35a02]/35 bg-[#f35a02]/10 px-2 py-1 text-[6px] text-[#ff965b] sm:text-[8px]">Priorities surfaced</span> : null}
        </div>
        <div className="grid gap-2 sm:grid-rows-3">
          {[
            ["Priorities", "Reputation · Outcomes · Strong applications"],
            ["Routes that fit", "Russell Group · Real reaches · Solid matches"],
            ["Watch out for", "Prestige without fit · Funding too late"],
          ].map(([title, copy]) => (
            <div className="rounded-xl border border-white/[.08] bg-white/[.018] p-3 sm:p-4" key={title}><Eyebrow>{title}</Eyebrow><p className="mt-2 text-[8px] leading-relaxed text-white/52 sm:text-[10px]">{copy}</p></div>
          ))}
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2 rounded-xl border border-white/[.08] px-3 py-2.5 text-[7px] text-white/38 sm:px-4 sm:text-[9px]"><span className="text-white/65">Popular paths:</span> Investment banking · Management consulting · Big Tech <button className="ml-auto text-[#ff965b]" type="button">Retake quiz</button></div>
    </div>
  );
}

const partners = [
  { copy: "Up to £4,000 against tuition", icon: Star, label: "GGI Scholarship", type: "Scholarships" },
  { copy: "No co-signer or collateral", icon: WalletCards, label: "Prodigy Finance", type: "Loans" },
  { copy: "Real exchange rate, low fees", icon: Landmark, label: "Wise", type: "Forex" },
  { copy: "UK account for new arrivals", icon: Landmark, label: "Monzo", type: "Banking" },
] as const;

function EssentialsView({ demoResponse }: { demoResponse: boolean }) {
  return (
    <div className="p-3 sm:p-5">
      <div className="flex items-end justify-between"><div><h3 className="text-lg font-semibold tracking-[-.04em] sm:text-2xl">Essentials</h3><p className="mt-1 text-[7px] text-white/38 sm:text-[9px]">17 vetted partners · average £420 a year saved</p></div><span className="text-[7px] text-[#ff965b] sm:text-[9px]">Pre-vetted, in one place</span></div>
      <div className="mt-4 flex gap-1.5 overflow-hidden">
        {["For you", "Scholarships", "Loans", "Housing", "Forex", "Banking"].map((filter, index) => <button className={`shrink-0 rounded-full border px-2.5 py-1 text-[6px] sm:text-[8px] ${index === 0 ? "border-[#f35a02]/35 bg-[#f35a02]/10 text-[#ff965b]" : "border-white/[.08] text-white/34"}`} key={filter} type="button">{filter}</button>)}
      </div>
      <div
        className="dashboard-demo-highlight mt-4 grid grid-cols-2 gap-2 rounded-xl sm:gap-3"
        data-dashboard-demo-highlight
      >
        {partners.map(({ copy, icon: Icon, label, type }, index) => (
          <div
            className={`rounded-xl border bg-white/[.018] p-3 transition-colors sm:p-4 ${
              demoResponse && index === 0
                ? "border-[#f35a02]/65"
                : "border-white/[.08]"
            }`}
            data-dashboard-demo-target={index === 0 ? "essentials" : undefined}
            key={label}
          >
            <div className="flex items-center gap-2"><span className="grid size-7 place-items-center rounded-lg bg-white/[.055]"><Icon className="size-3.5 text-white/64" /></span><Eyebrow>{type}</Eyebrow></div>
            <p className="mt-3 text-[9px] font-medium sm:text-xs">{label}</p><p className="mt-1 text-[7px] text-white/36 sm:text-[9px]">{copy}</p>
            <div className="mt-3 flex items-center justify-between border-t border-white/[.06] pt-2"><span className="text-[6px] text-[#ff965b] sm:text-[8px]">{demoResponse && index === 0 ? "Selected for you" : "For you"}</span><button className="text-[6px] text-white/45 sm:text-[8px]" type="button">View →</button></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CareerView({ demoResponse }: { demoResponse: boolean }) {
  const route = [
    ["During your studies", "Work up to 20 hours in term time"],
    ["Apply before your visa expires", "No job offer or sponsor needed"],
    ["Work for two years", "Three years after a PhD"],
    ["Switch to Skilled Worker", "Move to long-term sponsorship"],
  ];
  return (
    <div className="p-3 sm:p-5">
      <Eyebrow>Career hub</Eyebrow><h3 className="mt-1.5 text-lg font-semibold tracking-[-.04em] sm:text-2xl">Build your UK career from day one</h3><p className="mt-1 max-w-[650px] text-[7px] leading-relaxed text-white/38 sm:text-[9px]">Understand the Graduate Route, build UK-ready applications, and find employers that can sponsor you later.</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-[1.25fr_.75fr]">
        <div className="dashboard-demo-highlight rounded-xl border border-white/[.08] bg-white/[.018] p-3 sm:p-4" data-dashboard-demo-highlight data-dashboard-demo-target="career"><div className="flex items-center justify-between"><p className="text-[10px] font-medium sm:text-sm">The Graduate Route, step by step</p><span className="text-[6px] text-[#ff965b] sm:text-[8px]">{demoResponse ? "Next step highlighted" : "2–3 years to work"}</span></div><div className="mt-3 grid grid-cols-2 gap-2">{route.map(([title, copy], index) => <div className={`rounded-lg border p-2.5 transition-colors ${demoResponse && index === 1 ? "border-[#f35a02]/55 bg-[#f35a02]/[.07]" : "border-white/[.07]"}`} key={title}><span className="text-[7px] text-[#f35a02]">0{index + 1}</span><p className="mt-1 text-[7px] font-medium text-white/68 sm:text-[9px]">{title}</p><p className="mt-1 text-[6px] text-white/30 sm:text-[8px]">{copy}</p></div>)}</div></div>
        <div className="space-y-2"><div className="rounded-xl border border-[#f35a02]/25 bg-[#f35a02]/[.055] p-3 sm:p-4"><Eyebrow>Visa-sponsoring employers</Eyebrow><p className="mt-2 text-[7px] leading-relaxed text-white/46 sm:text-[9px]">Check the official sponsor register before you invest in an application.</p><button className="mt-3 flex items-center gap-1 text-[7px] text-[#ff965b] sm:text-[9px]" type="button">See sponsor jobs <ArrowRight className="size-3" /></button></div><div className="rounded-xl border border-white/[.08] p-3 sm:p-4"><Eyebrow>Career tools</Eyebrow><div className="mt-2 space-y-2 text-[7px] text-white/50 sm:text-[9px]"><p>UK CV builder</p><p>Interview prep</p><p>References</p></div></div></div>
      </div>
    </div>
  );
}

const jobs = [
  ["Graduate Data Analyst", "Barclays · London", "£38,000"],
  ["Software Engineer, New Grad", "Amazon · London", "£52,000"],
  ["Junior Consultant", "Deloitte · London", "£35,000"],
  ["Product Analyst", "Monzo · Remote UK", "£45,000"],
] as const;

function JobsView({ demoResponse }: { demoResponse: boolean }) {
  return (
    <div className="p-3 sm:p-5">
      <div className="flex items-end justify-between"><div><h3 className="text-lg font-semibold tracking-[-.04em] sm:text-2xl">Jobs</h3><p className="mt-1 text-[7px] text-white/38 sm:text-[9px]">Graduate and placement roles filtered for students who need sponsorship.</p></div><span className="text-[7px] text-[#ff965b] sm:text-[9px]">8 live roles</span></div>
      <div className="dashboard-demo-highlight mt-4 rounded-xl" data-dashboard-demo-highlight>
        <div className="flex gap-2"><div className="flex flex-1 items-center gap-2 rounded-lg border border-white/[.08] bg-white/[.018] px-3 py-2 text-[7px] text-white/28 sm:text-[9px]"><Search className="size-3.5" />Search roles</div><button aria-pressed={demoResponse} className={`rounded-lg border px-3 text-[7px] sm:text-[9px] ${demoResponse ? "border-[#f35a02]/65 bg-[#f35a02] text-black" : "border-[#f35a02]/28 bg-[#f35a02]/[.07] text-[#ff965b]"}`} data-dashboard-demo-target="jobs" type="button">{demoResponse ? "Visa sponsors only" : "Visa sponsor only"}</button></div>
        <div className="mt-3 overflow-hidden rounded-xl border border-white/[.08]">
          {jobs.map(([role, company, salary], index) => (
            <div className="flex items-center border-b border-white/[.07] bg-white/[.012] p-2.5 last:border-b-0 sm:p-3" key={role}><span className="grid size-7 place-items-center rounded-lg bg-white/[.05] text-[8px] font-semibold sm:size-8">{company[0]}</span><div className="ml-2.5 min-w-0"><p className="truncate text-[8px] font-medium sm:text-[10px]">{role}</p><p className="mt-1 truncate text-[6px] text-white/32 sm:text-[8px]">{company} · {salary} · Full-time</p></div>{index !== 2 ? <span className="ml-auto hidden rounded-full border border-[#f35a02]/22 bg-[#f35a02]/[.055] px-2 py-1 text-[6px] text-[#ff965b] sm:block sm:text-[8px]">Visa sponsor</span> : null}<button aria-label={`Save ${role}`} className="ml-2 grid size-7 place-items-center rounded-lg border border-white/[.08] text-white/36" type="button"><Star className="size-3" /></button></div>
          ))}
        </div>
      </div>
      <p className="mt-3 text-[6px] leading-relaxed text-white/24 sm:text-[8px]">Apply on the employer’s own site. Atlas tracks your saves and applications. No AI ranking.</p>
    </div>
  );
}

function ToolDrawer({ onClose }: { onClose: () => void }) {
  return (
    <div className="dashboard-tool-drawer absolute inset-y-0 right-0 z-30 w-[75%] border-l border-white/[.1] bg-[#0b0c0e]/[.98] p-4 shadow-[-35px_0_80px_rgba(0,0,0,.72)] backdrop-blur-xl sm:w-[52%] sm:p-6" data-dashboard-tool-drawer>
      <div className="flex items-center justify-between"><Eyebrow>Tool · opens inline</Eyebrow><button aria-label="Close Scholarship finder" className="grid size-6 place-items-center rounded-md border border-white/10 text-white/38" onClick={onClose} type="button"><X className="size-3" /></button></div>
      <div className="mt-6 flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-[#f35a02] text-black"><Star className="size-5" /></span><div><h4 className="text-sm font-semibold tracking-[-.03em] sm:text-lg">Scholarship finder</h4><p className="mt-0.5 text-[7px] text-white/34 sm:text-[9px]">Matched to your universities and course</p></div></div>
      <div className="mt-6 rounded-xl border border-white/[.08] bg-white/[.025] p-3 sm:p-4"><p className="text-[9px] font-medium sm:text-xs">Three scholarships fit your plan</p><div className="mt-3 space-y-2">{[["GGI Scholarship", "Up to £4,000"], ["GREAT Scholarship", "£10,000"], ["Manchester Global Futures", "£8,000"]].map(([name, value]) => <div className="flex items-center rounded-lg border border-white/[.07] px-2.5 py-2 text-[7px] text-white/52 sm:text-[9px]" key={name}><Check className="mr-2 size-3 text-[#f35a02]" />{name}<span className="ml-auto text-white/30">{value}</span></div>)}</div></div>
      <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-[#f35a02] py-2.5 text-[8px] font-semibold text-black sm:text-[10px]" type="button">Open scholarship matches <ArrowRight className="size-3" /></button>
    </div>
  );
}

function ProductView({
  activeView,
  demoResponse,
  onOpenTool,
}: {
  activeView: ViewId;
  demoResponse: ViewId | null;
  onOpenTool: () => void;
}) {
  const responseActive = demoResponse === activeView;

  return (
    <div className="dashboard-view-enter h-full" key={activeView}>
      {activeView === "dashboard" ? <DashboardView onOpenTool={onOpenTool} /> : null}
      {activeView === "journey" ? <JourneyView demoResponse={responseActive} /> : null}
      {activeView === "my-type" ? <MyTypeView demoResponse={responseActive} /> : null}
      {activeView === "essentials" ? <EssentialsView demoResponse={responseActive} /> : null}
      {activeView === "career" ? <CareerView demoResponse={responseActive} /> : null}
      {activeView === "jobs" ? <JobsView demoResponse={responseActive} /> : null}
    </div>
  );
}

export function Landing3DashboardShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const demoRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const reducedMotionRef = useRef(false);
  const [activeView, setActiveView] = useState<ViewId>("dashboard");
  const [demoIndex, setDemoIndex] = useState(0);
  const [demoPhase, setDemoPhase] = useState<DemoPhase>("sidebar");
  const [demoResponse, setDemoResponse] = useState<ViewId | null>(null);
  const [focusPaused, setFocusPaused] = useState(false);
  const [hoverPaused, setHoverPaused] = useState(false);
  const [manualToolOpen, setManualToolOpen] = useState(false);
  const [toolOpen, setToolOpen] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = section?.querySelector<HTMLElement>("[data-showcase-heading]");
    const frame = section?.querySelector<HTMLElement>("[data-showcase-frame]");
    if (!section || !heading || !frame) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion || typeof IntersectionObserver === "undefined") {
      gsap.set([heading, frame], { clearProps: "all" });
      return;
    }

    const context = gsap.context(() => {
      gsap.set(heading, { opacity: 0, y: 24 });
      gsap.set(frame, { opacity: 0, scale: 0.97, transformOrigin: "50% 100%", y: 52 });
    }, section);
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      context.add(() => {
        gsap.timeline({ defaults: { ease: "power3.out" } })
          .to(heading, { duration: 0.7, opacity: 1, y: 0 })
          .to(frame, { duration: 1.05, opacity: 1, scale: 1, y: 0 }, "-=0.35");
      });
      observer.disconnect();
    }, { threshold: 0.16 });
    observer.observe(section);
    return () => { observer.disconnect(); context.revert(); };
  }, []);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  useEffect(() => {
    if (
      focusPaused ||
      hoverPaused ||
      manualToolOpen ||
      reducedMotionRef.current
    ) {
      return;
    }

    const timer = window.setTimeout(() => {
      const targetView = demoViews[demoIndex];

      if (demoPhase === "sidebar") {
        setDemoPhase("sidebar-click");
        return;
      }

      if (demoPhase === "sidebar-click") {
        setActiveView(targetView);
        setDemoResponse(null);
        setToolOpen(false);
        setDemoPhase("target");
        return;
      }

      if (demoPhase === "target") {
        setDemoPhase("target-click");
        return;
      }

      if (demoPhase === "target-click") {
        setDemoResponse(targetView);
        if (targetView === "dashboard") {
          setManualToolOpen(false);
          setToolOpen(true);
        }
        setDemoPhase("hold");
        return;
      }

      setToolOpen(false);
      setDemoResponse(null);
      setDemoIndex((current) => (current + 1) % demoViews.length);
      setDemoPhase("sidebar");
    }, demoPhaseDuration[demoPhase]);

    return () => window.clearTimeout(timer);
  }, [demoIndex, demoPhase, focusPaused, hoverPaused, manualToolOpen]);

  const cursorTarget =
    demoPhase === "sidebar" || demoPhase === "sidebar-click"
      ? `nav-${demoViews[demoIndex]}`
      : activeView;

  useLayoutEffect(() => {
    const demo = demoRef.current;
    const cursor = cursorRef.current;
    if (!demo || !cursor) return;

    const targetSelector = cursorTarget.startsWith("nav-")
      ? `[data-dashboard-nav-target="${cursorTarget.slice(4)}"]`
      : `[data-dashboard-demo-target="${cursorTarget}"]`;

    const updatePosition = () => {
      const target = demo.querySelector<HTMLElement>(targetSelector);
      if (!target) return;

      const demoRect = demo.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      const x = targetRect.left - demoRect.left + targetRect.width * 0.72;
      const y = targetRect.top - demoRect.top + targetRect.height * 0.58;
      cursor.style.setProperty("--dashboard-cursor-x", `${x}px`);
      cursor.style.setProperty("--dashboard-cursor-y", `${y}px`);
      cursor.dataset.dashboardCursorReady = "true";
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, [activeView, cursorTarget, demoPhase]);

  const navigate = (view: ViewId) => {
    setDemoIndex(demoViews.indexOf(view));
    setDemoPhase("sidebar");
    setDemoResponse(null);
    setManualToolOpen(false);
    setToolOpen(false);
    setActiveView(view);
  };

  return (
    <section className="relative isolate overflow-hidden bg-[#050506] px-5 pb-16 pt-20 text-white sm:px-8 sm:pb-20" data-landing-3-showcase id="platform" ref={sectionRef}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0"><div className="absolute inset-x-[12%] top-[28%] h-[62%] bg-[radial-gradient(ellipse_at_center,rgba(243,90,2,.105)_0%,rgba(55,25,10,.06)_38%,transparent_72%)] blur-2xl" /><div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.025)_1px,transparent_1px)] [background-size:76px_76px] [mask-image:linear-gradient(to_bottom,transparent,black_28%,black_78%,transparent)]" /></div>
      <div className="relative mx-auto w-full max-w-[1400px]">
        <Landing3AnimatedTitle aria-label="From application to arrival. One Atlas, every next step." as="h2" className="mx-auto text-center text-[clamp(1.25rem,1.65vw,1.5rem)] font-medium leading-[1.25] tracking-[-.025em] text-white" data-showcase-heading><span className="block">From application to arrival.</span><span className="block text-white/48">One Atlas, every next step.</span></Landing3AnimatedTitle>
        <p className="mx-auto mt-3 text-center text-xs text-white/30 sm:text-sm">Choose a section in the sidebar to explore the product.</p>
        <div className="relative mx-auto mt-8 w-full max-w-[1120px] sm:mt-10" data-showcase-frame>
          <div className="absolute inset-x-[8%] -bottom-[5%] top-[14%] -z-10 rounded-[45%] bg-[#f35a02]/10 blur-[100px]" />
          <div className="rounded-[18px] border border-white/[.13] bg-[#111216] p-1.5 shadow-[0_42px_110px_rgba(0,0,0,.75),0_0_80px_rgba(243,90,2,.06)] sm:rounded-[24px] sm:p-2">
            <div
              className="relative overflow-hidden rounded-[13px] border border-black bg-[#090a0d] sm:rounded-[18px]"
              data-atlas-dashboard-demo
              data-dashboard-demo-phase={demoPhase}
              data-dashboard-demo-state={activeView}
              data-showcase-media
              onBlurCapture={(event) => {
                if (
                  !event.currentTarget.contains(
                    event.relatedTarget as Node | null,
                  )
                ) {
                  setFocusPaused(false);
                }
              }}
              onFocusCapture={() => setFocusPaused(true)}
              onMouseEnter={() => setHoverPaused(true)}
              onMouseLeave={() => setHoverPaused(false)}
              ref={demoRef}
            >
              <div className="relative flex h-9 items-center border-b border-white/[.07] bg-black/40 px-3 sm:h-11 sm:px-4"><div className="flex gap-1.5"><span className="size-2 rounded-full bg-[#ff5f57]" /><span className="size-2 rounded-full bg-[#febc2e]" /><span className="size-2 rounded-full bg-[#28c840]" /></div><span className="absolute left-1/2 -translate-x-1/2 text-[7px] font-medium text-white/28 sm:text-[9px]">Atlas</span><span className="ml-auto flex items-center gap-1.5 text-[6px] uppercase tracking-[.15em] text-white/22 sm:text-[8px]"><span className="size-1.5 rounded-full bg-[#f35a02]" />Interactive demo</span></div>
              <div className="grid h-[480px] grid-cols-[48px_1fr] bg-[#0a0b0d] sm:h-[540px] sm:grid-cols-[174px_1fr]">
                <ProductSidebar activeView={activeView} onNavigate={navigate} />
                <div className="relative min-w-0 overflow-hidden bg-[linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.025)_1px,transparent_1px)] [background-size:34px_34px]"><ProductHeader /><div className="h-[calc(100%-2.75rem)] sm:h-[calc(100%-3.5rem)]"><ProductView activeView={activeView} demoResponse={demoResponse} onOpenTool={() => { setManualToolOpen(true); setToolOpen(true); }} /></div>{toolOpen ? <ToolDrawer onClose={() => { setManualToolOpen(false); setToolOpen(false); }} /> : null}</div>
              </div>
              <div
                aria-hidden="true"
                className="dashboard-demo-cursor pointer-events-none absolute left-0 top-0 z-20"
                data-dashboard-cursor-clicking={
                  demoPhase === "sidebar-click" || demoPhase === "target-click"
                }
                data-dashboard-cursor-target={cursorTarget}
                data-dashboard-demo-cursor
                ref={cursorRef}
              >
                <span className="dashboard-demo-cursor__ripple absolute left-0 top-0 size-7 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#f35a02]/70" />
                <svg
                  className="relative size-7 -translate-x-[3px] -translate-y-[3px] drop-shadow-[0_3px_5px_rgba(0,0,0,.75)]"
                  fill="none"
                  viewBox="0 0 28 28"
                >
                  <path
                    d="M4.2 2.8 22 14.4l-8.1 1.4-4.5 7.1L4.2 2.8Z"
                    fill="white"
                    stroke="#090a0d"
                    strokeLinejoin="round"
                    strokeWidth="2.3"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes dashboardViewEnter{from{opacity:0;transform:translate3d(0,7px,0);filter:blur(3px)}to{opacity:1;transform:translate3d(0,0,0);filter:blur(0)}}@keyframes dashboardDrawerEnter{from{opacity:0;transform:translate3d(30px,0,0)}to{opacity:1;transform:translate3d(0,0,0)}}@keyframes dashboardDemoHighlight{0%,100%{box-shadow:inset 0 0 0 1px rgba(243,90,2,.28),0 0 22px rgba(243,90,2,.055)}50%{box-shadow:inset 0 0 0 1px rgba(243,90,2,.52),0 0 34px rgba(243,90,2,.11)}}@keyframes dashboardCursorRipple{from{opacity:.9;transform:translate(-50%,-50%) scale(.2)}to{opacity:0;transform:translate(-50%,-50%) scale(1.65)}}.dashboard-view-enter{animation:dashboardViewEnter .42s cubic-bezier(.22,1,.36,1) both}.dashboard-tool-drawer{animation:dashboardDrawerEnter .5s cubic-bezier(.22,1,.36,1) both}.dashboard-demo-highlight{animation:dashboardDemoHighlight 2.2s ease-in-out infinite;background-color:rgba(243,90,2,.022)}.dashboard-demo-cursor{opacity:0;transform:translate3d(var(--dashboard-cursor-x,24px),var(--dashboard-cursor-y,80px),0);transition:transform 1.05s cubic-bezier(.22,1,.36,1),opacity .2s ease;will-change:transform}.dashboard-demo-cursor[data-dashboard-cursor-ready="true"]{opacity:1}.dashboard-demo-cursor__ripple{opacity:0}.dashboard-demo-cursor[data-dashboard-cursor-clicking="true"]{scale:.91}.dashboard-demo-cursor[data-dashboard-cursor-clicking="true"] .dashboard-demo-cursor__ripple{animation:dashboardCursorRipple .55s ease-out both}@media(prefers-reduced-motion:reduce){.dashboard-view-enter,.dashboard-tool-drawer,.dashboard-demo-highlight{animation:none}.dashboard-demo-highlight{box-shadow:inset 0 0 0 1px rgba(243,90,2,.38)}.dashboard-demo-cursor{display:none}}`}</style>
    </section>
  );
}
