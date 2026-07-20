"use client";

import type { ReactNode } from "react";
import { LenisProvider } from "@/components/motion/LenisProvider";

type RouteExperienceProps = { children: ReactNode };

export function RouteExperience({ children }: RouteExperienceProps) {
  return <LenisProvider>{children}</LenisProvider>;
}
