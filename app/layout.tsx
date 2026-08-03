import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

import { Footer } from "@/components/homepage/Footer";
import { AtlasLogo } from "@/components/ui/AtlasLogo";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://atlas.study"),
  title: {
    default: "Atlas | Your operating system for studying abroad",
    template: "%s | Atlas",
  },
  description:
    "Apply with clarity, land prepared, and build your life abroad with Atlas.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Atlas | Your operating system for studying abroad",
    description:
      "Apply with clarity, land prepared, and build your life abroad with Atlas.",
    type: "website",
    url: "/",
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#050505",
};

type RootLayoutProps = Readonly<{ children: ReactNode }>;

const navigation = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "Essentials", href: "/#service-catalog" },
  { label: "Concierge", href: "/concierge" },
  { label: "Resources", href: "/#resources" },
];

function SiteHeader() {
  return (
    <header
      className="relative z-20 mx-auto w-full max-w-[1180px] px-5 pt-5 sm:px-8"
      data-atlas-site-header
    >
      <nav
        aria-label="Primary navigation"
        className="flex h-14 items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-3 shadow-[0_18px_70px_rgba(0,0,0,.22)] backdrop-blur-xl sm:px-4"
      >
        <AtlasLogo className="text-white" />

        <ul className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => (
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
          href="mailto:hello@atlas.study?subject=Atlas%20early%20access"
        >
          Get started
          <ArrowRight aria-hidden="true" className="size-3.5" />
        </a>
      </nav>
    </header>
  );
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <Footer />
      </body>
    </html>
  );
}
