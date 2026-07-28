"use client";

import {
  BadgeDollarSign,
  CircleCheck,
  Copy,
  FileCheck2,
  GraduationCap,
  Grid2X2,
  House,
  Landmark,
  ListChecks,
  MessageCircle,
  Plane,
  Send,
  ShieldCheck,
  Stamp,
  Users,
} from "lucide-react";
import type { CSSProperties } from "react";

import Landing3AnimatedTitle from "@/components/landing-3/Landing3AnimatedTitle";
import { useEffect, useRef } from "react";

const essentials = [
  { label: "University", Icon: GraduationCap, tone: "#7067ff" },
  { label: "Visa", Icon: Stamp, tone: "#2f9bff" },
  { label: "Funding", Icon: BadgeDollarSign, tone: "#16a66f" },
  { label: "Housing", Icon: House, tone: "#ff9d3d" },
  { label: "Banking", Icon: Landmark, tone: "#d94bea" },
  { label: "Travel", Icon: Plane, tone: "#26bfc9" },
  { label: "Insurance", Icon: ShieldCheck, tone: "#ff4f64" },
  { label: "Community", Icon: Users, tone: "#e4b51e" },
] as const;

const cloudNodes = Array.from({ length: 40 }, (_, index) => {
  const ring = index < 12 ? 0 : index < 26 ? 1 : 2;
  const ringIndex = ring === 0 ? index : ring === 1 ? index - 12 : index - 26;
  const ringCount = ring === 0 ? 12 : 14;
  const radii = [228, 306, 374];
  const sizes = [42, 50, 46, 58];

  return {
    angle: (ringIndex * 360) / ringCount - 90 + ring * 11,
    essential: essentials[index % essentials.length],
    radius: radii[ring],
    size: sizes[(index * 3) % sizes.length],
  };
});

const journeyRows = [
  {
    Icon: FileCheck2,
    label: "Applications",
    meta: "3 universities ready",
    status: "On track",
    tone: "#756cff",
  },
  {
    Icon: Stamp,
    label: "Visa documents",
    meta: "Checklist complete",
    status: "Ready",
    tone: "#3aa7ff",
  },
  {
    Icon: House,
    label: "Housing shortlist",
    meta: "6 verified matches",
    status: "Updated",
    tone: "#ff9d3d",
  },
  {
    Icon: BadgeDollarSign,
    label: "Funding plan",
    meta: "Budget and loan options",
    status: "82%",
    tone: "#38c988",
  },
] as const;

