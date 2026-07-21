import AnimatedTitle from "@/components/common/AnimatedTitle";
import {
  Skiper52,
  type HoverExpandImage,
} from "@/components/ui/skiper-ui/skiper52";

interface Module {
  id: string;
  name: string;
  category: string;
  icon: string;
  description: string;
}

interface ModulesProps {
  modules: Module[];
}

const productImages: Record<string, string> = {
  "command-center": "/images/normal/product-planning.jpg",
  "university-matcher": "/images/normal/service-planning.jpg",
  "service-bazaar": "/images/normal/banking.jpg",
  community: "/images/normal/housing.jpg",
  events: "/images/normal/esim.jpg",
  "career-jobs": "/images/normal/career.jpg",
  profile: "/images/normal/phone-hand-source.jpg",
  inbox: "/images/normal/phone-hand.png",
};

export default function Modules({ modules }: ModulesProps) {
  const galleryItems: HoverExpandImage[] = (modules || []).map((module) => ({
    src: productImages[module.id] || "/images/normal/product-planning.jpg",
    alt: module.name,
    code: module.category,
    title: module.name,
    description: module.description,
  }));

  return (
    <section className="relative bg-white pb-16" id="modules">
      <div className="mx-auto max-w-8xl">
        <div className="mx-auto mb-12 flex max-w-3xl flex-col items-center justify-center space-y-3 px-4 text-center sm:px-6 lg:mb-16 lg:px-8">
          <span className="block text-xs font-semibold uppercase tracking-widest text-primary">
            The product
          </span>
          <AnimatedTitle
            as="h2"
            className="text-3xl font-semibold leading-tight tracking-tight text-gray-900 sm:text-4xl md:text-5xl"
          >
            A real product. Not a brochure.
          </AnimatedTitle>
        </div>

        {galleryItems.length === 0 ? (
          <div className="mx-auto w-full rounded-custom border border-gray-150/80 bg-white p-8 py-16 text-center shadow-xs">
            <AnimatedTitle as="h3" className="text-lg font-bold text-gray-900">
              A real product. Not a brochure.
            </AnimatedTitle>
          </div>
        ) : (
          <Skiper52 images={galleryItems} />
        )}
      </div>
    </section>
  );
}
