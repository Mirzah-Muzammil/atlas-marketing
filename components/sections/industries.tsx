import Image from "next/image";
import AnimatedTitle from "@/components/common/AnimatedTitle";

interface Industry {
  id: string;
  name: string;
  description: string;
  image: string;
}

interface IndustriesProps {
  industries: Industry[];
}

export default function Industries({ industries }: IndustriesProps) {
  const getIndustryData = (
    id: string,
    defaultName: string,
    defaultDesc: string,
    defaultImage: string,
    textFirst = false,
  ) => {
    const dbItem = industries?.find((i) => i.id === id);
    return {
      id,
      name: dbItem?.name || defaultName,
      description: dbItem?.description || defaultDesc,
      imageSrc: dbItem?.image || defaultImage,
      textFirst,
    };
  };

  const solar = getIndustryData(
    "solar",
    "SIM & eSIM",
    "Pre-activated UK eSIM. 80GB data, unlimited UK calls. Works the moment you land.",
    "/images/normal/esim.jpg",
    true,
  );

  const manufacturing = getIndustryData(
    "manufacturing",
    "Banking",
    "Monzo Student. £0/mo · open before flight.",
    "/images/normal/banking.jpg",
    false,
  );

  const itSaaS = getIndustryData(
    "it-saas",
    "Insurance",
    "EduSafe Insurance. Health + travel · 12mo. £185 · Buy here.",
    "/images/normal/insurance.jpg",
    false,
  );

  const education = getIndustryData(
    "education",
    "Visas",
    "Sequenced over four weeks: visa, banking, SIM, insurance, forex, housing, flight, packing.",
    "/images/normal/visa.jpg",
    true,
  );

  const construction = getIndustryData(
    "construction",
    "Housing",
    "You need a UK bank account, a SIM that works on landing, accommodation that won't get you scammed, insurance that's actually good, forex that doesn't bleed you dry.",
    "/images/normal/housing.jpg",
    true,
  );

  const ecommerce = getIndustryData(
    "ecommerce",
    "Forex",
    "Wise Forex. Mid-market FX rate. 0.4% fee · Visit Wise.",
    "/images/normal/forex.jpg",
    false,
  );

  const logistics = getIndustryData(
    "logistics",
    "Tax filing",
    "Tax season, second-year housing, internships, graduation, post-study work visa. Same dashboard. Same team. Free, every year.",
    "/images/normal/tax.jpg",
  );

  const digitalMarketing = getIndustryData(
    "digital-marketing",
    "Loans",
    "Find the cheapest funding for your specific course and country. We tell you when a loan is bad value.",
    "/images/normal/loans.jpg",
  );

  if (!industries || industries.length === 0) {
    return (
      <section id="industries" className="py-20 lg:py-28 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16 bg-white rounded-custom border border-gray-150/80 shadow-xs max-w-lg mx-auto p-8">
            <AnimatedTitle
              as="h3"
              className="text-lg font-bold text-gray-900 mb-1"
            >
              No Services Found
            </AnimatedTitle>
          </div>
        </div>
      </section>
    );
  }

  const columns = [
    [solar, manufacturing],
    [itSaaS, education],
    [construction, ecommerce],
  ];

  const bottomRow = [logistics, digitalMarketing];

  return (
    <section id="industries" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-sm font-semibold text-[#FF5E1A] tracking-wider uppercase block">
            ARRIVE &amp; SETTLE
          </span>
          <AnimatedTitle
            as="h2"
            className="text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-900 tracking-tight leading-tight"
          >
            Every service you need, sorted.
          </AnimatedTitle>
          <p className="text-base sm:text-lg text-gray-500 leading-relaxed">
            Banking, SIM, insurance, housing, forex, loans, tax, food.
            Everything you need, sorted by stage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {columns.map((column, colIdx) => (
            <div
              key={colIdx}
              className="flex flex-col gap-6 lg:gap-8"
              data-aos="fade-up"
              data-aos-delay={colIdx * 100}
            >
              {column.map((item) => (
                <div
                  key={item.id}
                  className="bg-white/50 backdrop-blur-md rounded-[24px] p-6 flex flex-col justify-between shadow-xs transition-all duration-300 hover:shadow-lg hover:translate-3 h-full space-y-6"
                >
                  {item.textFirst ? (
                    <>
                      <div className="space-y-3">
                        <h3
                          // as="h3"
                          className="text-xl sm:text-2xl font-semibold text-gray-900 tracking-tight"
                        >
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-500 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                      <div className="relative w-full aspect-[16/9] rounded-[16px] overflow-hidden border border-gray-100">
                        <Image
                          src={item.imageSrc}
                          alt={item.name}
                          fill
                          sizes="(max-w-768px) 100vw, 33vw"
                          className="object-cover"
                          priority={colIdx === 0}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="relative w-full aspect-[16/9] rounded-[16px] overflow-hidden bg-[#fffbf9]">
                        <Image
                          src={item.imageSrc}
                          alt={item.name}
                          fill
                          sizes="(max-w-768px) 100vw, 33vw"
                          className="object-cover"
                          priority={colIdx === 0}
                        />
                      </div>
                      <div className="space-y-3">
                        <h3
                          // as="h3"
                          className="text-xl sm:text-2xl font-semibold text-gray-900 tracking-tight"
                        >
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-500 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mt-6 lg:mt-8">
          {bottomRow.map((item, idx) => (
            <div
              key={item.id}
              className="bg-white/50 backdrop-blur-md rounded-[24px] p-6 flex flex-col sm:flex-row items-center gap-6 shadow-xs transition-all duration-300 hover:shadow-lg hover:translate-3 h-full"
              // data-aos="fade-up"
              // data-aos-delay={idx * 100}
            >
              <div className="relative w-full sm:w-[180px] lg:w-[220px] aspect-[16/9] rounded-[16px] overflow-hidden border border-gray-100 flex-shrink-0">
                <Image
                  src={item.imageSrc}
                  alt={item.name}
                  fill
                  sizes="(max-w-768px) 100vw, 20vw"
                  className="object-cover"
                />
              </div>
              <div className="space-y-2 text-left w-full">
                <h3
                  // as="h3"
                  className="text-xl sm:text-2xl font-semibold text-gray-900 tracking-tight"
                >
                  {item.name}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
