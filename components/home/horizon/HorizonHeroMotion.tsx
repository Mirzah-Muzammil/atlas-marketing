"use client";

import { useEffect, useRef, useState } from "react";
import { useGsapContext } from "@/hooks/useGsapContext";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function HorizonHeroMotion() {
  const root = useRef<HTMLDivElement>(null);
  const [showCurtain, setShowCurtain] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!reducedMotion) setShowCurtain(true);
  }, [reducedMotion]);

  useGsapContext(root, ({ gsap }) => {
    if (reducedMotion || !root.current) return;
    const words = document.querySelectorAll("[data-hero-word]");
    const copy = document.querySelectorAll("[data-hero-copy]");
    const cards = document.querySelectorAll("[data-hero-card]");
    const curtain = root.current.querySelector("[data-loading-curtain]");
    const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
    timeline
      .fromTo(words, { yPercent: 110, rotate: 2 }, { yPercent: 0, rotate: 0, duration: 1.15, stagger: 0.06 })
      .fromTo(copy, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.7 }, "-=0.55")
      .fromTo(cards, { autoAlpha: 0, y: 32, rotate: -2 }, { autoAlpha: 1, y: 0, rotate: 0, duration: 0.95, stagger: 0.1 }, "-=0.75");
    if (showCurtain && curtain) {
      timeline.to(curtain, { yPercent: -105, duration: 0.85, ease: "power4.inOut" }, 0.15);
    }
  }, [reducedMotion, showCurtain]);

  useEffect(() => {
    const element = root.current;
    if (!element || reducedMotion || !window.matchMedia("(pointer:fine)").matches) return;
    const onMove = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 18;
      const y = (event.clientY / window.innerHeight - 0.5) * 14;
      element.style.setProperty("--hero-x", `${x}px`);
      element.style.setProperty("--hero-y", `${y}px`);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reducedMotion]);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-50 overflow-hidden" ref={root}>
      {showCurtain && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-primary-deep text-white" data-loading-curtain>
          <div className="text-center"><p className="text-3xl font-semibold tracking-[-0.06em]">atlas</p><p className="mt-3 text-[10px] font-bold tracking-[0.28em] text-secondary">YOUR NEXT CHAPTER</p></div>
        </div>
      )}
    </div>
  );
}
