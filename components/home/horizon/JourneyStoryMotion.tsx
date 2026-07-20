"use client";

import { useRef } from "react";
import { useGsapContext } from "@/hooks/useGsapContext";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function JourneyStoryMotion() {
  const root = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useGsapContext(root, ({ gsap }) => {
    if (reducedMotion || !root.current) return;
    const stage = root.current.closest<HTMLElement>("[data-testid='journey-stage']");
    if (!stage) return;
    const media = gsap.matchMedia();

    media.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const pin = stage.querySelector<HTMLElement>("[data-journey-pin]");
      const cards = gsap.utils.toArray<HTMLElement>("[data-journey-article]", stage);
      const productStates = gsap.utils.toArray<HTMLElement>("[data-journey-product-state]", stage);
      const routeLine = stage.querySelector<HTMLElement>("[data-journey-route-line]");
      if (!pin || cards.length !== 5 || productStates.length !== 5 || !routeLine) return;

      stage.classList.add("journey-motion-ready");
      gsap.set(cards, { opacity: 0, y: 24 });
      gsap.set(cards[0], { opacity: 1, y: 0 });
      gsap.set(productStates, { opacity: 0.34, x: 0 });
      gsap.set(productStates[0], { opacity: 1, x: 8 });
      gsap.set(routeLine, { scaleY: 0, transformOrigin: "top" });

      const timeline = gsap.timeline({
        defaults: { ease: "power2.inOut", duration: 0.24 },
        scrollTrigger: {
          trigger: stage,
          start: "top top",
          end: () => `+=${Math.min(window.innerHeight * 3.2, 2800)}`,
          pin,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      cards.forEach((card, index) => {
        const product = productStates[index];
        const previous = cards[index - 1];
        const previousProduct = productStates[index - 1];
        const position = index * 0.9;
        if (previous && previousProduct) {
          timeline
            .to(previous, { opacity: 0, y: -20 }, position)
            .to(previousProduct, { opacity: 0.34, x: 0 }, position);
        }
        timeline
          .to(card, { opacity: 1, y: 0 }, position + 0.2)
          .to(product, { opacity: 1, x: 8 }, position + 0.2)
          .to(routeLine, { scaleY: (index + 1) / cards.length }, position);
      });

      return () => {
        timeline.kill();
        stage.classList.remove("journey-motion-ready");
      };
    });

    return () => media.revert();
  }, [reducedMotion]);

  return <div aria-hidden="true" className="pointer-events-none absolute inset-0" ref={root} />;
}
