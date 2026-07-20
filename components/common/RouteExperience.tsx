"use client";

import type { ReactNode } from "react";
import { CinematicLoader } from "@/components/motion/CinematicLoader";
import { LenisProvider } from "@/components/motion/LenisProvider";
import type { AtlasRoute } from "@/hooks/useFirstRouteVisit";

export type { AtlasRoute } from "@/hooks/useFirstRouteVisit";

type RouteExperienceProps = { children: ReactNode; route?: AtlasRoute };

export function RouteExperience({ children, route = "horizon" }: RouteExperienceProps) {
  return <LenisProvider>{children}<CinematicLoader route={route} /></LenisProvider>;
}
