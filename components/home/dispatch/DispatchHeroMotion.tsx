"use client";

import { useEffect, useRef } from "react";

import { useGsapContext } from "@/hooks/useGsapContext";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const stageProgress = [0.1, 0.55, 0.82];

export function DispatchHeroMotion() {
  const root = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!reducedMotion) return;

    const hero = root.current?.closest<HTMLElement>("[data-editorial-hero]");
    if (!hero) return;

    const states = Array.from(hero.querySelectorAll<HTMLElement>("[data-journey-state]"));
    const tabs = Array.from(hero.querySelectorAll<HTMLButtonElement>("[data-journey-tab]"));
    if (states.length !== 3 || tabs.length !== 3) return;

    hero.classList.add("editorial-tabs-ready");

    const activate = (activeIndex: number) => {
      tabs.forEach((tab, index) => {
        const isActive = index === activeIndex;
        tab.setAttribute("aria-selected", String(isActive));
        tab.tabIndex = isActive ? 0 : -1;
        tab.toggleAttribute("data-active", isActive);
      });
      states.forEach((state, index) => {
        const isActive = index === activeIndex;
        state.setAttribute("aria-hidden", String(!isActive));
        state.toggleAttribute("data-active", isActive);
      });
    };

    const cleanups = tabs.map((tab, index) => {
      const onClick = () => activate(index);
      const onKeyDown = (event: KeyboardEvent) => {
        if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
        event.preventDefault();
        const nextIndex =
          event.key === "Home"
            ? 0
            : event.key === "End"
              ? tabs.length - 1
              : (index + (event.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
        tabs[nextIndex]?.focus();
        activate(nextIndex);
      };
      tab.addEventListener("click", onClick);
      tab.addEventListener("keydown", onKeyDown);
      return () => {
        tab.removeEventListener("click", onClick);
        tab.removeEventListener("keydown", onKeyDown);
      };
    });

    activate(0);
    return () => {
      cleanups.forEach((cleanup) => cleanup());
      hero.classList.remove("editorial-tabs-ready");
    };
  }, [reducedMotion]);

  useGsapContext(
    root,
    ({ gsap }) => {
      const hero = root.current?.closest<HTMLElement>("[data-editorial-hero]");
      if (!hero || reducedMotion) return;

      const heading = hero.querySelector<HTMLElement>("[data-editorial-heading]");
      const introCopy = hero.querySelector<HTMLElement>("[data-editorial-intro-copy]");
      const panelWrap = hero.querySelector<HTMLElement>("[data-editorial-panel-wrap]");
      const panel = hero.querySelector<HTMLElement>("[data-editorial-panel]");
      const states = Array.from(hero.querySelectorAll<HTMLElement>("[data-journey-state]"));
      const tabs = Array.from(hero.querySelectorAll<HTMLButtonElement>("[data-journey-tab]"));
      const connectors = hero.querySelectorAll<SVGPathElement>(
        "[data-editorial-connector], [data-editorial-coil]",
      );
      const panelOrbits = hero.querySelectorAll<HTMLElement>("[data-editorial-panel-orbit]");

      if (!heading || !introCopy || !panelWrap || !panel || states.length !== 3 || tabs.length !== 3) {
        return;
      }

      hero.classList.add("editorial-motion-ready", "editorial-tabs-ready");

      const setAccessibleStage = (activeIndex: number) => {
        tabs.forEach((tab, index) => {
          const isActive = index === activeIndex;
          tab.setAttribute("aria-selected", String(isActive));
          tab.tabIndex = isActive ? 0 : -1;
          if (isActive) tab.setAttribute("data-active", "");
          else tab.removeAttribute("data-active");
        });

        states.forEach((state, index) => {
          const isActive = index === activeIndex;
          state.setAttribute("aria-hidden", String(!isActive));
          if (isActive) state.setAttribute("data-active", "");
          else state.removeAttribute("data-active");
        });
      };

      setAccessibleStage(0);

      let scrollToStage: ((index: number) => void) | undefined;
      const media = gsap.matchMedia();

      media.add("(min-width: 64rem)", () => {
        gsap.set(states, { autoAlpha: 0, y: 18 });
        gsap.set(states[0], { autoAlpha: 1, y: 0 });

        const scrollTimeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.78,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const activeIndex = self.progress < 0.41 ? 0 : self.progress < 0.72 ? 1 : 2;
              setAccessibleStage(activeIndex);
            },
          },
        });

        scrollTimeline
          .to(heading, { yPercent: -47, autoAlpha: 0.08, duration: 0.28 }, 0)
          .to(introCopy, { yPercent: -70, autoAlpha: 0, duration: 0.22 }, 0)
          .to(panelWrap, { y: -22, scale: 1.035, duration: 0.28 }, 0)
          .to(panelOrbits, { rotate: 35, scale: 1.12, duration: 0.34 }, 0)
          .to(states[0], { autoAlpha: 0, y: -22, duration: 0.045 }, 0.385)
          .fromTo(
            states[1],
            { autoAlpha: 0, y: 22 },
            { autoAlpha: 1, y: 0, duration: 0.055 },
            0.405,
          )
          .to(panel, { backgroundColor: "var(--color-dispatch-mint)", duration: 0.08 }, 0.4)
          .to(panelWrap, { y: -34, scale: 1.055, duration: 0.24 }, 0.42)
          .to(states[1], { autoAlpha: 0, y: -22, duration: 0.045 }, 0.69)
          .fromTo(
            states[2],
            { autoAlpha: 0, y: 22 },
            { autoAlpha: 1, y: 0, duration: 0.055 },
            0.71,
          )
          .to(panel, { backgroundColor: "var(--color-dispatch-sage)", duration: 0.08 }, 0.705)
          .to(panelWrap, { y: -46, scale: 1.025, duration: 0.2 }, 0.72)
          .to(connectors, { autoAlpha: 0.16, duration: 0.2 }, 0.76)
          .to(panelWrap, { y: -112, scale: 0.94, autoAlpha: 0.68, duration: 0.22 }, 0.78);

        scrollToStage = (index: number) => {
          const trigger = scrollTimeline.scrollTrigger;
          if (!trigger) return;
          const target = trigger.start + (trigger.end - trigger.start) * stageProgress[index];
          window.scrollTo({ behavior: "smooth", top: target });
        };

        return () => {
          scrollToStage = undefined;
          scrollTimeline.kill();
        };
      });

      media.add("(max-width: 63.999rem)", () => {
        gsap.set(states, { clearProps: "all" });
        setAccessibleStage(0);
      });

      const activateMobileStage = (index: number) => {
        const activeState = states.find((state) => state.hasAttribute("data-active"));
        const nextState = states[index];
        if (!nextState || activeState === nextState) return;

        setAccessibleStage(index);
        if (activeState) {
          gsap.fromTo(activeState, { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: -12, duration: 0.22 });
        }
        gsap.fromTo(
          nextState,
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, duration: 0.34, ease: "power2.out" },
        );
      };

      const tabCleanups = tabs.map((tab, index) => {
        const onClick = () => {
          if (window.matchMedia("(min-width: 64rem)").matches && scrollToStage) {
            scrollToStage(index);
          } else {
            activateMobileStage(index);
          }
        };
        const onKeyDown = (event: KeyboardEvent) => {
          if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
          event.preventDefault();
          const nextIndex =
            event.key === "Home"
              ? 0
              : event.key === "End"
                ? tabs.length - 1
                : (index + (event.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
          tabs[nextIndex]?.focus();
          tabs[nextIndex]?.click();
        };

        tab.addEventListener("click", onClick);
        tab.addEventListener("keydown", onKeyDown);
        return () => {
          tab.removeEventListener("click", onClick);
          tab.removeEventListener("keydown", onKeyDown);
        };
      });

      return () => {
        media.revert();
        tabCleanups.forEach((cleanup) => cleanup());
        hero.classList.remove("editorial-motion-ready", "editorial-tabs-ready");
      };
    },
    [reducedMotion],
  );

  useEffect(() => {
    if (reducedMotion || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }

    const hero = root.current?.closest<HTMLElement>("[data-editorial-hero]");
    const scene = hero?.querySelector<HTMLElement>("[data-editorial-scene]");
    const connectors = hero?.querySelector<HTMLElement>("[data-editorial-connectors]");
    const orbits = hero?.querySelectorAll<HTMLElement>("[data-editorial-panel-orbit]");
    if (!hero || !scene || !connectors || !orbits?.length) return;

    let frame: number | undefined;
    const onPointerMove = (event: PointerEvent) => {
      if (frame !== undefined) return;
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;
      frame = requestAnimationFrame(() => {
        connectors.style.transform = `translate3d(${x * -12}px, ${y * -7}px, 0)`;
        orbits[0].style.translate = `${x * 10}px ${y * 8}px`;
        if (orbits[1]) orbits[1].style.translate = `${x * -8}px ${y * -6}px`;
        frame = undefined;
      });
    };

    scene.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      scene.removeEventListener("pointermove", onPointerMove);
      if (frame !== undefined) cancelAnimationFrame(frame);
      connectors.style.removeProperty("transform");
      orbits.forEach((orbit) => orbit.style.removeProperty("translate"));
    };
  }, [reducedMotion]);

  return <div aria-hidden="true" className="pointer-events-none absolute inset-0" ref={root} />;
}
