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
      const scroll = scene.querySelector<HTMLElement>("[data-product-scroll]");
      const pin = scene.querySelector<HTMLElement>("[data-product-pin]");
      const states = gsap.utils.toArray<HTMLElement>("[data-product-state]", scene);
      const signals = gsap.utils.toArray<HTMLElement>("[data-product-signal]", scene);
      const routeLine = scene.querySelector<HTMLElement>("[data-product-route-line]");
      const frame = scene.querySelector<HTMLElement>("[data-product-frame]");
      const intro = scene.querySelector<HTMLElement>("[data-product-intro]");
      if (states.length !== 4 || signals.length !== 4 || !scroll || !pin || !routeLine || !frame) return;

      scene.classList.add("product-motion-ready");
      gsap.set(states, { opacity: 0, y: 22 });
      gsap.set(states[0], { opacity: 1, y: 0 });
      gsap.set(signals, { opacity: 0.78 });
      gsap.set(signals[0], { opacity: 1 });
      gsap.set(routeLine, { scaleY: 0, transformOrigin: "top" });

      let activeIndex = 0;
      const setActiveState = (index: number) => {
        if (index === activeIndex) return;
        activeIndex = index;
        states.forEach((state, stateIndex) => {
          gsap.set(state, { opacity: stateIndex === activeIndex ? 1 : 0, y: stateIndex === activeIndex ? 0 : 22 });
        });
        signals.forEach((signal, signalIndex) => {
          gsap.set(signal, { opacity: signalIndex === activeIndex ? 1 : 0.78 });
        });
      };

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: scroll,
          start: "top top",
          end: () => `+=${Math.max(window.innerHeight * 3.1, 2500)}`,
          pin,
          scrub: 0.55,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: ({ progress }) => setActiveState(Math.min(states.length - 1, Math.floor(progress * states.length))),
        },
      });

      if (intro) timeline.to(intro, { y: -26, opacity: 0.62, duration: 4, ease: "none" }, 0);
      timeline.to(routeLine, { scaleY: 1, duration: 4, ease: "none" }, 0);

      return () => {
        timeline.kill();
        scene.classList.remove("product-motion-ready");
      };
    });

    return () => media.revert();
  }, [reducedMotion]);

  return <div aria-hidden="true" className="pointer-events-none absolute inset-0" ref={root} />;
}
