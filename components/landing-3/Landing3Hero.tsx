import { ArrowRight, ChevronDown } from "lucide-react";

import { Landing3DashboardShowcase } from "@/components/landing-3/Landing3DashboardShowcase";
import { Landing3EssentialsOrbit } from "@/components/landing-3/Landing3EssentialsOrbit";
import { Landing3ReadinessSection } from "@/components/landing-3/Landing3ReadinessSection";
import { Landing3ServicesSection } from "@/components/landing-3/Landing3ServicesSection";
import { Landing3SupportSection } from "@/components/landing-3/Landing3SupportSection";
import { ShaderAnimation } from "@/components/landing-3/ShaderAnimation";
import { AtlasLogo } from "@/components/ui/AtlasLogo";
import { primaryNavigation } from "@/constants/navigation";

const getStartedHref =
  "mailto:hello@atlas.study?subject=Atlas%20early%20access";

export function Landing3Hero() {
  return (
    <main
      className="min-h-screen bg-[#050506] text-white"
      id="main-content"
    >
      <section className="relative isolate min-h-[100svh] overflow-hidden bg-[#050506]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          data-landing-3-visual
        >
          <ShaderAnimation />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,6,.58)_0%,rgba(5,5,6,.16)_48%,rgba(5,5,6,.76)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,transparent_0%,rgba(5,5,6,.12)_48%,rgba(5,5,6,.9)_100%)]" />
        </div>

        <header className="relative z-20 mx-auto w-full max-w-[1180px] px-5 pt-5 sm:px-8">
          <nav
            aria-label="Primary navigation"
            className="flex h-14 items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-3 shadow-[0_18px_70px_rgba(0,0,0,.22)] backdrop-blur-xl sm:px-4"
          >
            <AtlasLogo className="text-white" href="/landing-3" />

            <ul className="hidden items-center gap-1 lg:flex">
              {primaryNavigation.map((item) => (
                <li key={item.label}>
                  <a
                    className="rounded-lg px-3 py-2 text-sm text-white/64 transition-colors hover:bg-white/6 hover:text-white"
                    href={item.href}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <a
              className="inline-flex min-h-9 items-center gap-2 rounded-xl border border-white/12 bg-white px-3.5 text-sm font-medium text-black transition-colors hover:bg-white/88 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              href={getStartedHref}
            >
              Get started
              <ArrowRight aria-hidden="true" className="size-3.5" />
            </a>
          </nav>
        </header>

        <div className="relative z-10 mx-auto flex min-h-[calc(100svh-5rem)] max-w-[1180px] flex-col items-center justify-center px-5 pb-16 pt-20 text-center sm:px-8 sm:pb-20">
          <p className="mb-5 text-xs font-medium uppercase tracking-[.22em] text-white/52">
            Study abroad, without the chaos
          </p>
          <h1 className="max-w-5xl text-balance text-[clamp(3.25rem,7.4vw,7.25rem)] font-semibold leading-[.91] tracking-[-.07em]">
            Your operating system for studying and succeeding abroad.
          </h1>
          <p className="mt-7 max-w-2xl text-balance text-base leading-7 text-white/62 sm:text-lg">
            Apply with clarity. Land prepared. Build your life abroad—with every
            essential service and the right people in one place.
          </p>
          <div className="mt-8 flex w-full max-w-md flex-col justify-center gap-3 sm:w-auto sm:max-w-none sm:flex-row">
            <a
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-medium text-black transition-colors hover:bg-white/88 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              href={getStartedHref}
            >
              Get started — free
              <ArrowRight aria-hidden="true" className="size-4" />
            </a>
            <a
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/6 px-5 text-sm font-medium text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              href="#platform"
            >
              Explore the platform
              <ChevronDown aria-hidden="true" className="size-4" />
            </a>
          </div>
        </div>
      </section>
      <Landing3DashboardShowcase />
      <Landing3ReadinessSection />
      <Landing3ServicesSection />
      <Landing3EssentialsOrbit />
      <Landing3SupportSection />
    </main>
  );
}
