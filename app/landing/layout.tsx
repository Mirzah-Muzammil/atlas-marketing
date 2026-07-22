import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./landing.css";

export const metadata: Metadata = {
  title: "GGI Atlas - Your operating system for studying abroad",
  description:
    "Match universities, sort your services, settle in, and build a life abroad with one free student operating system.",
};

export default function LandingLayout({ children }: { children: ReactNode }) {
  return <div className="landing-route">{children}</div>;
}
