"use client";

import { useRef } from "react";

import { useGsapContext } from "@/hooks/useGsapContext";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function FragmentedJourneyMotion() {
  const root = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useGsapContext(root, ({ gsap }) => {
    if (reducedMotion || !root.current) return;
    const section = root.current.closest<HTMLElement>("[data-fragment-section]");
    if (!section) return;
    const columns = gsap.utils.toArray<HTMLElement>("[data-fragment-column]", section);
    const thread = section.querySelector<SVGPathElement>("[data-testid='fragment-thread'] path");
    if (!thread || columns.length !== 3) return;
    const pathLength = thread.getTotalLength();
    gsap.set(thread, { strokeDasharray: pathLength, strokeDashoffset: pathLength });

    const timeline = gsap.timeline({
      scrollTrigger: { trigger: section, start: "top 72%", end: "bottom 38%", scrub: 0.7 },
    });
    timeline
      .fromTo(columns, { y: (index) => index === 1 ? 58 : -35, x: (index) => (index - 1) * 28, rotate: (index) => (index - 1) * 1.8 }, { y: 0, x: 0, rotate: 0, duration: 1.2, stagger: 0.1, ease: "power2.out" })
      .to(thread, { strokeDashoffset: 0, duration: 1.1, ease: "none" }, 0.28);

    return () => timeline.kill();
  }, [reducedMotion]);

  return <div aria-hidden="true" className="pointer-events-none absolute inset-0" ref={root} />;
}
