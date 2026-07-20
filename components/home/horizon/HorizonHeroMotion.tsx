"use client";

import { useEffect, useRef } from "react";
import { useGsapContext } from "@/hooks/useGsapContext";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function HorizonHeroMotion() {
  const root = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useGsapContext(root, ({ gsap, ScrollTrigger }) => {
    if (reducedMotion || !root.current) return;
    const hero = root.current.closest<HTMLElement>("[data-testid='horizon-hero-depth']");
    if (!hero) return;
    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const words = hero.querySelectorAll("[data-hero-word]");
      const copy = hero.querySelectorAll("[data-hero-copy]");
      const cards = hero.querySelectorAll("[data-hero-card]");
      const frame = hero.querySelector<HTMLElement>("[data-hero-frame]");
      const layers = hero.querySelectorAll<HTMLElement>("[data-depth]");
      const routeLine = hero.querySelector<HTMLElement>("[data-hero-route-line]");
      const depth = [-10, -20, -32];
      const master = gsap.timeline({ paused: true });
      master
        .addLabel("entrance-start")
        .fromTo(frame, { clipPath: "inset(12% 10% 12% 10% round 2.5rem)" }, { clipPath: "inset(0% 0% 0% 0% round 2.5rem)", duration: 1.25, ease: "power3.out" })
        .fromTo(words, { yPercent: 110, rotate: 2 }, { yPercent: 0, rotate: 0, duration: 1.15, stagger: 0.06, ease: "power3.out" }, "-=0.9")
        .fromTo(copy, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.7 }, "-=0.55")
        .fromTo(cards, { autoAlpha: 0, y: 32, rotate: -2 }, { autoAlpha: 1, y: 0, rotate: 0, duration: 0.95, stagger: 0.1, ease: "power3.out" }, "-=0.75")
        .addLabel("entrance-end")
        .fromTo(frame, { scale: 1 }, { scale: 1.04, duration: 1, ease: "none" }, "entrance-end")
        .fromTo(routeLine, { scaleY: 0.15 }, { scaleY: 1, duration: 1, ease: "none" }, "entrance-end");
      layers.forEach((layer, index) => {
        master.fromTo(layer, { y: 0 }, { y: depth[index], duration: 1, ease: "none" }, "entrance-end");
      });
      master.addLabel("handoff-end");

      const entranceEnd = master.labels["entrance-end"];
      const handoffEnd = master.labels["handoff-end"];
      let handoff: ReturnType<typeof ScrollTrigger.create> | undefined;
      let handoffTween: ReturnType<typeof master.tweenTo> | undefined;
      const entranceTween = master.tweenTo("entrance-end", {
        duration: 1.8,
        ease: "power3.out",
        onComplete: () => {
          handoff = ScrollTrigger.create({
            trigger: hero,
            start: "top top",
            end: "bottom top",
            onUpdate: ({ progress }) => {
              const targetTime = entranceEnd + (handoffEnd - entranceEnd) * progress;
              handoffTween?.kill();
              handoffTween = master.tweenTo(targetTime, { duration: 0.18, ease: "power1.out" });
            },
          });
        },
      });

      return () => {
        handoff?.kill();
        handoffTween?.kill();
        entranceTween.kill();
        master.kill();
      };
    });

    return () => {
      media.revert();
    };
  }, [reducedMotion]);

  useEffect(() => {
    const element = root.current;
    if (!element || reducedMotion || !window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
    const hero = element.closest<HTMLElement>("[data-testid='horizon-hero-depth']");
    const visual = hero?.querySelector<HTMLElement>("[data-hero-visual]");
    if (!hero || !visual) return;
    let pendingFrame: number | undefined;
    let nextX = 0;
    let nextY = 0;
    const onMove = (event: PointerEvent) => {
      nextX = (event.clientX / window.innerWidth - 0.5) * 18;
      nextY = (event.clientY / window.innerHeight - 0.5) * 14;
      if (pendingFrame !== undefined) return;
      pendingFrame = requestAnimationFrame(() => {
        pendingFrame = undefined;
        visual.style.setProperty("--hero-x", `${nextX}px`);
        visual.style.setProperty("--hero-y", `${nextY}px`);
      });
    };
    hero.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      hero.removeEventListener("pointermove", onMove);
      if (pendingFrame !== undefined) cancelAnimationFrame(pendingFrame);
      visual.style.removeProperty("--hero-x");
      visual.style.removeProperty("--hero-y");
    };
  }, [reducedMotion]);

  return <div aria-hidden="true" className="pointer-events-none absolute inset-0" ref={root} />;
}
