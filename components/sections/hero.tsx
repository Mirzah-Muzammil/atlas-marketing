import AnimatedTitle from "@/components/common/AnimatedTitle";
import { ArrowDownRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

type HeroProps = {
  primaryAction?: ReactNode;
};

export default function Hero({ primaryAction }: HeroProps = {}) {
  return (
    <section className="atlas-hero relative isolate min-h-[100svh] overflow-hidden bg-white text-[#171717]">
      <div className="atlas-hero__video-shell" aria-hidden="true">
        <video
          aria-hidden="true"
          autoPlay
          className="atlas-hero__video"
          data-hero-video
          disablePictureInPicture
          loop
          muted
          playsInline
          preload="metadata"
          tabIndex={-1}
        >
          <source src="/videos/atlas-student-study.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="atlas-hero__content relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1440px] items-center px-5 pb-14 pt-28 sm:px-8 lg:px-12 xl:px-16">
        <div className="atlas-hero__message max-w-[46rem]">
          <AnimatedTitle
            aria-label="Your operating system for studying and succeeding abroad"
            as="h1"
            className="atlas-hero__title"
          >
            <span className="atlas-hero__title-line">
              Your operating system
            </span>
            <span className="atlas-hero__title-line atlas-hero__title-line--accent">
              for studying and succeeding abroad.
            </span>
          </AnimatedTitle>

          <AnimatedTitle as="p" className="atlas-hero__copy">
            Apply with clarity. Land prepared. Build your life abroad—with every
            essential service and the right people in one place.
          </AnimatedTitle>

          <div className="atlas-hero__actions">
            {primaryAction ?? (
              <label
                className="atlas-hero__primary-action"
                htmlFor="demo-modal-toggle"
              >
                Get started — free
              </label>
            )}
            <Link className="atlas-hero__secondary-action" href="#features">
              Explore the platform
              <ArrowDownRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
