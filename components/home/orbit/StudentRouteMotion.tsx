"use client";

import { useRef } from "react";

import { useGsapContext } from "@/hooks/useGsapContext";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function StudentRouteMotion() {
  const root = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useGsapContext(root, ({ gsap }) => {
    if (reducedMotion || !root.current) return;
    const section = root.current.closest<HTMLElement>("[data-testid='student-flight-path']");
    if (!section) return;
    const milestones = gsap.utils.toArray<HTMLElement>("[data-flight-milestone]", section);
    if (milestones.length !== 4) return;
    const timeline = gsap.timeline({ scrollTrigger: { trigger: section, start: "top 75%", end: "bottom 28%", scrub: 0.7 } });
    timeline.fromTo(milestones, { opacity: 0.28, x: 38 }, { opacity: 1, x: 0, stagger: 0.44, duration: 1, ease: "power2.out" });
    return () => timeline.kill();
  }, [reducedMotion]);

  return <div aria-hidden="true" className="pointer-events-none absolute inset-0" ref={root} />;
}
