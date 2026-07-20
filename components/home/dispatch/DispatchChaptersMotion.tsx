"use client";

import { useRef } from "react";
import { useGsapContext } from "@/hooks/useGsapContext";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function DispatchChaptersMotion() {
  const root = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useGsapContext(root, ({ gsap }) => {
    if (reducedMotion || window.innerWidth < 1024) return;
    const track = document.querySelector<HTMLElement>("[data-dispatch-track]");
    const section = document.querySelector<HTMLElement>("#dispatches");
    if (!track || !section) return;
    const distance = () => Math.max(0, track.scrollWidth - window.innerWidth + 64);
    gsap.to(track, { x: () => -distance(), ease: "none", scrollTrigger: { trigger: section, start: "top top", end: () => `+=${distance() + window.innerHeight}`, pin: true, scrub: 0.65, invalidateOnRefresh: true } });
  }, [reducedMotion]);

  return <div aria-hidden="true" ref={root} />;
}

