"use client";

import type { DependencyList, RefObject } from "react";
import { useLayoutEffect } from "react";

type GsapApi = typeof import("gsap").gsap;
type ScrollTriggerApi = typeof import("gsap/ScrollTrigger").ScrollTrigger;
type GsapSetup = (tools: { gsap: GsapApi; ScrollTrigger: ScrollTriggerApi }) => void;

export function useGsapContext<T extends HTMLElement>(
  scope: RefObject<T | null>,
  setup: GsapSetup,
  dependencies: DependencyList = [],
) {
  useLayoutEffect(() => {
    let cancelled = false;
    let context: ReturnType<GsapApi["context"]> | undefined;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([gsapModule, scrollTriggerModule]) => {
        if (cancelled || !scope.current) return;
        const gsap = gsapModule.gsap;
        const ScrollTrigger = scrollTriggerModule.ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);
        context = gsap.context(() => setup({ gsap, ScrollTrigger }), scope);
      },
    );

    return () => {
      cancelled = true;
      context?.revert();
    };
    // The caller owns setup stability and provides its animation dependencies.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}

