import Image from "next/image";
import type { CSSProperties } from "react";

import {
  landing3Universities,
  type Landing3University,
} from "@/components/landing-3/universities";

const rowDirections = ["left", "right", "left"] as const;
const rowDurations = [66, 74, 70] as const;
const universityRows = rowDirections.map((_, rowIndex) =>
  landing3Universities.filter((__, index) => index % 3 === rowIndex),
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
      className="flex shrink-0 gap-3 pr-3 sm:gap-4 sm:pr-4"
      data-marquee-set={duplicate ? "duplicate" : "primary"}
    >
      {universities.map((university) => (
        <a
          aria-label={duplicate ? undefined : `Visit ${university.name}`}
          className="landing-3-university-tile group inline-grid size-12 shrink-0 place-items-center transition-[opacity,transform] duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:size-14"
          data-university-tile
          href={university.href}
          key={`${duplicate ? "duplicate" : "primary"}-${university.name}`}
          rel="noreferrer"
          tabIndex={duplicate ? -1 : undefined}
        >
          <Image
            alt={duplicate ? "" : `${university.name} logo`}
            className="h-full w-full object-contain brightness-0 invert"
            data-university-logo
            height={56}
            loading="lazy"
            src={university.logo}
            unoptimized
            width={56}
          />
        </a>
      ))}
    </div>
  );
}

export function Landing3UniversityMarquee() {
  return (
    <section
      aria-label="UK universities supported by Atlas"
      className="relative isolate overflow-hidden bg-[#050506] pb-20 text-white sm:pb-28"
      data-landing-3-university-marquee
    >
      <div
        className="relative space-y-3 [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)] sm:space-y-4"
        data-university-marquee-stack
      >
        {universityRows.map((universities, rowIndex) => (
          <div
            className="landing-3-university-row overflow-hidden py-1.5"
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
