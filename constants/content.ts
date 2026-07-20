import { Building2, CircleDollarSign, Home, Plane, ShieldCheck } from "lucide-react";
import type { EssentialCategory, JourneyStage, ResourceSummary } from "@/types/content";

export const journeyStages: JourneyStage[] = [
  { id: "apply", number: "01", title: "Apply", eyebrow: "Build the right shortlist", description: "Compare programmes, organise documents, and keep every deadline in one calm plan.", promise: "No spreadsheet archaeology." },
  { id: "visa", number: "02", title: "Visa", eyebrow: "Know what comes next", description: "Turn a complicated visa process into clear tasks, document checks, and timely guidance.", promise: "Clarity before every submission." },
  { id: "finance", number: "03", title: "Finance", eyebrow: "Plan the real cost", description: "See tuition, deposits, living costs, and essential payments as one connected picture.", promise: "Fewer expensive surprises." },
  { id: "arrive", number: "04", title: "Arrive", eyebrow: "Land ready", description: "Coordinate housing, travel, connectivity, and the practical details of your first week.", promise: "A softer landing." },
  { id: "thrive", number: "05", title: "Thrive", eyebrow: "Settle into your new life", description: "Keep useful services, local guidance, and your next milestones close after orientation ends.", promise: "Support beyond arrival." },
];

export const essentials: EssentialCategory[] = [
  { title: "Visa guidance", description: "Country-aware checklists and human review when the details matter.", icon: ShieldCheck },
  { title: "Money planning", description: "A connected view of tuition, proof of funds, and everyday costs.", icon: CircleDollarSign },
  { title: "Housing", description: "Make sense of neighbourhoods, contracts, deposits, and move-in dates.", icon: Home },
  { title: "Travel", description: "Keep flight, arrival, and airport-to-door details in the same journey.", icon: Plane },
  { title: "University admin", description: "Track offers, enrolment actions, and documents without losing context.", icon: Building2 },
];

export const resources: ResourceSummary[] = [
  { category: "VISAS", title: "The documents students should prepare earlier than they think", readTime: "6 min" },
  { category: "MONEY", title: "How to build a realistic first-term budget", readTime: "5 min" },
  { category: "ARRIVAL", title: "A calmer checklist for your first seven days abroad", readTime: "7 min" },
];

export const productSignals = [
  "One personal journey plan",
  "Progress that stays understandable",
  "Expert help when a checklist is not enough",
];

