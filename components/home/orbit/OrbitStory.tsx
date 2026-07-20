"use client";

import { createContext, type ReactNode, useContext, useEffect, useMemo, useRef, useState } from "react";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type OrbitStoryState = { activeScene: number; progress: number };

const OrbitStoryContext = createContext<OrbitStoryState>({ activeScene: 0, progress: 0 });

export function useOrbitStory() {
  return useContext(OrbitStoryContext);
}

export function OrbitStory({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [story, setStory] = useState<OrbitStoryState>({ activeScene: 0, progress: 0 });

  useEffect(() => {
    if (reducedMotion || !root.current) {
      setStory({ activeScene: 0, progress: 0 });
      return;
    }
    const hero = root.current.querySelector<HTMLElement>("[data-orbit-hero]");
    if (!hero) return;
    let frame: number | undefined;
    const update = () => {
      frame = undefined;
      const rect = hero.getBoundingClientRect();
      const total = Math.max(rect.height + window.innerHeight * 0.42, 1);
      const progress = Math.min(1, Math.max(0, (window.innerHeight * 0.72 - rect.top) / total));
      setStory({ activeScene: Math.min(3, Math.floor(progress * 4)), progress });
    };
    const schedule = () => {
      if (frame === undefined) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame !== undefined) cancelAnimationFrame(frame);
    };
  }, [reducedMotion]);

  const value = useMemo(() => story, [story]);
  return <OrbitStoryContext.Provider value={value}><div data-testid="orbit-story" ref={root}>{children}</div></OrbitStoryContext.Provider>;
}
