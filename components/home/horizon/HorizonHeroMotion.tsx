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
    const entranceTween = master.tweenTo("entrance-end", {
      duration: 1.8,
      ease: "power3.out",
      onComplete: () => {
        handoff = ScrollTrigger.create({
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 0.45,
          onUpdate: ({ progress }) => {
            master.time(entranceEnd + (handoffEnd - entranceEnd) * progress);
          },
        });
      },
    });

    return () => {
      handoff?.kill();
      entranceTween.kill();
      master.kill();
    };
  }, [reducedMotion]);

  useEffect(() => {
    const element = root.current;
    if (!element || reducedMotion || !window.matchMedia("(pointer:fine)").matches) return;
    const hero = element.closest<HTMLElement>("[data-testid='horizon-hero-depth']");
    const visual = hero?.querySelector<HTMLElement>("[data-hero-visual]");
    if (!visual) return;
    const onMove = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 18;
      const y = (event.clientY / window.innerHeight - 0.5) * 14;
      visual.style.setProperty("--hero-x", `${x}px`);
      visual.style.setProperty("--hero-y", `${y}px`);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      visual.style.removeProperty("--hero-x");
      visual.style.removeProperty("--hero-y");
    };
  }, [reducedMotion]);

  return <div aria-hidden="true" className="pointer-events-none absolute inset-0" ref={root} />;
}
