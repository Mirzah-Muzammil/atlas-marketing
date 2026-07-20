"use client";

import { useRef } from "react";

import { useGsapContext } from "@/hooks/useGsapContext";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function DispatchClosingMotion() {
  const root = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useGsapContext(root, ({ gsap }) => {
    if (reducedMotion || !root.current) return;
    const cover = root.current.closest<HTMLElement>("[data-testid='dispatch-closing-cover']");
    const panel = cover?.querySelector<HTMLElement>("[data-dispatch-closing-panel]");
    const grid = cover?.querySelector<HTMLElement>("[data-dispatch-closing-grid]");
    if (!cover || !panel || !grid) return;
    const timeline = gsap.timeline({ scrollTrigger: { trigger: cover, start: "top 70%", once: true } });
    timeline
      .fromTo(grid, { scale: 1.2, opacity: 0 }, { scale: 1, opacity: 0.46, duration: 1.1, ease: "power2.out" })
      .fromTo(panel, { y: 36, clipPath: "inset(8% 5% 8% 5%)" }, { y: 0, clipPath: "inset(0% 0% 0% 0%)", duration: 1.05, ease: "power3.out" }, "-=0.72");
    return () => timeline.kill();
  }, [reducedMotion]);

  return <div aria-hidden="true" className="pointer-events-none absolute inset-0" ref={root} />;
}
