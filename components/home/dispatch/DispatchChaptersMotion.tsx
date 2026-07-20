"use client";

import { useRef } from "react";
import { useGsapContext } from "@/hooks/useGsapContext";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function DispatchChaptersMotion() {
  const root = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useGsapContext(root, ({ gsap }) => {
    if (reducedMotion) return;
    const media = gsap.matchMedia();
    media.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const track = document.querySelector<HTMLElement>("[data-dispatch-track]");
      const section = document.querySelector<HTMLElement>("#dispatches");
      if (!track || !section) return;
      section.classList.add("dispatch-motion-ready");
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth + 64);
      const animation = gsap.to(track, { x: () => -distance(), ease: "none", scrollTrigger: { trigger: section, start: "top top", end: () => `+=${distance() + window.innerHeight}`, pin: true, scrub: 0.65, invalidateOnRefresh: true } });
      return () => {
        animation.kill();
        section.classList.remove("dispatch-motion-ready");
      };
    });
    return () => media.revert();
  }, [reducedMotion]);

  return <div aria-hidden="true" ref={root} />;
}
