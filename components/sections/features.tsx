import Image from "next/image";
import AnimatedTitle from "@/components/common/AnimatedTitle";

export default function Features() {
  return (
    <section id="features" className=" bg-white relative">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 flex flex-col gap-4 justify-center items-center max-w-4xl">
          <span className="text-sm font-semibold text-[#FF5E1A] tracking-wider uppercase block">
            SETTLE
          </span>
          <AnimatedTitle
            as="h2"
            className="text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-900 tracking-tight leading-tight"
          >
            The actual backbone. Every service you need, sorted.
          </AnimatedTitle>
          <p className="text-base sm:text-lg text-gray-500 leading-relaxed max-w-3xl">
            You need a UK bank account, a SIM that works on landing,
            accommodation that won&apos;t get you scammed, insurance that&apos;s
            actually good, forex that doesn&apos;t bleed you dry.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch pb-10">
          <div
            className="bg-gradient-to-br from-[#FF8C20] to-[#FF5E1A] p-8 sm:p-10 rounded-[32px] flex items-center justify-center shadow-xs min-h-[350px] lg:min-h-[420px] transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            data-aos="fade-right"
            data-aos-delay="100"
          >
            <div className="w-full max-w-[360px] bg-white rounded-[20px] overflow-hidden shadow-md flex items-center justify-center p-4">
              <Image
                src="/images/normal/service-planning.jpg"
                alt="Student reviewing university documents with a laptop"
                width={1200}
                height={900}
                className="w-full h-auto object-contain block rounded-[12px]"
                priority
              />
            </div>
          </div>

          <div
            className="bg-white/50 backdrop-blur-md p-8 sm:p-10 lg:p-12 rounded-[32px] flex flex-col justify-center text-left min-h-[350px] lg:min-h-[420px] space-y-5 transition-all duration-300 shadow-md hover:-translate-y-1"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <h3
              // as="h3"
              className="text-2xl sm:text-3xl font-semibold tracking-tight text-gray-900 leading-tight"
            >
              Land. Get sorted. In a week, not a month.
            </h3>
            <p className="text-sm sm:text-base text-[#6B7280] leading-relaxed">
              Offer letter in hand. Now the real work starts — visa, loan,
              accommodation, banking, SIM. We line them up in the right order so
              you don&apos;t miss a step.
            </p>
          </div>

          <div
            className="bg-gradient-to-br from-[#3B66FF] to-[#1E40AF] p-8 sm:p-10 rounded-[32px] flex items-center justify-center shadow-xs min-h-[350px] lg:min-h-[420px] transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            data-aos="fade-left"
            data-aos-delay="300"
          >
            <div className="w-full max-w-[360px] bg-white rounded-[20px] overflow-hidden shadow-md flex items-center justify-center p-4">
              <Image
                src="/images/normal/career.jpg"
                alt="Graduate taking part in a job interview"
                width={1200}
                height={900}
                className="w-full h-auto object-contain block rounded-[12px]"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
