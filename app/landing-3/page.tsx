import type { Metadata } from "next";

import { Landing3Hero } from "@/components/landing-3/Landing3Hero";

export const metadata: Metadata = {
  title: "Atlas — Your operating system for studying abroad",
  description:
    "Apply with clarity, land prepared, and build your life abroad with Atlas.",
};

export default function Landing3Page() {
  return <Landing3Hero />;
}
