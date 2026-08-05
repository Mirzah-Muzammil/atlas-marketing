import Image from "next/image";

import HomepageAnimatedTitle from "@/components/homepage/HomepageAnimatedTitle";

const proofPoints = [
  {
    value: "Six",
    label: "Years in the field",
    image: "/images/about/six-years.svg",
    alt: "Six years in the field artwork",
  },
  {
    value: "London",
    label: "Where we're based",
    image: "/images/about/london-base.svg",
    alt: "London base artwork",
  },
  {
    value: "Free",
    label: "The OS, forever",
    image: "/images/about/free-os.svg",
    alt: "Free Atlas operating system artwork",
  },
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

      </div>

      <div className="relative mx-auto grid w-full max-w-[640px] grid-cols-[1.08fr_.92fr] gap-3 sm:gap-4 lg:justify-self-end">
        {proofPoints.map((proof, index) => (
          <figure
            className={`group relative overflow-hidden border border-white/[.12] bg-[#0e0e10] ${
              index === 0 ? "row-span-2 min-h-[390px] sm:min-h-[540px]" : "min-h-[188px] sm:min-h-[262px]"
            }`}
            data-about-proof-artwork
            key={proof.value}
          >
            <Image
              alt={proof.alt}
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              fill
              priority={index === 0}
              sizes="(min-width: 1024px) 30vw, 55vw"
              src={proof.image}
            />
            <figcaption className="absolute bottom-0 left-0 right-0 bg-[linear-gradient(180deg,transparent,rgba(5,5,6,.9))] p-5 pt-16 sm:p-6 sm:pt-20">
              <span className="block text-[clamp(1.8rem,3vw,3.15rem)] font-semibold leading-none tracking-[-.06em] text-white">
                {proof.value}
              </span>
              <span className="mt-2 block text-sm text-white/64">{proof.label}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
