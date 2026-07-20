"use client";

import type { ReactNode } from "react";
import { LenisProvider } from "@/components/motion/LenisProvider";
import type { AtlasRoute } from "@/hooks/useFirstRouteVisit";

export type { AtlasRoute } from "@/hooks/useFirstRouteVisit";

type RouteExperienceProps = { children: ReactNode; route: AtlasRoute };

export function RouteExperience({ children, route }: RouteExperienceProps) {
  return <LenisProvider>{children}</LenisProvider>;
}
