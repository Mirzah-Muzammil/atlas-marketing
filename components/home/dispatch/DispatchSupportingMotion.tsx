"use client";

import { useRef } from "react";

import { useGsapContext } from "@/hooks/useGsapContext";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function DispatchSupportingMotion() {
  const root = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useGsapContext(
    root,
    ({ gsap }) => {
      const theme = root.current?.closest<HTMLElement>(".editorial-theme");
      if (!theme || reducedMotion) return;

      const trust = theme.querySelector<HTMLElement>("[data-editorial-trust]");
      const system = theme.querySelector<HTMLElement>("[data-editorial-system]");
      if (!trust || !system) return;

      const headingLines = trust.querySelectorAll<HTMLElement>("[data-supporting-heading-line]");
      const trustReveals = trust.querySelectorAll<HTMLElement>("[data-supporting-reveal]");
      const trustProofs = trust.querySelectorAll<HTMLElement>("[data-trust-proof]");
      const supportLine = trust.querySelector<SVGPathElement>("[data-supporting-line]");
      const systemHeadingLines = system.querySelectorAll<HTMLElement>("[data-system-heading-line]");
      const systemCopy = system.querySelector<HTMLElement>("[data-system-copy]");
      const systemMoments = system.querySelectorAll<HTMLElement>("[data-system-moment]");
      const systemVisuals = system.querySelectorAll<HTMLElement>("[data-system-visual]");
      const systemOrbits = system.querySelectorAll<HTMLElement>("[data-system-orbit]");
      const systemProgress = system.querySelector<HTMLElement>("[data-system-progress]");

      if (supportLine) {
        gsap.set(supportLine, { strokeDasharray: 1, strokeDashoffset: 1 });
        gsap.to(supportLine, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: trust,
            start: "top 88%",
            end: "top 30%",
            scrub: 0.6,
          },
        });
      }

      gsap.fromTo(
        headingLines,
        { yPercent: 112, rotate: 1.2 },
        {
          yPercent: 0,
          rotate: 0,
          duration: 1.05,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: trust, start: "top 68%", once: true },
        },
      );
      gsap.fromTo(
        trustReveals,
        { autoAlpha: 0, y: 20 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: trust, start: "top 64%", once: true },
        },
      );
      gsap.fromTo(
        trustProofs,
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: trustProofs[0], start: "top 82%", once: true },
        },
      );

      gsap.fromTo(
        systemHeadingLines,
        { yPercent: 112, rotate: 1 },
        {
          yPercent: 0,
          rotate: 0,
          duration: 1.05,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: system, start: "top 70%", once: true },
        },
      );
      if (systemCopy) {
        gsap.fromTo(
          systemCopy,
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.75,
            ease: "power2.out",
            scrollTrigger: { trigger: system, start: "top 66%", once: true },
          },
        );
      }
      if (systemProgress) {
        gsap.fromTo(
          systemProgress,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: systemMoments[0],
              endTrigger: systemMoments[systemMoments.length - 1],
              start: "top 54%",
              end: "bottom 54%",
              scrub: 0.7,
            },
          },
        );
      }

      systemMoments.forEach((moment, index) => {
        const visual = systemVisuals[index];
        gsap.fromTo(
          moment,
          { autoAlpha: 0.35, y: 36 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.85,
            ease: "power2.out",
            scrollTrigger: { trigger: moment, start: "top 80%", once: true },
          },
        );
        if (visual) {
          gsap.fromTo(
            visual,
            { y: 36, rotate: index % 2 === 0 ? 1.2 : -1.2 },
            {
              y: -24,
              rotate: 0,
              ease: "none",
              scrollTrigger: {
                trigger: moment,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.65,
              },
            },
          );
        }
      });

      gsap.to(systemOrbits, {
        rotate: 42,
        transformOrigin: "center",
        ease: "none",
        scrollTrigger: { trigger: system, start: "top bottom", end: "bottom top", scrub: 1 },
      });
    },
    [reducedMotion],
  );

  return <div aria-hidden="true" className="pointer-events-none absolute inset-0" ref={root} />;
}
