import { Building2, GraduationCap, MapPin, Plane, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import AnimatedTitle from "@/components/common/AnimatedTitle";

export default function Footer() {
  return (
    <footer className="bg-black text-zinc-400 pt-20 pb-0 border-t border-zinc-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-4">
          <div className="md:col-span-5 space-y-6">
            <Link href="#" className="flex items-center gap-1 group">
              {/*  */}
              <span className="font-extrabold text-xl text-white tracking-tight font-sans">
                GGI Atlas
              </span>
            </Link>

            <p className="text-sm text-zinc-400 leading-relaxed max-w-sm font-normal">
              Your operating system for studying and succeeding abroad. Free,
              end to end. London, UK.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#"
                className="flex items-center gap-2.5 border border-zinc-800 bg-black hover:bg-zinc-900 text-white px-3.5 py-1.5 rounded-lg text-left transition-all"
              >
                <MapPin className="w-5 h-5 text-white" />
                <div>
                  <span className="block text-[8px] text-zinc-400 leading-none">
                    London, UK
                  </span>
                  <span className="block text-[11px] font-bold leading-tight">
                    GGI Atlas
                  </span>
                </div>
              </a>
              <a
                href="#"
                className="flex items-center gap-2.5 border border-zinc-800 bg-black hover:bg-zinc-900 text-white px-3.5 py-1.5 rounded-lg text-left transition-all"
              >
                <Building2 className="w-5 h-5 text-white" />
                <div>
                  <span className="block text-[8px] text-zinc-400 leading-none">
                    OPERATED BY EDUTUXIA LTD
                  </span>
                  <span className="block text-[11px] font-bold leading-tight">
                    REGISTERED IN ENGLAND
                  </span>
                </div>
              </a>
            </div>
          </div>

          <div className="hidden md:block md:col-span-1"></div>

          <div className="md:col-span-6 grid grid-cols-3 gap-6 sm:gap-8">
            <div className="space-y-4">
              <AnimatedTitle
                as="h4"
                className="text-sm font-semibold text-white tracking-wider"
              >
                APPLY
              </AnimatedTitle>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    href="#modules"
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    Match universities
                  </Link>
                </li>
                <li>
                  <Link
                    href="#modules"
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    Track applications
                  </Link>
                </li>
                <li>
                  <Link
                    href="#features"
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    Get the visa
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <AnimatedTitle
                as="h4"
                className="text-sm font-semibold text-white tracking-wider"
              >
                SETTLE
              </AnimatedTitle>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    href="#industries"
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    Banking
                  </Link>
                </li>
                <li>
                  <Link
                    href="#industries"
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    SIM &amp; eSIM
                  </Link>
                </li>
                <li>
                  <Link
                    href="#industries"
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    Housing
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <AnimatedTitle
                as="h4"
                className="text-sm font-semibold text-white tracking-wider"
              >
                THRIVE
              </AnimatedTitle>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    href="#modules"
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    Career &amp; Jobs
                  </Link>
                </li>
                <li>
                  <Link
                    href="#modules"
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    Community
                  </Link>
                </li>
                <li>
                  <Link
                    href="#modules"
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    Events
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-800/60 my-0"></div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-zinc-500 tracking-wide font-normal">
            © 2026 GGI Atlas · Built in London
          </span>

          <div className="flex items-center gap-3">
            <a
              href="#modules"
              className="w-9 h-9 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-lg flex items-center justify-center transition-colors"
              aria-label="Apply"
            >
              <GraduationCap className="w-4 h-4" />
            </a>
            <a
              href="#industries"
              className="w-9 h-9 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-lg flex items-center justify-center transition-colors"
              aria-label="Settle"
            >
              <Plane className="w-4 h-4" />
            </a>
            <a
              href="#modules"
              className="w-9 h-9 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-lg flex items-center justify-center transition-colors"
              aria-label="Thrive"
            >
              <Users className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center -mt-10 -mb-39 select-none pointer-events-none">
        <Image
          src="/images/normal/atlas-wordmark.png"
          alt="ATLAS"
          width={2105}
          height={747}
          className="w-full max-w-7xl h-auto object-contain block opacity-95"
        />
      </div>
    </footer>
  );
}
