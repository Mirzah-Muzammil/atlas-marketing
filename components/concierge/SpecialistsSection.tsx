import HomepageAnimatedTitle from "@/components/homepage/HomepageAnimatedTitle";

import { ConciergeChatDemo } from "./ConciergeChatDemo";

const assurances = [
  {
    eyebrow: "01",
    title: "Dedicated specialist",
    description:
      "One person owns the task, keeps the context, and brings you a clear next step.",
  },
  {
    eyebrow: "02",
    title: "UK expertise",
    description:
      "Guidance shaped around the practical rules, documents, and deadlines in front of you.",
  },
  {
    eyebrow: "03",
    title: "Secure documents inside Atlas",
    description:
      "Your files, updates, and approvals stay connected to the plan you are already following.",
  },
];

export function SpecialistsSection() {
  return (
    <section
      className="relative isolate overflow-hidden px-5 py-24 sm:px-8 lg:py-32"
      data-concierge-specialists
      id="specialists"
    >
      <div
        aria-hidden="true"
        className="concierge-specialists-depth pointer-events-none absolute inset-0 -z-10"
      />
      <div className="mx-auto max-w-[1180px]">
        <div className="max-w-2xl">
          <HomepageAnimatedTitle
            as="h2"
            className="text-balance text-[clamp(2.75rem,5vw,5.7rem)] font-semibold leading-[.94] tracking-[-.065em] text-white"
          >
            Who handles your case.
          </HomepageAnimatedTitle>
          <HomepageAnimatedTitle
            as="p"
            className="atlas-homepage-title-3d mt-6 max-w-xl text-pretty text-base leading-7 text-white/60 sm:text-lg"
          >
            A real specialist, clear UK expertise, and every document held in the
            same secure workspace as your plan.
          </HomepageAnimatedTitle>
        </div>

        <div className="mt-12 grid items-stretch gap-5 lg:grid-cols-[minmax(0,1.54fr)_minmax(17rem,.72fr)] lg:gap-6">
          <ConciergeChatDemo />
          <div className="grid gap-5 lg:grid-rows-3 lg:gap-6">
            {assurances.map((assurance) => (
              <article
                className="concierge-assurance-card group relative overflow-hidden rounded-[18px] border border-white/[0.09] bg-[#0a0a0b]/92 p-6 shadow-[0_20px_60px_rgba(0,0,0,.16)] transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-white/[0.16]"
                key={assurance.title}
              >
                <span className="text-[11px] font-medium tracking-[0.18em] text-[#ff7c36]">
                  {assurance.eyebrow}
                </span>
                <h3 className="mt-5 text-xl font-medium tracking-[-.035em] text-white">
                  {assurance.title}
                </h3>
                <p className="mt-2.5 max-w-[24rem] text-sm leading-6 text-white/54">
                  {assurance.description}
                </p>
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-14 -right-10 size-36 rounded-full bg-[#f35a02]/0 blur-3xl transition-colors duration-500 group-hover:bg-[#f35a02]/10"
                />
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
