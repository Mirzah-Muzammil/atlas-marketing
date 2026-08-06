import Image from "next/image";

import HomepageAnimatedTitle from "@/components/homepage/HomepageAnimatedTitle";

const phases = [
  {
    id: "plan-apply",
    number: "01",
    title: "Pick a university. Get in. Without the kickbacks.",
    description:
      "The basics, done well. Atlas builds a shortlist around your grades, budget, course, and career goals, without being paid to steer you towards the wrong fit.",
    details: [
      "Admit probability, projected ROI, visa success, and real costs are compared against your actual profile.",
      "Track deadlines, document checklists, applications, funding, and the visa journey from CAS to vignette in one plan.",
    ],
    image: "/images/homepage/journey-photos/application.jpg",
    alt: "Student preparing an Atlas university application",
    caption: "Shortlist with context",
  },
  {
    id: "arrive-settle",
    number: "02",
    title: "Land. Get sorted. In a week, not a month.",
    description:
      "The eight services every international student needs in their first month are set up before you fly and activated as soon as you land.",
    details: [
      "Banking, SIM, insurance, housing, forex, flights, and packing are ready before you board the plane.",
      "Every option says whether it is direct, a partner referral, or a coupon code. The UK Settler's Handbook covers NHS, BRP, council tax exemption, GP registration, banking, and address proof.",
    ],
    image: "/images/homepage/journey-photos/passport.jpg",
    alt: "Passport and documents for an Atlas arrival plan",
    caption: "Arrival, in the right order",
  },
  {
    id: "build-thrive",
    number: "03",
    title: "After you land. The bit nobody else builds.",
    description:
      "Most platforms stop after arrival. Atlas keeps jobs, community, events, and year-round support free for as long as you use it.",
    details: [
      "Sponsorship-friendly roles, graduate schemes, internships, CV reviews, and alumni mentors stay close after you land.",
      "Use the same workspace for city groups, tax questions, second-year housing, PSW visa planning, and life after graduation.",
    ],
    image: "/images/homepage/journey-photos/community.jpg",
    alt: "Students building community after arriving in the UK",
    caption: "A life after the offer",
  },
] as const;

export function JourneyPhases() {
  return (
    <div data-how-it-works-phases>
      {phases.map((phase, index) => {
        const reversed = index % 2 === 1;

        return (
          <section
            className="border-t border-white/[.1] px-5 py-24 text-white sm:px-8 sm:py-32"
            data-journey-phase-layout="split"
            id={phase.id}
            key={phase.id}
          >
            <div className="mx-auto grid w-full max-w-[1180px] items-center gap-12 lg:grid-cols-2 lg:gap-20">
              <header
                className={`max-w-[34rem] ${reversed ? "lg:order-2 lg:justify-self-end" : ""}`}
                data-journey-phase-copy
              >
                <p className="font-mono text-[11px] tracking-[.2em] text-[#f35a02]">
                  {phase.number}
                </p>
                <HomepageAnimatedTitle
                  as="h2"
                  className="mt-7 text-balance text-[clamp(2.9rem,4.5vw,5.15rem)] font-semibold leading-[.9] tracking-[-.075em]"
                >
                  {phase.title}
                </HomepageAnimatedTitle>
                <HomepageAnimatedTitle
                  as="p"
                  className="atlas-homepage-title-3d mt-6 max-w-[31rem] text-pretty text-base leading-7 text-white/60 sm:text-lg sm:leading-8"
                >
                  {phase.description}
                </HomepageAnimatedTitle>
                <div className="mt-5 max-w-[31rem] space-y-4 text-pretty text-sm leading-6 text-white/48 sm:text-base sm:leading-7">
                  {phase.details.map((detail) => (
                    <p key={detail}>{detail}</p>
                  ))}
                </div>
              </header>

              <figure
                className={`relative aspect-[4/3] overflow-hidden border border-white/[.12] bg-[#0b0b0d] shadow-[0_28px_80px_rgba(0,0,0,.32)] ${
                  reversed ? "lg:order-1" : ""
                }`}
                data-journey-phase-visual
              >
                <Image
                  alt={phase.alt}
                  className="object-cover grayscale-[.08] transition-transform duration-700 ease-out hover:scale-[1.025] motion-reduce:transition-none motion-reduce:hover:scale-100"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  src={phase.image}
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,6,.04)_36%,rgba(5,5,6,.7)_100%)]"
                />
                <figcaption className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-5 sm:p-7">
                  <span className="text-sm font-medium tracking-[-.02em] text-white/88">
                    {phase.caption}
                  </span>
                  <span className="font-mono text-[10px] tracking-[.16em] text-white/54">
                    ATLAS {phase.number}
                  </span>
                </figcaption>
              </figure>
            </div>
          </section>
        );
      })}
    </div>
  );
}
