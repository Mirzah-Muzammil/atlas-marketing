"use client";

import { useEffect, useRef } from "react";

import { useGsapContext } from "@/hooks/useGsapContext";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function DispatchHeroMotion() {
  const root = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useGsapContext(root, ({ gsap }) => {
    if (reducedMotion || !root.current) return;
    const hero = root.current.closest<HTMLElement>("[data-testid='dispatch-hero-grid']");
    if (!hero) return;
    const lines = hero.querySelectorAll<HTMLElement>("[data-dispatch-hero-line]");
    const image = hero.querySelector<HTMLElement>("[data-dispatch-hero-image]");
    const copy = hero.querySelector<HTMLElement>("[data-dispatch-hero-copy]");
    const rules = hero.querySelector<HTMLElement>("[data-dispatch-hero-rules]");
    if (!image || !copy || !rules) return;

    const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
    timeline
      .fromTo(rules, { opacity: 0 }, { opacity: 0.45, duration: 0.55 })
      .fromTo(lines, { yPercent: 112, rotate: 1.5 }, { yPercent: 0, rotate: 0, duration: 1.1, stagger: 0.09 }, "-=0.28")
      .fromTo(image, { clipPath: "inset(10% 11% 10% 11%)", scale: 1.13 }, { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 1.25 }, "-=0.74")
      .fromTo(copy.children, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.68, stagger: 0.08 }, "-=0.82");

    const parallax = gsap.to(image, {
      yPercent: -9,
      ease: "none",
      scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.6 },
    });

    return () => {
      timeline.kill();
      parallax.kill();
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion || !root.current || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const hero = root.current.closest<HTMLElement>("[data-testid='dispatch-hero-grid']");
    const plate = hero?.querySelector<HTMLElement>("[data-dispatch-hero-plate]");
    if (!hero || !plate) return;
    let frame: number | undefined;
    const move = (event: PointerEvent) => {
      if (frame) return;
      const x = (event.clientX / window.innerWidth - 0.5) * 8;
      const y = (event.clientY / window.innerHeight - 0.5) * 7;
      frame = requestAnimationFrame(() => {
        plate.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        frame = undefined;
      });
    };
    hero.addEventListener("pointermove", move, { passive: true });
    return () => {
      hero.removeEventListener("pointermove", move);
      if (frame) cancelAnimationFrame(frame);
      plate.style.removeProperty("transform");
    };
  }, [reducedMotion]);

  return <div aria-hidden="true" className="pointer-events-none absolute inset-0" ref={root} />;
}
