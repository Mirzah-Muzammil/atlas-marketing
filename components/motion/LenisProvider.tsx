"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type LenisProviderProps = { children: ReactNode };

export function LenisProvider({ children }: LenisProviderProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    let animationFrame = 0;
    let disposed = false;
    let lenisInstance: InstanceType<typeof import("lenis").default> | undefined;

    import("lenis").then(({ default: Lenis }) => {
      if (disposed) return;
      lenisInstance = new Lenis({ duration: 1.05, smoothWheel: true, wheelMultiplier: 0.92 });

      const update = (time: number) => {
        lenisInstance?.raf(time);
        animationFrame = requestAnimationFrame(update);
      };
      animationFrame = requestAnimationFrame(update);
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(animationFrame);
      lenisInstance?.destroy();
    };
  }, [prefersReducedMotion]);

  return children;
}
