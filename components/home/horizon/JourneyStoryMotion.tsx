"use client";

import { useRef } from "react";
import { useGsapContext } from "@/hooks/useGsapContext";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function JourneyStoryMotion() {
  const root = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useGsapContext(root, ({ gsap }) => {
    if (reducedMotion || !root.current) return;
    const progress = root.current.querySelector("[data-journey-progress]");
    const orbit = document.querySelector("[data-journey-orbit]");
    const cards = document.querySelectorAll<HTMLElement>("[data-journey-card]");
    gsap.fromTo(progress, { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: "#journey", start: "top 45%", end: "bottom 55%", scrub: true } });
    cards.forEach((card) => {
      gsap.fromTo(card, { opacity: 0.28, x: 40 }, { opacity: 1, x: 0, scrollTrigger: { trigger: card, start: "top 72%", end: "center 45%", scrub: 0.5 } });
    });
    gsap.to(orbit, { rotate: 240, scrollTrigger: { trigger: "#journey", start: "top bottom", end: "bottom top", scrub: true } });
  }, [reducedMotion]);

  return <div aria-hidden="true" className="pointer-events-none absolute inset-0" ref={root}><div className="absolute left-0 top-0 h-full w-px origin-top bg-accent" data-journey-progress /></div>;
}
