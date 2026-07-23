import { StickyCard002 } from "@/components/ui/skiper-ui/skiper17";

type KnowledgeItem = {
  type: string;
  title: string;
  copy?: string;
  meta: string;
};

const knowledgeImages = [
  "/images/normal/product-planning.jpg",
  "/images/normal/visa.jpg",
  "/images/normal/loans.jpg",
  "/images/normal/housing.jpg",
  "/images/normal/career.jpg",
] as const;

export function PremiumKnowledgeAccordion({
  items,
}: {
  items: readonly KnowledgeItem[];
}) {
  const cards = items.map((item, index) => ({
    id: index + 1,
    image: knowledgeImages[index] ?? knowledgeImages[0],
    alt: "",
    eyebrow: `Knowledge & tools · ${item.type}`,
    title: item.title,
    description: item.copy ?? item.meta,
    meta: item.meta,
  }));

  return (
    <StickyCard002
      cards={cards}
      className="premium-knowledge__skiper17"
      containerClassName="premium-knowledge__skiper17-deck"
      imageClassName="premium-knowledge__skiper17-image"
    />
  );
}
