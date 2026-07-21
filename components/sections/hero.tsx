import { Button } from "@/components/ui/button";
import { Phone, ChevronRight } from "lucide-react";
import Link from "next/link";
import AnimatedTitle from "@/components/common/AnimatedTitle";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-24 lg:pt-28 h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#FFF3EC] to-[#FFF8F1] text-gray-900">
      {/* <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-orange-100/30 rounded-full filter blur-3xl opacity-60 translate-x-1/4 -translate-y-1/4" />
      <div className="absolute bottom-10 left-0 -z-10 w-96 h-96 bg-amber-100/20 rounded-full filter blur-3xl opacity-50 -translate-x-1/4" /> */}

      <div className="h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Trust Badge */}
          {/* <div className="inline-flex justify-center">
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FFF3EC] border border-orange-100/50 shadow-2xs">
              <span className="text-sm">🔥</span>
              <span className="text-xs font-normal text-[#f97316] tracking-tight">
                FREE, END TO END
              </span>
            </div>
          </div> */}

          <AnimatedTitle
            as="h1"
            className="text-2xl sm:text-5xl font-semibold lg:text-[70px] font-black text-gray-900 tracking-tight leading-none"
          >
            <span className="block">
              Your operating system
              <br /> for
            </span>
            <span className="text-[#f97316] inline-block">
              <span className="block text-[#f97316]">
                studying and succeeding
              </span>
              <span
                className="atlas-plane-hover"
                data-airplane-flight
                tabIndex={0}
              >
                <span className="atlas-plane-hover__text ">abroad.</span>
                <svg
                  aria-hidden="true"
                  className="atlas-plane-hover__icon"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                  />
                </svg>
              </span>
            </span>
          </AnimatedTitle>

          <p
            data-aos="fade-up"
            data-aos-duration="800"
            className="text-sm sm:text-base lg:text-[17px] text-black/40 font-normal max-w-xl mx-auto leading-relaxed tracking-tight"
          >
            Match universities. Sort your services. Settle in. Then build a
            life. All in one place — from your first application to long after
            you&apos;ve landed.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3 px-4">
            <label
              data-aos="fade-right"
              data-aos-duration="800"
              data-aos-delay="400"
              htmlFor="demo-modal-toggle"
              className="w-full sm:w-auto bg-[#f97316] hover:bg-[#f97316]-hover text-white font-semibold rounded-full px-8 py-3.5 flex items-center justify-center gap-2 active:scale-[0.98] transition-all cursor-pointer shadow-md shadow-orange-500/10 text-sm select-none text-center"
            >
              <Phone className="w-4 h-4 fill-current text-white" />
              Get started — free
            </label>
            <Link
              href="#features"
              className="w-full sm:w-auto"
              data-aos="fade-left"
              data-aos-duration="800"
              data-aos-delay="400"
            >
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 font-semibold rounded-full px-8 py-3.5 flex items-center justify-center gap-1 active:scale-[0.98] transition-all cursor-pointer"
              >
                See how it works
                <ChevronRight className="w-4 h-4 text-gray-500" />
              </Button>
            </Link>
          </div>

          <div
            className="flex items-center justify-center gap-1.5 pt-3"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="500"
          >
            <div className="flex items-center gap-2 text-amber-500">
              <span className="font-semibold">£0</span> To use, ever
            </div>
            <span className="text-xs font-semibold text-gray-500">
              3 min To set up · No card Required
            </span>
          </div>
        </div>

        {/* <div className="mt-6 relative">
          <div className="relative  overflow-hidden ">
            <Image
              src="/images/banner.png"
              alt="GGI Atlas student operating system"
              width={1200}
              height={780}
              className="w-full h-auto object-contain block"
              priority
            />
          </div>
        </div> */}
      </div>
    </section>
  );
}
