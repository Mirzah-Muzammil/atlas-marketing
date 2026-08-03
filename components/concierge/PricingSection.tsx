import { Check } from "lucide-react";

import HomepageAnimatedTitle from "@/components/homepage/HomepageAnimatedTitle";

const services = [
  {
    title: "Visa application",
    turnaround: "Prepared and ready to file, typically 3 to 5 days",
    features: [
      "Full document check against your CAS",
      "Application prepared end to end",
      "Every answer reviewed before submission",
    ],
  },
  {
    title: "Application review",
    turnaround: "Full feedback, typically 48 hours",
    features: [
      "Personal statement and SOP review, line by line",
      "Document set checked for gaps",
      "Concrete fixes, not vague comments",
    ],
  },
  {
    title: "Arrival setup",
    turnaround: "Sorted before you fly, with an agreed timeline",
    features: [
      "Housing shortlist verified before you pay",
      "Bank account and SIM ready on arrival",
      "Your first-week plan, day by day",
    ],
  },
];

const quoteHref = "mailto:hello@atlas.study?subject=Atlas%20Concierge%20quote";

export function PricingSection() {
  return (
    <section
      className="concierge-pricing relative isolate overflow-hidden px-5 py-16 sm:px-8 sm:py-20"
      data-concierge-pricing
      id="pricing"
    >
      <div aria-hidden="true" className="concierge-pricing-glow absolute inset-0 -z-10" />
      <div className="relative mx-auto max-w-[1300px]">
        <div className="max-w-[650px]">
          <HomepageAnimatedTitle
            as="h2"
            className="atlas-homepage-title-3d text-balance text-[clamp(3rem,4.2vw,4.2rem)] font-medium leading-[.98] tracking-[-.065em]"
          >
            One task. One price. <span className="text-[#f35a02]">Done.</span>
          </HomepageAnimatedTitle>
          <HomepageAnimatedTitle
            as="p"
            className="atlas-homepage-title-3d mt-6 max-w-[42rem] text-pretty text-base leading-7 text-white/62 sm:text-lg"
          >
            Every service is a fixed fee. You see the exact cost before you
            commit to anything.
          </HomepageAnimatedTitle>
        </div>

        <div className="mt-12 grid gap-3 md:grid-cols-3 md:gap-3">
          {services.map((service, index) => (
            <article
              className={`concierge-pricing-card concierge-pricing-card-${index + 1} ${
                index === 1 ? "concierge-pricing-card-featured" : ""
              }`}
              data-concierge-pricing-card
              key={service.title}
            >
              <div className="relative z-10 flex h-full flex-col p-5 sm:p-6">
                <h3 className="text-xl font-medium tracking-[-.035em] text-white sm:text-2xl">
                  {service.title}
                </h3>
                <p className="mt-2 max-w-[28ch] text-sm leading-5 text-white/58">
                  {service.turnaround}
                </p>

                <p className="mt-7 text-[clamp(2.6rem,4.2vw,4rem)] font-medium leading-none tracking-[-.075em] text-white">
                  Fixed <span className="text-[.38em] tracking-[-.035em] text-white/68">quote</span>
                </p>

                <div className="my-8 flex items-center gap-2 text-xs text-white/48 before:h-px before:flex-1 before:bg-white/18 after:h-px after:flex-1 after:bg-white/18">
                  Features
                </div>

                <ul className="space-y-3 text-sm leading-5 text-white/58">
                  {service.features.map((feature) => (
                    <li className="flex gap-2.5" key={feature}>
                      <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-white/6 text-[#f35a02]">
                        <Check aria-hidden="true" className="size-2.5" strokeWidth={2.5} />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  className="concierge-pricing-button mt-auto inline-flex min-h-14 items-center justify-center rounded-full border border-white/10 px-5 text-base font-medium text-white transition-colors"
                  href={quoteHref}
                >
                  Get my quote
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
