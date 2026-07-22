"use client";

import { useEffect } from "react";

export function PremiumCinematicMotion() {
  useEffect(() => {
    if (
      !window.matchMedia ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let cancelled = false;
    let cleanup = () => {};

    async function mountMotion() {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);
      const context = gsap.context(() => {
        const premiumHero = document.querySelector<HTMLElement>(
          "[data-premium-hero]",
        );
        const heroIntro = document.querySelector<HTMLElement>(
          "[data-premium-hero-intro]",
        );
        const heroCrowd = document.querySelector<HTMLElement>(
          "[data-premium-hero-crowd]",
        );
        const heroTitleLines = gsap.utils.toArray<HTMLElement>(
          "[data-premium-hero-title-line]",
        );
        const navShell = document.querySelector<HTMLElement>(
          "[data-premium-nav-shell]",
        );

        const heroEntrance = gsap.timeline({
          defaults: { ease: "power3.out" },
        });
        if (navShell) {
          heroEntrance.fromTo(
            navShell,
            { y: -96 },
            { y: 0, duration: 0.9 },
            0,
          );
        }
        if (heroTitleLines.length) {
          heroEntrance.fromTo(
            heroTitleLines.map((line) => line.firstElementChild),
            { yPercent: 115 },
            {
              yPercent: 0,
              duration: 1.05,
              stagger: 0.12,
            },
            0.12,
          );
        }
        if (heroCrowd) {
          heroEntrance.fromTo(
            heroCrowd,
            { y: 96 },
            {
              y: 0,
              duration: 1.4,
              ease: "power4.out",
            },
            0.28,
          );
        }

        if (premiumHero && heroIntro && heroCrowd) {
          const premiumHeroScroll = gsap.timeline({
            scrollTrigger: {
              trigger: premiumHero,
              start: "top top",
              end: "bottom top",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });
          premiumHeroScroll
            .to(heroIntro, { yPercent: -42, scale: 0.94, ease: "none" }, 0)
            .to(heroCrowd, { yPercent: 10, ease: "none" }, 0);
        }

        const heroTransition = document.querySelector<HTMLElement>(
          "[data-premium-hero-transition]",
        );
        const transitionFrame = document.querySelector<HTMLElement>(
          "[data-premium-transition-frame]",
        );
        if (heroTransition && transitionFrame) {
          gsap
            .timeline({
              scrollTrigger: {
                trigger: heroTransition,
                start: "top top",
                end: "bottom bottom",
                scrub: 1,
                invalidateOnRefresh: true,
              },
            })
            .fromTo(
              transitionFrame,
              {
                clipPath: "inset(31% 35% 31% 35% round 1.25rem)",
                scale: 0.84,
              },
              {
                clipPath: "inset(0% 0% 0% 0% round 0rem)",
                scale: 1,
                ease: "power2.inOut",
              },
              0,
            );
        }

        gsap.utils.toArray<HTMLElement>("[data-premium-reveal]").forEach((item) => {
          gsap.fromTo(
            item,
            { autoAlpha: 0, y: 72 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 1.15,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 88%",
                once: true,
              },
            },
          );
        });

        gsap.utils
          .toArray<HTMLElement>("[data-premium-image-frame]")
          .forEach((frame) => {
            const image = frame.querySelector("img");
            if (!image) return;

            gsap.fromTo(
              frame,
              { clipPath: "inset(12% 0 12% 0 round 1.5rem)" },
              {
                clipPath: "inset(0% 0 0% 0 round 0rem)",
                ease: "none",
                scrollTrigger: {
                  trigger: frame,
                  start: "top 90%",
                  end: "top 35%",
                  scrub: 0.8,
                },
              },
            );
            gsap.fromTo(
              image,
              { scale: 1.16, yPercent: -5 },
              {
                scale: 1.02,
                yPercent: 5,
                ease: "none",
                scrollTrigger: {
                  trigger: frame,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1,
                },
              },
            );
          });

        const media = gsap.matchMedia();
        media.add("(min-width: 900px)", () => {
          const shell = document.querySelector<HTMLElement>(
            "[data-premium-horizontal-shell]",
          );
          const track = document.querySelector<HTMLElement>(
            "[data-premium-horizontal-track]",
          );
          if (!shell || !track) return;

          const travel = () => Math.max(0, track.scrollWidth - window.innerWidth);
          gsap.to(track, {
            x: () => -travel(),
            ease: "none",
            scrollTrigger: {
              trigger: shell,
              start: "top top",
              end: () => `+=${travel()}`,
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });
        });

        cleanup = () => media.revert();
      }, ".premium-theme");

      const motionCleanup = cleanup;
      cleanup = () => {
        motionCleanup();
        context.revert();
      };
    }

    void mountMotion();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return null;
}
