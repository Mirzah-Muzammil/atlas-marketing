import {
  AgentComparison,
  type AgentComparisonContent,
} from "@/components/homepage/AgentComparison";

const conciergeComparison: AgentComparisonContent = {
  id: "concierge-vs-agents",
  heading: (
    <>
      Not another <span className="text-[#f35a02]">agent.</span>
    </>
  ),
  summary: {
    prefix: "Agents work on commission from universities.",
    accent: "Concierge works for you.",
    suffix: "That difference shows up everywhere.",
  },
  animateSummary: true,
  atlasEyebrow: "Atlas Concierge",
  atlasTitle: "Built for your case",
  atlasBadge: "Fixed fee",
  atlasBenefits: [
    {
      title: "Pricing",
      copy: "Fixed fee, agreed upfront.",
    },
    {
      title: "Who they work for",
      copy: "You.",
    },
    {
      title: "Your documents",
      copy: "Stay in your Atlas, under your control.",
    },
    {
      title: "Visibility",
      copy: "Every step tracked, live.",
    },
    {
      title: "After admission",
      copy: "Visa, arrival, first job, still with you.",
    },
  ],
  agentEyebrow: "Traditional agent",
  agentTitle: "Works on commission",
  agentTradeoffs: [
    {
      title: "Pricing",
      copy: "Commissions you never see.",
    },
    {
      title: "Who they work for",
      copy: "Whoever pays their commission.",
    },
    {
      title: "Your documents",
      copy: "Scattered across email and WhatsApp.",
    },
    {
      title: "Visibility",
      copy: "We will let you know.",
    },
    {
      title: "After admission",
      copy: "Gone once the commission clears.",
    },
  ],
  ctaLabel: "Get my quote",
  ctaHref: "#pricing",
};

export function ConciergeAgentComparison() {
  return <AgentComparison content={conciergeComparison} variant="concierge" />;
}
