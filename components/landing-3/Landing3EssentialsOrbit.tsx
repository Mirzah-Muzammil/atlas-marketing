"use client";

import {
  BadgeDollarSign,
  GraduationCap,
  House,
  Landmark,
  Plane,
  ShieldCheck,
  Stamp,
  Users,
} from "lucide-react";
import type { CSSProperties } from "react";
import { useEffect, useRef } from "react";

const essentials = [
  { label: "University", Icon: GraduationCap, tone: "#8b7cff" },
  { label: "Visa", Icon: Stamp, tone: "#58c7ff" },
  { label: "Funding", Icon: BadgeDollarSign, tone: "#75e0a7" },
  { label: "Housing", Icon: House, tone: "#ffb86b" },
  { label: "Banking", Icon: Landmark, tone: "#f488ff" },
  { label: "Travel", Icon: Plane, tone: "#70d7e8" },
  { label: "Insurance", Icon: ShieldCheck, tone: "#ff7d91" },
  { label: "Community", Icon: Users, tone: "#f4d35e" },
] as const;

const clamp = (value: number) => Math.min(1, Math.max(0, value));
const easeOutCubic = (value: number) => 1 - Math.pow(1 - value, 3);

export function Landing3EssentialsOrbit() {
  const sectionRef = useRef<HTMLElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const orbit = orbitRef.current;
    if (!section || !orbit) return;

    const tiles = Array.from(
      orbit.querySelectorAll<HTMLElement>("[data-essential-tile]"),
    );

    const paint = (progress: number) => {
      const eased = easeOutCubic(progress);
      const rotation = 90 * (1 - eased);
      const scale = 0.78 + 0.22 * eased;

      orbit.style.setProperty("--orbit-rotation", `${rotation}deg`);
      orbit.style.opacity = "1";
      orbit.style.transform = `translate(-50%, -50%) rotate(${rotation}deg) scale(${scale})`;

      tiles.forEach((tile) => {
        tile.style.opacity = "1";
        tile.style.transform =
          "rotate(calc(var(--orbit-rotation) * -1))";
      });
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      paint(1);
      return;
    }

    let animationFrame = 0;
    const update = () => {
      animationFrame = 0;
      const rect = section.getBoundingClientRect();
      const travel = Math.max(1, rect.height - window.innerHeight);
      paint(clamp(-rect.top / travel));
    };
    const scheduleUpdate = () => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <section
      className="relative h-[190svh] overflow-clip bg-[#050506] min-[810px]:h-[240svh]"
      data-landing-3-essentials
      id="essentials-orbit"
      ref={sectionRef}
    >
      <div
        className="sticky top-0 h-[100svh] overflow-hidden"
        data-essentials-stage
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_62%,rgba(111,92,255,.11),transparent_31%),radial-gradient(circle_at_22%_70%,rgba(67,189,255,.055),transparent_25%)]"
        />

        <h2 className="absolute left-5 right-5 top-[9svh] z-20 mx-auto max-w-[560px] text-left text-[48px] font-semibold leading-[1.1] tracking-[-.035em] text-white min-[810px]:left-1/2 min-[810px]:right-auto min-[810px]:top-[8svh] min-[810px]:w-full min-[810px]:-translate-x-1/2 min-[810px]:text-center min-[1200px]:text-[56px]">
          All the essentials that matter in one place
        </h2>

        <ul className="sr-only" aria-label="Atlas essentials">
          {essentials.map(({ label }) => (
            <li key={label}>{label}</li>
          ))}
        </ul>

        <div
          aria-hidden="true"
          className="absolute left-1/2 top-[61%] h-[700px] w-full -translate-x-1/2 -translate-y-1/2 min-[810px]:top-[62%] min-[810px]:size-[min(854px,92vw)]"
          data-essentials-field
        >
          <div className="absolute left-1/2 top-1/2 size-[min(660px,112vw)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[.035] min-[810px]:size-[854px]" />
          <div className="absolute left-1/2 top-1/2 size-[min(480px,90vw)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[.055] min-[810px]:size-[630px]" />

          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 size-[360px] [--orbit-radius:145px] will-change-transform min-[810px]:size-[520px] min-[810px]:[--orbit-radius:220px]"
            data-essentials-orbit
            ref={orbitRef}
            style={
              {
                "--orbit-rotation": "90deg",
                opacity: 1,
                transform:
                  "translate(-50%, -50%) rotate(90deg) scale(0.78)",
              } as CSSProperties
            }
          >
            <div className="absolute left-1/2 top-1/2 size-24 -translate-x-1/2 -translate-y-1/2 rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_35%_30%,#34313f,#111116_64%)] shadow-[inset_0_1px_rgba(255,255,255,.08),0_28px_80px_rgba(0,0,0,.45)] min-[810px]:size-28">
              <div className="absolute inset-[34%] rotate-45 rounded-[6px] border border-white/45" />
            </div>

            {essentials.map(({ Icon, label, tone }, index) => {
              const angle = index * 45 - 90;

              return (
                <div
                  className="absolute left-1/2 top-1/2 size-0"
                  key={label}
                  style={{
                    transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(var(--orbit-radius)) rotate(${-angle}deg)`,
                  }}
                >
                  <div
                    className="relative grid size-[68px] place-items-center rounded-[20px] border border-white/[.12] bg-[linear-gradient(145deg,rgba(30,31,37,.98),rgba(10,10,13,.98))] pb-4 shadow-[inset_0_1px_rgba(255,255,255,.08),0_18px_50px_rgba(0,0,0,.48)] after:absolute after:bottom-1.5 after:left-1/2 after:-translate-x-1/2 after:content-[attr(data-label)] after:whitespace-nowrap after:text-[8px] after:font-medium after:tracking-[-.01em] after:text-white/60 will-change-[transform,opacity] min-[810px]:size-[82px] min-[810px]:rounded-[24px] min-[810px]:pb-5 min-[810px]:after:bottom-2 min-[810px]:after:text-[9px]"
                    data-essential-tile
                    data-label={label}
                    style={{
                      opacity: 1,
                      transform:
                        "rotate(calc(var(--orbit-rotation) * -1))",
                    }}
                  >
                    <span
                      className="grid size-8 place-items-center rounded-full min-[810px]:size-9"
                      style={{
                        backgroundColor: `${tone}18`,
                        color: tone,
                      }}
                    >
                      <Icon className="size-4 min-[810px]:size-[18px]" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
