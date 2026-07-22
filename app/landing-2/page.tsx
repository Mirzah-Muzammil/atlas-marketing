import type { Metadata } from "next";

import { CinematicLanding } from "@/components/landing-2/CinematicLanding";

export const metadata: Metadata = {
  title: "Atlas — Your journey, held together",
  description:
    "One personal system for applications, arrival, essential services, and life after landing.",
};

export default function Landing2Page() {
  return <CinematicLanding />;
}
