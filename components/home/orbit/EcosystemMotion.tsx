"use client";

import { useRef } from "react";

import { useGsapContext } from "@/hooks/useGsapContext";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function EcosystemMotion() {
  const root = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useGsapContext(root, ({ gsap }) => {
    if (reducedMotion || !root.current) return;
    const section = root.current.closest<HTMLElement>("[data-testid='ecosystem-signals']");
    if (!section) return;
    const signals = gsap.utils.toArray<HTMLElement>("[data-ecosystem-signal]", section);
    const core = section.querySelector<HTMLElement>("[data-ecosystem-core]");
    const beacons = gsap.utils.toArray<HTMLElement>("[data-ecosystem-beacon]", section);
    if (!core || signals.length !== 5) return;
    const timeline = gsap.timeline({ scrollTrigger: { trigger: section, start: "top 72%", end: "bottom 35%", scrub: 0.65 } });
    timeline
      .fromTo(signals, { opacity: 0.38, y: 28 }, { opacity: 1, y: 0, stagger: 0.12, duration: 0.9, ease: "power2.out" })
      .fromTo(core, { scale: 0.72 }, { scale: 1.16, duration: 1.15, ease: "power1.inOut" }, 0)
      .to(beacons, { scale: 2.1, opacity: 0.32, stagger: 0.22, duration: 0.9 }, 0.25);
    return () => timeline.kill();
  }, [reducedMotion]);

  return <div aria-hidden="true" className="pointer-events-none absolute inset-0" ref={root} />;
}
