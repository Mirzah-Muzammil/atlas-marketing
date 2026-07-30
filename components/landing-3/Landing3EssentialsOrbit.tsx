"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useEffect, useRef } from "react";

import Landing3AnimatedTitle from "@/components/landing-3/Landing3AnimatedTitle";

const essentials = [
  { label: "University", image: "/images/normal/product-planning.jpg" },
  { label: "Visa", image: "/images/normal/visa.jpg" },
  { label: "Funding", image: "/images/normal/loans.jpg" },
  { label: "Housing", image: "/images/normal/housing.jpg" },
  { label: "Banking", image: "/images/normal/banking.jpg" },
  { label: "Travel", image: "/images/atlas-departure.jpg" },
  { label: "Insurance", image: "/images/normal/insurance.jpg" },
  { label: "Community", image: "/images/premium/student-crowd-v2.png" },
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
      orbit.style.transform = `translate(-50%, -50%) scale(var(--orbit-scale)) rotate(${rotation}deg)`;
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
            className="absolute left-1/2 top-1/2 size-0"
            data-essentials-center
          >
            <div
              aria-hidden="true"
              className="absolute left-0 top-0 size-[760px] [--orbit-scale:.58] will-change-transform min-[810px]:[--orbit-scale:.88] min-[1200px]:[--orbit-scale:1]"
              data-essentials-orbit
              ref={orbitRef}
              style={
                {
                  "--orbit-rotation": "0deg",
                  transform:
                    "translate(-50%, -50%) scale(var(--orbit-scale)) rotate(0deg)",
                } as CSSProperties
              }
            >
              {cloudNodes.map(({ angle, essential, radius, size }, index) => {
                const { image } = essential;

                return (
                  <div
                    className="absolute left-1/2 top-1/2 size-0"
                    key={`${essential.label}-${index}`}
                    style={{
                      transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(${radius}px) rotate(${-angle}deg)`,
                    }}
                  >
                    <div
                      className="relative overflow-hidden rounded-full border border-white/28 bg-[#111218] shadow-[0_12px_32px_rgba(0,0,0,.42),inset_0_1px_rgba(255,255,255,.25)] will-change-transform"
                      data-essential-node
                      data-essential-visual="photographic"
                      style={{
                        height: size,
                        width: size,
                      }}
                    >
                      <Image
                        alt=""
                        className="h-full w-full object-cover"
                        fill
                        sizes="60px"
                        src={image}
                      />
                      <span className="absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,.12),transparent_45%,rgba(0,0,0,.22))]" />
                    </div>
                  </div>
                );
              })}
            </div>

            <div
              className="absolute left-0 top-0 z-30 w-[190px] -translate-x-1/2 -translate-y-1/2 min-[810px]:w-[226px] min-[1200px]:w-[252px]"
              data-device="iphone"
              data-device-model="iphone-12"
              data-device-scale="compact"
              data-essentials-phone
            >
              <span
                aria-hidden="true"
                className="absolute -left-[4px] top-[73px] h-[35px] w-[3px] rounded-l-sm bg-[#4c4d52] shadow-[0_46px_0_#4c4d52]"
              />
              <span
                aria-hidden="true"
                className="absolute -right-[4px] top-[102px] h-[58px] w-[3px] rounded-r-sm bg-[#4c4d52]"
              />
              <div className="relative overflow-hidden rounded-[29px] border-[3px] border-[#4a4b50] bg-[#09090c] shadow-[0_42px_75px_rgba(0,0,0,.68),0_0_42px_rgba(103,90,255,.12),inset_0_0_0_1px_rgba(255,255,255,.14)] min-[810px]:rounded-[34px]">
                <span
                  aria-hidden="true"
                  className="absolute left-1/2 top-0 z-10 h-[17px] w-[78px] -translate-x-1/2 rounded-b-[13px] bg-black shadow-[0_1px_0_rgba(255,255,255,.07)] min-[810px]:h-[20px] min-[810px]:w-[92px]"
                />
                <Image
                  alt="Atlas mobile dashboard on an iPhone 12"
                  className="h-auto w-full"
                  data-phone-visual="real-device"
                  height={499}
                  priority={false}
                  sizes="(min-width: 1200px) 252px, (min-width: 810px) 226px, 190px"
                  src="/images/premium/genuine-atlas-mobile-dashboard.png"
                  width={350}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
