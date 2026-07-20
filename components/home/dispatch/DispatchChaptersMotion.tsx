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
      const section = root.current?.closest<HTMLElement>("#dispatches");
      const track = section?.querySelector<HTMLElement>("[data-dispatch-track]");
      const cards = section ? gsap.utils.toArray<HTMLElement>("[data-dispatch-card]", section) : [];
      const progress = section ? gsap.utils.toArray<HTMLElement>("[data-dispatch-progress]", section) : [];
      const thread = section?.querySelector<HTMLElement>("[data-dispatch-thread-line]");
      if (!track || !section || !thread || cards.length !== 5 || progress.length !== 5) return;
      section.classList.add("dispatch-motion-ready");
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth + 64);
      gsap.set(thread, { scaleX: 0, transformOrigin: "left" });
      const animation = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance() + window.innerHeight}`,
          pin: true,
          scrub: 0.65,
          invalidateOnRefresh: true,
          onUpdate: ({ progress: value }) => {
            const active = Math.min(cards.length - 1, Math.round(value * (cards.length - 1)));
            cards.forEach((card, index) => card.toggleAttribute("data-dispatch-active", index === active));
            progress.forEach((item, index) => item.toggleAttribute("data-dispatch-active", index === active));
            gsap.set(thread, { scaleX: value });
          },
        },
      });
      return () => {
        animation.kill();
        cards.forEach((card) => card.removeAttribute("data-dispatch-active"));
        progress.forEach((item) => item.removeAttribute("data-dispatch-active"));
        section.classList.remove("dispatch-motion-ready");
      };
    });
    return () => media.revert();
  }, [reducedMotion]);

  return <div aria-hidden="true" ref={root} />;
}
