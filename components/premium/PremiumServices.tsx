import Image from "next/image";

import { PremiumServiceMarquee } from "@/components/premium/PremiumServiceMarquee";
import { normalServices } from "@/constants/normal-page-data";

const serviceArtwork: Record<string, string> = {
  solar: "/images/normal/esim.jpg",
  manufacturing: "/images/normal/banking.jpg",
  "it-saas": "/images/premium/services/insurance.png",
  education: "/images/normal/visa.jpg",
  construction: "/images/normal/housing.jpg",
  ecommerce: "/images/premium/services/forex.png",
  logistics: "/images/premium/services/tax-filing.png",
  "digital-marketing": "/images/premium/services/loans.png",
};

const flagshipIds = ["education", "manufacturing", "construction", "solar"];

const serviceNotes: Record<string, { kicker: string; note: string }> = {
  education: {
    kicker: "Before the offer becomes real",
    note: "A visa route built around your actual course, dates, and documents—not a generic checklist.",
  },
  manufacturing: {
    kicker: "Money ready before landing",
    note: "Compare student accounts, understand the trade-offs, and arrive ready to pay rent without improvising.",
  },
  construction: {
    kicker: "A real address, not a gamble",
    note: "Shortlists, contract checks, and scam-aware guidance for the city and campus you are actually moving to.",
  },
  solar: {
    kicker: "Connected at touchdown",
    note: "Choose and activate a UK eSIM before your flight, with the cost and referral relationship shown upfront.",
  },
};

const flagshipServices = flagshipIds.map((id) => {
  const service = normalServices.find((item) => item.id === id);
  if (!service) throw new Error(`Missing premium service: ${id}`);
  return { ...service, ...serviceNotes[id], artwork: serviceArtwork[id] };
});

export function PremiumServices() {
  return (
    <section
      id="premium-services"
      data-premium-services
      aria-labelledby="premium-services-title"
      className="premium-services"
    >
      <div
        className="premium-services__transition"
        data-premium-hero-transition
        aria-label="The move starts now"
      >
        <div className="premium-services__transition-stage">
          <div className="premium-services__transition-meta" aria-hidden="true">
            <span>Atlas / Departure</span>
            <span>Chapter 01</span>
          </div>
          <figure
            className="premium-services__transition-frame"
            data-premium-transition-frame
          >
            <Image
              src="/images/premium/student-departure-studio.jpg"
              alt="International students travelling abroad together"
              fill
              sizes="100vw"
            />
            <span aria-hidden="true" />
          </figure>
          <div
            className="premium-services__transition-title"
            data-premium-transition-title
          >
            <p>The move starts now.</p>
          </div>
          <p className="premium-services__transition-scroll" aria-hidden="true">
            Keep scrolling ↘
          </p>
        </div>
      </div>

      <div className="premium-services__intro" data-premium-reveal>
        <div>
          <p className="premium-kicker">Services, sorted</p>
          <h2 id="premium-services-title">
            The practical side of <span>moving countries.</span>
          </h2>
        </div>
        <div className="premium-services__lede">
          <span>Eight essentials. One honest view.</span>
          <p>
            Compare the options, see how we get paid, and make each decision
            with your eyes open.
          </p>
        </div>
      </div>

      <PremiumServiceMarquee services={normalServices.map((service) => service.name)} />

      <div className="premium-services__chapters">
        {flagshipServices.map((service, index) => (
          <article
            key={service.id}
            data-premium-service-chapter
            data-premium-reveal
            className="premium-service-chapter"
          >
            <div className="premium-service-chapter__copy">
              <span className="premium-service-chapter__number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="premium-service-chapter__kicker">{service.kicker}</p>
              <h3>{service.name}</h3>
              <p className="premium-service-chapter__note">{service.note}</p>
              <p className="premium-service-chapter__disclosure">
                Clear options · transparent referral fees · no markup
              </p>
            </div>
            <figure
              className="premium-service-chapter__visual"
              data-premium-image-frame
            >
              <Image
                src={service.artwork}
                alt={`Atlas guidance for ${service.name.toLowerCase()}`}
                width={1000}
                height={700}
                sizes="(min-width: 900px) 48vw, 92vw"
              />
              <figcaption>
                <span>Atlas field note / {String(index + 1).padStart(2, "0")}</span>
                {service.description}
              </figcaption>
            </figure>
          </article>
        ))}
      </div>
    </section>
  );
}
