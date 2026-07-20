"use client";

import { useRef } from "react";

import { useGsapContext } from "@/hooks/useGsapContext";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function ProductConstellationMotion() {
  const root = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useGsapContext(root, ({ gsap }) => {
    if (reducedMotion || !root.current) return;
    const scene = root.current.closest<HTMLElement>("[data-testid='product-node-stage']");
    const scroll = scene?.querySelector<HTMLElement>("[data-constellation-scroll]");
    const pin = scene?.querySelector<HTMLElement>("[data-constellation-pin]");
    const line = scene?.querySelector<HTMLElement>("[data-constellation-line]");
    const nodes = scene ? gsap.utils.toArray<HTMLElement>("[data-orbit-node]", scene) : [];
    if (!scene || !scroll || !pin || !line || nodes.length !== 4) return;
    const media = gsap.matchMedia();
    media.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      scene.classList.add("constellation-motion-ready");
      gsap.set(nodes, { opacity: 0, y: 34, scale: 0.94 });
      gsap.set(nodes[0], { opacity: 1, y: 0, scale: 1 });
      gsap.set(line, { scaleX: 0, transformOrigin: "left" });
      const timeline = gsap.timeline({
        defaults: { ease: "power2.inOut", duration: 0.72 },
        scrollTrigger: { trigger: scroll, start: "top top", end: () => `+=${Math.max(window.innerHeight * 3.2, 2600)}`, pin, scrub: 0.65, anticipatePin: 1 },
      });
      nodes.forEach((node, index) => {
        const previous = nodes[index - 1];
        if (previous) timeline.to(previous, { opacity: 0, y: -32, scale: 0.96 }, index);
        timeline.to(node, { opacity: 1, y: 0, scale: 1 }, index).to(line, { scaleX: (index + 1) / nodes.length }, index);
      });
      return () => {
        timeline.kill();
        scene.classList.remove("constellation-motion-ready");
      };
    });
    return () => media.revert();
  }, [reducedMotion]);

  return <div aria-hidden="true" className="pointer-events-none absolute inset-0" ref={root} />;
}
