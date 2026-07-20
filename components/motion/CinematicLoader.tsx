"use client";

import { useRef, useState } from "react";

import { LoaderMark } from "@/components/motion/LoaderMark";
import { RouteTransitionLine } from "@/components/motion/RouteTransitionLine";
import { useFirstRouteVisit, type AtlasRoute } from "@/hooks/useFirstRouteVisit";
import { useGsapContext } from "@/hooks/useGsapContext";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/utils/cn";

type CinematicLoaderProps = { route: AtlasRoute };

const routeShellClasses: Record<AtlasRoute, string> = {
  horizon: "bg-background text-primary-deep",
  dispatch: "bg-paper text-ink",
  orbit: "bg-night text-white",
};

function RouteVisual({ route }: { route: AtlasRoute }) {
  if (route === "dispatch") {
    return (
      <div className="w-full max-w-xl" data-route-visual>
        <div className="flex items-center justify-between text-[10px] font-bold tracking-[0.2em]">
          <span>ATLAS / EDITION 02</span><span>THE WHOLE STORY</span>
        </div>
        <RouteTransitionLine className="mt-4 bg-ink/20" />
        <LoaderMark className="mx-auto mt-10" />
      </div>
    );
  }

  if (route === "orbit") {
    return (
      <div className="relative grid h-64 w-64 place-items-center" data-route-visual>
        <div className="absolute inset-0 rounded-full border border-secondary/20" />
        <div className="absolute inset-10 rounded-full border border-secondary/35" />
        <span className="absolute right-3 top-1/2 h-2.5 w-2.5 rounded-full bg-accent" />
        <span className="absolute left-10 top-10 h-2 w-2 rounded-full bg-secondary" />
        <LoaderMark className="relative text-white" />
      </div>
    );
  }

  return (
    <div className="flex w-full max-w-lg items-center gap-6" data-route-visual>
      <RouteTransitionLine className="flex-1 bg-primary/20 text-primary" />
      <div className="grid h-28 w-28 shrink-0 place-items-center rounded-full border border-primary/20 bg-white/60">
        <LoaderMark className="text-primary-deep" />
      </div>
      <RouteTransitionLine className="flex-1 bg-primary/20 text-primary" />
    </div>
  );
}

export function CinematicLoader({ route }: CinematicLoaderProps) {
  const root = useRef<HTMLDivElement>(null);
  const introMode = useFirstRouteVisit(route);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [loaderState, setLoaderState] = useState<"active" | "hidden">("active");
  const isHidden = prefersReducedMotion || loaderState === "hidden";

  useGsapContext(
    root,
    ({ gsap }) => {
      if (!introMode || prefersReducedMotion || !root.current) return;

      setLoaderState("active");
      const duration = introMode === "full" ? 0.8 : 0.32;
      const timeline = gsap.timeline({ onComplete: () => setLoaderState("hidden") });

      timeline
        .fromTo("[data-route-visual]", { autoAlpha: 0, scale: 0.94 }, { autoAlpha: 1, scale: 1, duration, ease: "power3.out" })
        .fromTo("[data-transition-line]", { scaleX: 0 }, { scaleX: 1, duration: duration * 0.7, ease: "power2.out" }, "<")
        .to("[data-loader-panel]", { yPercent: -100, duration, ease: "power3.inOut" })
        .set(root.current, { autoAlpha: 0 });

      return () => timeline.kill();
    },
    [introMode, prefersReducedMotion, route],
  );

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none fixed inset-0 z-[90]", isHidden && "invisible")}
      data-intro-mode={introMode ?? "pending"}
      data-loader-state={isHidden ? "hidden" : "active"}
      data-route={route}
      data-testid="cinematic-loader"
      ref={root}
    >
      <div className={cn("grid h-full w-full place-items-center px-8", routeShellClasses[route])} data-loader-panel>
        <RouteVisual route={route} />
      </div>
    </div>
  );
}
