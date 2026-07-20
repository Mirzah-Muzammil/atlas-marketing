"use client";

import { useRef } from "react";

import { useGsapContext } from "@/hooks/useGsapContext";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function OrbitLiftoffMotion() {
  const root = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useGsapContext(root, ({ gsap }) => {
    if (reducedMotion || !root.current) return;
    const section = root.current.closest<HTMLElement>("[data-testid='liftoff-wash']");
    const wash = section?.querySelector<HTMLElement>("[data-liftoff-gradient]");
    const content = section?.querySelector<HTMLElement>("[data-liftoff-content]");
    if (!section || !wash || !content) return;
    const timeline = gsap.timeline({ scrollTrigger: { trigger: section, start: "top 72%", once: true } });
    timeline.fromTo(wash, { scale: 0.2, opacity: 0 }, { scale: 1.45, opacity: 1, duration: 1.3, ease: "power3.out" }).fromTo(content.children, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.85, stagger: 0.12, ease: "power3.out" }, "-=0.8");
    return () => timeline.kill();
  }, [reducedMotion]);

  return <div aria-hidden="true" className="pointer-events-none absolute inset-0" ref={root} />;
}
