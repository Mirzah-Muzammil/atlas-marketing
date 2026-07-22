"use client";

import { useEffect, useRef, useState } from "react";

export type AtlasRoute = "horizon" | "dispatch" | "orbit" | "landing";
export type AtlasIntroMode = "full" | "short";

export function useFirstRouteVisit(route: AtlasRoute) {
  const [resolvedVisit, setResolvedVisit] = useState<{
    route: AtlasRoute;
    mode: AtlasIntroMode;
  } | null>(null);
  const resolvedRoutes = useRef(new Map<AtlasRoute, AtlasIntroMode>());

  useEffect(() => {
    const resolvedMode = resolvedRoutes.current.get(route);
    if (resolvedMode) {
      setResolvedVisit({ route, mode: resolvedMode });
      return;
    }

    const storageKey = `atlas:intro:${route}`;
    let mode: AtlasIntroMode = "full";

    try {
      mode = sessionStorage.getItem(storageKey) === "seen" ? "short" : "full";
      sessionStorage.setItem(storageKey, "seen");
    } catch {
      // Keep the full introduction when session storage is unavailable.
    }

    resolvedRoutes.current.set(route, mode);
    setResolvedVisit({ route, mode });
  }, [route]);

  return resolvedVisit?.route === route ? resolvedVisit.mode : null;
}
