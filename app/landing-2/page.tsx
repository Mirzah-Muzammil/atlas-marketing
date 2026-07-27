import type { Metadata } from "next";

import { CinematicLanding } from "@/components/landing-2/CinematicLanding";
import { LenisProvider } from "@/components/motion/LenisProvider";

export const metadata: Metadata = {
  title: "Atlas — Your journey, held together",
  description:
    "One personal system for applications, arrival, essential services, and life after landing.",
};

export default function Landing2Page() {
  return (
    <LenisProvider duration={1.2} wheelMultiplier={0.82}>
      <CinematicLanding />
    </LenisProvider>
  );
}
