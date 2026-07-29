import Image from "next/image";
import type { CSSProperties } from "react";

import {
  landing3Universities,
  type Landing3University,
} from "@/components/landing-3/universities";

const rowDirections = ["left", "right"] as const;
const rowDurations = [42, 48] as const;
const universityRows = rowDirections.map((_, rowIndex) =>
  landing3Universities.filter(
    (__, index) => index % rowDirections.length === rowIndex,
  ),
);

type MarqueeStyle = CSSProperties & { "--marquee-duration": string };

function UniversitySet({
  duplicate = false,
  universities,
}: {
  duplicate?: boolean;
  universities: readonly Landing3University[];
}) {
  return (
    <div
      aria-hidden={duplicate ? "true" : undefined}
      className="flex shrink-0 gap-8 pr-8 sm:gap-12 sm:pr-12"
      data-marquee-set={duplicate ? "duplicate" : "primary"}
    >
      {universities.map((university) => (
        <a
          aria-label={duplicate ? undefined : `Visit ${university.name}`}
          className="landing-3-university-tile group flex w-28 shrink-0 flex-col items-center gap-3 text-center transition-[opacity,transform] duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:w-32"
          data-university-tile
          href={university.href}
          key={`${duplicate ? "duplicate" : "primary"}-${university.name}`}
          rel="noreferrer"
          tabIndex={duplicate ? -1 : undefined}
        >
          <span
            className="grid aspect-square w-16 place-items-center overflow-hidden bg-white p-2.5 sm:w-20"
            data-university-logo-frame
          >
            <Image
              alt={duplicate ? "" : `${university.name} logo`}
              className="h-full w-full object-contain"
              data-university-logo
              height={80}
              loading="lazy"
              src={university.logo}
              unoptimized
              width={80}
            />
          </span>
          <span className="min-h-9 text-[11px] font-medium leading-[1.25] text-white/70 transition-colors group-hover:text-white sm:text-xs">
            {university.name}
          </span>
        </a>
      ))}
    </div>
  );
}

export function Landing3UniversityMarquee() {
  return (
    <section
      aria-label="UK universities supported by Atlas"
      className="relative isolate overflow-hidden bg-[#050506] pb-24 pt-20 text-white sm:pb-32 sm:pt-28"
      data-landing-3-university-marquee
      id="universities"
    >
      <div className="mx-auto mb-14 max-w-[1170px] px-5 sm:mb-20 sm:px-8">
        <h2
          aria-label="Every UK university. One system."
          className="max-w-3xl text-[clamp(2.5rem,5vw,5rem)] font-semibold leading-[.95] tracking-[-.06em] text-white"
        >
          <span className="block">Every UK university.</span>
          <span className="block text-[#f35a02]" data-university-heading-accent>
            One system.
          </span>
        </h2>
      </div>
      <div
        className="relative space-y-8 [mask-image:linear-gradient(90deg,transparent,black_5%,black_95%,transparent)] sm:space-y-10"
        data-university-marquee-stack
      >
        {universityRows.map((universities, rowIndex) => (
          <div
            className="landing-3-university-row overflow-hidden py-2"
            data-marquee-direction={rowDirections[rowIndex]}
            data-university-marquee-row
            key={rowDirections[rowIndex] + rowIndex}
          >
            <div
              className="landing-3-university-track flex w-max"
              data-university-marquee-track
              style={
                {
                  "--marquee-duration": `${rowDurations[rowIndex]}s`,
                } as MarqueeStyle
              }
            >
              <UniversitySet universities={universities} />
              <UniversitySet duplicate universities={universities} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
