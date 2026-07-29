import {
  Building2,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Twitter,
  Youtube,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import AnimatedTitle from "@/components/common/AnimatedTitle";

const conciergeHref =
  "mailto:hello@atlas.study?subject=Atlas%20student%20session";

const socialLinks = [
  {
    href: "https://www.instagram.com/ggiatlas/",
    Icon: Instagram,
    label: "Follow Atlas on Instagram",
  },
  {
    href: "https://www.linkedin.com/company/ggi-atlas/",
    Icon: Linkedin,
    label: "Follow Atlas on LinkedIn",
  },
  {
    href: "https://www.youtube.com/@ggiatlas",
    Icon: Youtube,
    label: "Follow Atlas on YouTube",
  },
  {
    href: "https://x.com/ggiatlas",
    Icon: Twitter,
    label: "Follow Atlas on X",
  },
] as const;

export function Landing3Footer() {
  return (
    <footer
      className="relative overflow-hidden border-t border-zinc-900 bg-black pb-0 pt-20 text-zinc-400"
      data-landing-3-footer
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 pb-4 md:grid-cols-12 md:gap-8">
          <div className="space-y-6 md:col-span-4">
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

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-[.8fr_.8fr_.9fr_.95fr_1.55fr] sm:gap-8 md:col-span-8">
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

            <div className="space-y-4">
              <AnimatedTitle
                as="h4"
                className="text-sm font-semibold tracking-wider text-white"
              >
                SUPPORT
              </AnimatedTitle>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    className="text-zinc-400 transition-colors hover:text-white"
                    href="#faq"
                  >
                    Help centre
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-zinc-400 transition-colors hover:text-white"
                    href="#atlas-support"
                  >
                    Student support
                  </Link>
                </li>
                <li>
                  <a
                    className="text-zinc-400 transition-colors hover:text-white"
                    href={conciergeHref}
                  >
                    Book a session
                  </a>
                </li>
                <li>
                  <Link
                    className="text-zinc-400 transition-colors hover:text-white"
                    href="#faq"
                  >
                    Safety &amp; trust
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <AnimatedTitle
                as="h4"
                className="text-sm font-semibold tracking-wider text-white"
              >
                CONTACT US
              </AnimatedTitle>
              <div className="space-y-3 text-sm">
                <a
                  className="group flex items-center gap-2.5 rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2.5 text-zinc-300 transition-colors hover:border-zinc-700 hover:text-white"
                  href="mailto:hello@atlas.study"
                >
                  <Mail className="size-4 shrink-0 text-[#45e38f]" />
                  <span className="text-xs">hello@atlas.study</span>
                </a>
                <a
                  className="block rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2.5 text-zinc-300 transition-colors hover:border-zinc-700 hover:text-white"
                  href={conciergeHref}
                >
                  Book a student session
                </a>
                <p className="flex items-center gap-2 text-zinc-500">
                  <MapPin className="size-4" />
                  London, UK
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="my-0 border-t border-zinc-800/60" />

        <div className="flex flex-col items-center justify-between gap-4 pt-6 sm:flex-row">
          <span className="text-xs font-normal tracking-wide text-zinc-500">
            © 2026 GGI Atlas · Built in London
          </span>

          <div
            aria-label="Follow Atlas on social media"
            className="flex items-center gap-2"
          >
            <span className="mr-2 text-xs font-medium text-zinc-400">
              Follow us
            </span>
            {socialLinks.map(({ href, Icon, label }) => (
              <a
                aria-label={label}
                className="grid size-9 place-items-center rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-400 transition-[border-color,background-color,color,transform] hover:-translate-y-0.5 hover:border-zinc-700 hover:bg-zinc-900 hover:text-white"
                data-footer-social
                href={href}
                key={label}
                rel="noreferrer"
                target="_blank"
              >
                <Icon className="size-4" />
              </a>
            ))}
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
