import Image from "next/image";

import HomepageAnimatedTitle from "@/components/homepage/HomepageAnimatedTitle";

const principles = [
  {
    title: "The free OS is the product, not the trap.",
    copy: "No features held back to manufacture upgrades. The core system stays complete, year-round, and free.",
  },
  {
    title: "Every partner is labelled.",
    copy: "Direct partner, referral, or coupon code is visible wherever an option appears.",
  },
  {
    title: "Specialists, not hidden agents.",
    copy: "Concierge is sold as dedicated time and expertise, with the cost clear before work begins.",
  },
  {
    title: "Post-arrival is the point.",
    copy: "Jobs, community, and practical support start when you land and stay useful after the offer.",
  },
  {
    title: "Honest about what we don't do.",
    copy: "We explain what is live, what is still early, and where an option is not the right fit.",
  },
  {
    title: "Family-business standards.",
    copy: "If we would not recommend it to a younger sibling, it does not make it into Atlas.",
  },
] as const;

export function AboutPrinciples() {
  return (
    <section className="border-t border-white/[.1] px-5 py-20 text-white sm:px-8 sm:py-24 lg:h-[calc(100svh-5rem)] lg:py-10" id="principles">
      <div className="mx-auto grid h-full w-full max-w-[1240px] gap-10 lg:grid-cols-[.78fr_1.22fr] lg:gap-14">
        <header className="flex max-w-[27rem] flex-col">
          <HomepageAnimatedTitle
            as="h2"
            className="text-balance text-[clamp(2.15rem,3.1vw,3.5rem)] font-semibold leading-[.96] tracking-[-.065em]"
          >
            Six rules that <span className="text-[#f35a02]">decide everything.</span>
          </HomepageAnimatedTitle>
          <HomepageAnimatedTitle
            as="p"
            className="atlas-homepage-title-3d mt-6 text-pretty text-base leading-7 text-white/60 sm:text-lg"
          >
            They keep the product useful, our incentives visible, and every recommendation
            grounded in what is right for the student.
          </HomepageAnimatedTitle>

          <figure
            className="relative mt-8 aspect-[4/3] overflow-hidden border border-white/[.12] bg-[#0d0d0f] lg:mt-6 lg:h-[180px] lg:aspect-auto"
            data-about-principles-photo
          >
            <Image
              alt="Students collaborating around a laptop"
              className="object-cover saturate-[.72]"
              fill
              sizes="(min-width: 1024px) 28vw, 100vw"
              src="/images/about/students-collaborating.jpg"
            />
          </figure>
        </header>

        <div className="grid border-l border-t border-white/[.12] sm:grid-cols-2" data-about-principles-grid>
          {principles.map((principle) => (
            <article
              className="flex min-h-[190px] flex-col border-b border-r border-white/[.12] p-6 sm:p-7 lg:min-h-0"
              data-about-principle
              key={principle.title}
            >
              <h3 className="max-w-[15rem] text-[clamp(1.25rem,1.65vw,1.55rem)] font-medium leading-[1.1] tracking-[-.045em] text-white">
                {principle.title}
              </h3>
              <p className="mt-4 max-w-[17rem] text-sm leading-6 text-white/52">{principle.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
