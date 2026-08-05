import Image from "next/image";

import HomepageAnimatedTitle from "@/components/homepage/HomepageAnimatedTitle";

const proofPoints = [
  { value: "Six", label: "Years in the field" },
  { value: "London", label: "Where we're based" },
  { value: "Free", label: "The OS, forever" },
] as const;

export function AboutHero() {
  return (
    <section
      className="relative isolate mx-auto grid min-h-[calc(100svh-5rem)] max-w-[1240px] items-center gap-12 overflow-hidden px-5 py-16 text-white sm:px-8 lg:grid-cols-[.88fr_1.12fr] lg:gap-14 lg:py-20"
      data-about-editorial-hero
      id="about"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_55%_68%_at_76%_46%,rgba(243,90,2,.18),transparent_74%)]"
      />

      <div className="max-w-[38rem] lg:pb-4">
        <p className="font-mono text-[10px] uppercase tracking-[.18em] text-[#f35a02]">
          About Atlas
        </p>
        <HomepageAnimatedTitle
          as="h1"
          className="mt-6 text-balance text-[clamp(3.4rem,6.4vw,6.4rem)] font-semibold leading-[.91] tracking-[-.07em]"
        >
          What we believe. <span className="text-[#f35a02]">And how we build it.</span>
        </HomepageAnimatedTitle>
        <HomepageAnimatedTitle
          as="p"
          className="atlas-homepage-title-3d mt-7 max-w-[35rem] text-pretty text-base leading-7 text-white/64 sm:text-lg"
        >
          Atlas is a small London team building the system we wish existed for every
          student moving abroad. This is the why, the people, and the rules behind what
          we build next.
        </HomepageAnimatedTitle>

        <dl className="mt-10 grid max-w-[32rem] grid-cols-3 border-t border-white/[.12]">
          {proofPoints.map((proof) => (
            <div className="border-r border-white/[.12] px-3 py-5 first:pl-0 last:border-r-0 sm:px-5 sm:first:pl-0" key={proof.value}>
              <dt className="text-xs leading-5 text-white/48">{proof.label}</dt>
              <dd className="mt-2 text-[clamp(1.35rem,2.4vw,2rem)] font-semibold leading-none tracking-[-.055em] text-white">
                {proof.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="relative mx-auto grid w-full max-w-[640px] grid-cols-[1.08fr_.92fr] gap-3 sm:gap-4 lg:justify-self-end">
        <figure className="relative min-h-[390px] overflow-hidden border border-white/[.12] bg-[#0e0e10] sm:min-h-[540px]">
          <Image
            alt="Student preparing to depart for a move abroad"
            className="object-cover"
            fill
            priority
            sizes="(min-width: 1024px) 30vw, 55vw"
            src="/images/homepage/atlas-departure.jpg"
          />
          <figcaption className="absolute bottom-0 left-0 right-0 bg-[linear-gradient(180deg,transparent,rgba(5,5,6,.84))] px-5 pb-5 pt-14 text-sm font-medium text-white/78">
            Built for the full move
          </figcaption>
        </figure>
        <div className="grid gap-3 sm:gap-4">
          <figure className="relative min-h-[188px] overflow-hidden border border-white/[.12] bg-[#0e0e10] sm:min-h-[262px]">
            <Image
              alt="Atlas planning workspace"
              className="object-cover"
              fill
              sizes="(min-width: 1024px) 24vw, 42vw"
              src="/images/homepage/product-planning.jpg"
            />
            <figcaption className="absolute bottom-0 left-0 right-0 bg-[linear-gradient(180deg,transparent,rgba(5,5,6,.84))] px-4 pb-4 pt-12 text-xs font-medium text-white/78">
              One open system
            </figcaption>
          </figure>
          <figure className="relative min-h-[188px] overflow-hidden border border-white/[.12] bg-[#0e0e10] sm:min-h-[262px]">
            <Image
              alt="Students connected through Atlas"
              className="object-cover"
              fill
              sizes="(min-width: 1024px) 24vw, 42vw"
              src="/images/homepage/student-crowd.png"
            />
            <figcaption className="absolute bottom-0 left-0 right-0 bg-[linear-gradient(180deg,transparent,rgba(5,5,6,.84))] px-4 pb-4 pt-12 text-xs font-medium text-white/78">
              A life after arrival
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
