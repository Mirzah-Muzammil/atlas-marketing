import { Building2, GraduationCap, MapPin, Plane, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import AnimatedTitle from "@/components/common/AnimatedTitle";

export function Landing3Footer() {
  return (
    <footer
      className="relative overflow-hidden border-t border-zinc-900 bg-black pb-0 pt-20 text-zinc-400"
      data-landing-3-footer
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 pb-4 md:grid-cols-12 md:gap-8">
          <div className="space-y-6 md:col-span-5">
            <Link className="group flex items-center gap-1" href="/landing-3">
              <span className="font-sans text-xl font-extrabold tracking-tight text-white">
                GGI Atlas
              </span>
            </Link>

            <p className="max-w-sm text-sm font-normal leading-relaxed text-zinc-400">
              Your operating system for studying and succeeding abroad. Free,
              end to end. London, UK.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                className="flex items-center gap-2.5 rounded-lg border border-zinc-800 bg-black px-3.5 py-1.5 text-left text-white transition-all hover:bg-zinc-900"
                href="#atlas-support"
              >
                <MapPin className="h-5 w-5 text-white" />
                <span>
                  <span className="block text-[8px] leading-none text-zinc-400">
                    London, UK
                  </span>
                  <span className="block text-[11px] font-bold leading-tight">
                    GGI Atlas
                  </span>
                </span>
              </a>
              <a
                className="flex items-center gap-2.5 rounded-lg border border-zinc-800 bg-black px-3.5 py-1.5 text-left text-white transition-all hover:bg-zinc-900"
                href="#faq"
              >
                <Building2 className="h-5 w-5 text-white" />
                <span>
                  <span className="block text-[8px] leading-none text-zinc-400">
                    OPERATED BY EDUTUXIA LTD
                  </span>
                  <span className="block text-[11px] font-bold leading-tight">
                    REGISTERED IN ENGLAND
                  </span>
                </span>
              </a>
            </div>
          </div>

          <div className="hidden md:col-span-1 md:block" />

          <div className="grid grid-cols-3 gap-6 sm:gap-8 md:col-span-6">
            <div className="space-y-4">
              <AnimatedTitle
                as="h4"
                className="text-sm font-semibold tracking-wider text-white"
              >
                APPLY
              </AnimatedTitle>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    className="text-zinc-400 transition-colors hover:text-white"
                    href="#journey"
                  >
                    Match universities
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-zinc-400 transition-colors hover:text-white"
                    href="#platform"
                  >
                    Track applications
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-zinc-400 transition-colors hover:text-white"
                    href="#journey"
                  >
                    Get the visa
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <AnimatedTitle
                as="h4"
                className="text-sm font-semibold tracking-wider text-white"
              >
                SETTLE
              </AnimatedTitle>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    className="text-zinc-400 transition-colors hover:text-white"
                    href="#essentials-orbit"
                  >
                    Banking
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-zinc-400 transition-colors hover:text-white"
                    href="#essentials-orbit"
                  >
                    SIM &amp; eSIM
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-zinc-400 transition-colors hover:text-white"
                    href="#essentials-orbit"
                  >
                    Housing
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <AnimatedTitle
                as="h4"
                className="text-sm font-semibold tracking-wider text-white"
              >
                THRIVE
              </AnimatedTitle>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    className="text-zinc-400 transition-colors hover:text-white"
                    href="#atlas-support"
                  >
                    Career &amp; Jobs
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-zinc-400 transition-colors hover:text-white"
                    href="#atlas-support"
                  >
                    Community
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-zinc-400 transition-colors hover:text-white"
                    href="#faq"
                  >
                    Events
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="my-0 border-t border-zinc-800/60" />

        <div className="flex flex-col items-center justify-between gap-4 pt-6 sm:flex-row">
          <span className="text-xs font-normal tracking-wide text-zinc-500">
            © 2026 GGI Atlas · Built in London
          </span>

          <div className="flex items-center gap-3">
            <a
              aria-label="Apply"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-900 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
              href="#journey"
            >
              <GraduationCap className="h-4 w-4" />
            </a>
            <a
              aria-label="Settle"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-900 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
              href="#essentials-orbit"
            >
              <Plane className="h-4 w-4" />
            </a>
            <a
              aria-label="Thrive"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-900 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
              href="#atlas-support"
            >
              <Users className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="pointer-events-none -mb-39 -mt-10 flex w-full select-none justify-center">
        <Image
          alt="ATLAS"
          className="block h-auto w-full max-w-7xl object-contain opacity-95"
          height={747}
          src="/images/normal/atlas-wordmark.png"
          width={2105}
        />
      </div>
    </footer>
  );
}
