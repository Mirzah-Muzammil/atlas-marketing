"use client";

import { useEffect, useRef } from "react";
import { useGsapContext } from "@/hooks/useGsapContext";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function HorizonHeroMotion() {
  const root = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useGsapContext(root, ({ gsap }) => {
    if (reducedMotion || !root.current) return;
    const words = document.querySelectorAll("[data-hero-word]");
    const copy = document.querySelectorAll("[data-hero-copy]");
    const cards = document.querySelectorAll("[data-hero-card]");
    const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
    timeline
      .fromTo(words, { yPercent: 110, rotate: 2 }, { yPercent: 0, rotate: 0, duration: 1.15, stagger: 0.06 })
      .fromTo(copy, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.7 }, "-=0.55")
      .fromTo(cards, { autoAlpha: 0, y: 32, rotate: -2 }, { autoAlpha: 1, y: 0, rotate: 0, duration: 0.95, stagger: 0.1 }, "-=0.75");
  }, [reducedMotion]);

  useEffect(() => {
    const element = root.current;
    if (!element || reducedMotion || !window.matchMedia("(pointer:fine)").matches) return;
    const visual = document.querySelector<HTMLElement>("[data-hero-visual]");
    if (!visual) return;
    const onMove = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 18;
      const y = (event.clientY / window.innerHeight - 0.5) * 14;
      visual.style.setProperty("--hero-x", `${x}px`);
      visual.style.setProperty("--hero-y", `${y}px`);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      visual.style.removeProperty("--hero-x");
      visual.style.removeProperty("--hero-y");
    };
  }, [reducedMotion]);

  return <div aria-hidden="true" className="pointer-events-none absolute inset-0" ref={root} />;
}
