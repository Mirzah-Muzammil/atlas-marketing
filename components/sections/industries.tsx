import Image from "next/image";

import AnimatedTitle from "@/components/common/AnimatedTitle";
import SimpleMarquee from "@/components/ui/SimpleMarquee";

interface Industry {
  id: string;
  name: string;
  description: string;
  image: string;
}

interface IndustriesProps {
  industries: Industry[];
}

const marqueeDirections = ["left", "right", "left"] as const;

export default function Industries({ industries }: IndustriesProps) {
  if (!industries || industries.length === 0) {
    return (
      <section className="relative bg-white py-20 lg:py-28" id="industries">
        <div className="mx-auto max-w-lg px-4">
          <div className="rounded-custom border border-gray-150/80 bg-white p-8 py-16 text-center shadow-xs">
            <AnimatedTitle
              as="h3"
              className="mb-1 text-lg font-bold text-gray-900"
            >
              No Services Found
            </AnimatedTitle>
          </div>
        </div>
      </section>
    );
  }

  const serviceRows = [
    industries.slice(0, 3),
    industries.slice(3, 6),
    industries.slice(6),
  ];

  return (
    <section
      className="relative overflow-hidden bg-white py-20 text-gray-900 lg:py-28"
      id="industries"
    >
      <div className="relative z-10 mx-auto mb-14 max-w-3xl space-y-3 px-4 text-center sm:px-6 lg:mb-20 lg:px-8">
        <span className="block text-sm font-semibold uppercase tracking-wider text-[#FF5E1A]">
          ARRIVE &amp; SETTLE
        </span>
        <AnimatedTitle
          as="h2"
          className="text-3xl font-semibold leading-tight tracking-tight text-gray-900 sm:text-4xl md:text-5xl"
        >
          Every service you need, sorted.
        </AnimatedTitle>
        <p className="text-base leading-relaxed text-gray-500 sm:text-lg">
          Banking, SIM, insurance, housing, forex, loans, tax, food.
          Everything you need, sorted by stage.
        </p>
      </div>

      <div className="relative space-y-4 sm:space-y-5" data-service-marquee-stack>
        {serviceRows.map((row, rowIndex) => (
          <div
            className="overflow-hidden"
            data-marquee-direction={marqueeDirections[rowIndex]}
            data-service-marquee
            key={`service-row-${rowIndex}`}
          >
            <SimpleMarquee
              baseVelocity={6}
              className="py-1"
              direction={marqueeDirections[rowIndex]}
              repeat={4}
              scrollAwareDirection
              slowdownOnHover
              useScrollVelocity
            >
              <div className="flex gap-4 px-2 sm:gap-5 sm:px-2.5">
                {row.map((item) => (
                  <article
                    className="group relative h-[210px] w-[300px] shrink-0 overflow-hidden rounded-[20px] bg-neutral-900 sm:h-[250px] sm:w-[390px]"
                    data-service-card
                    key={item.id}
                  >
                    <Image
                      alt={item.name}
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      fill
                      priority={rowIndex === 0}
                      sizes="(max-width: 640px) 300px, 390px"
                      src={item.image}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/15 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                      <AnimatedTitle
                        as="h3"
                        className="text-xl font-semibold tracking-tight text-white sm:text-2xl"
                      >
                        {item.name}
                      </AnimatedTitle>
                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/65">
                        {item.description}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </SimpleMarquee>
          </div>
        ))}
      </div>
    </section>
  );
}