export function Landing3EssentialsOrbit() {
  const orbitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const orbit = orbitRef.current;
    if (!orbit) return;

    const nodes = Array.from(
      orbit.querySelectorAll<HTMLElement>("[data-essential-node]"),
    );

    const paint = (scrollY: number) => {
      const rotation = (scrollY * 0.06) % 360;

      orbit.style.setProperty("--orbit-rotation", `${rotation}deg`);
      orbit.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
      nodes.forEach((node) => {
        node.style.transform = "rotate(calc(var(--orbit-rotation) * -1))";
      });
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      paint(0);
      return;
    }

    let animationFrame = 0;
    const update = () => {
      animationFrame = 0;
      paint(window.scrollY);
    };
    const scheduleUpdate = () => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <section
      className="relative min-h-[760px] overflow-clip bg-[#050506]"
      data-landing-3-essentials
      id="essentials-orbit"
    >
      <Landing3AnimatedTitle
        as="h2"
        className="relative mb-10 z-40 mx-auto max-w-[650px] px-5 pt-[6svh] text-left text-[46px] font-semibold leading-[1.06] tracking-[-.04em] text-white min-[810px]:px-0 min-[810px]:text-center min-[1200px]:text-[56px]"
      >
        All the essentials that matter in one place
      </Landing3AnimatedTitle>
      <div
        className="relative h-[100svh] min-h-[760px] overflow-hidden"
        data-essentials-stage
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_62%,rgba(111,92,255,.12),transparent_31%),radial-gradient(circle_at_42%_72%,rgba(67,189,255,.06),transparent_27%)]"
        />

        <ul className="sr-only" aria-label="Atlas essentials">
          {essentials.map(({ label }) => (
            <li key={label}>{label}</li>
          ))}
        </ul>

        <div
          aria-hidden="true"
          className="absolute left-1/2 top-[61%] h-[650px] w-full max-w-[1200px] -translate-x-1/2 -translate-y-1/2 min-[810px]:top-[51%] min-[810px]:h-[740px]"
          data-essentials-field
        >
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 size-[760px] scale-[.58] will-change-transform min-[810px]:scale-[.88] min-[1200px]:scale-100"
            data-essentials-orbit
            ref={orbitRef}
            style={
              {
                "--orbit-rotation": "0deg",
                transform: "translate(-50%, -50%) rotate(0deg)",
              } as CSSProperties
            }
          >
            {cloudNodes.map(({ angle, essential, radius, size }, index) => {
              const { Icon, tone } = essential;
              const filled = index % 3 === 0;

              return (
                <div
                  className="absolute left-1/2 top-1/2 size-0"
                  key={`${essential.label}-${index}`}
                  style={{
                    transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(${radius}px) rotate(${-angle}deg)`,
                  }}
                >
                  <div
                    className="grid place-items-center rounded-full border border-white/50 shadow-[0_12px_32px_rgba(0,0,0,.34),inset_0_1px_rgba(255,255,255,.45)] will-change-transform"
                    data-essential-node
                    style={{
                      background: filled
                        ? `linear-gradient(145deg, ${tone}, #111218)`
                        : "rgba(255,255,255,.96)",
                      color: filled ? "white" : tone,
                      height: size,
                      width: size,
                    }}
                  >
                    <Icon style={{ height: size * 0.42, width: size * 0.42 }} />
                  </div>
                </div>
              );
            })}
          </div>

          <div
            className="absolute left-1/2 top-1/2 z-30 h-[520px] w-[300px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[38px] border border-white/10 bg-[#191a1f] text-white shadow-[0_42px_100px_rgba(0,0,0,.62),0_0_80px_rgba(124,108,255,.18),inset_0_1px_rgba(255,255,255,.08)] min-[1200px]:h-[650px] min-[1200px]:w-[390px] min-[1200px]:rounded-[48px]"
            data-essentials-phone
          >
            <div className="flex items-center justify-between px-5 pt-5 text-white/45 min-[1200px]:px-7 min-[1200px]:pt-7">
              <span className="grid size-7 place-items-center rounded-full bg-white/[.06]">
                <Copy className="size-3.5" />
              </span>
              <span className="grid size-7 place-items-center rounded-full bg-white/[.06] text-lg leading-none">
                ···
              </span>
            </div>

            <div className="flex flex-col items-center px-5 pt-2 text-center min-[1200px]:pt-3">
              <div className="grid size-14 place-items-center rounded-full bg-[linear-gradient(145deg,#755cff,#3a9dff)] shadow-[0_10px_35px_rgba(83,92,255,.35)] min-[1200px]:size-[72px]">
                <GraduationCap className="size-7 min-[1200px]:size-9" />
              </div>
              <p className="mt-3 text-[17px] font-semibold tracking-[-.03em] min-[1200px]:mt-4 min-[1200px]:text-[22px]">
                Your Atlas
              </p>
              <p className="mt-1 text-[10px] text-white/46 min-[1200px]:text-xs">
                London · September 2026
              </p>

              <div className="mt-4 flex gap-5 min-[1200px]:mt-5 min-[1200px]:gap-7">
                {[
                  { Icon: Copy, label: "Apply" },
                  { Icon: ListChecks, label: "Plan" },
                  { Icon: Send, label: "Ask" },
                ].map(({ Icon, label }) => (
                  <div
                    className="grid justify-items-center gap-1.5"
                    key={label}
                  >
                    <span className="grid size-8 place-items-center rounded-full bg-[#e72c3b] min-[1200px]:size-10">
                      <Icon className="size-4 min-[1200px]:size-[18px]" />
                    </span>
                    <span className="text-[9px] text-white/55 min-[1200px]:text-[11px]">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 border-t border-white/[.055] px-4 pt-3 min-[1200px]:mt-6 min-[1200px]:px-6 min-[1200px]:pt-5">
              <div className="flex items-center justify-between">
                <p className="text-[12px] font-semibold min-[1200px]:text-base">
                  Your journey
                </p>
                <p className="text-[11px] font-semibold min-[1200px]:text-sm">
                  64% ready
                </p>
              </div>

              <div className="mt-2 min-[1200px]:mt-3">
                {journeyRows.map(
                  ({ Icon, label, meta, status, tone }, index) => (
                    <div
                      className={`flex items-center gap-2.5 py-2 min-[1200px]:gap-3 min-[1200px]:py-3 ${index ? "border-t border-white/[.045]" : ""}`}
                      key={label}
                    >
                      <span
                        className="grid size-8 shrink-0 place-items-center rounded-full min-[1200px]:size-10"
                        style={{ backgroundColor: `${tone}22`, color: tone }}
                      >
                        <Icon className="size-4 min-[1200px]:size-[18px]" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[10px] font-semibold min-[1200px]:text-[13px]">
                          {label}
                        </span>
                        <span className="block truncate text-[8px] text-white/40 min-[1200px]:text-[10px]">
                          {meta}
                        </span>
                      </span>
                      <span className="text-[8px] font-semibold text-[#45d487] min-[1200px]:text-[10px]">
                        {status}
                      </span>
                    </div>
                  ),
                )}
              </div>
            </div>

            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-[16px] border border-white/[.06] bg-[#2a2b31]/95 p-1.5 shadow-[0_14px_35px_rgba(0,0,0,.35)] min-[1200px]:bottom-5 min-[1200px]:rounded-[18px] min-[1200px]:p-2">
              {[
                { Icon: CircleCheck, active: false },
                { Icon: House, active: true },
                { Icon: Grid2X2, active: false },
                { Icon: MessageCircle, active: false },
              ].map(({ Icon, active }, index) => (
                <span
                  className={`grid size-8 place-items-center rounded-xl min-[1200px]:size-10 ${active ? "bg-[#e72c3b] text-white" : "text-white/45"}`}
                  key={index}
                >
                  <Icon className="size-4 min-[1200px]:size-[18px]" />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
