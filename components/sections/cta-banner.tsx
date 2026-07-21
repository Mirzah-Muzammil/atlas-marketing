import Image from "next/image";
import AnimatedTitle from "@/components/common/AnimatedTitle";

export default function CtaBanner() {
  return (
    <section className="min-w-7xl mt-60 mx-auto px-4 sm:px-6 lg:px-8 relative overflow-visible">
      <div className="bg-gradient-to-r from-[#FF5E1A] via-[#FF5E1A] to-[#FF904E] rounded-[32px] md:rounded-[40px] px-8 sm:px-12 md:px-16 py-8 flex flex-col md:flex-row items-center justify-between relative overflow-visible  shadow-lg">
        <div className="flex-1 space-y-6 text-left max-w-xl z-10">
          <AnimatedTitle
            as="h2"
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight"
          >
            Built to help you get out, and stay out.
          </AnimatedTitle>
          <p className="text-sm sm:text-base text-white/90 leading-relaxed max-w-lg">
            Free to start. Three minutes to set up. No card. No tier upgrades.
            Just the OS.
          </p>
          <div>
            <label
              htmlFor="demo-modal-toggle"
              className="inline-flex items-center gap-2.5 bg-white text-gray-900 px-6 py-3 rounded-xl font-bold text-sm tracking-tight hover:bg-white/95 transition-all cursor-pointer select-none text-center"
            >
              Get started
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </label>
          </div>
        </div>
        <div
          data-aos="fade-left"
          data-aos-duration="400"
          data-aos-easing="ease-in-out"
          className="relative md:absolute rounded-[32px] md:right-8 lg:right-0 w-full  md:w-[350px] md:-bottom-1 lg:w-[420px] mt-8 md:mt-0 flex items-end justify-center z-20 overflow-visible"
        >
          <Image
            src="/images/normal/subscription-phone-hand.png"
            alt="Hand holding a phone displaying Atlas subscription plans"
            width={1024}
            height={1536}
            className="object-contain rounded-[32px] h-max md:absolute md:bottom-1"
            priority
          />
        </div>
      </div>
    </section>
  );
}
