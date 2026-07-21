import Image from "next/image";

import AnimatedTitle from "@/components/common/AnimatedTitle";

export default function CtaBanner() {
  return (
    <section
      className="relative  mt-12 w-full max-w-8xl px-4 sm:mt-14 sm:px-6 lg:mt-16 lg:px-8"
      data-normal-cta="departure"
    >
      <div className="relative grid rounded-[32px] border border-orange-100 bg-primary shadow-[0_24px_80px_-42px_rgba(143,54,13,0.45)] md:grid-cols-[0.92fr_1.08fr] md:rounded-[40px]">
        <div
          className="relative z-10 flex flex-col justify-center px-7 py-10 sm:px-10 sm:py-12 md:px-12 lg:px-16"
          data-aos="fade-right"
          data-aos-duration="500"
        >
          <div className="max-w-xl space-y-5">
            <AnimatedTitle
              as="h2"
              className="text-3xl font-semibold leading-[1.03] tracking-[-0.045em] text-white sm:text-4xl lg:text-5xl"
            >
              Built to help you get out, and stay out.
            </AnimatedTitle>
            <p className="max-w-lg text-sm leading-relaxed text-white/90 sm:text-base">
              Free to start. Three minutes to set up. No card. No tier upgrades.
              Just the OS.
            </p>
            <div className="pt-2">
              <label
                className="group inline-flex cursor-pointer select-none items-center gap-3 rounded-full bg-[#FF5E1A] px-6 py-3.5 text-center text-sm font-semibold tracking-tight text-white shadow-[0_12px_30px_-14px_rgba(255,94,26,0.9)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#E94F10]"
                htmlFor="demo-modal-toggle"
              >
                Get started
                <span
                  aria-hidden="true"
                  className="grid h-6 w-6 place-items-center rounded-full bg-white/18 transition-transform duration-300 group-hover:translate-x-0.5"
                >
                  →
                </span>
              </label>
            </div>
          </div>

          {/* <div
            aria-hidden="true"
            className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-[#FF5E1A]/8 blur-3xl"
          /> */}
        </div>

        <div
          className="relative "
          data-aos="fade-left"
          data-aos-duration="600"
          data-cta-artwork
        >
          {/* <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_65%_34%,rgba(255,255,255,0.96),rgba(255,255,255,0)_46%)]"
          /> */}
          <div
            aria-hidden="true"
            className="absolute -right-16 top-10 h-56 w-56 rounded-full border border-[#FF5E1A]/15 sm:h-72 sm:w-72"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-20 left-[8%] h-48 w-48 rounded-full bg-[#FF5E1A]/15 blur-3xl"
          />
          <Image
            alt="International student ready to depart for university abroad"
            className="h-[600px] w-max absolute -right-10 -bottom-20 max-w-none object-cover "
            data-cta-cutout
            height={800}
            priority
            width={400}
            src="/images/normal/cta-student-cutout-v3.png"
          />
          {/* <div className="absolute inset-x-0 top-0 h-px bg-white/50" /> */}
        </div>
      </div>
    </section>
  );
}
