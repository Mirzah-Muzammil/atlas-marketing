import type { LucideIcon } from "lucide-react";

export type JourneyStage = {
  id: "apply" | "visa" | "finance" | "arrive" | "thrive";
  number: string;
  title: string;
  eyebrow: string;
  description: string;
  promise: string;
};

export type EssentialCategory = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type ResourceSummary = {
  category: string;
  title: string;
  readTime: string;
};

export type NavItem = { label: string; href: string };
