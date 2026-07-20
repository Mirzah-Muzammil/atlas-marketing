"use client";

import { useRef } from "react";

import { useGsapContext } from "@/hooks/useGsapContext";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function ProductProofMotion() {
  const root = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useGsapContext(root, ({ gsap }) => {
    if (reducedMotion || !root.current) return;
    const scene = root.current.closest<HTMLElement>("[data-testid='product-proof-scene']");
    if (!scene) return;
    const media = gsap.matchMedia();

    media.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const states = gsap.utils.toArray<HTMLElement>("[data-product-state]", scene);
      const signals = gsap.utils.toArray<HTMLElement>("[data-product-signal]", scene);
      const routeLine = scene.querySelector<HTMLElement>("[data-product-route-line]");
      const frame = scene.querySelector<HTMLElement>("[data-product-frame]");
      if (states.length !== 4 || signals.length !== 4 || !routeLine || !frame) return;

      scene.classList.add("product-motion-ready");
      gsap.set(states, { opacity: 0, y: 22 });
      gsap.set(states[0], { opacity: 1, y: 0 });
      gsap.set(signals, { opacity: 0.78 });
      gsap.set(signals[0], { opacity: 1 });
      gsap.set(routeLine, { scaleY: 0, transformOrigin: "top" });

      const timeline = gsap.timeline({
        defaults: { duration: 0.75, ease: "power2.inOut" },
        scrollTrigger: {
          trigger: scene,
          start: "top 20%",
          end: "bottom 80%",
          scrub: 0.55,
          invalidateOnRefresh: true,
        },
      });

      states.forEach((state, index) => {
        const previous = states[index - 1];
        const previousSignal = signals[index - 1];
        if (previous && previousSignal) {
          timeline.to(previous, { opacity: 0, y: -18 }, index).to(previousSignal, { opacity: 0.78 }, index);
        }
        timeline.to(state, { opacity: 1, y: 0 }, index).to(signals[index], { opacity: 1 }, index).to(routeLine, { scaleY: (index + 1) / states.length }, index);
      });

      return () => {
        timeline.kill();
        scene.classList.remove("product-motion-ready");
      };
    });

    return () => media.revert();
  }, [reducedMotion]);

  return <div aria-hidden="true" className="pointer-events-none absolute inset-0" ref={root} />;
}
