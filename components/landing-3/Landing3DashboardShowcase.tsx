"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

import Landing3AnimatedTitle from "@/components/landing-3/Landing3AnimatedTitle";

const dashboardAlt =
  "Atlas dashboard showing a student’s application journey, next steps, and services.";

export function Landing3DashboardShowcase() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = section?.querySelector<HTMLElement>(
      "[data-showcase-heading]",
    );
    const frame = section?.querySelector<HTMLElement>("[data-showcase-frame]");

    if (!section || !heading || !frame) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion || typeof IntersectionObserver === "undefined") {
      gsap.set([heading, frame], { clearProps: "all" });
      return;
    }

    const context = gsap.context(() => {
      gsap.set(heading, { opacity: 0, y: 24 });
      gsap.set(frame, {
        opacity: 0,
        scale: 0.96,
        transformOrigin: "50% 100%",
        y: 64,
      });
    }, section);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;

        context.add(() => {
          gsap
            .timeline({ defaults: { ease: "power3.out" } })
            .to(heading, { duration: 0.7, opacity: 1, y: 0 })
            .to(
              frame,
              { duration: 1.15, opacity: 1, scale: 1, y: 0 },
              "-=0.35",
            );
        });
        observer.disconnect();
      },
      { threshold: 0.18 },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      context.revert();
    };
  }, []);

  return (
    <section
      className="relative isolate  overflow-hidden bg-[#050506] px-5 pb-8 pt-20 text-white sm:px-8  "
      data-landing-3-showcase
      id="platform"
      ref={sectionRef}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-[30%] h-[68%] bg-[radial-gradient(ellipse_at_center,rgba(27,56,101,.34)_0%,rgba(12,26,51,.17)_36%,transparent_72%)] blur-2xl" />
        <div
          className="absolute inset-x-0 top-[27%] h-[64%] opacity-55"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(159,198,255,.65) 0 1px, transparent 1.4px), radial-gradient(circle, rgba(255,255,255,.35) 0 .8px, transparent 1.2px)",
            backgroundPosition: "0 0, 47px 29px",
            backgroundSize: "83px 83px, 113px 113px",
            maskImage:
              "linear-gradient(to bottom, transparent, black 18%, black 72%, transparent)",
          }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-[1400px]">
        <Landing3AnimatedTitle
          aria-label="From application to arrival. One Atlas, every next step."
          as="h2"
          className="mx-auto text-center text-[clamp(1.25rem,1.65vw,1.5rem)] font-medium leading-[1.25] tracking-[-.025em] text-white"
          data-showcase-heading
        >
          <span className="block" data-showcase-line="primary">
            From application to arrival.
          </span>
          <span className="block" data-showcase-line="secondary">
            One Atlas, every next step.
          </span>
        </Landing3AnimatedTitle>

        <div
          className="relative mx-auto mt-16 w-full max-w-[1180px] sm:mt-20"
          data-showcase-frame
        >
          <div className="absolute inset-x-[7%] -bottom-[8%] top-[12%] -z-10 rounded-[45%] bg-[#1f4d9d]/20 blur-[80px]" />
          <div className="rounded-[18px] border border-white/[.14] bg-white/[.035] p-[5px] shadow-[0_0_0_1px_rgba(255,255,255,.035),0_38px_110px_rgba(0,0,0,.78),0_0_90px_rgba(42,89,165,.12)] sm:rounded-[22px] sm:p-[7px]">
            <div
              className="relative overflow-hidden rounded-[12px] border border-white/10 bg-[#090a0d] sm:rounded-[15px]"
              data-showcase-media
            >
              <Image
                alt={dashboardAlt}
                className="atlas-dashboard-media block h-auto w-full will-change-transform"
                height={575}
                priority
                sizes="(max-width: 1280px) calc(100vw - 40px), 1180px"
                src="/images/crm.png"
                width={1144}
              />
              <span
                aria-hidden="true"
                className="atlas-dashboard-sweep pointer-events-none absolute -inset-y-1/2 left-[-45%] w-[34%] rotate-[18deg] bg-gradient-to-r from-transparent via-white/[.09] to-transparent blur-md"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(180deg,rgba(255,255,255,.035),transparent_16%,transparent_82%,rgba(0,0,0,.16))]"
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes atlasDashboardDrift {
          from {
            transform: scale(1.01) translate3d(0, 0, 0);
          }
          to {
            transform: scale(1.035) translate3d(0, -0.45%, 0);
          }
        }

        @keyframes atlasDashboardSweep {
          0%,
          18% {
            opacity: 0;
            transform: translate3d(0, 0, 0) rotate(18deg);
          }
          42% {
            opacity: 1;
          }
          68%,
          100% {
            opacity: 0;
            transform: translate3d(440%, 0, 0) rotate(18deg);
          }
        }

        .atlas-dashboard-media {
          animation: atlasDashboardDrift 14s ease-in-out infinite alternate;
        }

        .atlas-dashboard-sweep {
          animation: atlasDashboardSweep 8s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .atlas-dashboard-media,
          .atlas-dashboard-sweep {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
