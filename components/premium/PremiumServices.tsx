import {
  StickyCard002,
  type CardData,
} from "@/components/ui/skiper-ui/skiper17";
import { normalServices } from "@/constants/normal-page-data";

const serviceArtwork: Record<string, string> = {
  solar: "/images/premium/services/sim-esim.png",
  manufacturing: "/images/premium/services/banking.png",
  "it-saas": "/images/premium/services/insurance.png",
  education: "/images/premium/services/visas.png",
  construction: "/images/premium/services/housing.png",
  ecommerce: "/images/premium/services/forex.png",
  logistics: "/images/premium/services/tax-filing.png",
  "digital-marketing": "/images/premium/services/loans.png",
};

const serviceCards: CardData[] = normalServices.map((service) => ({
  id: service.id,
  image: serviceArtwork[service.id],
  alt: `Illustration representing Atlas ${service.name.toLowerCase()} support`,
  title: service.name,
  description: service.description,
}));

export function PremiumServices() {
  return (
    <section
      data-premium-services
      aria-labelledby="premium-services-title"
      className="overflow-clip bg-[#111827] py-20 text-white sm:py-28"
    >
      <header className="mx-auto flex w-[min(100%-2rem,80rem)] flex-col gap-6 px-4 sm:px-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="mb-4 text-sm font-black uppercase tracking-[0.24em] text-[#f97316]">
            Services, sorted
          </p>
          <h2
            id="premium-services-title"
            className="max-w-4xl text-5xl font-black leading-[0.92] tracking-[-0.055em] sm:text-7xl lg:text-8xl"
          >
            Everything you need to land ready
          </h2>
        </div>
        <p className="max-w-sm text-base leading-relaxed text-white/65 sm:text-lg lg:text-right">
          From the paperwork before take-off to the practical details after
          landing, Atlas keeps every essential in one place.
        </p>
      </header>

      <StickyCard002 cards={serviceCards} className="mt-12 sm:mt-16" />
    </section>
  );
}
