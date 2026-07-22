"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type LenisProviderProps = {
  children: ReactNode;
  duration?: number;
  syncScrollTrigger?: boolean;
  wheelMultiplier?: number;
};

export function LenisProvider({
  children,
  duration = 1.05,
  syncScrollTrigger = false,
  wheelMultiplier = 0.92,
}: LenisProviderProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    let animationFrame = 0;
    let disposed = false;
    let lenisInstance: InstanceType<typeof import("lenis").default> | undefined;
    let scrollTriggerUpdate: (() => void) | undefined;

    const mountLenis = async () => {
      const { default: Lenis } = await import("lenis");
      if (disposed) return;
      lenisInstance = new Lenis({
        duration,
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier,
      });

      if (syncScrollTrigger) {
        const [{ gsap }, { ScrollTrigger }] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);
        if (disposed) return;

        gsap.registerPlugin(ScrollTrigger);
        scrollTriggerUpdate = ScrollTrigger.update;
        lenisInstance.on("scroll", scrollTriggerUpdate);
        ScrollTrigger.refresh();
      }

      const update = (time: number) => {
        lenisInstance?.raf(time);
        animationFrame = requestAnimationFrame(update);
      };
      animationFrame = requestAnimationFrame(update);
    };

    void mountLenis();

    return () => {
      disposed = true;
      cancelAnimationFrame(animationFrame);
      if (scrollTriggerUpdate) {
        lenisInstance?.off("scroll", scrollTriggerUpdate);
      }
      lenisInstance?.destroy();
    };
  }, [duration, prefersReducedMotion, syncScrollTrigger, wheelMultiplier]);

  return children;
}
