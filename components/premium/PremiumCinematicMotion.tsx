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
        const heroCopy = document.querySelector<HTMLElement>(
          "[data-premium-hero-copy]",
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
        if (heroCopy) {
          heroEntrance.fromTo(
            heroCopy,
            { autoAlpha: 0, y: 24 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.9,
            },
            0.52,
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
        const conciergeSection = document.querySelector<HTMLElement>(
          "[data-premium-concierge]",
        );
        const conciergeWords = gsap.utils.toArray<HTMLElement>(
          "[data-premium-concierge-word]",
        );
        const conciergePhones = gsap.utils.toArray<HTMLElement>(
          "[data-premium-concierge-phone]",
        );
        const conciergeCtaWords = gsap.utils.toArray<HTMLElement>(
          "[data-premium-concierge-cta-word]",
        );

        if (conciergeSection && conciergeWords.length) {
          gsap.set(conciergeWords, {
            autoAlpha: 0,
            y: 42,
            filter: "blur(14px)",
          });
          gsap.set(conciergePhones, { autoAlpha: 0.35 });
          gsap.set(conciergeCtaWords, {
            autoAlpha: 0,
            yPercent: 120,
            filter: "blur(8px)",
          });

          const conciergeScroll = gsap.timeline({
            scrollTrigger: {
              trigger: conciergeSection,
              start: "top 75%",
              end: "top 5%",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });

          conciergeScroll
            .to(
              conciergeWords,
              {
                autoAlpha: 1,
                y: 0,
                filter: "blur(0px)",
                stagger: 0.09,
                duration: 0.78,
                ease: "power2.out",
              },
              0,
            );

          if (conciergeCtaWords.length) {
            conciergeScroll.to(
              conciergeCtaWords,
              {
                autoAlpha: 1,
                yPercent: 0,
                filter: "blur(0px)",
                stagger: 0.12,
                duration: 0.42,
                ease: "power2.out",
              },
              0.58,
            );
          }

          if (conciergePhones[0]) {
            conciergeScroll.fromTo(
              conciergePhones[0],
              { autoAlpha: 0.35, yPercent: -8, rotate: -3 },
              {
                autoAlpha: 1,
                yPercent: 2,
                rotate: 0,
                duration: 1,
                ease: "none",
              },
              0,
            );
          }
          if (conciergePhones[1]) {
            conciergeScroll.fromTo(
              conciergePhones[1],
              { autoAlpha: 0.35, yPercent: 8, rotate: 3 },
              {
                autoAlpha: 1,
                yPercent: -2,
                rotate: 0,
                duration: 1,
                ease: "none",
              },
              0,
            );
          }
        }

        const tutorialDeck = document.querySelector<HTMLElement>(
          "[data-premium-tutorial-deck]",
        );
        const tutorialCards = gsap.utils.toArray<HTMLElement>(
          "[data-premium-tutorial-card]",
        );
        const tutorialCopies = gsap.utils.toArray<HTMLElement>(
          "[data-premium-tutorial-copy]",
        );

        if (
          tutorialDeck &&
          tutorialCards.length > 1 &&
          tutorialCards.length === tutorialCopies.length
        ) {
          const tutorialScroll = tutorialDeck.closest<HTMLElement>(
            ".premium-tutorial__scroll",
          );

          if (tutorialScroll) {
            const tutorialCalloutGroups = tutorialCards.map((card) =>
              gsap.utils.toArray<HTMLElement>(
                card.querySelectorAll("[data-premium-tutorial-callout]"),
              ),
            );
            gsap.set(tutorialCards, { flexGrow: 1 });
            gsap.set(tutorialCards[0], { flexGrow: 6 });
            gsap.set(tutorialCopies, { autoAlpha: 0, y: 24 });
            gsap.set(tutorialCopies[0], { autoAlpha: 1, y: 0 });
            gsap.set(tutorialCalloutGroups.flat(), { autoAlpha: 0, scale: 0.9 });
            gsap.set(tutorialCalloutGroups[0], { autoAlpha: 1, scale: 1 });

            const deckTimeline = gsap.timeline({
              scrollTrigger: {
                trigger: tutorialScroll,
                start: "top top",
                end: "bottom bottom",
                scrub: 1,
                invalidateOnRefresh: true,
              },
            });

            tutorialCards.slice(1).forEach((card, index) => {
              const previousCard = tutorialCards[index];
              const previousCopy = tutorialCopies[index];
              const copy = tutorialCopies[index + 1];
              const previousCallouts = tutorialCalloutGroups[index];
              const callouts = tutorialCalloutGroups[index + 1];
              const position = index;

              deckTimeline
                .to(
                  previousCopy,
                  { autoAlpha: 0, y: -20, duration: 0.24, ease: "power2.in" },
                  position,
                )
                .to(
                  previousCallouts,
                  { autoAlpha: 0, scale: 0.9, duration: 0.2 },
                  position,
                )
                .to(
                  previousCard,
                  { flexGrow: 1, duration: 1, ease: "power2.inOut" },
                  position,
                )
                .to(
                  card,
                  { flexGrow: 6, duration: 1, ease: "power2.inOut" },
                  position,
                )
                .to(
                  copy,
                  { autoAlpha: 1, y: 0, duration: 0.34, ease: "power2.out" },
                  position + 0.12,
                )
                .to(
                  callouts,
                  {
                    autoAlpha: 1,
                    scale: 1,
                    duration: 0.3,
                    stagger: 0.05,
                    ease: "power2.out",
                  },
                  position + 0.28,
                );
            });
          }
        }

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
        media.add("(max-width: 899px)", () => {
          gsap.set("[data-premium-tutorial-screen]", {
            autoAlpha: 1,
            y: 0,
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
